import React from "react"
import { graphql } from "gatsby"
import styled from 'styled-components'
import Layout from "../components/layout"
import SEO from "../components/seo"
import { LangInfoSelector } from "../components/langInfoSelector"
import {
  useIntl
} from "gatsby-plugin-intl"
import {
  groupPagesByLocale
} from '../../helpers'
import {
  rhythm
} from "../utils/typography"
import { useRemarkForm } from 'gatsby-tinacms-remark'
import { usePlugin } from 'tinacms'

const Info = styled.section`
    height: 100%;
    width: 100%;
    padding: ${rhythm(2.5)};
`;

const SitePages = ({ data, location }) => {
  const intl = useIntl();
  const posts = groupPagesByLocale(data.allMarkdownRemark.edges)
  const localizedFetch = posts[intl.locale];

  const formOptions = {
    fields: [
      {
        label: "Title",
        name: "rawFrontmatter.title",
        component: "text",
      },
      {
        component: 'select',
        name: 'rawFrontmatter.type',
        label: 'Page Type',
        description: 'What sort of page is this?',
        options: ['pages', 'blog'],
      },
      {
        label: "Page Category",
        description: 'What menu section should this be under?',
        name: "rawFrontmatter.category",
        component: "text",
      },
      {
        label: "Description",
        name: "rawFrontmatter.description",
        description: 'What page description should Google see?',
        component: "text",
      },
      {
        label: "Grouping ID",
        name: "rawFrontmatter.groupingID",
        component: "number",
      },
      {
        label: "Display Link",
        name: "rawFrontmatter.linkDisplay",
        component: "toggle",
      },
      {
        component: 'select',
        name: 'rawFrontmatter.locale',
        label: 'Locale',
        options: ['en', 'de'],
      },
      {
        component: 'textarea',
        name: 'rawMarkdownBody',
        label: 'Body',
      },
    ]
  }
  
  const [localizedPost, form] = useRemarkForm(localizedFetch, formOptions)
  usePlugin(form)

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

export default SitePages

export const pageQuery = graphql`
  query SitePagesBySlug($groupingID: Int!) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(filter: {frontmatter: {groupingID: {eq: $groupingID}}}) {
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
          ...TinaRemark
        }
      }
    }
  }
`
