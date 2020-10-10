import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import Logo from '@freesewing/components/Logo'
import { Link } from 'gatsby'
import { FormattedMessage } from 'react-intl'
import NavbarIcons from './navbar-icons'
import Icon from '@freesewing/components/Icon'
// FIXME: The 'Campaign' icon is not (yet) available in material-ui
import UpdatesIcon from '../UpdatesIcon'


export default function ButtonAppBar(props) {
  // Don't show on mobile
  if (props.app.mobile) return null

  const colors = {
    light: '#212529',
    dark: '#f8f9fa'
  }

  const style = {
    wrapper: {
      flexGrow: 1,
      width: '100%',
      margin: 0,
      padding: 0,
      background: props.app.theme === 'dark' ? colors.light : colors.dark,
      zIndex: 15
    },
    logo: {
      textDecoration: 'none',
      height: '42px',
      width: '42px',
      padding: '11px',
      display: 'inline-block',
      color: colors[props.app.theme]
    },
    button: {
      height: '64px',
      padding: '0 18px'
    },
    iconButton: {
      color: colors[props.app.theme]
    },
    icon: {
      maxWidth: '24px',
      maxHeight: '24px'
    },
    spacer: {
      flexGrow: 1
    },
    darkModeIcon: {
      transform: 'rotate(26deg)',
      maxWidth: '24px',
      maxHeight: '24px'
    }
  }

  const iconStyle = {
    marginRight: '0.5rem',
    color: props.app.theme === 'dark' ? '#b197fc' : '#845ef7'
  }

  return (
    <div style={style.wrapper}>
      <AppBar position="static" color="secondary" elevation={0}>
        <Toolbar disableGutters={true}>
          <Link to="/" style={style.logo}>
            <Logo embed />
          </Link>

          <Button href="/news/" style={{...style.iconButton}}>
            <UpdatesIcon style={iconStyle} size={28}/>
            Recent Updates
          </Button>

          <span style={style.spacer} />

          <Button href="https://chat.freesewing.org/">
            <Icon style={{ ...iconStyle }} icon="discord" />
            <FormattedMessage id="app.chatOnDiscord" />
          </Button>

          <NavbarIcons
            translate={props.app.translate}
            toggleDarkMode={props.app.toggleDarkMode}
            theme={props.app.theme}
          />
        </Toolbar>
      </AppBar>
    </div>
  )
}
