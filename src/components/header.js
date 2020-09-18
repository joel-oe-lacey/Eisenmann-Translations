import React from "react"
import { Link } from "gatsby"
import styled from 'styled-components'
import logo from '../../content/assets/logo.svg'

const StyledHeader = styled.section`
  height: 60%;
  width: 100%;
  border-bottom: 1px solid lightgrey;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background: linear-gradient(0deg, rgba(232,232,232,1) 0%, rgba(242,242,242,1) 34%, rgba(255,255,255,1) 75%);
  z-index: -1000;
`;

const FloatedHeader = styled.h1`
  left: 60%;
  margin: 15% 0% 15% 30%;
  font-size: 2.5rem;
  font-weight: bold;
`;

const Logo = styled.section`
  height: 65%;
  width: 100%;
  position: fixed;
  z-index: -100;
  background-image: url(${logo});
  background-size: 60%;
  background-repeat: no-repeat;
  background-clip: border-box;
  background-position: top left;
`;

const Header = ({title}) => { 
  return (
    <StyledHeader>
      <Logo />
      <FloatedHeader>{title}</FloatedHeader>
    </StyledHeader>
  )
}

export default Header

