import React from 'react'
import { Link } from 'gatsby'
import Markdown from 'react-markdown'
import NextIcon from '@material-ui/icons/KeyboardArrowRight'
import Blockquote from '@freesewing/components/Blockquote'

const Preview = props => (
  <>
    <Link to={`/${props.parent.relativeDirectory}/`}>
      <h2>{props.frontmatter.title}</h2>
    </Link>
    <Markdown source={props.frontmatter.about} />
    {!props.brief && props.frontmatter.goals && (
      <>
        <Blockquote type='note'>
        <h5>What you'll learn</h5>
        <ul className='links'>
          {props.frontmatter.goals.map( goal => <li key={goal}>{goal}</li>)}
        </ul>
        </Blockquote>
      </>
    )}
    <p style={{textAlign: 'right'}}>
      <Link to={`/${props.parent.relativeDirectory}/`}>
        <b>{props.frontmatter.title}</b>
        <NextIcon style={{ marginBottom: '-6px' }} />
      </Link>
    </p>
  </>
)

export default Preview
