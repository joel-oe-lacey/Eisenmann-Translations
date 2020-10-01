const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const blogPost = path.resolve(`./src/templates/blog-post.js`)
  const sitePages = path.resolve(`./src/templates/site-pages.js`)
  const result = await graphql(
    `
      {
        allMarkdownRemark(
          sort: { fields: [frontmatter___date], order: DESC }
          limit: 1000
        ) {
          edges {
            node {
              fields {
                slug
              }
              fileAbsolutePath
              html
              frontmatter {
                title
                type
                category
                locale
                groupingID
              }
            }
          }
        }
      }
    `
  )

  if (result.errors) {
    throw result.errors
  }

  // // Create blog posts pages.
  const posts = result.data.allMarkdownRemark.edges

  posts.forEach((post, index) => {
    const previous = index === posts.length - 1 ? null : posts[index + 1].node
    const next = index === 0 ? null : posts[index - 1].node
    const type = post.node.frontmatter.type
    const groupingID = post.node.frontmatter.groupingID

    if (type === 'pages') {
      createPage({
        path: post.node.fields.slug,
        component: sitePages,
        context: {
          slug: post.node.fields.slug,
          groupingID,
          previous,
          next,
        },
      })
    } else {
      createPage({
        path: post.node.fields.slug,
        component: blogPost,
        context: {
          slug: post.node.fields.slug,
          groupingID,
          previous,
          next,
        },
      })
    }
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}
