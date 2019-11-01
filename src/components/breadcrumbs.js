import React from 'react'
import { Link } from 'gatsby'
import { FormattedMessage } from 'react-intl'

const Breadcrumbs = props => {
  const renderCrumb = crumb => {
    return (
      <li key={crumb.slug}>
        <Link to={crumb.slug}>{(typeof crumb.title === 'string') ? crumb.title.split('|').pop() : crumb.title}</Link>
      </li>
    )
  }

  return (
    <nav className="breadcrumbs">
      <ul>
        <li>
          <Link to="/">
            <FormattedMessage id="app.home" />
          </Link>
        </li>
        {props.crumbs.map(crumb => renderCrumb(crumb))}
        <li>{(typeof props.pageTitle === 'string') ? props.pageTitle.split('|').pop(): props.pageTitle}</li>
      </ul>
    </nav>
  )
}

export default Breadcrumbs
