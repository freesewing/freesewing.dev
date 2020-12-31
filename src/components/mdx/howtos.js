import React from 'react'
import { Link, useStaticQuery, graphql } from 'gatsby'
import './list.scss'

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

  const renderNode = node => <li key={node.node.slug} className={node.node.frontmatter.for}>
    <Link to={`/${node.node.slug.slice(0,-2)}`}>
      <h5>{node.node.frontmatter.title}</h5>
      <p>{node.node.frontmatter.about}</p>
    </Link>
  </li>

  const list = []
  list.push(<h2>Common code challenges</h2>)
  list.push(<ul className='preview-list'>{data.code.edges.map(node => renderNode(node))}</ul>)
  list.push(<h2>Common design challenges</h2>)
  list.push(<ul className='preview-list'>{data.design.edges.map(node => renderNode(node))}</ul>)
  list.push(<h2>Setting up your development environment</h2>)
  list.push(<ul className='preview-list'>{data.dev.edges.map(node => renderNode(node))}</ul>)
  list.push(<h2>Common tasks for editors</h2>)
  list.push(<ul className='preview-list'>{data.editors.edges.map(node => renderNode(node))}</ul>)

  return list

}

export default Howtos
