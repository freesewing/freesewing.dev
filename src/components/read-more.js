import React from 'react'
import { Link } from 'gatsby'
import Blockquote from '@freesewing/components/Blockquote'

const ReadMore = props => {

  const renderChild = (child, slug) => {
    let grandchildren = false
    if (child.children) {
      grandchildren = []
      let order = {}
      for (let grandchild in child.children) {
        order[child.children[grandchild].title] = grandchild
      }
      for (let title of Object.keys(order).sort()) {
        let grandchild = order[title]
        grandchildren.push(renderChild(child.children[grandchild], grandchild))
      }
      grandchildren = <ul className="links">{grandchildren}</ul>
    }

    return <li key={slug}><Link to={slug}>{child.title.split('|').pop()}</Link>{grandchildren}</li>
  }


  let from = props.root ? props.root : props.slug
  if (from.slice(-1) === '/') from = from.slice(0,-1)
  const chunks = from.split('/').slice(1);
  let path = '/'+chunks.shift()+'/'
  let root = props.navigation[path]
  if (typeof root === 'undefined') return null

  let title = root.title
  for (let chunk of chunks) {
    path += chunk + '/'
    root = root.children[path]
    title = root.title
  }

  let links = []
  for (let child in root.children) {
    links.push(renderChild(root.children[child], child))
  }
  if (links.length < 1) return null
  if (typeof props.title === 'undefined') title = <h6>Further reading</h6>
  else title = <h6>{props.title}</h6>
  return (
    <Blockquote type="note">
      {title}
      <ul className="links">{links}</ul>
    </Blockquote>
  )
}

export default ReadMore
