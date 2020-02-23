const path = require('path')

const slugFromFilePath = filePath => {
  return (
    '/' +
    filePath
      .match(/[\/|\\]markdown[\/|\\]dev[\/|\\](.*)/)
      .pop()
      .slice(0, -5)
  )
}

const mdxQuery = function(language) {
  return `{
    allMdx(
      filter: { fileAbsolutePath: { regex: "//[^.]*/${language}.md/" } }
      sort: { fields: [fileAbsolutePath], order: DESC }
    ) { edges { node { fileAbsolutePath } } }
  }`
}

const createMdxPages = async function(createPage, graphql, language) {
  let promises = []
  const query = mdxQuery(language)
  await graphql(query).then(res => {
    if (typeof res.data === 'undefined') throw 'query failed ' + query
    else {
      for (let page of res.data.allMdx.edges) {
        let slug = slugFromFilePath(page.node.fileAbsolutePath)
        promises.push(
          new Promise((resolve, reject) => {
            createPage({
              path: slug,
              component: path.resolve(`./src/pages/_mdx.js`),
              context: {
                file: page.node.fileAbsolutePath
              }
            })
            resolve(true)
          })
        )
      }
    }

    return Promise.all(promises)
  })
}

exports.createPages = async ({ actions, graphql }) => {
  // Without a language, this won't work
  const language = process.env.GATSBY_LANGUAGE
  if (typeof language === 'undefined')
    throw new Error("You MUST set the GATSBY_LANGUAGE environment variable (to 'en' for example)")

  await createMdxPages(actions.createPage, graphql, language)

  return
}

/* Source nodes from backend */
const axios = require(`axios`)
const crypto = require(`crypto`)
exports.sourceNodes = async ({ actions, getNode, createNodeId, hasNodeChanged }) => {
  const { createNode } = actions

  // Do the initial fetch
  const result = await axios.get(process.env.GATSBY_BACKEND + 'patrons')
  // Create patron nodes.
  let i = 0
  Object.keys(result.data).forEach(tier => {
    result.data[tier].map(patron => {
      const patronNode = {
        id: createNodeId(patron.handle),
        parent: null,
        patron: {
          ...patron,
          tier: tier
        },
        internal: {
          type: `FSPatron`
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
