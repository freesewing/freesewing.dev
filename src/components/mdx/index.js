import React from 'react'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { MDXProvider } from '@mdx-js/react'
import PrevNext from './prevnext'
import fromTree from '../../tree'

import Blockquote from '@freesewing/components/Blockquote'
import ReadMore from './readmore'
import YouTube from '../youtube'
import Example from '@freesewing/components/Example'
import Hashtag from '../hashtag'

const customComponents = {
  Note: ({ children }) => <Blockquote type="note">{children}</Blockquote>,
  Tip: ({ children }) => <Blockquote type="tip">{children}</Blockquote>,
  Warning: ({ children }) => <Blockquote type="warning">{children}</Blockquote>,
  Fixme: ({ children }) => <Blockquote type="fixme">{children}</Blockquote>,
  YouTube,
  Example: props => <Example {...props} design={props.design ? true : false} />,
  Hashtag
}

const Mdx = ({ node, slug, tree }) => {
  customComponents.ReadMore = (props) => <ReadMore {...props} pages={fromTree.getOffspring(slug, tree)}/>
  return (
    <section id="mdx">
      <MDXProvider components={customComponents}>
        <MDXRenderer>{node.body}</MDXRenderer>
      </MDXProvider>
    </section>
  )
}

export default Mdx
