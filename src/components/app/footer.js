import React from 'react'
import FooterBase from '@freesewing/components/Footer'

const Footer = props => {
  const links = {
    left: {
      aboutFreesewing: '/docs/about'
    },
    right: {
      becomeAPatron: '/patrons/join'
    }
  }

  const patrons = <p>Something here</p>

  return <FooterBase language={props.language} links={links} home="/" patrons={patrons} />
}

export default Footer
