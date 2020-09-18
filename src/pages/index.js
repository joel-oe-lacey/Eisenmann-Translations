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
`;

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.markdownRemark.frontmatter.title
  const post = data.markdownRemark

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="All posts" />
      <Info dangerouslySetInnerHTML={{ __html: post.html }} />
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(frontmatter: { title: { eq: "About Us" } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
        category
      }
    }
  }
`
