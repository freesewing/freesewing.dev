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

const iStyle = { style: { maxWidth: '32px' } }
const icons = {
  tutorials: <TutorialIcon {...iStyle}/>,
  guides: <GuideIcon {...iStyle} />,
  howtos: <HowtoIcon {...iStyle} />,
  reference: <ReferenceIcon {...iStyle} />,
  //videos: <VideoIcon {...iStyle} />,
  contributors: <ContributorIcon {...iStyle} />,
  developers: <DeveloperIcon {...iStyle} />,
  editors: <EditorIcon {...iStyle} />,
  translators: <TranslatorIcon {...iStyle} />
}

const onPath = (slug, chunks) => {
  if (!slug) return false
  let compare = slug.split('/').slice(1, -1)
  let match = true
  for (let i in compare) {
    if (compare[i] !== chunks[i]) match = false
  }

  return match
}
const getSiblings = (slug, tree, chunks, level = 1) => {
  if (level > 4) return []
  let steps = chunks.slice(0, level)
  let siblings = []
  let branch = { ...tree }
  for (let step of steps) branch = branch.offspring[step]
  if (!branch.offspring) return []
  let tmp = {}
  for (let key of Object.keys(branch.offspring)) {
    tmp[key] = {
      ...branch.offspring[key],
      key
    }
    if (typeof tmp[key].ordertitle === 'undefined')
      tmp[key].ordertitle = branch.offspring[key].order + branch.offspring[key].title
  }
  let subnav
  let ordered = orderBy(tmp, ['ordertitle'])
  for (let page of ordered) {
    if (onPath(page.slug, chunks))
      subnav = <Submenu slug={slug} chunks={chunks} tree={tree} level={level + 1} />
    else subnav = null
    siblings.push(
      <li key={page.slug}>
        <Link to={page.slug} className={slug === page.slug ? 'active' : ''}>
          {page.title}
        </Link>
        {subnav}
      </li>
    )
  }

  return siblings
}

const Submenu = ({ slug, chunks, tree, level = 1 }) => (
  <ul className={`level-${level}`}>{getSiblings(slug, tree, chunks, level)}</ul>
)

const MainMenu = ({ app, slug = '/fixme/' }) => {

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
          {(link === chunks[0]) && <Submenu slug={slug} chunks={chunks} tree={app.tree} />}
        </li>
      ))}
    </ul>
    </>
  )
}

export default MainMenu
