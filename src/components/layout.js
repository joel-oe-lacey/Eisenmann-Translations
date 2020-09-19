import React from "react"
import styled, {
  createGlobalStyle
} from 'styled-components'
import {
  Link
} from "gatsby"
import Fab from '@material-ui/core/Fab';
import Nav from "../components/nav";
import Header from "../components/header";
import Footer from "../components/footer";
import {
  createMuiTheme
} from '@material-ui/core/styles';
import {
  ThemeProvider
} from '@material-ui/styles';
import red from '@material-ui/core/colors/red';

// import {
//   rhythm
// } from "../utils/typography"

const theme = createMuiTheme({
  palette: {
    primary: red,
  },
});

const GlobalStyle = createGlobalStyle`
  body, 
  html,
  #___gatsby,
  #gatsby-focus-wrapper {
    height: 100%;
    width: 100%;
  }
`
const Wrapper = styled.section`
    height: 100vh;
    width: 100%;
    display: flex;
    flex-direction: column;
`;

const StyledBody = styled.main`
    height: min-content;
    width: 100%;
    background: white;
`;

const StyledFAB = styled(Fab)({
  position: 'fixed',
  right: 0,
  bottom: 0,
  margin: '3rem',
});

const Layout = ({ location, title, children }) => {
  return (
    <ThemeProvider theme={theme}>
      <Wrapper>
        <GlobalStyle />
        <Nav/>
        <Header location={location} title={title}/>
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
