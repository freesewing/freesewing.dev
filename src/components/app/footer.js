import React from "react";
import FooterBase from "@freesewing/components/Footer";

const Footer = props => {

  const links = {
    left: {
      blog: "/blog",
      aboutFreesewing: "/docs/about",
      faq: "/docs/faq"
    },
    right: {
      becomeAPatron: "/patrons/join",
      makerDocs: "/docs",
      devDocs: "https://" + props.language + ".freesewing.dev/"
    }
  }

  const patrons = <p>Something here</p>

  return <FooterBase language={props.language} links={links} home="/" patrons={patrons} />
}

export default Footer;

