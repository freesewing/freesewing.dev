const remark = require('remark')
const recommended = require('remark-preset-lint-recommended')
const html = require('remark-html')
const frontmatter = require('remark-frontmatter')

const getQuery = language => `{
  allMdx(filter: {fileAbsolutePath: {regex: "/en.md/"}}) {
  	edges {
  	  node {
        id
  	    fileAbsolutePath
  	    parent { ... on File { relativeDirectory } }
  	    frontmatter { title }
        rawBody
  	  }
  	}
  }
}`

const flatten = arr => {
  return arr.map(node => {
    let it = {
      objectID: node.node.id,
      path: '/' + node.node.parent.relativeDirectory,
      title: node.node.frontmatter.title,
      content: remark()
        .use(recommended)
        .use(frontmatter)
        .use(html)
        .processSync(node.node.rawBody).contents
    }
    return it
  })
}

const getSearchData = () => {
  const data = [
    {
      query: getQuery(language),
      transformer: ({ data }) => flatten(data.allMdx.edges),
      indexName: `en_freesewing_dev`,
      settings: {}
    }
  ]

  return data
}

module.exports = getSearchData
