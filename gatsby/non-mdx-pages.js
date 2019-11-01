const translate = require("./utils").translate

const pageConfig =  {
  single: {
    // These are slug => title
    "/": "app.home",
    "/language": "account.language",
    "/search": "app.search",
    "/error": "error",
  },
  multiple: {
    // These are slug => matchPath regex
    "/404": "^\/?404\/?$",
  }
}


const getNonMdxPages = function() {
  const pages = {}
  for (let slug in pageConfig.single) {
    pages[slug] = {
      frontmatter: {
        title: translate(pageConfig.single[slug])
      }
    }
  }
  for (let slug in pageConfig.multiple) {
    pages[slug] = {
      frontmatter: {
        title: '' // Not relevant here
      },
      matchPath: pageConfig.multiple[slug]
    }
  }

  return pages
}

module.exports = getNonMdxPages()
