import React from 'react'
import { Link, useStaticQuery, graphql } from 'gatsby'
import './list.scss'

const Howtos = props => {
  const data = useStaticQuery(graphql`
    {
      core: allMdx(
        filter: { slug: { regex: "/howtos/core/[^\/]+/en/" } }
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
    }
`)

  const renderNode = node => <li key={node.node.slug} className={node.node.frontmatter.for}>
    <Link to={`/${node.node.slug.slice(0,-2)}`}>
      {node.node.frontmatter.title}
      <span className='about'>{node.node.frontmatter.about}</span>
    </Link>
  </li>

  const list = []
  list.push(<h3>Common design challenges</h3>)
  list.push(<ul className='preview-list'>{data.design.edges.map(node => renderNode(node))}</ul>)
  list.push(<h3>Common code patterns</h3>)
  list.push(<ul className='preview-list'>{data.code.edges.map(node => renderNode(node))}</ul>)
  list.push(<h3>Working with our core library</h3>)
  list.push(<ul className='preview-list'>{data.core.edges.map(node => renderNode(node))}</ul>)
  list.push(<h3>Setting up your development environment</h3>)
  list.push(<ul className='preview-list'>{data.dev.edges.map(node => renderNode(node))}</ul>)

  return list

}

export default Howtos
