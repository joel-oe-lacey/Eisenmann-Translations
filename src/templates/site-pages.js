import React from "react"
import { Link, graphql } from "gatsby"
import styled from 'styled-components'

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm } from "../utils/typography"

const Info = styled.section`
    height: 100%;
    width: 100%;
    background-color: honeydew;
`;


const BlogIndex = ({ data, location }) => {
  // const siteTitle = data.site.siteMetadata.title
  const siteTitle = 'test'
  const post = data.markdownRemark

  console.log('postStructure', post)

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="All posts" />
      <Info dangerouslySetInnerHTML={{ __html: post.html }} />
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql `
  query SitePagesBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
      }
    }
  }
`
