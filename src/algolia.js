const remark = require('remark')
const recommended = require('remark-preset-lint-recommended')
const html = require('remark-html')
const frontmatter = require('remark-frontmatter')

const getQuery = () => `{
  allMdx(filter: {fileAbsolutePath: {regex: "/${language}.md/"}}) {
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
      objectId: node.node.id,
      path: '/' + node.node.parent.relativeDirectory,
      title: node.node.frontmatter.title.split('|').pop(),
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
      query: getQuery(),
      transformer: ({ data }) => flatten(data.allMdx.edges),
      indexName: `${language}_freesewing_dev`,
      settings: {}
    }
  ]

  return data
}

module.exports = getSearchData
