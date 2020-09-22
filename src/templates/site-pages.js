import React from "react"
import { graphql } from "gatsby"
import styled from 'styled-components'
import Layout from "../components/layout"
import SEO from "../components/seo"
import LangInfoSelector from "../components/langInfoSelector"
import {
  useIntl
} from "gatsby-plugin-intl"

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
  const category = post.frontmatter.category
  const intl = useIntl()
  console.log('lang', intl)

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="All posts" />
      {category === "Languages" && <LangInfoSelector />}
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
