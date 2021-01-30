import React from 'react'
import { Link } from 'gatsby'
import Markdown from 'react-markdown'

const Preview = props => (
  <>
    <blockquote style={{display: 'relative'}}>
    <h5>{props.frontmatter.title}</h5>
    <Markdown source={props.frontmatter.about} />
    <ul className='links'>
      {props.frontmatter.goals.map( goal => <li key={goal}>{goal}</li>)}
    </ul>
    <Link
      to={`/${props.parent.relativeDirectory}/`}
      style={{
        position: 'absolute',
        left: 0,
        top: 0,
        width: '100%',
        height: '100%'
      }}
      title={props.frontmatter.about}
    />
    </blockquote>
  </>
)

export default Preview
