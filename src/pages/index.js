import React from "react"
import { graphql } from "gatsby"
import styled from 'styled-components'
import Layout from "../components/layout"
import SEO from "../components/seo"
import {
  useIntl
} from "gatsby-plugin-intl"
import {
  groupPagesByLocale
} from '../../helpers'
import {
  rhythm
} from "../utils/typography"

const Info = styled.section`
    height: 100%;
    width: 100%;
    padding: ${rhythm(2.5)};
`;

const BlogIndex = ({ data, location }) => {
  const intl = useIntl();
  const posts = groupPagesByLocale(data.allMarkdownRemark.edges)
  const localizedPost = posts[intl.locale];
  const siteTitle = localizedPost.frontmatter.title

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="All posts" />
      <Info dangerouslySetInnerHTML={{ __html: localizedPost.html }} />
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
    allMarkdownRemark(filter: {
      frontmatter: {
        groupingID: {
          eq: 3
        }
      }
    }) {
      edges {
        node {
          html
          frontmatter {
            title
            category
            locale
          }
          fields {
            slug
          }
        }
      }
    }
  }
`
