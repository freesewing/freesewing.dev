import React from 'react'
import TableOfContents from '../TableOfContents'
import ExpandedIcon from '@material-ui/icons/KeyboardArrowDown'
import CollapsedIcon from '@material-ui/icons/KeyboardArrowRight'
import { Link } from 'gatsby'

const Navigation = props => {
  const isDescendant = (checkSlug, baseSlug) => {
    if (checkSlug.slice(-1) !== '/') checkSlug += '/'
    if (baseSlug.slice(-1) !== '/') baseSlug += '/'
    if (baseSlug.slice(0,1) !== '/') baseSlug = '/'+baseSlug
    if (checkSlug.slice(0, baseSlug.length) === baseSlug) return true
    return false
  }

  const styles = {
    icon: {
      fontSize: '16px'
    }
  }

  const renderSidebar = () => {
    let items = []
    let order = {}
    for (let topic in props.navigation) {
      order[props.navigation[topic].title] = topic
    }
    for (let title of Object.keys(order).sort()) {
      let topic = order[title]
      let active = isDescendant(props.slug, topic) ? true : false
      items.push(
        <li key={topic} className={active ? 'topic active' : 'topic'}>
          <Link className={active ? 'topic active' : 'topic'} to={topic}>
            {active ? (
              <ExpandedIcon fontSize="inherit" style={styles.icon} />
            ) : (
              <CollapsedIcon fontSize="inherit" style={styles.icon} />
            )}

            {props.app.frontend.fixTitle(title)}
          </Link>
          {(active || props.expanded) ? renderSidebarLevel(1, props.navigation[topic].children) : null}
        </li>
      )
    }

    return <ul className="topics">{items}</ul>
  }

  const renderSidebarLevel = (level, data) => {
    // Don't bother if there's nothing to render
    if (Object.keys(data).length === 0) return null;
    // Avoid too much recursion
    if (level > 5) return null
    let children = []
    let order = {}
    for (let key in data) {
      order[data[key].title] = key
    }
    for (let title of Object.keys(order).sort()) {
      let key = order[title]
      let grandchildren = null
      let active = isDescendant(props.slug, key) ? true : false
      let current = props.slug === key ? true : false
      if ((active || props.expanded) && typeof data[key].children !== 'undefined') {
        grandchildren = renderSidebarLevel(level + 1, data[key].children)
      }
      let className = active ? 'active' : 'inactive'
      children.push(
        <li key={key} className={className}>
          <Link className={className} to={key}>
            {active ? (
              <ExpandedIcon fontSize="inherit" style={styles.icon} />
            ) : (
              <CollapsedIcon fontSize="inherit" style={styles.icon} />
            )}
            {props.app.frontend.fixTitle(data[key].title)}
          </Link>
          {current ? <TableOfContents toc={props.toc} slug={key} /> : null}
          {grandchildren}
        </li>
      )
    }

    return <ul className={'topic-links level-' + level}>{children}</ul>
  }

  return renderSidebar()
}

export default Navigation
