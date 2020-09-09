import React, { useState } from "react"
import { graphql, StaticQuery } from "gatsby"
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

const StyledNav = styled.nav `
    height: 10%;
    width: 100%;
    opacity: .5;
    background-color: blue;
    position: fixed;
`;

//take data.reduce
//go through and add HTML to thing
//add tracker for current node.frontmatter.category
//when different, add divider and continue

const FetchNav = ({ data }) => { 
  const classes = useStyles();
  const [triggered, setTrigger] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setTrigger(open);
  };

  const posts = data.allMarkdownRemark.edges
  const rootPath = `${__PATH_PREFIX__}/`

  const list = () => (
    <div
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      {posts.map(({ node }) => {
        const slug = node.fields.slug;
        const title = node.frontmatter.title;
        return (
            <Link to={slug}>
              <ListItemText primary={title} />
            </Link>
        );
      })}
    </div>
  );

  return (
    <StyledNav>
      <React.Fragment key='click'>
        <Button onClick={toggleDrawer(true)}>
          <MenuIcon />
        </Button>
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
        }
      `}
      render={data => <FetchNav data={data} />}
    />
  )
}

export default Nav