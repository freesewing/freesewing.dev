import React from 'react'
import NavbarBase from '@freesewing/components/Navbar'
import DarkModeIcon from '@material-ui/icons/Brightness3'
import LanguageIcon from '@material-ui/icons/Translate'
import SearchIcon from '@material-ui/icons/Search'

const Navbar = props => {
  const navs = {
    left: {
      start: {
        type: 'link',
        href: '/guides/getting-started/',
        text: 'app.getStarted'
      },
      tutorial: {
        type: 'link',
        href: '/tutorials/pattern-design',
        text: 'app.tutorial'
      },
      api: {
        type: 'link',
        href: '/reference/api',
        text: 'app.apiReference'
      }
    },
    right: {
      search: {
        type: 'link',
        href: '/search',
        text: <SearchIcon className="nav-icon" style={{maxWidth: '24px'}}/>,
        title: 'account.languageTitle'
      },
      language: {
        type: 'link',
        href: '/language',
        text: <LanguageIcon className="nav-icon" style={{maxWidth: '24px'}}/>,
        title: props.app.frontend.intl.formatMessage({id: 'account.languageTitle'})
      },
      theme: {
        type: 'button',
        onClick: props.app.frontend.toggleDarkMode,
        text: <DarkModeIcon className="nav-icon moon" style={{color: '#ffd43b', maxWidth: '24px'}}/>,
        title: props.app.frontend.intl.formatMessage({id: 'app.darkMode'})
      }
    }
  }

  return <NavbarBase navs={navs} home="/" />
}

export default Navbar
