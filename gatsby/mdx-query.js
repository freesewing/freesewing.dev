const buildQuery = function(language) {
  return `{
  docs: allMdx(
    filter: { fileAbsolutePath: { glob: "**/${language}.md" } }
    sort: { fields: [frontmatter___title], order: DESC }
  ) {
      edges {
        node {
          body
          fileAbsolutePath
          frontmatter {
            title
          }
        }
      }
    }
  }`
}

module.exports = buildQuery

