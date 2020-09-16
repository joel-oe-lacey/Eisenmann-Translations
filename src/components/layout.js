import React from "react"
import styled, {
  createGlobalStyle
} from 'styled-components'

// import { rhythm, scale } from "../utils/typography"
// import {
//   styled as styledUI
// } from '@material-ui/core/styles';

import Fab from '@material-ui/core/Fab';
import Nav from "../components/nav";
import Header from "../components/header";
import Footer from "../components/footer";
import reset from 'styled-reset';
import Link from './link';

import {
  createMuiTheme
} from '@material-ui/core/styles';
import {
  ThemeProvider
} from '@material-ui/styles';
import red from '@material-ui/core/colors/red';

const theme = createMuiTheme({
  palette: {
    primary: red,
  },
});

const GlobalStyle = createGlobalStyle`

  body, 
  html,
  #___gatsby {
    height: 100%;
    width: 100%;
  }
`
const Wrapper = styled.section`
    height: 100vh;
    // width: 100vh;
    display: flex;
    flex-direction: column;
`;

const StyledBody = styled.main`
    height: min-content;
    width: 100%;
    padding: 2rem;

    h1 {
      color: #f44336;
      margin: 1rem 0 1rem 0;
      font-size: 2.5rem;
    }

    h2 {
      color: #f44336;
      margin: .5rem 0 .5rem 0;
      font-size: 1.8rem;
    }

    h3 {
      color: #f44336;
      margin: .5rem 0 .5rem 0;
      font-size: 1.5rem;
    }
  
    h4 {
      color: #f44336;
      margin: .5rem 0 .5rem 0;
      font-size: 1.25rem;
    }

    p {
      margin: .5rem 0 .5rem 0;
    }

    li {
      margin-top: .5rem;
      margin-left: 2rem;

      p {
        font-weight: bold;
      }
    }
`;

const StyledFAB = styled(Fab)({
  position: 'fixed',
  right: 0,
  bottom: 0,
  margin: '3rem',
});

const Layout = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`

  return (
    <ThemeProvider theme={theme}>
      <Wrapper>
        <GlobalStyle />
        <Nav/>
        <Header title={title}/>
        <StyledBody>{children}</StyledBody>
        <Footer/>
        <Link to="/about/prices">
          <StyledFAB variant="extended" color="primary" aria-label="contact us">
            Contact Us
          </StyledFAB>
        </Link>
      </Wrapper>
    </ThemeProvider>
  )
}

export default Layout;
