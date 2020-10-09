import React from 'react'
import { Link } from 'gatsby'
import icons from '../icons'

const Preview = props => {
  return (
  <div className={`preview shadow ${props.frontmatter.for || ''}`}>
    <Link to={`/${props.parent.relativeDirectory}/`} />
    <div className='header'>
      <h3>
        {props.frontmatter.icon
          ? icons[props.frontmatter.icon]()
          : <span className='icon'>{props.icon}</span>
        }
        {props.frontmatter.title}
      </h3>
    </div>
    <div className='body'>
      <h5>Description</h5>
      {props.frontmatter.about}
      {!props.brief && (
        <>
          <h5>What you'll learn</h5>
          <ul className='links'>
            {props.frontmatter.goals.map( goal => <li key={goal}>{goal}</li>)}
          </ul>
        </>
      )}
    </div>
  </div>
)}

export default Preview
