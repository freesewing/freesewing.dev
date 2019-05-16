import React, { useState } from "react";
import MDXRenderer from "gatsby-mdx/mdx-renderer";
import Layout from "./layout";
import TopicsToc from "./topics-toc";
import Breadcrumbs from "./breadcrumbs";
import { withTheme } from '@material-ui/core/styles';

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

  console.log('page', props);

  return (
    <Layout toc={toc} toggleToc={toggleToc}>
      <div className="fs-sa">
        <section>
          <article style={styles.body}>
          <Breadcrumbs
            crumbs={props.pageContext.crumbs}
            pageTitle={props.pageContext.node.frontmatter.title}
          />
          <h1>{props.pageContext.node.frontmatter.title}</h1>
          <MDXRenderer>{props.pageContext.node.code.body}</MDXRenderer>
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
