import { useState } from 'react'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { navigate as gatsbyNavigate } from 'gatsby'
import useLocalStorage from './useLocalStorage'

function useApp() {

  // Persistent state
  const [theme, setTheme] = useLocalStorage('theme', 'light')

  // React State
  const [crumbs, setCrumbs] = useState([])
  const [description, setDescription] = 'FreeSewing platform documentation'

  const [image, setImage] = useState(`https://freesewing.org/share/language.wide.jpg`)
  const [loading, setLoading] = useState(false)
  const [menu, setMenu] = useState(false)
  const [title, setTitle] = useState('FreeSewing')
  const [mounted, setMounted] = useState(false) // false until app is mounted
  const [context, setContext] = useState([])
  const [toc, setToc] = useState(false)

  // Persist user data to local storage
  const persist = (data) => {
    if (data.theme) setTheme(data.theme)
  }

  // Toggles
  const toggleDarkMode = () => setTheme(theme === 'light' ? 'dark' : 'light')
  const toggleMenu = () => setMenu(!menu)

  // Media queries
  const mobile = useMediaQuery('(max-width:599px)')
  const tablet = useMediaQuery('(min-width: 600px) and (max-width: 959px)')
  const slate = useMediaQuery('(min-width: 960px) and (max-width: 1199px)')

  // SSR-save navigate method
  const navigate = (slug) => {
    if (typeof window !== 'undefined') gatsbyNavigate(slug)
  }

  return {
    // Helper methods
    persist,
    navigate,

    // React state
    crumbs,
    setCrumbs,
    description,
    setDescription,
    image,
    setImage,
    loading,
    setLoading,
    menu,
    setMenu,
    title,
    setTitle,
    mounted,
    setMounted,
    context,
    setContext,
    toc,
    setToc,

    // Persistent state
    theme,
    setTheme,

    // Toggles
    toggleDarkMode,
    toggleMenu,

    // Media queries
    mobile,
    tablet,
    slate,

    // Site language
    language: process.env.GATSBY_LANGUAGE
  }
}

export default useApp
