import React from 'react'
import { Link } from 'gatsby'

const Preview = props => {
  return (
  <div className='preview shadow'>
    <Link to={`/${props.parent.relativeDirectory}/`} />
    <div className='header'>
      <h3>{props.frontmatter.title}</h3>
    </div>
    <div className='body'>
      <h5>Description</h5>
      {props.frontmatter.about}
      <h5>What you'll learn</h5>
      <ul className='links'>
        {props.frontmatter.goals.map( goal => <li key={goal}>{goal}</li>)}
      </ul>
    </div>
  </div>
)}

export default Preview
