import React from 'react'
import useApp from '../hooks/useApp'
import AppWrapper from '../components/app/wrapper'

import { Link } from 'gatsby'

const Page = (props) => {
  const app = useApp()

  const styles = {
    url: {
      display: 'block',
      margin: '0 0 0.25rem 1rem',
      fontSize: '0.9rem',
      color: app.theme === 'dark' ? 'white' : 'black'
    }
  }

  const renderTree = tree => {
    let links = []
    for (let key in tree) {
      let p = tree[key]
      links.push(
        <li key={p.slug}>
          <Link to={p.slug}>
            {p.title}
            <span style={styles.url}>{p.slug}</span>
          </Link>
          {p.offspring && renderTree(p.offspring)}
        </li>
      )
    }

    return <ul className="links">{links}</ul>
  }


  return (
    <AppWrapper app={app} title='Sitemap'>
      {renderTree(props.pageContext.tree)}
    </AppWrapper>
  )
}

export default Page
