import { useState } from 'react'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import useTree from './useTree'
import { navigate as gatsbyNavigate } from 'gatsby'
import useLocalStorage from './useLocalStorage'
import ntr from './lib/tree'

function useApp() {

  // Persistent state
  const [theme, setTheme] = useLocalStorage('theme', 'light')

  // React State
  const [crumbs, setCrumbs] = useState([])
  const [description, setDescription] = 'FreeSewing platform documentation'

  const [image, setImage] = useState(`https://freesewing.org/share/language.wide.jpg`)
  const [menu, setMenu] = useState(false)
  const [title, setTitle] = useState('FreeSewing')
  const [mounted, setMounted] = useState(false) // false until app is mounted
  const [tree, setTree] = useState(useTree())

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

  // Methods for handling navigation tree
  const getOffspring = (slug) => {
    if (slug.length < 3) return [] // Gatsby build passes /*
    let ntree = {}
    Object.assign(ntree, tree)
    let page = ntr.getSelf(slug, ntree)
    if (!page) return []
    return page.offspring ? ntr.order(page.offspring) : []
  }

  const getNext = (slug) => {
    let ntree = {}
    Object.assign(ntree, tree)
    let next = ntr.getFirstOffspring(slug, ntree)
    if (!next) next = ntr.getNextSibling(slug, ntree)
    if (!next) next = ntr.getNextParent(slug, ntree)

    return next
  }

  const getPrev = (slug) => {
    let ntree = {}
    Object.assign(ntree, tree)
    let prev = ntr.getPrevSibling(slug, ntree)
    if (!prev) prev = ntr.getParent(slug, ntree)

    return prev
  }

  const getCrumbs = (slug) => {
    let ntree = {}
    Object.assign(ntree, tree)
    let crumbs = []
    let chunks = slug.split('/').slice(1, -1)
    for (let crumb of chunks) {
      if (!ntree.offspring) return crumbs
      ntree = ntree.offspring[crumb]
      if (!ntree) return crumbs
      crumbs.push({ title: ntree.title, slug: ntree.slug })
    }

    return crumbs.slice(0, -1)
  }

  const treeProps = (slug, prevNext = true) =>
    prevNext
      ? {
          slug,
          prev: getPrev(slug),
          next: getNext(slug),
          crumbs: getCrumbs(slug)
        }
      : {
          slug,
          crumbs: getCrumbs(slug)
        }

  return {
    // Helper methods
    persist,
    navigate,
    getOffspring,
    getPrev,
    getNext,
    getCrumbs,
    treeProps,

    // React state
    crumbs,
    setCrumbs,
    description,
    setDescription,
    image,
    setImage,
    menu,
    setMenu,
    title,
    setTitle,
    mounted,
    setMounted,
    tree,
    setTree,

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
