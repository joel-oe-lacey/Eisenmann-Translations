import React from "react"
import { Link } from "gatsby"
import styled, {
  createGlobalStyle
} from 'styled-components'

import { rhythm, scale } from "../utils/typography"

import Nav from "../components/nav";
import Header from "../components/header";
import Footer from "../components/footer";

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
    height: 60%;
    width: 100%;
`;

  // marginLeft: auto;
  // marginRight: auto;
  // maxWidth: ${rhythm(24)};
  // padding: ${rhythm(1.5)} ${rhythm(3 / 4)};

const Layout = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
 
  return (
    <Wrapper>
      <GlobalStyle />
      <Nav/>
      <Header/>
      <StyledBody>{children}</StyledBody>
      <Footer/>
    </Wrapper>
  )
}

export default Layout
