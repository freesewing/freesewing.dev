import { useState } from 'react'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { useIntl } from 'react-intl'

import useLocalStorage from './useLocalStorage'

function useApp(slug = null) {
  // Environment

  // i18n
  const intl = useIntl()

  // Persistent state
  const [theme, setTheme] = useLocalStorage('theme', 'light')

  // React State
  const [crumbs, setCrumbs] = useState([])
  const [description, setDescription] = useState(false)
  const [image, setImage] = useState(`https://freesewing.org/share/language.wide.jpg`)
  const [loading, setLoading] = useState(false)
  const [menu, setMenu] = useState(false)
  const [mobileAside, setMobileAside] = useState(false)
  const [title, setTitle] = useState('FreeSewing')

  // Persist user data to local storage
  const persist = data => {
    if (data.theme) setTheme(data.theme)
  }

  // Translate helper method
  const translate = (id, values = false) => {
    if (!values) return intl.formatMessage({ id })
    else return intl.formatMessage({ id }, values)
  }

  // Toggles
  const toggleDarkMode = () => setTheme(theme === 'light' ? 'dark' : 'light')
  const toggleMenu = () => setMenu(!menu)
  const toggleMobileAside = () => setMobileAside(!mobileAside)
  const closeNav = evt => {
    if (typeof evt.target.className === 'object') {
      if (evt.target.className.baseVal.indexOf('o-closenav') === -1) return setMenu(false)
    } else if (evt.target.className.indexOf('o-closenav') === -1) return setMenu(false)
  }

  // Media queries
  const mobile = useMediaQuery('(max-width:599px)')
  const tablet = useMediaQuery('(min-width: 600px) and (max-width: 959px)')

  const cleanTitle = title => (title.indexOf('|') === -1 ? title : title.split('|')[1])

  // These are used in other methods
  let core = {
    // Helper methods
    persist,
    translate,
    // React state
    loading,
    setLoading,
    // Persistent state
    theme,
    setTheme
  }

  return {
    ...core,

    // React state
    crumbs,
    setCrumbs,
    description,
    setDescription,
    image,
    setImage,
    menu,
    setMenu,
    mobileAside,
    setMobileAside,
    cleanTitle,
    title,
    setTitle: title => setTitle(cleanTitle(title)),

    // Toggles
    toggleDarkMode,
    toggleMenu,
    toggleMobileAside,
    closeNav,

    // Translation
    translate,
    intl,

    // Media queries
    mobile,
    tablet,

    // Site language
    language: process.env.GATSBY_LANGUAGE
  }
}

export default useApp
