import React from "react";
import MDXRenderer from "gatsby-mdx/mdx-renderer";
import Layout from "./layout";
import TableOfContents from "./TableOfContents";
import { withTheme } from '@material-ui/core/styles';

const PageTemplate = props => {
  let theme = props.theme.palette.type;

  const styles = {
    body: {
      maxWidth: '42em',
      margin: 'auto',
    },
  }

  console.log(props);


  return (
    <Layout>
      <div className="fs-sa">
        <section>
          <article style={styles.body}>
          <h1>{props.pageContext.node.frontmatter.title}</h1>
          <MDXRenderer>{props.pageContext.node.code.body}</MDXRenderer>
          </article>
        </section>
        <aside>
          <TableOfContents toc={props.pageContext.node.tableOfContents} />
        </aside>
      </div>
    </Layout>
  );
}

export default withTheme()(PageTemplate);
