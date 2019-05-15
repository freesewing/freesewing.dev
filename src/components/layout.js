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
import Menu from "./menu";
import TocIcon from "@material-ui/icons/UnfoldMore";
import MenuIcon from "@material-ui/icons/Menu";
import DarkModeIcon from "@material-ui/icons/Brightness3";
import LanguageIcon from "@material-ui/icons/Translate";
import SearchIcon from "@material-ui/icons/Search";
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import "@freesewing/css-theme";
import "typeface-roboto-condensed";

const Layout = props => {
  const [theme, setTheme] = useState("light");
  const [menu, setMenu] = useState(false);

  // Methods
  const toggleDarkMode = () => {
    if (theme === "light") setTheme("dark");
    else setTheme("light");
  };
  const toggleMenu = () => setMenu(!menu);
  const closeNav = () => setMenu(false);

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
    },
    mleft: {
      menu: {
        type: "button",
        onClick: toggleMenu,
        text: <MenuIcon className="nav-icon" />,
        title: "Menu"
      },
      language: {
        type: "link",
        href: "/languages",
        text: <LanguageIcon className="nav-icon" />,
        title: "account.languageTitle"
      },
    },
    mright: {
      dark: {
        type: "button",
        onClick: toggleDarkMode,
        text: <DarkModeIcon className="nav-icon moon" />,
        title: "Toggle dark mode"
      },
      toc: {
        type: "button",
        onClick: props.toggleToc,
        text: <TocIcon className="nav-icon" />,
        title: "Toggle dark mode"
      },
    }
  };

  // Render
  let wrapperClasses = theme === "light"
    ? "theme-wrapper light"
    : "theme-wrapper dark";
  if (props.toc) wrapperClasses += " show-toc";
  if (menu) wrapperClasses += " show-menu";

  return (
    <MuiThemeProvider theme={createMuiTheme(themes[theme])}>
      <div className={wrapperClasses}>
        {props.navbar
          ? <Navbar navs={navs} home="/" />
          : <div></div>
        }
        <Menu closeNav={closeNav}/>
        {React.cloneElement(props.children, { closeNav })}
        <Footer language={props.language}/>
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
