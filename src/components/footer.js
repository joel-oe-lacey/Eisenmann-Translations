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
    backgroundColor: 'grey',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end'
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
                      <ListItem button key={title}>
                        <Link to={slug}>
                          <ListItemText primary={title} />
                        </Link>
                      </ListItem>
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
          avatar: file(absolutePath: { regex: "/Banner_Ende.png/" }) {
            childImageSharp {
              fixed(width: 960, height: 100) {
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