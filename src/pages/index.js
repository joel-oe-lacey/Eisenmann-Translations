import React from "react"
import { graphql } from "gatsby"
import styled from 'styled-components'
import Layout from "../components/layout"
import SEO from "../components/seo"

import {
  rhythm
} from "../utils/typography"

const Info = styled.section`
    height: 100%;
    width: 100%;
    padding: ${rhythm(2.5)};
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
    markdownRemark(frontmatter: { category: { eq: "Landing" } }) {
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
