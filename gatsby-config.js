require('dotenv').config()
const searchData = require('./src/algolia')


const plugins = [
  `gatsby-plugin-sass`,
  {
    resolve: 'gatsby-plugin-nprogress',
    options: {
      color: '#74c0fc'
    }
  },
  {
    resolve: 'gatsby-source-filesystem',
    options: {
      path: `${__dirname}/monorepo/markdown/dev`,
      name: 'markdown',
      ignore: [
        '**/nl.md',
        '**/es.md',
        '**/fr.md',
        '**/de.md',
      ]
    }
  },
  {
    resolve: 'gatsby-plugin-mdx',
    options: {
      extensions: ['.mdx', '.md'],
      // Plugins workaround. See: https://github.com/gatsbyjs/gatsby/issues/15486
      plugins: [
        {
          resolve: 'gatsby-remark-images',
          options: {
            maxWidth: 800,
            showCaptions: ['title', 'alt'],
            markdownCaptions: true,
            backgroundColor: `, 0 1px 3px 0 rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.14), 0 2px 1px -1px rgba(0, 0, 0, 0.12)`
          }
        }
      ],
      gatsbyRemarkPlugins: [
        {
          resolve: 'gatsby-remark-images',
          options: {
            maxWidth: 800,
            showCaptions: ['title', 'alt'],
            backgroundColor: `transparent`,
          }
        },
        {
          resolve: 'gatsby-remark-prismjs',
          options: {
            classPrefix: 'language-',
            inlineCodeMarker: null,
            aliases: {}
          }
        },
        'gatsby-remark-copy-linked-files',
        {
          resolve: 'gatsby-remark-autolink-headers',
          options: {
            elements: ['h2','h3']
          }
        },
        'gatsby-remark-smartypants',
      ]
    }
  },
  'gatsby-plugin-sharp',
  'gatsby-transformer-sharp',
  'gatsby-plugin-styled-components',
  'gatsby-plugin-catch-links',
  'gatsby-plugin-react-helmet',
  {
    resolve: `gatsby-plugin-manifest`,
    options: {
      name: `FreeSewing`,
      short_name: `FreeSewing`,
      start_url: `/`,
      background_color: `#ffffff`,
      theme_color: `#212529`,
      display: `standalone`,
      icon: `src/images/logo.svg`
    }
  },
  'gatsby-plugin-offline',
  'gatsby-plugin-netlify'
]

// Only update the Algolia indices when having the ALGOLIA_UPDATE_KEY set.
//   Most likely on deployment to production only
if (process.env.CONTEXT === 'production' && process.env.HEAD === 'main') {
  plugins.push({
    resolve: 'gatsby-plugin-algolia',
    options: {
      appId: process.env.GATSBY_ALGOLIA_API_ID,
      apiKey: process.env.ALGOLIA_UPDATE_KEY,
      queries: searchData(),
      chunkSize: 10000
    }
  })
}

module.exports = { plugins: plugins }
