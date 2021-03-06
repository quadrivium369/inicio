/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
const _ = require("lodash")
const path = require(`path`)
const { paginate } = require("gatsby-awesome-pagination")

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return new Promise((resolve, reject) => {
    const blogPost = path.resolve(`./src/templates/blog-single.js`)

    resolve(
      graphql(
        `
          {
            allContentfulColeccion {
              edges {
                node {
                  title
                  slug
                }
              }
            }
          }
        `
      ).then(result => {
        if (result.errors) {
          console.log(result.errors)
          reject(result.errors)
        }

        paginate({
          createPage,
          items: result.data.allContentfulColeccion.edges,
          itemsPerPage: 12,
          pathPrefix: "/colecciones",
          component: path.resolve("src/templates/blog-archive.js"),
        })

        const posts = result.data.allContentfulColeccion.edges

        posts.forEach((post, index) => {
          createPage({
            path: `/colecciones/${post.node.slug}/`,
            component: blogPost,
            context: {
              slug: post.node.slug,
              prev: index === 0 ? null : posts[index - 1].node,
              next: index === posts.length - 1 ? null : posts[index + 1].node,
            },
          })
        })
      })
    )
  })
}
