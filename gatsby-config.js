require("dotenv").config()
const searchData = require('./src/algolia')

const plugins = [
  {
  	resolve: `gatsby-plugin-nprogress`,
  	options: {
  	  color: "#37b24d",
  	  //showSpinner: false,
  	},
	},
  {
    resolve: 'gatsby-source-filesystem',
    options: {
      path: `${__dirname}/markdown/dev`,
      name: 'markdown',
    },
  },
  {
    resolve: `gatsby-plugin-mdx`,
    options: {
      extensions: ['.mdx', '.md'],
      // Plugins workaround. See: https://github.com/gatsbyjs/gatsby/issues/15486
      plugins: [
        {
          resolve: 'gatsby-remark-images',
          options: {
            maxWidth: 756
          }
        }
      ],
      gatsbyRemarkPlugins: [
        {
          resolve: 'gatsby-remark-images',
          options: {
            maxWidth: 1035,
          },
        },
        {
          resolve: `gatsby-remark-prismjs`,
          options: {
            classPrefix: 'language-',
            inlineCodeMarker: null,
            aliases: {
              mdx: 'md'
            },
          },
        },
        "gatsby-remark-copy-linked-files",
        "gatsby-remark-autolink-headers"
      ],
    },
  },
  'gatsby-plugin-sharp',
  'gatsby-transformer-sharp',
  'gatsby-plugin-styled-components',
  'gatsby-plugin-catch-links',
  'gatsby-plugin-react-helmet',
  'gatsby-plugin-offline',
]

// Only update the Algolia indices for production builds
if (process.env.CONTEXT === 'production') {
  plugins.push({
    resolve: 'gatsby-plugin-algolia',
    options: {
      appId: process.env.GATSBY_ALGOLIA_API_ID,
      apiKey: process.env.GATSBY_ALGOLIA_UPDATE_KEY,
      queries: searchData(process.env.GATSBY_LANGUAGE),
      chunkSize: 10000
    }
  })
}

module.exports = { plugins }

