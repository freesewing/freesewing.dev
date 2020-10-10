import React from 'react'
import { Link } from 'gatsby'
import TutorialIcon from '@material-ui/icons/School'
import GuideIcon from '@material-ui/icons/SwapCalls'
import HowtoIcon from '@material-ui/icons/Help'
import ReferenceIcon from '@material-ui/icons/MenuBook'
//import VideoIcon from '@material-ui/icons/OndemandVideo'
import ContributorIcon from '@material-ui/icons/Face'
import EditorIcon from '@material-ui/icons/Create'
import TranslatorIcon from '@material-ui/icons/Translate'
import DeveloperIcon from '@material-ui/icons/Code'

const links = {
  tutorials: 'Tutorials',
  guides: 'Guides',
  howtos: 'Howtos',
  reference: 'Reference',
 // videos: 'Videos',
}
const contrib = {
  contributors: 'For all contributors',
  developers: 'For developers',
  editors: 'For editors',
  translators: 'For translators',
}

const icons = {
  tutorials: <TutorialIcon />,
  guides: <GuideIcon />,
  howtos: <HowtoIcon />,
  reference: <ReferenceIcon />,
  //videos: <VideoIcon />,
  contributors: <ContributorIcon />,
  developers: <DeveloperIcon />,
  editors: <EditorIcon />,
  translators: <TranslatorIcon />
}

const MainMenu = ({ app, active = '', iconsOnly = false }) => (
  <ul className={iconsOnly ? 'footer-main-menu' : 'aside-main-menu'}>
    {Object.keys(links).map(link => (
      <li key={link}>
        <Link
          to={`/${link}/`}
          className={link === active ? 'active' : ''}
          title={links[link]}
        >
          {icons[link]}
          {!iconsOnly && <span className="text">{links[link]}</span>}
        </Link>
      </li>
    ))}
    <li className='divider'>Contributor documentation:</li>
    {Object.keys(contrib).map(link => (
      <li key={link} className={`contrib ${link}`}>
        <Link
          to={`/${link}/`}
          className={link === active ? 'active' : ''}
          title={contrib[link]}
        >
          {icons[link]}
          {!iconsOnly && <span className="text">{contrib[link]}</span>}
        </Link>
      </li>
    ))}
  </ul>
)

export default MainMenu
