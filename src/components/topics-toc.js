import React, { useState } from "react";
import TableOfContents from "./TableOfContents";
import ExpandedIcon from "@material-ui/icons/KeyboardArrowDown";
import CollapsedIcon from "@material-ui/icons/KeyboardArrowRight";
import { Link } from "gatsby";

const TopicsToc = props => {
  const [expanded, setExpanded] = useState([]);
  const toggleTopic = topic => {
    let shown = expanded.slice(0);
    let index = shown.indexOf(topic);
    if (index === -1) shown.push(topic);
    else shown.splice(index, 1);
    setExpanded(shown);
  };

  let items = [];
  let children = false;
  for (let t of props.topics) {
    let liProps = {
      key: t,
      className: "topic",
    }
    if (t === props.topic) {
      liProps.className += " active";
      children = [];
      for (let c in props.topicsToc[t].children) {
        let grandchildren = null;
        if (c === props.slug) grandchildren = <TableOfContents toc={props.toc} slug={props.slug}/>
        children.push(<li key={c} className={c === props.slug ? "active" : ""}>
          <Link to={c}>
            {props.topicsToc[t].children[c]}
          </Link>
          {grandchildren}
        </li>);
      }
      if (children) children = <ul className="topics l1">{children}</ul>
      else children = null;
    } else children = null;
    items.push(<li {...liProps}>
        <Link to={"/"+t} className="topic">
      { t === props.topic
        ? <ExpandedIcon fontSize="inherit"/>
        : <CollapsedIcon fontSize="inherit"/>
      }
          {props.topicsToc[t].title}
        </Link>
        {children}
      </li>);
  }

  return (
    <ul className="topics">
      {items}
    </ul>
  );
}

export default TopicsToc;
