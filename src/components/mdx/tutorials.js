import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import Preview from './preview'

const Tutorials = props => {
  const data = useStaticQuery(graphql`
    {
      allMdx(
        filter: { fileAbsolutePath: { regex: "/tutorials\/[^\/]*\/en.md/" } }
        sort: { fields: [frontmatter___order, frontmatter___title], order: ASC }
      ) {
        edges {
          node {
            parent {
              ... on File { relativeDirectory }
            }
            excerpt
            fileAbsolutePath
            frontmatter {
              title
              icons
              for
              about
              goals
            }
          }
        }
      }
    }
`)

  const list = data.allMdx.edges.map(node => (
    <Preview key={node.node.fileAbsolutePath} {...node.node} {...props} />
  ))

  return list
}

export default Tutorials
