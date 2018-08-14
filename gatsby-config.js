module.exports = {
  siteMetadata: {
    title: 'Cosmic Byte - Intergalactic Tech News powered by Cosmic.js!',
    nav: [{ slug: '/', name: 'Home' },
      { slug: '/about', name: 'About' },
      { slug: '/contact', name: 'Contact' },
      { slug: '/not-found', name: 'Not Found' },
    ]
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    `gatsby-plugin-sass`,
    {
      resolve: `gatsby-source-cosmicjs`,
      options: {
        bucketSlug: process.env.COSMIC_BUCKET || `cosmic-byte`,
        objectTypes: [`posts`, `tags`, `pages`],
        // If you have enabled read_key to fetch data (optional).
        apiAccess: {
          read_key: ``,
        }
      }
    },
  ],
}
