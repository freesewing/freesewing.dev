import React from 'react'
import useApp from '../hooks/useApp'
import AppWrapper from '../components/app/wrapper'

import Mdx from '../components/mdx'
import MdxToc from '../components/mdx/toc'
import DocsContext from '../components/context/docs'
import { graphql, Link } from 'gatsby'
import UpIcon from '@material-ui/icons/KeyboardArrowUp'
import PrevNext from '../components/mdx/prevnext'
import Tutorials from '../components/mdx/tutorials'

const Page = props => {

  const app = useApp()

  const context = [
    <h5>
      <Link to={props.pageContext.up.slug}>
        <UpIcon />
        {props.pageContext.up.title}
      </Link>
    </h5>,
    <DocsContext {...props.pageContext} />
  ]

  const toc = props.data.allMdx.edges[0].node.tableOfContents.items
    ? [
        <h6>{props.pageContext.title}</h6>,
        <MdxToc toc={props.data.allMdx.edges[0].node.tableOfContents} />
      ]
    : []

  return (
    <AppWrapper
      app={app}
      title={props.pageContext.title}
      description={props.data.allMdx.edges[0].node.excerpt}
      crumbs={props.pageContext.crumbs}
      context={context}
      toc={toc}
      active="docs"
      text
    >
      {props.path === '/tutorials/' && <Tutorials />}
      <Mdx
        node={props.data.allMdx.edges[0].node}
        offspring={props.pageContext.offspring}
        orderedOffspring={props.pageContext.orderedOffspring}
      />
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
          tableOfContents(maxDepth: 2)
          frontmatter {
            title
          }
        }
      }
    }
  }
`
