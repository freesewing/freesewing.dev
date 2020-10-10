import React from 'react'
import { Link, useStaticQuery, graphql } from 'gatsby'
import './list.scss'

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

  const renderNode = node => <li key={node.node.slug} className={node.node.frontmatter.for}>
    <Link to={`/${node.node.slug.slice(0,-2)}`}>
      {node.node.frontmatter.title}
      <span className='about'>{node.node.frontmatter.about}</span>
    </Link>
  </li>

  const list = []
  list.push(<ul className='preview-list'>{data.core.edges.map(node => renderNode(node))}</ul>)

  return list

}

export default Reference
