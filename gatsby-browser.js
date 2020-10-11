const React = require('react')
const IntlProvider = require('react-intl').IntlProvider
const strings = require('@freesewing/i18n').strings

exports.wrapRootElement = ({ element }) => (
  <IntlProvider locale='en' messages={strings.en}>
    {element}
  </IntlProvider>
)

exports.wrapPageElement = ({ element, props }) => {
  return element
}
