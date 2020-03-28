import React, { useState } from 'react'
import { FormattedMessage } from 'react-intl'
import Logo from '@freesewing/components/Logo'
import LightModeIcon from '@material-ui/icons/WbSunny'
import DarkModeIcon from '@material-ui/icons/Brightness3'
import SearchIcon from '@material-ui/icons/Search'
import MapIcon from '@material-ui/icons/Map'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import DocsNavigation from '../app/docs-navigation'

import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

import ReadMore from '../read-more'

const MobileMenu = ({ app }) => {
  // State
  const [expanded, setExpanded] = useState(
    window && window.location.pathname.slice(0, 5) === '/docs' ? 'docs' : false
  )

  // Add classes to expansion panel headers to prevent them from closing the navigation
  // See the closeNav() method in the useApp hook
  const noClose = {
    classes: {
      root: 'no-closenav',
      content: 'no-closenav'
    },
    className: 'no-closenav'
  }

  // Methods
  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false)
  }

  // Style
  const colors = {
    light: '#212529',
    dark: '#f8f9fa'
  }
  const style = {
    wrapper: {
      padding: '1rem',
      display: 'flex',
      flexDirection: 'column'
    },
    icons: {
      textAlign: 'center',
      marginBottom: '1rem'
    },
    iconButton: {
      color: colors[app.theme]
    },
    h5: {}
  }

  // Icons
  const icons = {
    home: {
      title: 'app.home',
      link: '/',
      icon: <Logo size={22} />
    },
    search: {
      title: 'app.search',
      link: '/search/',
      icon: <SearchIcon />
    },
  }

  return (
    <div style={style.wrapper}>
      <div style={style.icons}>
        {Object.keys(icons).map(icon => {
          return (
            <IconButton
              key={icon}
              style={style.iconButton}
              aria-label={icons[icon].title}
              color="inherit"
              href={icons[icon].link}
              title={icons[icon].title}
            >
              {icons[icon].icon}
            </IconButton>
          )
        })}
        <IconButton
          style={style.darkModeButton}
          aria-label={
            app.theme === 'dark' ? app.translate('app.lightMode') : app.translate('app.darkMode')
          }
          onClick={app.toggleDarkMode}
          title={
            app.theme === 'dark' ? app.translate('app.lightMode') : app.translate('app.darkMode')
          }
        >
          {app.theme === 'dark' ? (
            <LightModeIcon style={style.lightModeIcon} />
          ) : (
            <DarkModeIcon style={style.darkModeIcon} />
          )}
        </IconButton>
      </div>

      { ['guides', 'howtos', 'reference'].map( type => (
        <ExpansionPanel expanded={expanded === type} onChange={handleChange(type)} {...noClose}>
          <ExpansionPanelSummary
            {...noClose}
            expandIcon={<ExpandMoreIcon className="no-closenav" />}
            aria-controls={`${type}-content`}
            id={`${type}-header`}
          >
            <h5 style={{textTransform: 'capitalize'}} {...noClose}>
              {type}
            </h5>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <ReadMore root={type} />
          </ExpansionPanelDetails>
        </ExpansionPanel>
      ))}
      <Button
        variant="outlined"
        color="primary"
        style={{marginTop: '2rem'}}
        size='large'
        href="https://gitter.im/freesewing/development"
      >Support</Button>
    </div>
  )
}

export default MobileMenu
