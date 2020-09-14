import React from "react"
import {
  graphql,
  StaticQuery
} from "gatsby"
import Image from "gatsby-image"
import styled from 'styled-components'
// import { makeStyles, styled } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Link from './link';
import TableFooter from '@material-ui/core/TableFooter';

const StyledFooter = styled(TableFooter)({
    height: 'min-height',
    width: '100%',
    backgroundColor: '#333333',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
})

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
                      
                      return (
                      <Link to={slug}>
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
        <Image
        fixed={data.banner.childImageSharp.fixed}
        alt="A banner of tiled greyscale landscape shots" />
        <Image
        fixed={data.certification.childImageSharp.fixed}
        alt="A blue BDU certification badge" />
        {list()}
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
          allMarkdownRemark {
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