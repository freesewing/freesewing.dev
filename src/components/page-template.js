import React, { useState } from "react";
import MDXRenderer from "gatsby-mdx/mdx-renderer";
import { MDXProvider } from '@mdx-js/react';
import Layout from "./layout";
import TopicsToc from "./topics-toc";
import Breadcrumbs from "./breadcrumbs";
import { withTheme } from '@material-ui/core/styles';
import { Blockquote, Example } from "@freesewing/components";
import { FormattedMessage } from "react-intl";

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
  const components = {
    Note: ({ children }) => { return <Blockquote type="note">{children}</Blockquote>},
    Tip: ({ children }) => { return <Blockquote type="tip">{children}</Blockquote>},
    Warning: ({ children }) => { return <Blockquote type="warning">{children}</Blockquote>},
    Example,
  }
console.log(props);
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
            <div style={{
              textAlign: "right",
              margin: "3rem 0",
              borderTop: "1px solid #ccc",
              padding: "0.25rem 0",
              fontSize: "90%",
              display: "flex",
              flexDirection: "row",
              alignContent: "center",
              justifyContent: "space-between",
            }}>
              {props.pageContext.slug+"/"+props.pageContext.language+".md"}
              <a href={"https://github.com/freesewing/markdown/edit/develop/dev"+props.pageContext.slug+"/"+props.pageContext.language+".md"}>
                <FormattedMessage id="app.editThisPage" />
              </a>
            </div>
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

export default withTheme(PageTemplate);
