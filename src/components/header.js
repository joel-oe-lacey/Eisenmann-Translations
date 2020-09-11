import React from "react"
import { Link } from "gatsby"
import styled from 'styled-components'
import logo from '../../content/assets/logo.svg'

const StyledHeader = styled.section`
  height: 60%;
  width: 100%;
  background-color: lightgrey;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-image: url(${logo});
  background-size: 60%;
  background-repeat: no-repeat;
  background-clip: border-box;
  background-position: top left;
`;

const FloatedHeader = styled.h1`
  left: 60%;
  margin: 15% 0% 15% 30%;
  font-size: 2.5rem;
  font-weight: bold;
`;

const Logo = styled.img`
  height: 200%;
  width: 25%;
`;

const Header = ({title}) => { 
  return (
    <StyledHeader>
      {/* <Logo src={logo} alt="The company logo." /> */}
      <FloatedHeader>{title}</FloatedHeader>
    </StyledHeader>
  )
}

export default Header

