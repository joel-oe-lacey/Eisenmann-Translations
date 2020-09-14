import React, { useState } from "react"
import { graphql, StaticQuery } from "gatsby"
import Image from "gatsby-image"
import styled from 'styled-components'
// import { makeStyles, styled } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Link from './link';

import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});

// const StyledNav = styled(Menu)({
//     height: '10%',
//     width: '100%',
//     opacity: '.5',
//     backgroundColor: 'blue',
//     position: 'fixed',
// })

const StyledNav = styled.nav`
    height: 10%;
    width: 100%;
    opacity: .5;
    background-color: transparent;
    display: flex;
    flex-direction: row;
    align-items: center;
    position: absolute;
    z-index: 1000;
`;

const FetchNav = ({ data }) => { 
  const classes = useStyles();
  const [triggered, setTrigger] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setTrigger(open);
  };

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
    <div
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
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
                <Divider />
              </React.Fragment>
            )
          })
        }
    </div>
  );

  return (
    <StyledNav>
      <React.Fragment key='click'>
        <Button onClick={toggleDrawer(true)}>
          <MenuIcon />
        </Button>
        <Image
          fixed={data.avatar.childImageSharp.fixed}
          alt="The company logo"
        />
        <Drawer anchor='left' open={triggered} onClose={toggleDrawer(false)}>
          {list()}
        </Drawer>
      </React.Fragment>
    </StyledNav>
  )
}

const Nav = () => {
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
      render={data => <FetchNav data={data} />}
    />
  )
}

export default Nav