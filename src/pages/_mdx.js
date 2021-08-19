import React from 'react'
import useApp from '../hooks/useApp'
import AppWrapper from '../components/app/wrapper'

import Mdx from '../components/mdx'
import { graphql } from 'gatsby'
import Tutorials from '../components/mdx/tutorials'
import Guides from '../components/mdx/guides'
import Howtos from '../components/mdx/howtos'
import Reference from '../components/mdx/reference'

const Page = props => {

  const app = useApp()
  const node = props.data.allMdx.edges[0].node

  return (
    <AppWrapper
      app={app}
      pageContext={props.pageContext}
      title={props.pageContext.title}
      description={node.excerpt}
      {...app.treeProps(props.path)}
      edit={props.data.allMdx.edges[0].node.parent.relativeDirectory}
    >
      <Mdx node={props.data.allMdx.edges[0].node} offspring={app.getOffspring(props.path)} />
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
        parent { ... on File { relativeDirectory } }
          body
          excerpt
          frontmatter {
            title
          }
        }
      }
    }
  }
`
