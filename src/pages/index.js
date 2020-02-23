import React from 'react'
import useApp from '../hooks/useApp'
import useUiMdx from '../hooks/useUiMdx'
import withLanguage from '../components/withLanguage'
import AppWrapper from '../components/app/wrapper'
import WideLayout from '../components/layouts/wide'

import Button from '@material-ui/core/Button'
import { FormattedMessage } from 'react-intl'

import Mdx from '../components/mdx'

// Style
import './homepage.css'

const HomePage = props => {
  // Hooks
  const app = useApp()
  const uiMdx = useUiMdx()

  const buttons = {
    row1: [
      '', // Skip 0
      {
        to: '/guides/getting-started/',
        txt: 'Learn more'
      },
      {
        to: '/tutorials/pattern-design/',
        txt: 'Take the tutorial'
      },
      {
        to: '/reference/api/',
        txt: 'API Documentation'
      }
    ],
    row2: [
      '', // Skip 0
      {
        to: '/reference/repositories/',
        txt: 'Browse GitHub repositories'
      },
      {
        to: 'https://gitter.im/freesewing/developement',
        txt: 'Browse NPM packages'
      },
      {
        to: 'https://gitter.im/freesewing/developement',
        txt: 'Join our chat room'
      }
    ]
  }

  return (
    <AppWrapper app={app}>
      <div id="homepage">
        {/* Top banner */}
        <header>
          <div className="banner">
            <div className="text-block" style={{ maxWidth: '600px' }}>
              <h1>FreeSewing</h1>
              <h2>An open source platform for made-to-measure sewing patterns</h2>
              <Button
                size="large"
                color="secondary"
                href="/guides/getting-started/"
                variant="contained"
                style={{ marginRight: '1rem' }}
              >
                Get started
              </Button>
              <Button
                size="large"
                color="secondary"
                href="/tutorials/pattern-design/"
                variant="outlined"
              >
                Tutorial
              </Button>
            </div>
          </div>
        </header>

        {/* First row of text boxes */}
        <WideLayout app={app} noTitle>
          <div className="boxes">
            {[1, 2, 3].map(id => (
              <div key={'row1-' + id}>
                <Mdx node={uiMdx[`homepage/row-1/${id}`]} />
                <Button variant="outlined" href={buttons.row1[id].to}>
                  {buttons.row1[id].txt}
                </Button>
              </div>
            ))}
          </div>
        </WideLayout>

        {/* Support banner */}
        <div className="stripe">
          <div>
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

        <WideLayout app={app} noTitle>
          {/* Second row of text boxes */}
          <div className="boxes">
            {[1, 2, 3].map(id => (
              <div key={'row1-' + id}>
                <Mdx node={uiMdx[`homepage/row-2/${id}`]} />
                <Button variant="outlined" href={buttons.row2[id].to}>
                  {buttons.row2[id].txt}
                </Button>
              </div>
            ))}
          </div>
        </WideLayout>
      </div>
    </AppWrapper>
  )
}

export default withLanguage(HomePage)
