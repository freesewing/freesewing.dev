import React from 'react'
import useApp from '../hooks/useApp'
import AppWrapper from '../components/app/wrapper'

import Mdx from '../components/mdx'
import { graphql, Link } from 'gatsby'
import UpIcon from '@material-ui/icons/KeyboardArrowUp'
import Tutorials from '../components/mdx/tutorials'
import Guides from '../components/mdx/guides'
import Howtos from '../components/mdx/howtos'
import Reference from '../components/mdx/reference'
import tree from '../tree'

const Page = props => {

  const app = useApp()
  const node = props.data.allMdx.edges[0].node

  return (
    <AppWrapper
      app={app}
      pageContext={props.pageContext}
      title={props.pageContext.title}
      description={node.excerpt}
      crumbs={props.pageContext.crumbs}
      wide={node.frontmatter.wide}
      next={tree.getNext(props.pageContext.slug, props.pageContext.tree)}
      prev={tree.getPrev(props.pageContext.slug, props.pageContext.tree)}
    >
      <Mdx
        node={props.data.allMdx.edges[0].node}
        tree={props.pageContext.tree}
        slug={props.pageContext.slug}
      />
      {props.path === '/tutorials/' && <Tutorials list/>}
      {props.path === '/guides/' && <Guides list/>}
      {props.path === '/howtos/' && <Howtos />}
      {props.path === '/reference/' && <Reference />}
    </AppWrapper>
  )
}

export default Page

// See https://www.gatsbyjs.org/docs/page-query/
export const pageQuery = graphql`
  query MdxDocsPage($file: String) {
    allMdx(filter: { fileAbsolutePath: { eq: $file } }) {
      edges {
        node {
          body
          excerpt
          frontmatter {
            title
            wide
          }
        }
      }
    }
  }
`
