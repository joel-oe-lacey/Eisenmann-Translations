import React, { useState } from "react"
import { Link, graphql, StaticQuery } from "gatsby"
import styled from 'styled-components'
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import MenuIcon from '@material-ui/icons/Menu';
import Fab from '@material-ui/core/Fab';
import {
  changeLocale
} from "gatsby-plugin-intl"


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

const HomeLink = styled.h2`
  margin: 0;
  text-shadow: 0.03em 0 #fff, -0.03em 0 #fff, 0 0.03em #fff, 0 -0.03em #fff;
  color: black;
`

const StyledFAB = styled(Fab)({
  marginLeft: 'calc(45% + 10rem)'
});

const FetchNav = ({ data }) => { 
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
                      //Used to allow easy additions of redirects via markdown
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
        <Link to='/'>
          <HomeLink>Eisenmann Translation</HomeLink>
        </Link>
        <StyledFAB variant="extended" color="secondary" aria-label="change lang" onClick={changeLocale('de')}>
          Lang
        </StyledFAB>
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
          allMarkdownRemark(filter: {
              frontmatter: {
                linkDisplay: {
                  eq: true
                }
              }
            }, sort: {
            fields: frontmatter___categoryIndex
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