import React from 'react'
import Logo from '@freesewing/components/Logo'
import { Link } from 'gatsby'
import ShoutOuts from './shout-outs'

import './footer.scss'

const Footer = (props) => {
  const social = {
    discord: 'https://discord.gg/YDV4GvU',
    instagram: 'https://instagram.com/freesewing_org',
    facebook: 'https://www.facebook.com/groups/627769821272714/',
    github: 'https://github.com/freesewing',
    reddit: 'https://www.reddit.com/r/freesewing/',
    twitter: 'https://twitter.com/freesewing_org'
  }

  // Fixme: Update these links to next once org is updates
  const links = {
    'https://next.freesewing.org/docs/guide/what/': 'About FreeSewing',
    'https://next.freesewing.org/docs/faq': 'Frequently asked questions',
    'https://next.freesewing.org/community/join/': 'Become a Patron',
    '/contributors/code-of-conduct/': 'Code of conduct',
    '/contributors/help/': 'Where to get help',
  }

  const sections = [
    'tutorials',
    'guides',
    'howtos',
    'reference',
  ]
  const groups = [
    'contributors',
    'editors',
    'translators',
    'developers',
  ]

  return (
    <footer>
      <div className="cols">
        <div>
          <ul>
            <li className="heading">
              What is this?
            </li>
            {Object.keys(links).map((key) => (
              <li key={key}>
                <Link to={key} title={links[key]}>
                  {links[key]}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <ul>
            <li className="heading">
              Documentation
            </li>
            {sections.map(section => <li key={section}><Link to={`/${section}/`} title={section}>{section}</Link></li>)}
            {groups.map(section => <li key={section}><Link to={`/${section}/`} title={section}>For {section}</Link></li>)}
          </ul>
        </div>
        <div>
          <ul>
            <li className="heading">
              Social media
            </li>
            {Object.keys(social).map((i) => (
              <li key={i}>
                <a href={social[i]} title={i}>
                  {i}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div className="logo">
            <Link to="/" title='Home'>
              <Logo size={props.app.mobile ? 96 : 133} />
            </Link>
            <div className="name">
              <span className="free">Free</span>Sewing
            </div>
          </div>
          <div className="slogan">
            Come for the sewing patterns
            <br />
            Stay for the community
          </div>
        </div>
      </div>
      <ShoutOuts />
    </footer>
  )
}

export default React.memo(Footer)
