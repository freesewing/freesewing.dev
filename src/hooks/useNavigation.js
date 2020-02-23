import { useStaticQuery, graphql } from 'gatsby'

/* this hook builds the documentation structure and navigation based on MDX content */

function useNavigation(app) {
  // Gets the web URL slug from file path
  const slugFromFilePath = filePath => {
    return (
      '/' +
      filePath
        .match(/[/|\\]markdown[/|\\]dev[/|\\](.*)/)
        .pop()
        .slice(0, -5)
    )
  }

  // Gets the web URL slug for part of a path
  const slugFor = function(a, b, c, d, e) {
    let chunks = []
    if (a) chunks.push(a)
    if (b) chunks.push(b)
    if (c) chunks.push(c)
    if (d) chunks.push(d)
    if (e) chunks.push(e)

    return '/' + chunks.join('/') + '/'
  }

  // Gets the page title for a given slug
  const pageTitle = (slug, page) => {
    if (typeof page === 'undefined') {
      console.log('No page found for ' + slug)
      return ''
    } else if (typeof page.frontmatter === 'undefined') {
      console.log('No frontmatter found for ' + slug + '\n' + JSON.stringify(page, null, 2))
      return ''
    } else if (typeof page.frontmatter.title === 'undefined') {
      console.log('No title found for ' + slug + '\n' + JSON.stringify(page.frontmatter, null, 2))
      return ''
    }

    return page.frontmatter.title
  }

  const getTitlesAndPages = mdx => {
    let titles = {}
    let pages = {}
    for (let edge of mdx.docs.edges) {
      let slug = slugFromFilePath(edge.node.fileAbsolutePath)
      titles[slug] = cleanTitle(pageTitle(slug, edge.node))
      pages[slug] = edge.node
    }

    return { titles, pages }
  }

  const getTree = pages => {
    const tree = {}

    // Add documentation from MDX pages
    // Better make sure they are in order
    for (let slug of Object.keys(pages).sort()) {
      addToTree(slug, pages[slug], tree)
    }

    // Now force order among children based on title
    for (let level in tree) tree[level] = sortByTitle(tree[level])

    return tree
  }

  const sortByTitle = tree => {
    let sorted = []
    for (let slug in tree.children) sorted.push(tree.children[slug].title + '+' + slug)
    sorted.sort()
    let children = {}
    for (let s of sorted) {
      let [title, slug] = s.split('+')
      children[slug] = {
        ...tree.children[slug],
        title: cleanTitle(title)
      }
    }
    tree.children = children
    // Recursively do the same for children
    for (let level in tree.children) tree.children[level] = sortByTitle(tree.children[level])

    return tree
  }

  const cleanTitle = title => (title.indexOf('|') === -1 ? title : title.split('|')[1])

  const addToTree = function(slug, page, tree) {
    let [a, b, c, d, e] = slug.slice(1, -1).split('/')
    let target
    try {
      if (e) {
        target =
          tree[slugFor(a)].children[slugFor(a, b)].children[slugFor(a, b, c)].children[
            slugFor(a, b, c, d)
          ].children
      } else if (d)
        target = tree[slugFor(a)].children[slugFor(a, b)].children[slugFor(a, b, c)].children
      else if (c) target = tree[slugFor(a)].children[slugFor(a, b)].children
      else if (b) target = tree[slugFor(a)].children
      else if (a) target = tree
      target[slugFor(a, b, c, d, e)] = { title: pageTitle(slug, page), children: {} }
    } catch (err) {
      console.log('Could not add page to tree', { err, slug, page, tree, a, b, c, d, e })
    }
    return
  }

  const mdx = useStaticQuery(graphql`
    {
      docs: allMdx(
        filter: { fileAbsolutePath: { regex: "//markdown/dev/(?!ui).*/*.md/" } }
        sort: { fields: fileAbsolutePath, order: ASC }
      ) {
        edges {
          node {
            frontmatter {
              title
            }
            fileAbsolutePath
          }
        }
      }
    }
  `)

  const { titles, pages } = getTitlesAndPages(mdx)
  const tree = getTree(pages)

  const getTitle = slug => titles[slug]

  return {
    titles,
    tree,
    getTitle
  }
}

export default useNavigation
