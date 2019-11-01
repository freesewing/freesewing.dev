const utils = require("./utils")

const tree = {
  '/docs/': {
    title: utils.translate('app.docs'),
    children: {}
  },
}

const buildNavigation = (mdxPages, titles) => {
  // Add documentation from MDX pages
  for (let slug of Object.keys(mdxPages).sort()) {
    if (slug.slice(0,6) === "/docs/") addToTree(slug, mdxPages[slug], tree)
  }

  return tree
}


const addToTree = function(slug, page, tree) {
  let [a,b,c,d,e] = slug.slice(1,-1).split('/')
  let target
  if (e) target = tree[slugFor(a)].children[slugFor(a,b)].children[slugFor(a,b,c)].children[slugFor(a,b,c,d)].children
  else if (d) target = tree[slugFor(a)].children[slugFor(a,b)].children[slugFor(a,b,c)].children
  else if (c) target = tree[slugFor(a)].children[slugFor(a,b)].children
  else if (b) target = tree[slugFor(a)].children
  else if (a) target = tree
  target[slugFor(a,b,c,d,e)] = { title: utils.pageTitle(slug, page), children: {} };

  return
}

const slugFor = function(a,b,c,d,e) {
  let chunks = []
  if (a) chunks.push(a)
  if (b) chunks.push(b)
  if (c) chunks.push(c)
  if (d) chunks.push(d)
  if (e) chunks.push(e)

  return '/'+chunks.join('/')+'/'
}

module.exports = buildNavigation

