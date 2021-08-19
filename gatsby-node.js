const path = require('path')

// Expose some variables set by Netlify to send to Bugsnag
process.env.GATSBY_NETLIFY = process.env.NETLIFY
process.env.GATSBY_NETLIFY_BUILD_ID = process.env.BUILD_ID
process.env.GATSBY_NETLIFY_CONTEXT = process.env.CONTEXT
process.env.GATSBY_NETLIFY_REPOSITORY_URL = process.env.REPOSITORY_URL
process.env.GATSBY_NETLIFY_BRANCH = process.env.BRANCH
process.env.GATSBY_NETLIFY_COMMIT_REF = process.env.COMMIT_REF

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

const createMdxPages = async function (pages, createPage, graphql) {
  let promises = []
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
    // Built initial page list, now add info and create page
    for (const slug in pages) {
      promises.push(
        new Promise((resolve, reject) => {
          createPage(pages[slug])
          resolve(true)
        })
      )
    }
  })

  return Promise.all(promises)
}

exports.createPages = async ({ actions, graphql }) => {
  const pages = {}
  await createMdxPages(pages, actions.createPage, graphql)

  return
}
