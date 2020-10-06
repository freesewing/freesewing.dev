import React from 'react'
import Logo from '@freesewing/components/Logo'
import Icon from '@freesewing/components/Icon'
import { useStaticQuery, graphql } from 'gatsby'
import { Link } from 'gatsby'
import IconButton from '@material-ui/core/IconButton'
import FreeSewing from '@freesewing/core'
import { FormattedMessage } from 'react-intl'
import ShoutOuts from './shout-outs'

const Footer = props => {
  const data = useStaticQuery(graphql`
    {
      allFsPatron {
        edges {
          node {
            patron {
              username
              pictureUris {
                xs
              }
            }
          }
        }
      }
    }
  `)
  const styles = {
    ul: {
      margin: '2rem auto',
      padding: 0,
      maxWidth: '666px'
    },
    li: {
      display: 'inline',
      listStyleType: 'none'
    },
    img: {
      width: '36px',
      height: '36px',
      borderRadius: '50%',
      background: '#000',
      margin: '2px',
      border: '1px solid #fff6',
      display: 'inline-block',
      overflow: 'hidden'
    },
    container: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center'
    },
    links: {
      margin: '0 1rem'
    }
  }

  const patrons = {}
  data.allFsPatron.edges.map(node => (patrons[node.node.patron.username] = node.node.patron))

  const order = Object.keys(patrons)
  order.sort()
  const list = []
  order.map(username => {
    let patron = patrons[username]
    list.push(
      <li key={patron.username} style={styles.li}>
        <Link to={'https://freesewing.org/users/' + patron.username} title={patron.username}>
          <img src={patron.pictureUris.xs} alt={patron.username} style={styles.img} />
        </Link>
      </li>
    )
    return null
  })

  const allPatrons = <ul style={styles.ul}>{list}</ul>

  const icons = {
    gitter: 'https://gitter.im/freesewing/chat',
    twitter: 'https://twitter.com/freesewing_org',
    github: 'https://github.com/freesewing',
    instagram: 'https://instagram.com/freesewing_org'
  }

  return (
    <footer>
      <Link to="/">
        <Logo size={101} />
      </Link>
      <p>
        {Object.keys(icons).map(i => (
          <IconButton href={icons[i]} className={i} title={i} key={i}>
            <Icon icon={i} />
          </IconButton>
        ))}
      </p>
      <p>
        <FormattedMessage id="app.txt-footer" />:
      </p>
      {allPatrons}
      <div style={styles.container}>
        <ul style={styles.links}>
          <li>
            <a href={`https://freesewing.org/docs/about/`}>
              <FormattedMessage id="app.aboutFreesewing" />
            </a>
          </li>
        </ul>
        <ul style={styles.links}>
          <li>
            <a href={`https://freesewing.org/patrons/join/`}>
              <FormattedMessage id="app.becomeAPatron" />
            </a>
          </li>
        </ul>
      </div>
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
