import React from "react"
import { Link, graphql } from "gatsby"
import styled from 'styled-components'

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import LangSelector from "../components/languageSelector"
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
      {post.frontmatter.category === "Languages" && <LangSelector />}
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
        category 
      }
    }
  }
`
