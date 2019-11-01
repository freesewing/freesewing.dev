import React from 'react'
import Navigation from './navigation'

const MainMenu = props => {
  let navigation = props.pageContext.navigation
  let toc = null
  let slug = props.pageContext.slug
  if (typeof props.pageContext.node !== 'undefined') toc = props.pageContext.node.tableOfContents
  if (props.uri) slug = props.uri

  return (
    <Navigation
      expanded={props.expanded || false}
      page={props.uri}
      slug={slug}
      navigation={navigation}
      toc={toc}
      app={props.app}
    />
  )
}

export default MainMenu
