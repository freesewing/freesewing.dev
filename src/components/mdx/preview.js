import React from 'react'
import { Link } from 'gatsby'
import iconlist from '../icons'
import Markdown from 'react-markdown'

const Preview = props => {
  const icons = props.frontmatter.icons
    ? props.frontmatter.icons.map(icon => {
      let AsComponent = iconlist[icon]
      return <AsComponent />
    })
    : []
  return (
  <div className={`preview ${props.frontmatter.for || ''}`}>
    <Link to={`/${props.parent.relativeDirectory}/`} className='cover' />
    <div className='body'>
      <h5>{props.frontmatter.title}</h5>
      <Markdown source={props.frontmatter.about} />
      {!props.brief && props.frontmatter.goals && (
        <>
          <h5>What you'll learn</h5>
          <ul className='links'>
            {props.frontmatter.goals.map( goal => <li key={goal}>{goal}</li>)}
          </ul>
        </>
      )}
    </div>
    <div className='footer'>
      {icons || <span className='icon'>{props.icon}</span>}
    </div>
  </div>
)}

export default Preview
