import React from 'react'
import Logo from '@freesewing/components/Logo'
import Button from '@material-ui/core/Button'
import { Link } from 'gatsby'

import './splash.scss'

const groups = {
  contributors: [
    "Start reading here if you're a new FreeSewing contributor, or would like to become one.",
    "Includes our code of conduct and community guidelines.",
  ],
  editors: [
    "If you would like to improve our documentation or write a new blog post, this is for you.",
    "Includes tips for working with Markdown & Github."
  ],
  translators: [
    "If you would like to help us translate FreeSewing from English to another language, start here.",
    "Currently translating Dutch, French, German & Spanish.",
  ],
  developers: [
    "The bulk of the documentation here details how things work under the hood.",
    "Including our core library, patterns, plugins, our websites and backends",
  ]
}

const Splash = ({ app }) => {

  const boxes = []
  for (let group of Object.keys(groups)) {
    boxes.push(
      <div
        key={group}
        className={`${group} poh`}
      >
        <Link to={`/${group}/`} className='cover' />
        <h3>For {group}</h3>
        {groups[group].map((p,i) => <p key={group+i}>{p}</p>)}
      </div>
    )
  }

  return (
    <div className="splash">
      <div className="top">
        <div className="logo">
          <Logo size={app.mobile ? 96 : 166} />
          <div className="name">
            <span className="free">Free</span>Sewing
          </div>
        </div>
        <div className="slogan">
          FreeSewing
          <br />
          platform documentation
        </div>
      </div>
      <div className="groups">{boxes}</div>
    </div>
  )
}

export default Splash
