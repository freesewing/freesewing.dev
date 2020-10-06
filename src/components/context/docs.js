import React from 'react'
import { Link } from 'gatsby'

const DocsContext = ({
  slug,
  siblings = {},
  orderedSiblings = [],
  offspring = {},
  orderedOffspring,
  up
}) => {
  return (
    <ul>
      {orderedSiblings.map(sib => (
        <li key={sib}>
          <Link to={sib} className={`${sib === slug ? 'active' : ''}`}>
            {siblings[sib]}
          </Link>
          {sib === slug && (
            <ul>
              {orderedOffspring.map(child => (
                <li key={child}>
                  <Link to={child} className="level-2">
                    {offspring[child]}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ul>
  )
}

export default DocsContext
