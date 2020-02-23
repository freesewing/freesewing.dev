import React, { useState } from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'

import Logo from '@freesewing/components/Logo'
import { Link } from 'gatsby'
import LightModeIcon from '@material-ui/icons/WbSunny'
import DarkModeIcon from '@material-ui/icons/Brightness3'
import LanguageIcon from '@material-ui/icons/Translate'
import SearchIcon from '@material-ui/icons/Search'

import Popover from '@material-ui/core/Popover'
import ReadMore from '../read-more'

export default function ButtonAppBar(props) {
  const [guidesAnchor, setGuidesAnchor] = useState(null)
  const [howtosAnchor, setHowtosAnchor] = useState(null)
  const [referenceAnchor, setReferenceAnchor] = useState(null)
  const [tutorialsAnchor, setTutorialsAnchor] = useState(null)

  // Don't show on mobile
  if (props.app.mobile) return null

  const anchor = {
    guides: guidesAnchor,
    howtos: howtosAnchor,
    reference: referenceAnchor,
    tutorials: tutorialsAnchor
  }
  const setAnchor = {
    guides: setGuidesAnchor,
    howtos: setHowtosAnchor,
    reference: setReferenceAnchor,
    tutorials: setTutorialsAnchor
  }
  const open = {
    guides: Boolean(guidesAnchor),
    howtos: Boolean(howtosAnchor),
    reference: Boolean(referenceAnchor),
    tutorials: Boolean(tutorialsAnchor)
  }

  const handleOpen = (section, evt) => setAnchor[section](evt.currentTarget)

  const handlePopoverClose = () => {
    setGuidesAnchor(null)
    setHowtosAnchor(null)
    setReferenceAnchor(null)
    setTutorialsAnchor(null)
  }

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
    },
    menuwrapper: {
      padding: '0 1rem',
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      maxWidth: '600px',
      minWidth: '250px'
    }
  }

  const popoverProps = {
    anchorOrigin: {
      vertical: 'bottom',
      horizontal: 'left'
    },
    transformOrigin: {
      vertical: 'top',
      horizontal: 'left'
    },
    disableRestoreFocus: true,
    elevation: 1
  }

  const buttonProps = {
    color: 'primary',
    size: 'large',
    style: style.button
  }
  buttonProps['aria-haspopup'] = 'true'

  return (
    <div style={style.wrapper}>
      <AppBar position="static" color="secondary" elevation={0}>
        <Toolbar disableGutters={true}>
          <Link to="/" style={style.logo}>
            <Logo embed />
          </Link>
          {Object.keys(anchor).map(section => (
            <>
              <Button
                aria-owns={open[section] ? `${section}-popover` : undefined}
                onClick={evt => handleOpen(section, evt)}
                {...buttonProps}
              >
                {section}
              </Button>
              <Popover
                id={`${section}-popover`}
                open={open[section]}
                anchorEl={anchor[section]}
                onClose={handlePopoverClose}
                {...popoverProps}
              >
                <div style={style.menuwrapper} className={`style-wrapper ${props.app.theme}`}>
                  <ReadMore root={section} />
                </div>
              </Popover>
            </>
          ))}
          <span style={style.spacer} />

          <Button
            href="https://gitter.im/freesewing/development"
            color="inherit"
            size="large"
            style={style.button}
          >
            Support
          </Button>

          <IconButton
            style={style.iconButton}
            aria-label="menu"
            color="inherit"
            href="/search/"
            title={props.app.translate('app.search')}
          >
            <SearchIcon style={style.icon} />
          </IconButton>
          <IconButton
            style={style.iconButton}
            aria-label="menu"
            color="inherit"
            href="/language/"
            title={props.app.translate(`i18n.${props.app.language}`)}
          >
            <LanguageIcon style={style.icon} />
          </IconButton>
          <IconButton
            style={style.darkModeButton}
            aria-label="menu"
            onClick={props.app.toggleDarkMode}
            title={
              props.app.theme === 'dark'
                ? props.app.translate('app.lightMode')
                : props.app.translate('app.darkMode')
            }
          >
            {props.app.theme === 'dark' ? (
              <LightModeIcon style={style.icon} />
            ) : (
              <DarkModeIcon style={style.darkModeIcon} />
            )}
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  )
}
