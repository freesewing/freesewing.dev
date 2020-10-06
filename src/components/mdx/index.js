import React from 'react'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { MDXProvider } from '@mdx-js/react'

import Blockquote from '@freesewing/components/Blockquote'
import ReadMore from './readmore'
import YouTube from '../youtube'
import Example from '@freesewing/components/Example'

const customComponents = {
  Note: ({ children }) => <Blockquote type="note">{children}</Blockquote>,
  Tip: ({ children }) => <Blockquote type="tip">{children}</Blockquote>,
  Warning: ({ children }) => <Blockquote type="warning">{children}</Blockquote>,
  Fixme: ({ children }) => <Blockquote type="fixme">{children}</Blockquote>,
  ReadMore: props => <ReadMore {...props} />,
  YouTube,
  Example,
}

const Mdx = ({ node, offspring, orderedOffspring }) => {
  customComponents.ReadMore = (props) => <ReadMore {...props} offspring={offspring} orderedOffspring={orderedOffspring} />
  return (
    <section id="mdx">
      <MDXProvider components={customComponents}>
        <MDXRenderer>{node.body}</MDXRenderer>
      </MDXProvider>
    </section>
  )
}

export default Mdx
