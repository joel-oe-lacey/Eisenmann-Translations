import React, { useState } from "react"
import { graphql, StaticQuery } from "gatsby"
import { makeStyles, styled } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});

const StyledNav = styled(Menu)({
    height: '10%',
    width: '100%',
    opacity: '.5',
    backgroundColor: 'blue',
    position: 'fixed',
})


//nav menu in theory should be generated dynamically from markdown, would make this more extensible. But a similar extension.

//can just take similar logic from blogindex 
//just need to work out the division points

const FetchNav = ({ data }) => { 
  const classes = useStyles();
  const [triggered, setTrigger] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setTrigger(open);
  };

  // const posts = data.allMarkdownRemark.edges
  console.log('navPost', data)

  const list = () => (
    <div
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {/* <ListItemLink href="#simple-list">
          <ListItemText primary="Spam" />
        </ListItemLink> */}
        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
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