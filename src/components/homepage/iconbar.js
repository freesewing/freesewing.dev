import React from 'react'
import TutorialIcon from '@material-ui/icons/School'
import GuideIcon from '@material-ui/icons/SwapCalls'
import HowtoIcon from '@material-ui/icons/Help'
import ReferenceIcon from '@material-ui/icons/MenuBook'
import { Link } from 'gatsby'

const IconBar = () => {
  // Keep icons from blowing up on SSR
  const iconStyle = { maxWidth: '64px' }

  const icons = {
    tutorials: <TutorialIcon style={iconStyle} />,
    guides: <GuideIcon style={iconStyle} />,
    howtos: <HowtoIcon style={iconStyle} />,
    reference: <ReferenceIcon style={iconStyle} />,
  }

  return (
    <div className="icons">
      {Object.keys(icons).map((icon) => (
        <div className="icon" key={icon}>
          <Link to={`/${icon}/`} title={icon}>
            {icons[icon]}
            <br />
            <span>{icon}</span>
          </Link>
        </div>
      ))}
    </div>
  )
}

export default IconBar
