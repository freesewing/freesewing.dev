import React from 'react'

const renderLevel = items => (
  <ul>
    {items.map(heading => (
      <li key={heading.url}>
        <a href={heading.url} title={heading.title}>
          {heading.title}
        </a>
        {heading.items && renderLevel(heading.items)}
      </li>
    ))}
  </ul>
)

const MdxToc = ({ toc, app }) => {
  if (!toc.items) return null
  else return renderLevel(toc.items)
}

export default MdxToc
