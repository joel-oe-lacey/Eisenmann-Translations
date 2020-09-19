import React from "react"
import {
  Link,
  graphql,
  StaticQuery
} from "gatsby"
import Image from "gatsby-image"
import styled from 'styled-components'
// import { makeStyles, styled } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import TableFooter from '@material-ui/core/TableFooter';

const StyledFooter = styled(TableFooter)({
    height: 'min-height',
    width: '100%',
    backgroundColor: '#333333',
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'space-between',
    padding: '3rem'
})

const Certification = styled.section`
    height: min-content;
    width: 40%;
    padding: 1rem;
    border: 1px solid lightgrey;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    color: lightgrey;
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
  const postsByCategory = data.allMarkdownRemark.edges.reduce((groupPosts, { node }) => {
    const category = node.frontmatter.category ? node.frontmatter.category : 'none';

    if (!groupPosts[category]) {
      groupPosts[category] = [node]
    } else {
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
                      <Link to={redirect ? redirect : slug}>
                        <ListItem button key={title}>
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
        {/* <Image
        fixed={data.banner.childImageSharp.fixed}
        alt="A banner of tiled greyscale landscape shots" /> */}
        {list()}
        <Certification>
          <p>This is a certification badge, need localization</p>
          <Link to="/about/team">
            <Image
            fixed={data.certification.childImageSharp.fixed}
            alt="A blue BDU certification badge" />
          </Link>
        </Certification>
        <Legal>
          <p>Data Privacy Link</p>
          <p>© {new Date().getFullYear()} Eisenmann Uebersetzungen,</p>
          <p>Built with {` `} <a href="https://www.gatsbyjs.org">Gatsby</a></p>
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
                category: {
                  eq: "About"
                }
              }
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