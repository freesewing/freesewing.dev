import React from 'react'
import BreadCrumbs from '../breadcrumbs'
import PrevNext from '../prev-next'
import './default.scss'

const DefaultLayout = (props) => {
  return (
    <div className="layout" dataLayout="docs">
      <aside>
        <div className="sticky">
          {props.mainMenu}
        </div>
      </aside>
      <section>
        {!props.noCrumbs && <BreadCrumbs crumbs={props.crumbs} pageTitle={props.title} />}
        {!props.noTitle && <h1>{props.title}</h1>}
        <div className={`content ${props.wide ? 'wide' : ''}`}>
          {props.children}
          <PrevNext prev={props.prev} next={props.next} />
        </div>
      </section>
    </div>
  )
}

export default DefaultLayout
