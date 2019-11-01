const path = require("path");
const i18n = require("@freesewing/i18n").strings

const translate = key => i18n[process.env.GATSBY_LANGUAGE][key] || key

const pageConfig = {
  single: {
    // These are slug => title
    "/": "app.home",
    "/language": "account.language",
    "/search": "app.search"
  },
  multiple: {
    // These are slug => matchPath regex
    "/404": "^\/?404\/?$",
  }
}

const getNonMdxPages = function() {
  const pages = {}
  for (let slug in pageConfig.single) {
    pages[slug] = {
      frontmatter: {
        title: translate(pageConfig.single[slug])
      }
    }
  }
  for (let slug in pageConfig.multiple) {
    pages[slug] = {
      frontmatter: {
        title: '' // Not relevant here
      },
      matchPath: pageConfig.multiple[slug]
    }
  }

  return pages
}

const slugFromFilePath = filePath => {
  let result = "/"+filePath.match(/[\/|\\]markdown[\/|\\]dev[\/|\\](.*)/).pop().slice(0,-5)
  return result
}

const getMdxPages = function(graphql) {
  const query = `{
  allMdx (
    filter: { fileAbsolutePath: { glob: "**/${process.env.GATSBY_LANGUAGE}.md" } }
    sort: { fields: [frontmatter___title], order: DESC }
  ) {
      edges {
        node {
          body
          fileAbsolutePath
          frontmatter { title }
          tableOfContents(maxDepth: 3)
        }
      }
    }
  }`
  return new Promise((resolve, reject) => {
    graphql(query).then(res => {
    	if (typeof res.data === "undefined") {
    	  console.log("query failed", query, res);
    	  reject();
    	} else {
        let pages = {}
        if (res.data.allMdx.edges.length > 0) {
          for (let page of res.data.allMdx.edges) {
            pages[slugFromFilePath(page.node.fileAbsolutePath)] = page.node
          }
        } else {
          console.log('MDX query did not find any pages')
        }
        resolve(pages);
      }
    })
  })
}

const  createMdxPages = function(pages, navigation, titles, createPage) {
  let promises = [];
  const rootComponent = path.resolve("./src/components/app/index.js");
  for (let slug in pages) {
    let data = {
      path: slug,
      component: rootComponent,
      context: {
        node: pages[slug],
        slug,
        navigation,
        titles
      }
    }
  	promises.push(new Promise((resolve, reject) => {
      createPage(data)
    	resolve(true);
    }));
  }

  return
}

const createOtherPages = function(pages, navigation, titles, createPage) {
  let promises = [];
  const rootComponent = path.resolve("./src/components/app/index.js");
  for (let slug in pages) {
    let data = {
      path: slug,
      component: rootComponent,
      context: {
        node: { frontmatter: pages[slug].frontmatter },
        slug,
        navigation,
        titles
      }
    }
    if (pages[slug].matchPath) data.matchPath = pages[slug].matchPath
  	promises.push(new Promise((resolve, reject) => {
      createPage(data)
    	resolve(true);
    }));
  }

  return Promise.all(promises);
}

const getTitles = mdxPages => {
  let titles = {}
  for (let slug of Object.keys(mdxPages).sort()) titles[slug] = mdxPages[slug].frontmatter.title

  return titles
}

const addToTree = function(slug, page, tree) {
  if (slug === '/') return
  let [a,b,c,d,e,f] = slug.slice(1,-1).split('/')
  let target
  try {
    if (f) target = tree[slugFor(a)].children[slugFor(a,b)].children[slugFor(a,b,c)].children[slugFor(a,b,c,d)].children[slugFor(a,b,c,d,e)].children
    else if (e) target = tree[slugFor(a)].children[slugFor(a,b)].children[slugFor(a,b,c)].children[slugFor(a,b,c,d)].children
    else if (d) target = tree[slugFor(a)].children[slugFor(a,b)].children[slugFor(a,b,c)].children
    else if (c) target = tree[slugFor(a)].children[slugFor(a,b)].children
    else if (b) target = tree[slugFor(a)].children
    else if (a) target = tree
    target[slugFor(a,b,c,d,e,f)] = { title: page.frontmatter.title, children: {} };
  }
  catch(err) {
    console.log('Unable to build tree. Please check structure of', slug)
  }
  return
}

const slugFor = function(a,b,c,d,e,f) {
  let chunks = []
  if (a) chunks.push(a)
  if (b) chunks.push(b)
  if (c) chunks.push(c)
  if (d) chunks.push(d)
  if (e) chunks.push(e)
  if (f) chunks.push(f)

  return '/'+chunks.join('/')+'/'
}

const buildNavigation = (mdxPages, titles) => {
  let tree = {}
  for (let slug of Object.keys(mdxPages).sort()) {
    addToTree(slug, mdxPages[slug], tree)
  }

  return sortNavigation(tree)
}

const sortNavigation = tree => {
  let order = {}
  let sortedTree = {}
  for (let page in tree) order[tree[page].title] = page
  for (let title of Object.keys(order).sort()) {
    sortedTree[order[title]] = {
      title,
      children: sortNavigationLevel(tree[order[title]])
    }
  }

  return sortedTree
}

const sortNavigationLevel = level => {
  if (typeof level === 'undefined') return level
  if (typeof level.children !== 'undefined') {
    let order = {}
    let sortedLevel = {}
    for (let page in level.children) order[level.children[page].title] = page
    for (let title of Object.keys(order).sort()) {
      sortedLevel[order[title]] = {
        title,
        children: sortNavigationLevel(level.children[order[title]])
      }
    }
    return sortedLevel
  }
  return level
}

exports.createPages = async ({ actions, graphql }) => {
  const mdxPages = await getMdxPages(graphql)
  const titles = getTitles(mdxPages)
  const navigation = buildNavigation(mdxPages, titles)
  await createMdxPages(mdxPages, navigation, titles, actions.createPage)
  await createOtherPages(getNonMdxPages(), navigation, titles, actions.createPage)

  return
};


/* Source nodes from backend */
const axios = require(`axios`)
const crypto = require(`crypto`)
exports.sourceNodes = async ({
  actions,
  getNode,
  createNodeId,
  hasNodeChanged,
}) => {
  const { createNode } = actions

  // Do the initial fetch
  const result = await axios.get(process.env.GATSBY_BACKEND + "patrons")
  // Create patron nodes.
  let i = 0;
  Object.keys(result.data).forEach( tier => {
    result.data[tier].map( patron => {
      const patronNode = {
        id: createNodeId(patron.handle),
        parent: null,
        patron: {
          ...patron,
          tier: tier
        },
        internal: {
          type: `FSPatron`,
        },
        order: i
      }
      i++

      // Get content digest of node.
      const contentDigest = crypto
        .createHash(`md5`)
        .update(JSON.stringify(patronNode))
        .digest(`hex`)

      patronNode.internal.contentDigest = contentDigest
      createNode(patronNode)
    })
  })

  return
}


