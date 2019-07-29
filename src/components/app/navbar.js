import React from "react";
import NavbarBase from "@freesewing/components/Navbar";
import DarkModeIcon from "@material-ui/icons/Brightness3";
import LanguageIcon from "@material-ui/icons/Translate";
import SearchIcon from "@material-ui/icons/Search";

const Navbar = props => {
  const navs = {
    left: {
      start: {
        type: "link",
        href: "/start",
        text: "app.start"
      },
      tutorial: {
        type: "link",
        href: "/tutorial",
        text: "app.tutorial"
      },
      api: {
        type: "link",
        href: "/api",
        text: "app.apiReference"
      },
    },
    right: {
      search: {
        type: "link",
        href: "/search",
        text: <SearchIcon className="nav-icon" />,
        title: "app.search"
      },
      language: {
        type: "link",
        href: "/language",
        text: <LanguageIcon className="nav-icon" />,
        title: "account.languageTitle"
      },
      theme: {
        type: "button",
        onClick: props.app.frontend.toggleDarkMode,
        text: <DarkModeIcon className="nav-icon moon" />,
        title: "Toggle dark mode"
      }
    },
  };

  return <NavbarBase navs={navs} home="/" />
}

export default Navbar;

