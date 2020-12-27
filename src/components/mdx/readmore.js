import React from 'react'
import { Link } from 'gatsby'
import './readmore.scss'

const ReadMore = ({ offspring = false, orderedOffspring=[] }) =>
  offspring ? (
    <div className="readmore">
      <h6>
        Further reading
      </h6>
      <ul>
        {orderedOffspring.map(slug => (
          <li key={slug}>
            <Link to={slug}>{offspring[slug]}</Link>
          </li>
        ))}
      </ul>
    </div>
  ) : null

export default ReadMore
