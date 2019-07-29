const path = require("path");
const topics = require("./src/config/topics");

const rootComponent = path.resolve("src/components/app/index.js");

const redirects = {
  //"/contact": "/docs/about/contact",
}

const pages = {
  single: {
    "/": "app.home",
    "/language": "account.language",
    "/search": "app.search",
  },
  multiple: {
    //"/login/callback": {
    //  matchPath: "/login/callback/*",
    //},
  }
}

const getFileList = function(graphql, language, markdown) {
  return new Promise((resolve, reject) => {
    let query = `{
      allFile(filter: {
        sourceInstanceName: {eq: "markdown"},
        extension: {eq: "md"},
        name: {eq: "${language}"}
      }) { edges { node { relativeDirectory, name, absolutePath }}}
    }`;
    graphql(query).then(res => {
      if (typeof res.data === "undefined") {
        console.log("query failed", query, res);
        return false;
      } else {
        for (let node of res.data.allFile.edges) {
          let slug = "/"+node.node.relativeDirectory;
          let path = node.node.absolutePath;
          let lang = node.node.name;
          if (lang === language) markdown[slug] = { path, language: lang};
          else if (lang === "en" && typeof markdown[slug] === "undefined")
            markdown[slug] = {path, language: lang};
        }
      }
      resolve(true);
    });
  })
};

const parentCrumb = function(baseSlug, titles) {
  if (baseSlug.slice(1).indexOf("/") === -1) return false;
  let chunks = baseSlug.split("/");
  chunks.pop();
  let parentSlug = chunks.join("/");
  if (typeof titles[parentSlug] === "undefined") return false;
  else return { slug: parentSlug, title: titles[parentSlug]};
}
const breadcrumbs = function(baseSlug, titles) {
  let crumbs = [];
  let up = parentCrumb(baseSlug, titles);
  let count = 0;
  while (up && count < 20) {
    crumbs.unshift(up);
    up = parentCrumb(up.slug, titles);
    count++;
  }

  return crumbs;
}

const getMdx = function(graphql, language, markdown, titles) {
  let promises = [];
  let slugs = Object.keys(markdown);
  slugs.sort();
	for (let slug of slugs) {
    let fm = 'title, order';

		promises.push(new Promise((resolve, reject) => {
 		  let query = `{
 		  	allMdx(filter: {fileAbsolutePath: {eq: "${markdown[slug].path}"} }) {
 		  		edges {
 		  			node {
 		      		id
 		      		frontmatter { ${fm} }
 		      		code { body }
 		      		excerpt
 		      		tableOfContents
 		  			}
 		  		}
 		  	}
 		  }`;
    	graphql(query).then(res => {
    	  if (typeof res.data === "undefined") {
    	    console.log("query failed", query, res);
    	    reject();
    	  } else if (res.data.allMdx.edges.length > 1) {
    	    console.log("More than one edge found:", query, res);
    	    reject();
    	  } else {
					markdown[slug].node = res.data.allMdx.edges[0];
          titles[slug] = markdown[slug].node.node.frontmatter.title;
    	    resolve(true);
				}
    	});
  	}));
  }

  return Promise.all(promises);
};

const isDescendant = function (topic, slug, level=1) {
  let chunks = slug.split("/");
  if (chunks.length === (level + 2) && chunks[1] === topic) {
    if (level === 1) return true;
    if (level === 2) return "/"+topic+"/"+chunks[2];
    if (level === 3) return "/"+topic+"/"+chunks[2]+"/"+chunks[3];
  }
  else return false;
}

const isChild = function (base, slug) {
  if (slug.slice(0, base.length) !== base) return false;
  let chunks = {
    base: base.split("/"),
    slug: slug.split("/")
  }
  if (chunks.base.length + 1 === chunks.slug.length) return true;

  return false;
}

const getSortTitle = function (mdx) {
  let title = mdx.node.node.frontmatter.title;
  if (typeof mdx.node.node.frontmatter.linktitle !== "undefined")
    title = mdx.node.node.frontmatter.title;
  let order = null;
  if (typeof mdx.node.node.frontmatter.order !== "undefined")
    order = mdx.node.node.frontmatter.order;
  if (typeof mdx.node.node.frontmatter.date !== "undefined")
    order = mdx.node.node.frontmatter.date;
  if (order !== null) title = order + title;

  return title;
}

const getTitle = function (mdx) {
  if (typeof mdx.node.node.frontmatter.linktitle !== "undefined")
    return mdx.node.node.frontmatter.linktitle;

  return mdx.node.node.frontmatter.title;
}

const getDocsLevel = (level, data) => {
}

const getTopics = function(markdown) {
  let list = { };
  let slugs = Object.keys(markdown);
  slugs.sort();
	for (let slug of slugs) {
    let chunks = slug.split("/");
    let data = {
      title: markdown[slug].node.node.frontmatter.title,
      children: {},
    }
    if (chunks.length === 2) list[chunks[1]] = data;
    if (chunks.length === 3) list[chunks[1]][chunks[2]] = data;
    if (chunks.length === 4) list[chunks[1]][chunks[2]][chunks[3]] = data;
    if (chunks.length === 5) list[chunks[1]][chunks[2]][chunks[3]][chunks[4]] = data;
  }

  return list;
}

const getTopic = function(page) {
  let chunks = page.split("/");
  let t = topics.indexOf(chunks[1]);
  if (t === -1) return false;
  else return topics[t];
}

const flattenTopicsToc = function(topicsToc) {
  let slugs = [];
  let titles = {};
  for (let topic of topics) {
    slugs.push("/"+topic);
    titles["/"+topic] = topicsToc[topic].title;
    for (let child in topicsToc[topic].children) {
      slugs.push(child);
      titles[child] = topicsToc[topic].children[child].title;
      if (typeof topicsToc[topic].children !== "undefined") {
        for (let grandchild in topicsToc[topic].children[child].children) {
          slugs.push(grandchild);
          titles[grandchild] = topicsToc[topic].children[child].children[grandchild].title;
        }
      }
    }
  }

  return { slugs, titles };
}

const createRedirects = function(redirects, createRedirect) {
  let promises = [];
	for (let from in redirects) {
		promises.push(new Promise((resolve, reject) => {
      createRedirect({
        fromPath: from,
        toPath: redirects[from],
        isPermanent: true,
        redirectInBrowser: true,
      });
    	resolve(true);
 	  }));
  }

  return Promise.all(promises);
}

const createMdx = function(graphql, language, markdown, titles, createPage) {
  let promises = [];
  let topicsToc = getTopics(markdown);
  let content = flattenTopicsToc(topicsToc);
  let slugs = Object.keys(markdown);
  slugs.sort();
	for (let slug of slugs) {
    let topic = getTopic(slug);
		promises.push(new Promise((resolve, reject) => {
      createPage({
        path: slug,
        component: rootComponent,
        context: {
          node: markdown[slug].node.node,
          topic,
          topics,
          topicsToc,
          content,
          crumbs: breadcrumbs(slug, titles),
          language: markdown[slug].language,
          slug: slug
        }
      });
    	resolve(true);
 	  }));
  }
  for (let i in pages.single) {
		promises.push(new Promise((resolve, reject) => {
      createPage({
        path: i,
        component: rootComponent,
        context: {
          topics,
          topicsToc,
          content,
          crumbs: breadcrumbs(i, titles),
          slug: i,
          title: pages.single[i]
        }
      });
    	resolve(true);
 	  }));
  }
  for (let i in pages.multiple) {
		promises.push(new Promise((resolve, reject) => {
      createPage({
        path: i,
        component: rootComponent,
        ...pages.multiple[i],
        context: {
          topics,
          topicsToc,
          content,
          crumbs: breadcrumbs(i, titles),
          slug: i,
        }
      });
    	resolve(true);
 	  }));
  }
  return Promise.all(promises);
};

exports.createPages = ({ actions, graphql }) => {
  const language = process.env.GATSBY_LANGUAGE;
  if (typeof language === "undefined")
    throw new Error("You MUST set the GATSBY_LANGUAGE environment variable (to 'en' for example)");
  return new Promise((resolve, reject) => {
    const titles = {};
    const markdown = {};
    getFileList(graphql, language, markdown)
      .then(() => {
        console.log("[#-----]", "GraphQl file list query completed");
        getMdx(graphql, language, markdown, titles)
        .then(() => {
          console.log("[##----]", "MDX queries completed");
          createMdx(graphql, language, markdown, titles, actions.createPage)
          .then(() => {
            console.log("[##----]", "MDX pages created");
            createRedirects(redirects, actions.createRedirect)
            .then(() => {
              console.log("[##----]", "Redirects created");
              resolve(true);
            })
          })
        })
      })
    })
};
