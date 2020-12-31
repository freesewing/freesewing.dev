import orderBy from 'lodash.orderby'

function getNextFromList(branch, key) {
  let next = false
  let current = false
  for (let page of order(branch)) {
    if (current) next = page
    current = (page.key === key) ? true : false
  }

  return next
}

function getPrevFromList(branch, key) {
  let prev = false
  for (let page of order(branch)) {
    if (page.key === key) return prev
    prev = page
  }

  return prev
}

function getCurrentFromList(branch, key) {
  for (let page of order(branch)) {
    if (page.key === key) return page
  }

  return false
}

function getFirstOffspring(slug, tree) {
  let chunks = slug.split('/').slice(1,-1)
  for (let i=0; i < chunks.length; i++) tree = tree.offspring[chunks[i]]
  if (!tree.offspring) return false
  return order(tree.offspring)[0]
}

function getPrevSibling(slug, tree) {
  // FIXME
  let chunks = slug.split('/').slice(1,-1)
  for (let i=0; i < chunks.length-1; i++) tree = tree.offspring[chunks[i]]
  return getPrevFromList(tree.offspring, chunks.pop())
}

function getNextSibling(slug, tree) {
  let chunks = slug.split('/').slice(1,-1)
  for (let i=0; i < chunks.length-1; i++) tree = tree.offspring[chunks[i]]
  return getNextFromList(tree.offspring, chunks.pop())
}

function getNextParent(slug, tree) {
  let chunks = slug.split('/').slice(1,-1)
  let branch = {...tree}
  for (let i=0; i < chunks.length-1; i++) branch = branch.offspring[chunks[i]]
  let next = getNextFromList(branch.offspring, chunks.pop())
  if (next) return  next
  // FIXME: This hardcodes the last page, not great.
  if (chunks.length > 1 || chunks[0] !== 'translators') return getNextParent('/'+chunks.join('/')+'/', tree)
  return false
}

function getParent(slug, tree) {
  let chunks = slug.split('/').slice(1,-2)
  let branch = {...tree}
  for (let i=0; i < chunks.length-1; i++) branch = branch.offspring[chunks[i]]
  return getCurrentFromList(branch.offspring, chunks.pop())
}

function trimTree(slug, tree) {
  let chunks = slug.split('/').slice(1,-1)
  for (let i=0; i < chunks.length-1; i++) tree = tree.offspring[chunks[i]]

  return tree
}

function getSelf(slug, tree) {
  return trimTree(slug, tree).offspring[slug.split('/').slice(1,-1).pop()]
}

function order(pages) {
  let tmp = {}
  for (let key of Object.keys(pages)) tmp[key] = {
    ...pages[key],
    ordertitle: pages[key].order + pages[key].title,
    key
  }
  return orderBy(tmp, ['ordertitle'])
}

function getOffspring(slug, tree) {
  return order(getSelf(slug, tree).offspring)
}

function getNext(slug, tree) {
  let next = getFirstOffspring(slug, tree)
  if (!next) next = getNextSibling(slug, tree)
  if (!next) next = getNextParent(slug, tree)

  return next
}

function getPrev(slug, tree) {
  let prev = getPrevSibling(slug, tree)
  if (!prev) prev = getParent(slug, tree)

  return prev
}
export default {
  getNext,
  getPrev,
  getOffspring,
  order
}
