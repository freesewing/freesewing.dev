import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import Preview from './preview'
import './preview.scss'

const Tutorials = props => {
  const data = useStaticQuery(graphql`
    {
      allMdx(
        filter: { fileAbsolutePath: { regex: "/tutorials\/[^\/]*\/en.md/" } }
        sort: { fields: [frontmatter___title], order: DESC }
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
              about
              goals
            }
          }
        }
      }
    }
`)

  return (
    <div className='previews'>
      {data.allMdx.edges.map(node => <Preview key={node.node.fileAbsolutePath} {...node.node} />)}
    </div>
  )
}

export default Tutorials
