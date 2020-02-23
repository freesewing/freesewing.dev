import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import FooterBase from '@freesewing/components/Footer'

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
  const links = {
    left: {
      aboutFreesewing: 'https://freesewing.org/docs/about/'
    },
    right: {
      becomeAPatron: 'https://freesewing.org/patrons/join/'
    }
  }
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
      border: '1px solid #fff6'
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
        <a href={'https://freesewing.org/users/' + patron.username} title={patron.username}>
          <img src={patron.pictureUris.xs} alt={patron.username} style={styles.img} />
        </a>
      </li>
    )
    return null
  })

  const allPatrons = <ul style={styles.ul}>{list}</ul>

  return <FooterBase language={props.language} links={links} home="/" patrons={allPatrons} />
}

export default Footer
