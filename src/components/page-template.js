import React, { useState } from "react";
import MDXRenderer from "gatsby-mdx/mdx-renderer";
import { MDXProvider } from '@mdx-js/react';
import Layout from "./layout";
import TopicsToc from "./topics-toc";
import Breadcrumbs from "./breadcrumbs";
import { withTheme } from '@material-ui/core/styles';
import { Blockquote, Example } from "@freesewing/components";

const PageTemplate = props => {
  const [toc, setToc] = useState(false);
  const toggleToc = () => setToc(!toc);
  const closeNav = () => setToc(false);

  const styles = {
    body: {
      maxWidth: '42em',
      margin: 'auto',
    },
  }
console.log('page props', props);
  const components = {
    Note: ({ children }) => { return <Blockquote type="note">{children}</Blockquote>},
    Tip: ({ children }) => { return <Blockquote type="tip">{children}</Blockquote>},
    Warning: ({ children }) => { return <Blockquote type="warning">{children}</Blockquote>},
    Example,
  }

  return (
    <Layout
      toc={toc}
      toggleToc={toggleToc}
      pageToc={props.pageContext.node.tableOfContents || false}
      topics={props.pageContext.topics}
      topicsToc={props.pageContext.topicsToc}
    >
      <div className="fs-sa">
        <section>
          <article style={styles.body}>
          <Breadcrumbs
            crumbs={props.pageContext.crumbs}
            pageTitle={props.pageContext.node.frontmatter.title}
          />
          <h1>{props.pageContext.node.frontmatter.title}</h1>
            <MDXProvider components={components}>
              <MDXRenderer>
                {props.pageContext.node.code.body}
              </MDXRenderer>
            </MDXProvider>
          </article>
        </section>
        <aside>
          <div className="sticky" onClick={closeNav}>
            <TopicsToc
              slug={props.pageContext.slug}
              topicsToc={props.pageContext.topicsToc}
              topics={props.pageContext.topics}
              order={props.pageContext.topicsOrder}
              topic={props.pageContext.topic}
              toc={props.pageContext.node.tableOfContents}
            />
          </div>
        </aside>
      </div>
    </Layout>
  );
}

export default withTheme()(PageTemplate);
