import React, { useState } from "react";
import PropTypes from "prop-types";
//import { Helmet } from "react-helmet";
import { MuiThemeProvider } from "@material-ui/core";
import { createMuiTheme } from "@material-ui/core";
import withLanguage from "./withLanguage";
import { Navbar, Footer, Logo } from "@freesewing/components";
import * as themes from "@freesewing/mui-theme";
import Menu from "./menu";
import TocIcon from "@material-ui/icons/UnfoldMore";
import MenuIcon from "@material-ui/icons/Menu";
import DarkModeIcon from "@material-ui/icons/Brightness3";
import LanguageIcon from "@material-ui/icons/Translate";
import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from "@material-ui/icons/Close";
import "@freesewing/css-theme";
import "typeface-roboto-condensed";
import "typeface-permanent-marker";
import Fab from '@material-ui/core/Fab';
import { Link } from "gatsby";

const Layout = props => {
  const [theme, setTheme] = useState("light");
  const [menu, setMenu] = useState(false);
  // Methods
  const toggleDarkMode = () => {
    if (theme === "light") setTheme("dark");
    else setTheme("light");
  };
  const toggleMenu = () => {
    setMenu(!menu);
  }
  const closeNav = () => {
    if (menu) setMenu(false);
  }

  // Vars
  const navs = {
    left: {
      docs: {
        type: "link",
        href: "/start",
        text: "app.getStarted"
      },
      tutorial: {
        type: "link",
        href: "/tutorial",
        text: "app.tutorial"
      },
      blog: {
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
          ? (
            <React.Fragment>
            { props.pageToc ? (
              <Fab
                color="primary"
                className="fab secondary only-xs"
                aria-label="Table of contents"
                onClick={props.toggleToc}>
                { props.toc
                  ? <CloseIcon fontSize="inherit" />
                  : <TocIcon fontSize="inherit" />
                }
              </Fab> ) : null }
              <Fab
                color="primary"
                className="fab primary only-xs"
                aria-label="Menu"
                onClick={toggleMenu}>
                { menu
                  ? <CloseIcon fontSize="inherit" />
                  : <MenuIcon fontSize="inherit" />
                }
              </Fab>
              <Navbar navs={navs} home="/" className="not-xs"/>
            </React.Fragment>
          )
          : <div></div>
        }
        <div className="menu only-xs" onClick={closeNav}>
          <Menu closeNav={closeNav} toggleDarkMode={toggleDarkMode} theme={theme} />
        </div>
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
