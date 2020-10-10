import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import Preview from './preview'
import Icon from '@material-ui/icons/SwapCalls'
import './preview.scss'

const Guides = props => {
  const data = useStaticQuery(graphql`
    {
      allMdx(
        filter: { fileAbsolutePath: { regex: "/guides\/[^\/]*\/en.md/" } }
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
              about
              goals
              for
              icons
            }
          }
        }
      }
    }
`)

  const list = data.allMdx.edges.map(node => (
    <Preview key={node.node.fileAbsolutePath} {...node.node} {...props} icon={<Icon />}/>
  ))

  if (props.list) return list

  return <div className='previews'>{list}</div>
}

export default Guides
