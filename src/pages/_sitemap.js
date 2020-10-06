import React from 'react'
import useApp from '../hooks/useApp'
import AppWrapper from '../components/app/wrapper'

import { Link, graphql } from 'gatsby'
import { FormattedMessage } from 'react-intl'

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

  const main = {
    '#account': 'app.account',
    '#blog': 'app.blog',
    '#docs': 'app.docs',
    '#patrons': 'app.patrons',
    '#patterns': 'app.patterns',
    '#showcase': 'app.showcase'
  }

  const renderMdxList = (pages) => {
    let links = []
    for (let slug in pages) {
      let p = pages[slug]
      links.push(
        <li key={p.slug}>
          <Link to={p.slug}>
            {p.title}
            <span style={styles.url}>{p.slug}</span>
          </Link>
        </li>
      )
    }

    return <ul className="links">{links}</ul>
  }

  const renderMdxTree = (pages) => {
    let links = []
    for (let slug in pages) {
      let p = pages[slug]
      links.push(
        <li key={p.slug}>
          <Link to={p.slug}>
            {p.title}
            <span style={styles.url}>{p.slug}</span>
          </Link>
          {p.offspring && renderMdxTree(p.offspring)}
        </li>
      )
    }

    return <ul className="links">{links}</ul>
  }

  const types = ['Tutorials', 'Guides', 'Howtos', 'Reference']
  const context = [
    <h5>Sitemap</h5>,
    <ul>
      {types.map( Type => <li key={Type}><a href={`#${Type.toLowerCase()}`}>{Type}</a></li>)}
    </ul>
  ]

  return (
    <AppWrapper app={app} title={app.translate('app.sitemap')} context={context} text>
      {types.map( Type => {
        let type = Type.toLowerCase()
        return (
          <div key={type}>
            <h2 id={type}><Link to={`/${type}/`}>{Type}</Link></h2>
            {renderMdxTree(props.pageContext.tree[type].offspring)}
          </div>
        )
      })}
    </AppWrapper>
  )
}

export default Page

// See https://www.gatsbyjs.org/docs/page-query/
export const pageQuery = graphql`
  {
    patrons8: allFsPatron(filter: { patron: { tier: { eq: "8" } } }) {
      edges {
        node {
          patron {
            username
          }
        }
      }
    }
    patrons4: allFsPatron(filter: { patron: { tier: { eq: "4" } } }) {
      edges {
        node {
          patron {
            username
          }
        }
      }
    }
    patrons2: allFsPatron(filter: { patron: { tier: { eq: "2" } } }) {
      edges {
        node {
          patron {
            username
          }
        }
      }
    }
  }
`
