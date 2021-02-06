import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import Logo from '@freesewing/components/Logo'
import { Link } from 'gatsby'
import NavbarIcons from './navbar-icons'
import Icon from '@freesewing/components/Icon'
// FIXME: The 'Campaign' icon is not (yet) available in material-ui
import UpdatesIcon from '../UpdatesIcon'
import TodoIcon from '@material-ui/icons/AssignmentTurnedIn'


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
      zIndex: 15,
      background: '#1a1d21'
    },
    logo: {
      textDecoration: 'none',
      height: '42px',
      width: '42px',
      padding: '11px',
      display: 'inline-block',
      color: colors.dark
    },
    button: {
      height: '64px',
      padding: '0 18px'
    },
    iconButton: {
      color: colors.dark
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
    color: '#b197fc'
  }

  return (
    <div style={style.wrapper}>
      <AppBar position="static" color='transparent' elevation={0}>
        <Toolbar disableGutters={true}>
          <Link to="/" style={style.logo}>
            <Logo embed />
          </Link>

          <Button href="/news/" style={style.iconButton}>
            <UpdatesIcon style={iconStyle} size={28}/>
            News & Updates
          </Button>

          <Button href="https://todo.freesewing.org/" style={style.iconButton}>
            <TodoIcon style={iconStyle} size={28}/>
            Project board
          </Button>

          <span style={style.spacer} />

          <Button href="https://chat.freesewing.org/" style={style.iconButton} >
            <Icon style={{ ...iconStyle }} icon="discord" />
            Chat on Discord
          </Button>

          <NavbarIcons
            toggleDarkMode={props.app.toggleDarkMode}
            theme={props.app.theme}
          />
        </Toolbar>
      </AppBar>
    </div>
  )
}
