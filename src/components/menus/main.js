import React from 'react'
import { Link } from 'gatsby'
import orderBy from 'lodash.orderby'
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
  developers: 'For developers',
  contributors: 'For contributors',
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

const onPath = (slug, chunks) => {
  let compare = slug.split('/').slice(1,-1)
  let match = true
  for (let i in compare) {
    if(compare[i] !== chunks[i]) match = false
  }

  return match
}
const getSiblings = (slug ,tree, chunks, level=1) => {
  if (level > 4) return []
  let steps = chunks.slice(0, level)
  let siblings = []
  let branch = {...tree}
  for (let step of steps) branch = branch.offspring[step]
  if (!branch.offspring) return []
  let tmp = {}
  for (let key of Object.keys(branch.offspring)) tmp[key] = {
    ...branch.offspring[key],
    ordertitle: branch.offspring[key].order + branch.offspring[key].title,
    key
  }
  let subnav
  for (let page of orderBy(tmp, ['ordertitle'])) {
    if (onPath(page.slug, chunks)) subnav = <Submenu slug={slug} chunks={chunks} tree={tree} level={level+1} />
    else subnav = null
    siblings.push(<li key={page.slug}><Link to={page.slug} className={slug === page.slug ? 'active' : ''}>{page.title}</Link>{subnav}</li>)
  }

  return siblings
}
const Submenu = ({slug, chunks, tree, level=1}) => <ul className={`level-${level}`}>{getSiblings(slug, tree, chunks, level)}</ul>

const MainMenu = ({ app, pageContext={} }) => {

  const {
    slug='/non-mdx/',
    tree,
  } = pageContext;
  const chunks = slug.split('/').slice(1, -1)

  return (
    <>
    <ul className='aside-main-menu' id='main-menu'>
      {Object.keys(links).map(link => (
        <li key={link}>
          <Link
            to={`/${link}/`}
            className={link === chunks[0] ? 'active' : ''}
            title={links[link]}
          >
            {icons[link]}
            <span className="text">{links[link]}</span>
          </Link>
          {(link === chunks[0]) && <Submenu slug={slug} chunks={chunks} tree={tree} />}
        </li>
      ))}
    </ul>
    </>
  )
}

export default MainMenu
