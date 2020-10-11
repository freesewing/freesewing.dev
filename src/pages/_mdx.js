import React from 'react'
import useApp from '../hooks/useApp'
import AppWrapper from '../components/app/wrapper'

import Mdx from '../components/mdx'
import MdxToc from '../components/mdx/toc'
import DocsContext from '../components/context/docs'
import { graphql, Link } from 'gatsby'
import UpIcon from '@material-ui/icons/KeyboardArrowUp'
import Tutorials from '../components/mdx/tutorials'
import Guides from '../components/mdx/guides'
import Howtos from '../components/mdx/howtos'
import Reference from '../components/mdx/reference'

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

  const node = props.data.allMdx.edges[0].node


  const toc = node.tableOfContents.items
    ? [
        <h6>{props.pageContext.title}</h6>,
        <MdxToc toc={node.tableOfContents} />
      ]
    : []

  return (
    <AppWrapper
      app={app}
      title={props.pageContext.title}
      description={node.excerpt}
      crumbs={props.pageContext.crumbs}
      context={context}
      toc={toc}
      active="docs"
      wide={node.frontmatter.wide}
    >
      {props.path === '/tutorials/' && <div className='previews'><Tutorials list/></div>}
      {props.path === '/guides/' && <div className='previews'><Guides list/></div>}
      {props.path === '/howtos/' && <Howtos />}
      {props.path === '/reference/' && <Reference />}
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
          tableOfContents(maxDepth: 4)
          frontmatter {
            title
            wide
          }
        }
      }
    }
  }
`
