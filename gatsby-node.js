const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

const trimPath = str => {
  const lastDirectoryIndex = str.lastIndexOf('/') + 1;
  const trimCount = -(str.length - lastDirectoryIndex);

  return str.slice(0, trimCount)
}

const groupMarkdownByPath = markdown => {
  return markdown.reduce((pagesByPath, {
    node
  }) => {
    const path = trimPath(node.fileAbsolutePath);

    if (!pagesByPath[path]) {
      pagesByPath[path] = { [node.frontmatter.locale] : node }
    } else {
      pagesByPath[path][node.frontmatter.locale] = node
    }

    return pagesByPath;
  }, {})
}


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
  const markdownGroupedByPath = groupMarkdownByPath(posts)

  posts.forEach((post, index) => {
    const previous = index === posts.length - 1 ? null : posts[index + 1].node
    const next = index === 0 ? null : posts[index - 1].node
    const type = post.node.frontmatter.type

    const groupPath = trimPath(post.node.fileAbsolutePath);
    const pairedPosts = markdownGroupedByPath[groupPath]

    if (type === 'pages') {
      createPage({
        path: post.node.fields.slug,
        component: sitePages,
        context: {
          slug: post.node.fields.slug,
          versions: pairedPosts,
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
          versions: pairedPosts,
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
