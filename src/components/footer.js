import React from "react"
import {
  Link,
  graphql,
  StaticQuery
} from "gatsby"
import Image from "gatsby-image"
import styled from 'styled-components'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import {
  useIntl
} from "gatsby-plugin-intl"

const StyledFooter = styled.footer`
    height: min-content;
    width: 100%;
    background-color: #333333;
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    padding: 3rem;
    margin: 0;
    @media (max-width: 1100px) {
      flex-flow: column;
    }
`;

const Certification = styled.section`
    height: min-content;
    width: min-content;
    padding: 1rem;
    border: 1px solid lightgrey;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    color: lightgrey;

    > p {
      margin-right: 2rem;
    }

    @media (max-width: 1100px) {
      width: 100%;
    }
`;

const Legal = styled.section`
    height: 20%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    color: lightgrey;
    align-items: center;
`;

const FetchFooter = ({ data }) => { 
  const intl = useIntl();
  const locale = intl.locale;

  const postsByCategory = data.allMarkdownRemark.edges.reduce((groupPosts, { node }) => {
    const category = node.frontmatter.category ? node.frontmatter.category : 'none';
    const markdownLocale = node.frontmatter.locale;
    const redirect = node.frontmatter.redirectLink;

    if (!groupPosts[category] && (markdownLocale === locale || (markdownLocale === locale &&redirect))) {
      groupPosts[category] = [node]
    } else if (markdownLocale === locale || (markdownLocale === locale && redirect)) {
      groupPosts[category].push(node)
    }

    return groupPosts;
  }, {})

  const list = () => (
    <React.Fragment>
        {
          Object.keys(postsByCategory).map(category => {
            return (
              <React.Fragment key={category}>
                <List>
                  <ListSubheader>{category}</ListSubheader>
                  {
                    postsByCategory[category].map(node => {
                      const slug = node.fields.slug;
                      const title = node.frontmatter.title;
                      const redirect = node.frontmatter.redirectLink;
                      
                      return (
                      <Link to={redirect ? redirect : slug} key={title}>
                        <ListItem button>
                            <ListItemText primary={title} />
                        </ListItem>
                      </Link>
                      )
                    })
                  }
                </List>
              </React.Fragment>
            )
          })
        }
    </React.Fragment>
  );

  return (
    <StyledFooter>
        {list()}
        <Certification>
          <p>{intl.formatMessage({ id: "cert" })}</p>
          <Link to="/about/team">
            <Image
            fixed={data.certification.childImageSharp.fixed}
            alt="A blue BDÜ certification badge" />
          </Link>
        </Certification>
        <Legal>
          <p>© {new Date().getFullYear()} Eisenmann Uebersetzungen</p>
          <p>{intl.formatMessage({ id: "gatsby" })} {` `} <a href="https://www.gatsbyjs.org">Gatsby</a></p>
          <a href="">Data Privacy</a>
        </Legal>
    </StyledFooter>
  )
}

const Footer = () => {
    return (
    <StaticQuery
      query={graphql`
        query {
          site {
            siteMetadata {
              title
            }
          }
          allMarkdownRemark(filter: {
              frontmatter: {
                linkDisplay: {
                  eq: true
                }
              }
            }, sort: {
            fields: frontmatter___groupingID
            }) {
            edges {
              node {
                excerpt
                fields {
                  slug
                }
                frontmatter {
                  title
                  type
                  category
                  redirectLink
                  locale
                }
              }
            }
          }
          banner: file(absolutePath: { regex: "/Banner_Unten.jpg/" }) {
            childImageSharp {
              fixed(width: 960, height: 50) {
                ...GatsbyImageSharpFixed
              }
            }
          }
          certification: file(absolutePath: { regex: "/BDUE-Mitglied-Logo.jpg/" }) {
            childImageSharp {
              fixed(width: 100, height: 145) {
                ...GatsbyImageSharpFixed
              }
            }
          }
        }
      `}
      render={data => <FetchFooter data={data} />}
    />
  )
}

export default Footer