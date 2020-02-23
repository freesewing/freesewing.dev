import React from 'react'
import { IntlProvider } from 'react-intl'
import { strings } from '@freesewing/i18n'

const withLanguage = WrappedComponent => {
  return class extends React.Component {
    render() {
      return (
        <IntlProvider
          locale={process.env.GATSBY_LANGUAGE}
          messages={strings[process.env.GATSBY_LANGUAGE]}
        >
          <WrappedComponent language={process.env.GATSBY_LANGUAGE} {...this.props} />
        </IntlProvider>
      )
    }
  }
}

export default withLanguage
