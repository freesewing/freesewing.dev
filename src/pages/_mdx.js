import React, { useEffect } from 'react'
import useApp from '../hooks/useApp'
import useNavigation from '../hooks/useNavigation'
import withLanguage from '../components/withLanguage'
import AppWrapper from '../components/app/wrapper'
import DocsLayout from '../components/layouts/docs'
import crumbsFromNavigation from '../components/app/crumbsFromNavigation'

import { graphql } from 'gatsby'
import Mdx from '../components/mdx'

const DocsPage = props => {
  // State
  const app = useApp()
  const { tree, titles } = useNavigation(app)

  // Effects
  useEffect(() => {
    app.setTitle(props.data.allMdx.edges[0].node.frontmatter.title || false)
    app.setCrumbs(crumbsFromNavigation(props.path, tree, titles))
  }, [])

  return (
    <AppWrapper app={app}>
      <DocsLayout app={app} slug={props.path} toc={props.data.allMdx.edges[0].node.tableOfContents}>
        <Mdx node={props.data.allMdx.edges[0].node} slug={props.path} />
      </DocsLayout>
    </AppWrapper>
  )
}

export default withLanguage(DocsPage)

// See https://www.gatsbyjs.org/docs/page-query/
export const pageQuery = graphql`
  query MdxDocsPage($file: String) {
    allMdx(filter: { fileAbsolutePath: { eq: $file } }) {
      edges {
        node {
          body
          tableOfContents(maxDepth: 2)
          frontmatter {
            title
          }
        }
      }
    }
  }
`
