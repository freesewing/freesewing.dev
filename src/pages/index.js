import React from 'react'
import useApp from '../hooks/useApp'
import AppWrapper from '../components/app/wrapper'

import withLanguage from '../components/withLanguage'
import Button from '@material-ui/core/Button'
import { FormattedMessage } from 'react-intl'
import './homepage.scss'
import Pinned from '../components/mdx/pinned'
import Tutorials from '../components/mdx/tutorials'
import Guides from '../components/mdx/guides'
import Howtos from '../components/mdx/howtos'
import Reference from '../components/mdx/reference'

const Page = props => {

  const app = useApp()

  return (
    <AppWrapper
      app={app}
      title='FreeSewing documentation for contributors & developers'
      noCrumbs
      noTitle
    >
      <div id="homepage">
        <h1>
          FreeSewing documentation
          <span>For contributors & developers</span>
        </h1>
        <div className='previews'>
          <Pinned list />
          <Tutorials list brief />
          <Guides list brief />
        </div>

        {/* Support banner */}
        <div className="stripe">
          <div className='stripe-content'>
            <h1>
              <FormattedMessage id="app.supportFreesewing" />
            </h1>
            <h2>
              <FormattedMessage id="app.txt-tiers" />
            </h2>
            <p>
              <FormattedMessage id="app.patronPitch" />
            </p>
            <Button
              className="btn-primary"
              variant="contained"
              href="https://freesewing.org/patrons/join/"
            >
              Join the FreeSewing patrons
            </Button>
          </div>
        </div>

        <h2>Howtos</h2>
        <Howtos />

        <h2>Reference</h2>
        <Reference />

      </div>
    </AppWrapper>
  )
}

export default withLanguage(Page)
