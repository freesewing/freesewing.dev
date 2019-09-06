import React from 'react'
import SearchPage from '../pages/search'
import LanguagePage from '../pages/languages'
import NotFoundPage from '../pages/404'
import DocumentationPage from '../templates/docs-page'

const MainPage = props => {
  // Props for pages
  const pageProps = {
    app: props.app,
    pageContext: props.pageContext,
    slug: props.uri
  }

  // Figure out what page to load
  switch (props.pageContext.slug) {
    case '/404':
      return <NotFoundPage {...pageProps} />
    case '/language':
      return <LanguagePage {...pageProps} />
    case '/search':
      return <SearchPage {...pageProps} />
    default:
      return <DocumentationPage {...pageProps} />
  }
}

export default MainPage
