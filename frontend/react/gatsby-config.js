/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-config/
 */

/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
  siteMetadata: {
    title: `Enshrouded Technologies LLC`,
    description: `Consulting, Development, Gaming: Enshrouded Technologies can help you with your next project. Check us out and send us a line.`,
    author: `Tristan Hilbert`,
    siteUrl: `https://www.enshrouded-tech.com/`,
  },
  plugins: [
    `gatsby-plugin-image`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-postcss`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images/`,
        // Ignore files starting with a dot
        ignore: [`**/\.*`],
      },
    },
  ],
}
