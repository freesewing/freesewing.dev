import React from 'react'
import Logo from '@freesewing/components/Logo'
import Icon from '@freesewing/components/Icon'
import { Link } from 'gatsby'
import IconButton from '@material-ui/core/IconButton'
import FreeSewing from '@freesewing/core'
import ShoutOuts from './shout-outs'
import MainIcons from '../menus/main-aside'

const Footer = props => {

  const icons = {
    discord: 'https://discord.gg/YDV4GvU',
    twitter: 'https://twitter.com/freesewing_org',
    github: 'https://github.com/freesewing',
    instagram: 'https://instagram.com/freesewing_org'
  }

  return (
    <footer>
      <Link to="/">
        <Logo size={101} />
      </Link>
      <p dangerouslySetInnerHTML={{ __html: props.app.translate('app.txt-footer') }} />
      <MainIcons app={props.app} iconsOnly />
      <p className="social">
        {Object.keys(icons).map((i) => (
          <IconButton href={icons[i]} className={i} title={i} key={i}>
            <Icon icon={i} />
          </IconButton>
        ))}
      </p>
      <p className="version">
        <a href={'https://github.com/freesewing/freesewing/releases/tag/v' + FreeSewing.version}>
          v{FreeSewing.version}
        </a>
      </p>
      <ShoutOuts />
    </footer>
  )
}

export default Footer
