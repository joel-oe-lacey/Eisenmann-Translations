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

const BlogIndex = ({ data, pageContext, location }) => {
  const intl = useIntl()
  const {
    versions
  } = pageContext;
  const localizedPost = versions[intl.locale];

  const siteTitle = localizedPost.frontmatter.title
  const category = localizedPost.frontmatter.category

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="All posts" />
      {category === "Languages" && <LangInfoSelector />}
      <Info dangerouslySetInnerHTML={{ __html: localizedPost.html }} />
    </Layout>
  )
}

export default BlogIndex

// export const pageQuery = graphql`
//   query SitePagesBySlug($slug: String!) {
//     site {
//       siteMetadata {
//         title
//       }
//     }
//     markdownRemark(fields: { slug: { eq: $slug } }) {
//       id
//       excerpt(pruneLength: 160)
//       html
//       frontmatter {
//         title
//         date(formatString: "MMMM DD, YYYY")
//         description
//         category 
//       }
//     }
//   }
// `
