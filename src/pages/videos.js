import React, { useEffect } from 'react'
import useApp from '../hooks/useApp'
import AppWrapper from '../components/app/wrapper'
import Blockquote from '@freesewing/components/Blockquote'

const Page = props => {

  const app = useApp()

  return (
    <AppWrapper
      app={app}
      title='Videos'
      description='This is a placeholder page for now. We hope to add plenty of videos soon.'
      active='videos'
      text
    >
      <Blockquote type='fixme'>
        <h5>This is a work in progress</h5>
        <p>We hope to add a bunch of videos here to help you make the most of FreeSewing.</p>
      </Blockquote>
    </AppWrapper>
  )
}

export default Page
