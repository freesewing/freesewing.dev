import React, { useState } from "react";
import PropTypes from "prop-types";
//import { Helmet } from "react-helmet";
import { MuiThemeProvider } from "@material-ui/core";
import { createMuiTheme } from "@material-ui/core";
import { FormattedMessage } from "react-intl";
import withLanguage from "./withLanguage";
import { Navbar, Footer } from "@freesewing/components";
import { versions } from "@freesewing/pattern-info";
import * as themes from "@freesewing/mui-theme";
import DarkModeIcon from "@material-ui/icons/Brightness3";
import LanguageIcon from "@material-ui/icons/Translate";
import SearchIcon from "@material-ui/icons/Search";
import "@freesewing/css-theme";
import "typeface-roboto-condensed";

const Layout = props => {
  const [theme, setTheme] = useState("light");
  // Methods
  const toggleDarkMode = () => {
    if (theme === "light") setTheme("dark");
    else setTheme("light");
  };

  // Vars
  const version = versions.aaron;
  const navs = {
    left: {
      docs: {
        type: "link",
        href: "/docs",
        text: "app.docs"
      },
      tutorial: {
        type: "link",
        href: "/tutorial",
        text: "app.tutorial"
      },
      blog: {
        type: "link",
        href: "/blog",
        text: "app.blog"
      },
      community: {
        type: "link",
        href: "/community",
        text: "app.community"
      },
    },
    right: {
      version: {
        type: "link",
        href: "https://github.com/freesewing",
        text: "v" + version
      },
      search: {
        type: "link",
        href: "/search",
        text: <SearchIcon className="nav-icon" />,
        title: "app.search"
      },
      language: {
        type: "link",
        href: "/languages",
        text: <LanguageIcon className="nav-icon" />,
        title: "account.languageTitle"
      },
      theme: {
        type: "button",
        onClick: toggleDarkMode,
        text: <DarkModeIcon className="nav-icon moon" />,
        title: "Toggle dark mode"
      }
    }
  };

  // Render
  return (
    <MuiThemeProvider theme={createMuiTheme(themes[theme])}>
      <div className={ theme === "light"
        ? "theme-wrapper light"
        : "theme-wrapper dark"
      }>
        {props.navbar
          ? <Navbar navs={navs} />
          : <div></div>
        }
        {props.children}
        <div>FIXME: Footer {theme}</div>
      </div>
    </MuiThemeProvider>
  );
}

Layout.propTypes = {
  navbar: PropTypes.bool,
  footer: PropTypes.bool,
}

Layout.defaultProps = {
  navbar: true,
  footer: true,
}

export default withLanguage(Layout, process.env.GATSBY_LANG);
