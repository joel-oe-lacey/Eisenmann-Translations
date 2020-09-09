import React, { useState } from "react"
import { Link } from "gatsby"
import styled from 'styled-components'
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});

const StyledNav = styled.nav`
    height: 10%;
    width: 100%;
    opacity: .5;
    background-color: blue;
    position: fixed;
`;

//nav menu in theory should be generated dynamically from markdown, would make this more extensible. But a similar extension.

const Nav = () => { 
  const classes = useStyles();
  const [triggered, setTrigger] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setTrigger(open);
  };

  const list = () => (
    <div
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
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
        <Button onClick={toggleDrawer(true)}>Click</Button>
        <Drawer anchor='click' open={triggered} onClose={toggleDrawer(false)}>
          {list()}
        </Drawer>
      </React.Fragment>
    </StyledNav>
  )
}

export default Nav
