import React from 'react'
import { list } from '@freesewing/pattern-info'

const Component = props => (
  <ul className='links'>
    {list.map(design => <li key={design}><a href={`https://${design}.freesewing.dev/`}><b>{design}</b>.freesewing.dev</a></li>)}
  </ul>
)

export default Component
