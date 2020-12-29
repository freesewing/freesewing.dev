import React from 'react'
import { Link } from 'gatsby'

const Breadcrumbs = ({ pageTitle, suffix, crumbs = [] }) => {
  const renderCrumb = (crumb) => {
    return (
      <li key={crumb.slug}>
        <Link to={crumb.slug}>{crumb.title}</Link>
      </li>
    )
  }
  return (
    <nav className="breadcrumbs">
      <ul>
        <li>
          <Link to="/">
            Home
          </Link>
        </li>
        {crumbs.map((crumb) => renderCrumb(crumb))}
        <li>
          {pageTitle}
          {suffix ? suffix : null}
        </li>
      </ul>
    </nav>
  )
}

export default Breadcrumbs
