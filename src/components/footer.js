import React from "react"
import { Link } from "gatsby"
import styled from 'styled-components'

const StyledFooter = styled.footer`
    height: 20%;
    width: 100%;
    background-color: grey;
`;

const Footer = () => { 
  return (
    <StyledFooter>
        © {new Date().getFullYear()}, Built with
        {` `}
        <a href="https://www.gatsbyjs.org">Gatsby</a>
    </StyledFooter>
  )
}

export default Footer
