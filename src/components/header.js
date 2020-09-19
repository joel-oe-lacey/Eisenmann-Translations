import React from "react"
import {
  graphql,
  StaticQuery
} from "gatsby"
import styled from 'styled-components'
import logo from '../../content/assets/logo.svg'
import Image from "gatsby-image"
import {
  rhythm
} from "../utils/typography"

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

const StyledHolder = styled.h1`
  margin: ${props => props.title === "About Us" ? '0' : '100%'};
`

//color hardcoded here where it shouldn't be
const FloatedTitle = styled.h1`
  // left: ${props => props.title === "About Us" ? '0' : '60%'};
  margin: ${props => props.title === "About Us" ? '15% 0% 15% 30%' : '15%'};
  font-weight: bold;
  color: ${props => props.title === "About Us" ? 'black' : 'rgba(0,0,0,0.6)'};
  position: ${props => props.title === "About Us" ? 'relative' : 'fixed'};
  // text-shadow: 0.03em 0 #fff, -0.03em 0 #fff, 0 0.03em #fff, 0 -0.03em #fff;
  background: ${props => props.title === "About Us" ? 'none' : 'rgba(51, 51, 51, 1)'};
  padding: ${rhythm(1)};
  border-radius: 5%;
  text-shadow: 2px 2px 3px rgba(255,255,255,0.1);
`;

const Logo = styled.section`
  height: 65%;
  width: 100%;
  position: fixed;
  z-index: -100;
  background-image: url(${logo});
  background-size: calc(50% + 15rem);
  background-repeat: no-repeat;
  background-clip: border-box;
  background-position: top left;
`;

const Backdrop = styled(Image)({
  height: '100%',
  width: '100%',
  zIndex: -100,
  objectFit: 'cover'
});

const FetchHeader = ({title, data}) => { 
  return (
    <StyledHeader>
      {title === "About Us" ? <Logo /> : <Backdrop fluid={data.background.childImageSharp.fluid} style={{position: 'absolute'}}/>}
      <FloatedTitle title={title}>{title}</FloatedTitle>
      <StyledHolder title={title}/>
    </StyledHeader>
  )
}

const Header = ({ title }) => {
    return (
    <StaticQuery
      query={graphql`
        query {
          background: file(absolutePath: { regex: "/river.jpg/" }) {
            childImageSharp {
              fluid(maxWidth: 4500, maxHeight: 3000) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      `}
      render={data => <FetchHeader title={title} data={data} />}
    />
  )
}

export default Header