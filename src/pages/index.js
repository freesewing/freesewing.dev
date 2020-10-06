import React from 'react'
import useApp from '../hooks/useApp'
import AppWrapper from '../components/app/wrapper'

import useUiMdx from '../hooks/useUiMdx'
import withLanguage from '../components/withLanguage'
import Button from '@material-ui/core/Button'
import { FormattedMessage } from 'react-intl'
import Mdx from '../components/mdx'
import './homepage.scss'

const Page = props => {

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
        to: '/reference/repos/',
        txt: 'Browse GitHub repositories'
      },
      {
        to: '/reference/packages/',
        txt: 'Browse NPM packages'
      },
      {
        to: 'https://gitter.im/freesewing/development',
        txt: 'Join our chat room'
      }
    ]
  }

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
      </div>
    </AppWrapper>
  )
}

export default withLanguage(Page)
