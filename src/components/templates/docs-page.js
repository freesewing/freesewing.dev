import React, { useEffect } from "react";
import MDXRenderer from "gatsby-mdx/mdx-renderer";
import { MDXProvider } from '@mdx-js/react';
import Blockquote from "@freesewing/components/Blockquote";

const DocumentationPage = props => {
  useEffect(() => {
    props.app.frontend.setTitle(props.pageContext.node.frontmatter.title);
  }, [props.slug]);

  const components = {
    Note: ({ children }) => { return <Blockquote type="note">{children}</Blockquote>},
    Tip: ({ children }) => { return <Blockquote type="tip">{children}</Blockquote>},
    Warning: ({ children }) => { return <Blockquote type="warning">{children}</Blockquote>},
  }

  return (
    <React.Fragment>
      {props.pageContext.node ? (
      <MDXProvider components={components}>
        <MDXRenderer>
          {props.pageContext.node.code.body}
        </MDXRenderer>
      </MDXProvider> ) : null }
    </React.Fragment>
  );
}

export default DocumentationPage;
