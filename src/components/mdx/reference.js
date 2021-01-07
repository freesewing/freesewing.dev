import React from 'react'
import { Link, useStaticQuery, graphql } from 'gatsby'

const Reference = props => {
  const data = useStaticQuery(graphql`
    {
      core: allMdx(
        filter: { slug: { regex: "/reference/[^\/]+/en/" } }
        sort: { fields: [frontmatter___order, frontmatter___title], order: ASC }
      ) {
        edges {
          node {
            slug
            frontmatter {
              title
              for
              about
            }
          }
        }
      }
    }
`)

  const renderNode = node => <li key={node.node.slug}>
    <Link to={`/${node.node.slug.slice(0,-2)}`}>
      <span className='fw-500'>{node.node.frontmatter.title}</span>
    </Link>
    <br />
    <span className='fw-300'>{node.node.frontmatter.about}</span>
  </li>

  const list = []
  list.push(<ul className='links'>{data.core.edges.map(node => renderNode(node))}</ul>)

  return list

}

export default Reference
