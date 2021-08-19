import React from 'react'
import useApp from '../hooks/useApp'
import AppWrapper from '../components/app/wrapper'

import LatestNews from '../components/LatestNews'

const Page = props => {

  const app = useApp()

  return (
    <AppWrapper
      app={app}
      title='News & Updates'
      description='Recent updates to our documentation'
      text
    >
      <LatestNews app={app} />
    </AppWrapper>
  )
}

export default Page
