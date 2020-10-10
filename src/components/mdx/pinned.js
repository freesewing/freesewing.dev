import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import Preview from './preview'
import Icon from '@material-ui/icons/School'
import './preview.scss'

const Pinned = props => {
  const data = useStaticQuery(graphql`
    {
      pinned: allMdx(
        filter: { slug: { in: [
        "contributors/code-of-conduct/en",
        "contributors/help/en",
        "contributors/terms/en",
        "reference/api/en",
        ] } }
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
            }
          }
        }
      }
    }
`)

  const list = data.pinned.edges.map(node => (
    <Preview key={node.node.fileAbsolutePath} {...node.node} {...props} icon={<Icon />}/>
  ))

  if (props.list) return list

  return <div className='previews'>{list}</div>
}

export default Pinned
