import React from 'react'
import BreadCrumbs from '../breadcrumbs'
import MainMenu from '../menus/main'
import './default.scss'

const DefaultLayout = (props) => {
  return (
    <div className="fs-sa" dataLayout="docs">
      <aside>
        <div className="sticky">
          <MainMenu app={props.app} active={props.active} pageContext={props.pageContext} />
        </div>
      </aside>
      <section>
        {!props.noCrumbs && <BreadCrumbs crumbs={props.crumbs} pageTitle={props.title} />}
        {!props.noTitle && <h1>{props.title}</h1>}
        <div className={`content ${props.wide ? 'wide' : ''}`}>
          {props.children}
        </div>
      </section>
    </div>
  )
}

export default DefaultLayout
