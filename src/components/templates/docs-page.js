import React, { useEffect } from 'react'
import { MDXRenderer } from "gatsby-plugin-mdx"
import { MDXProvider } from '@mdx-js/react'
import Blockquote from '@freesewing/components/Blockquote'
import Example from '@freesewing/components/Example'
import PreviousNext from '../previous-next'
import ReadMore from '../read-more'

const DocumentationPage = props => {
  useEffect(() => {
    props.app.frontend.setTitle(props.pageContext.node.frontmatter.title)
  }, [props.slug])

  const components = {
    Note: ({ children }) => {
      return <Blockquote type="note">{children}</Blockquote>
    },
    Tip: ({ children }) => {
      return <Blockquote type="tip">{children}</Blockquote>
    },
    Warning: ({ children }) => {
      return <Blockquote type="warning">{children}</Blockquote>
    },
    Fixme: ({ children }) => {
      return <Blockquote type="fixme">{children}</Blockquote>
    },
    ReadMore: (rmProps) => {
      return <ReadMore
        navigation={props.pageContext.navigation}
        title={rmProps.title}
        slug={props.slug}
        root={rmProps.root}
        pageTitle={props.pageContext.node.frontmatter.title}
        />
    },
    Example
  }

  return (
    <React.Fragment>
      {props.pageContext.node ? (
        <MDXProvider components={components}>
          <MDXRenderer>{props.pageContext.node.body}</MDXRenderer>
        </MDXProvider>
      ) : null}
      <PreviousNext pageContext={props.pageContext} theme={props.app.frontend.theme} app={props.app}/>
    </React.Fragment>
  )
}

export default DocumentationPage
