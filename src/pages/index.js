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
        <div style={{maxWidth: '500px', margin: '2rem auto'}}>
          <h5 style={{textAlign: 'center', marginBottom: '-1.5rem', padding: 0}}>TL;DR</h5>
          <div className="gatsby-highlight" data-language="bash">
            <pre class="language-bash">
              <code className="language-bash">npx create-freesewing-pattern</code>
            </pre>
          </div>
        </div>
        <Iconbar />
        <Splash />
        <div className="news">
          <LatestNews homepage />
        </div>
      </div>
    </AppWrapper>
  )
}

export default Page
