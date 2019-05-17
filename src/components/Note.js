import React from "react";
import { MDXProvider } from "@mdx-js/react"
import { Icon } from "@freesewing/components";

const Note = props => {
  return (
    <blockquote className="note">
      <MDXProvider>{props.children}</MDXProvider>
      <Icon icon="info" className="icon note"/>
    </blockquote>
  );
}

export default Note;
