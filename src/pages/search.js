import React from 'react'
import useApp from '../hooks/useApp'
import AppWrapper from '../components/app/wrapper'

import Search from '../components/search'

const Page = props => {
  const app = useApp()

  return (
    <AppWrapper app={app} title='Search' wide>
      <Search search='Search'/>
    </AppWrapper>
  )
}

export default Page
