const i18n = require("@freesewing/i18n").strings
const capitalize = require("@freesewing/utils/capitalize")

const  translate = key => i18n[process.env.GATSBY_LANGUAGE][key] || key

const pageTitle = (slug, page) => {
  if (typeof page === "undefined") {
    throw "No page found for "+slug
  }
  else if (typeof page.frontmatter === "undefined") {
    throw "No frontmatter found for "+slug+"\n"+JSON.stringify(page, null, 2)
  }
  else if (typeof page.frontmatter.title === "undefined") {
    throw "No title found for "+slug+"\n"+JSON.stringify(page.frontmatter, null, 2)
  }
  if (typeof page.frontmatter.title !== "undefined") return page.frontmatter.title

  return slug
}

const getTitles = mdxPages => {
  let titles = {}
  for (let slug in mdxPages) titles[slug] = pageTitle(slug, mdxPages[slug])

  return titles
}

module.exports = {
  translate,
  pageTitle,
  getTitles,
  capitalize
}


