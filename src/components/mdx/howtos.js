import React from 'react'
import { Link, useStaticQuery, graphql } from 'gatsby'

const Howtos = props => {
  const data = useStaticQuery(graphql`
    {
      code: allMdx(
        filter: { slug: { regex: "/howtos/code/[^\/]+/en/" } }
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
      design: allMdx(
        filter: { slug: { regex: "/howtos/design/[^\/]+/en/" } }
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
      dev: allMdx(
        filter: { slug: { regex: "/howtos/dev/[^\/]+/en/" } }
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
      editors: allMdx(
        filter: { slug: { regex: "/howtos/editors/[^\/]+/en/" } }
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
  list.push(<h5>Common code challenges</h5>)
  list.push(<ul className='links'>{data.code.edges.map(node => renderNode(node))}</ul>)
  list.push(<h5>Common design challenges</h5>)
  list.push(<ul className='preview-list'>{data.design.edges.map(node => renderNode(node))}</ul>)
  list.push(<h5>Setting up your development environment</h5>)
  list.push(<ul className='preview-list'>{data.dev.edges.map(node => renderNode(node))}</ul>)

  return list

}

export default Howtos
