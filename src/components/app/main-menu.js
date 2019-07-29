import React from "react";
import TopicsToc from "../topics-toc";

const MainMenu = props => {
  let toc = null;
  let slug = props.pageContext.slug;
  if (props.uri) slug = props.uri;
  if (typeof props.pageContext.node !== "undefined")
    toc = props.pageContext.node.tableOfContents;
  let topicsToc = props.pageContext.topicsToc;

  return <TopicsToc
    page={props.uri}
    slug={slug}
    topicsToc={topicsToc}
    topics={props.pageContext.topics}
    order={props.pageContext.topicsOrder}
    topic={slug.split("/")[1]}
    toc={toc}
    app={props.app}
  />
}

export default MainMenu;

