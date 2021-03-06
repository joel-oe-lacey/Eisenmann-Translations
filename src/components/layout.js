import React from "react"
import styled, {
  createGlobalStyle
} from 'styled-components'
import {
  Link
} from "gatsby"
import Fab from '@material-ui/core/Fab';
import { Nav } from "../components/nav";
import { Header } from "../components/header";
import { Footer } from "../components/footer";
import LangSwitch from './langSwitch';
import {
  createMuiTheme,
  withStyles
} from '@material-ui/core/styles';
import {
  ThemeProvider
} from '@material-ui/styles';
import red from '@material-ui/core/colors/red';
import {
  useIntl,
} from "gatsby-plugin-intl"


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

const ContactPipeline = withStyles({
    root: {
      width: '8rem',
    },
})(Fab);

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

const Toolkit = styled.section`
  height: max-content;
  width: max-content;
  right: 0;
  bottom: 0;
  position: fixed;
  margin: 1.5rem;
`;

const Layout = ({ location, title, children }) => {
  const intl = useIntl();

  return (
    <ThemeProvider theme={theme}>
      <Wrapper>
        <GlobalStyle />
        <Nav/>
        <Header location={location} title={title}/>
        <StyledBody>{children}</StyledBody>
        <Footer/>
        <Toolkit>
          <LangSwitch />
          <Link to="/about/prices">
            <ContactPipeline variant="extended" color="primary" aria-label="contact us">
              {intl.formatMessage({ id: "contact" })}
            </ContactPipeline>
          </Link>
        </Toolkit>
      </Wrapper>
    </ThemeProvider>
  )
}

export default Layout;
