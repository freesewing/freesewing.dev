import { useStaticQuery, graphql } from 'gatsby'
import set from 'lodash.set'

const alwaysDrop = [ '404.html' ]

// Add titles for non-mdx pages here
const titles = {
  search: 'Search',
}

const getTitle = (slug, page, chunks) => {
  if (alwaysDrop.indexOf(chunks[0]) !== -1) return false
  if (!page.title) return titles[slug]
    ? titles[slug]
    : false

  return page.title
}

const slugChunks = (slug) => {
  const chunks = []
  for (const chunk of slug.split('/')) {
    if (chunk.length > 0) chunks.push(chunk)
  }

  return chunks
}

const decorateTree = (tree, slug, page) => {
  let index
  let chunks = slugChunks(slug)
  if (chunks.length === 0) return tree
  let title = getTitle(slug, page, chunks)
  if (title) set(tree, chunks.join('.offspring.'), { title, slug, ordertitle: page.order + title })

  return tree
}

const buildTree = (pages) => {
  let tree = {}
  for (let slug of Object.keys(pages).sort()) {
    tree = decorateTree(tree, slug, pages[slug])
  }

  return tree
}

function useTree() {
  // Static query
  const data = useStaticQuery(graphql`
    {
      pages: allSitePage(
        filter: {
          path: {
            nin: [
              "/dev-404-page/"
              "/404/"
              "/404.html"
              "/"
              "/search/"
            ]
          }
        }
      ) {
        edges {
          node {
            path
            context {
              title
              order
            }
          }
        }
      }
    }
  `)
  const pages = {}
  for (let edge of data.pages.edges) pages[edge.node.path] = edge.node.context
  const pageTree = buildTree(pages)

  return { offspring: pageTree }
}

export default useTree
