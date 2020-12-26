import React from 'react'
import useApp from '../hooks/useApp'
import AppWrapper from '../components/app/wrapper'

import withLanguage from '../components/withLanguage'
import Button from '@material-ui/core/Button'
import './homepage.scss'
import Pinned from '../components/mdx/pinned'
import Tutorials from '../components/mdx/tutorials'
import Guides from '../components/mdx/guides'
import Howtos from '../components/mdx/howtos'
import Reference from '../components/mdx/reference'

import LatestNews from '../components/LatestNews'
import Splash from '../components/homepage/splash'
import Iconbar from '../components/homepage/iconbar'

import './homepage.css'

const Page = props => {

  const app = useApp()

  return (
    <AppWrapper
      app={app}
      title='FreeSewing documentation for contributors & developers'
      noLayout
      noNavbar
    >
      <div id="homepage">
        <Iconbar />
        <Splash app={app} />
        <div className='content'>
          <h2>Recent updates</h2>
        </div>
        <div className="news">
          <LatestNews homepage />
        </div>
        <div className='content'>
          <h2>Tutorials</h2>
          <Tutorials brief />
          <h2>Guides</h2>
          <Guides brief />
          <div className='content-cols'>
            <div>
              <h2>Howtos</h2>
              <Howtos />
            </div>
            <div>
              <h2>Reference</h2>
              <Reference />
            </div>
          </div>
        </div>
      </div>
    </AppWrapper>
  )
}

export default withLanguage(Page)
