import React from 'react'
import useApp from '../hooks/useApp'
import AppWrapper from '../components/app/wrapper'

import LatestNews from '../components/LatestNews'
import Splash from '../components/homepage/splash'
import Iconbar from '../components/homepage/iconbar'

import './homepage.scss'

const Page = props => {

  const app = useApp()

  return (
    <AppWrapper
      app={app}
      title='FreeSewing documentation for contributors & developers'
      noLayout
    >
      <div id="homepage">
        <Iconbar />
        <Splash app={app} />
        <div className="news">
          <LatestNews homepage />
        </div>
      </div>
    </AppWrapper>
  )
}

export default Page
