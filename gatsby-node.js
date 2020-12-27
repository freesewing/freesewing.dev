const path = require('path')

// Expose some variables set by Netlify to send to Bugsnag
process.env.GATSBY_NETLIFY = process.env.NETLIFY
process.env.GATSBY_NETLIFY_BUILD_ID = process.env.BUILD_ID
process.env.GATSBY_NETLIFY_CONTEXT = process.env.CONTEXT
process.env.GATSBY_NETLIFY_REPOSITORY_URL = process.env.REPOSITORY_URL
process.env.GATSBY_NETLIFY_BRANCH = process.env.BRANCH
process.env.GATSBY_NETLIFY_COMMIT_REF = process.env.COMMIT_REF

const slugChunks = (slug) => {
  const chunks = []
  for (const chunk of slug.split('/')) {
    if (chunk.length > 0) chunks.push(chunk)
  }

  return chunks
}

const decorateTree = (tree, chunks, slug, page) => {
  let index
  if (chunks.length === 0) return tree
  else {
    index = chunks.shift()
    if (chunks.length === 0) {
      tree[index] = {
        title: page.context.title,
        order: page.context.order,
        slug
      }
    } else {
      if (typeof tree[index] === 'undefined') tree[index] = { offspring: {} }
      else if (typeof tree[index].offspring === 'undefined') tree[index].offspring = {}
    }
  }

  return decorateTree(tree[index].offspring, chunks, slug, page)
}

const buildTree = (pages) => {
  let tree = {}
  for (let slug of Object.keys(pages).sort()) {
    addToTree(slug, pages[slug], tree)
  }

  return tree
}

const addToTree = function (slug, page, tree) {
  decorateTree(tree, slugChunks(slug), slug, page)
}

const getFromTree = (tree, chunks) => {
  if (chunks.length === 0) return []
  const index = chunks.shift()
  if (chunks.length === 0) {
    if (!tree[index].offspring) return []
    else return Object.keys(tree[index].offspring).map((child) => tree[index].offspring[child].slug)
  }

  return getFromTree(tree[index].offspring, chunks)
}

const orderOffspring = (offspring, pages) => {
  let order = {}
  let ordered = []
  for (let slug in offspring) order[pages[slug].context.order + pages[slug].context.title] = slug
  for (let rank of Object.keys(order).sort()) ordered.push(order[rank])

  return ordered
}

const getOffspring = (slug, pages, tree) => {
  let offspring = {}
  for (const child of getFromTree(tree, slugChunks(slug)))
    offspring[child] = pages[child].context.title

  return offspring
}

const getSiblings = (slug, pages, tree) => {
  let parentSlug = getParentSlug(slug)
  if (parentSlug === '/') {
    let siblings = {}
    for (let i in tree) siblings[tree[i].slug] = tree[i].title

    return siblings
  }
  return getOffspring(getParentSlug(slug), pages, tree)
}

const getNextChild = (slug, docs) =>
  docs[slug].context.offspring ? Object.keys(docs[slug].context.offspring).shift() : false

const getNextSibling = (slug, docs) => {
  let me = false
  if (docs[slug] && docs[slug].context.siblings) {
    for (let sib in docs[slug].context.siblings) {
      if (me) return sib
      if (sib === slug) me = true
    }
  }

  return false
}

const getLastChild = (slug, docs) => {
  if (docs[slug] && docs[slug].context.offspring)
    return getLastChild(Object.keys(docs[slug].context.offspring).shift(), docs)

  return slug
}

const getParentSlug = (slug) => slug.split('/').slice(0, -2).join('/') + '/'
const getNextParent = (slug, docs) => getNextSibling(getParentSlug(slug), docs)

const getNextDoc = (slug, docs) => {
  let next
  next = getNextChild(slug, docs)
  if (!next) next = getNextSibling(slug, docs)
  if (!next) next = getNextParent(slug, docs)
  if (!next) next = '/tutorials/' // last resort

  return [next, { slug: next, title: docs[next].context.title }]
}

const getDocCrumbs = (slug, docs, crumbs = false) => {
  let len = slugChunks(slug).length
  // First pass
  if (!crumbs) {
    if (len < 2) return []
    return getDocCrumbs(getParentSlug(slug), docs, [])
  }
  // Recursion
  crumbs.push({
    slug,
    title: docs[slug].context.title
  })

  return len < 2
    ? crumbs.reverse()
    : getDocCrumbs(getParentSlug(slug), docs, crumbs)
}

const slugFromFilePath = filePath => {
  return (
    '/' +
    filePath
      .match(/[\/|\\]markdown[\/|\\]dev[\/|\\](.*)/)
      .pop()
      .slice(0, -5)
  )
}

const mdxQuery = function() {
  return `{
    allMdx(
      filter: { fileAbsolutePath: { regex: "//[^.]*/en.md/" } }
      sort: { fields: [fileAbsolutePath], order: DESC }
    ) { edges { node {
        fileAbsolutePath
        frontmatter {
          title
          order
        }
      } } }
  }`
}

const mdxList = pages =>
  Object.keys(pages).map((slug) => ({ slug, title: pages[slug].context.title }))

const createMdxPages = async function (pages, createPage, graphql) {
  let promises = []
  let tree
  let query = mdxQuery()
  let component = path.resolve(`./src/pages/_mdx.js`)
  await graphql(query).then((res) => {
    if (typeof res.data === 'undefined') throw 'query failed ' + query
    else {
      for (let page of res.data.allMdx.edges) {
        let slug = slugFromFilePath(page.node.fileAbsolutePath)
        // Don't turn UI mdx into pages
        if (slug.slice(0,4) !== '/ui/') {
          pages[slug] = {
            path: slug,
            component,
            context: {
              slug,
              title: page.node.frontmatter.title,
              order: page.node.frontmatter.order || 0,
              // Keep file here, it is used in the page query to filter
              file: page.node.fileAbsolutePath
            }
          }
        }
      }
    }
    // Built initial page list, now add info
    tree = buildTree(pages)
    for (const slug in pages) {
      let up = getParentSlug(slug)
      pages[slug].context.up = {
        slug: up,
        title: pages[up] ? pages[up].context.title : 'Docs'
      }
      // Children is a special prop in react, so we'll offspring
      pages[slug].context.offspring = getOffspring(slug, pages, tree)
      pages[slug].context.orderedOffspring = orderOffspring(pages[slug].context.offspring, pages)
    }
    // Only do this after all offspring has been discovered
    for (const slug in pages) {
      pages[slug].context.siblings = getSiblings(slug, pages, tree)
      pages[slug].context.orderedSiblings = orderOffspring(pages[slug].context.siblings, pages)
      pages[slug].context.tree = tree
    }
    // Only do this after all offspring and siblings have been discovered
    let prevs = {}
    let next
    for (const slug in pages) {
      ;[next, pages[slug].context.next] = getNextDoc(slug, pages)
      prevs[next] = slug
    }
    for (const slug in pages) {
      pages[slug].context.previous = {
        slug: prevs[slug],
        title: pages[prevs[slug]] ? pages[prevs[slug]].context.title : prevs[slug]
      }
      pages[slug].context.crumbs = getDocCrumbs(slug, pages)
    }

    for (let slug in pages) {
      promises.push(
        new Promise((resolve, reject) => {
          createPage(pages[slug])
          resolve(true)
        })
      )
    }
  })

  // This is a bit of a hack to create a sitemap page without the need for an
  // extra page query
  promises.push(
    new Promise((resolve, reject) => {
      createPage({
        path: '/sitemap/',
        component: path.resolve(`./src/pages/_sitemap.js`),
        context: {
          pages: mdxList(pages),
          tree: tree,
          slug: '/sitemap/'
        }
      })
      resolve(true)
    })
  )

  return Promise.all(promises)
}

exports.createPages = async ({ actions, graphql }) => {
  const pages = {}
  await createMdxPages(pages, actions.createPage, graphql)

  return
}
