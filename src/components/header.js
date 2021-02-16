import React from "react"
import {
  graphql,
  useStaticQuery
} from "gatsby"
import styled from 'styled-components'
import logo from '../../content/assets/logo.svg'
import Image from "gatsby-image"
import {
  rhythm
} from "../utils/typography"
import {
  useIntl
} from "gatsby-plugin-intl"

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
  margin: ${props => props.location === "/" ? '0' : '100%'};
`

//color hardcoded here where it shouldn't be
const FloatedTitle = styled.h1`
  font-weight: bold;
  border-bottom-right-radius: 5% 30%;
  border-top-right-radius: 5% 30%;
  border-bottom-left-radius: 5% 30%;
  border-top-left-radius: 5% 30%;
  margin: ${props => props.location === "/" ? '15% 0% 15% 30%' : '15%'};
  color: ${props => props.location === "/" ? 'black' : 'rgba(198, 40, 40, 0.6)'};
  position: ${props => props.location === "/" ? 'relative' : 'fixed'};
  background: ${props => props.location === "/" ? 'none' : 'rgba(51, 51, 51, 1)'};
  padding: ${rhythm(1)};
  text-shadow: ${props => props.location === "/" ? '0.03em 0 #fff, -0.03em 0 #fff, 0 0.03em #fff, 0 -0.03em #fff' : '0px 4px 3px rgba(0,0,0,0.4), 0px 8px 13px rgba(0,0,0,0.1), 0px 18px 23px rgba(0,0,0,0.1)'};
`;

const Logo = styled.section`
  height: 65%;
  width: 100%;
  position: absolute;
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

export const FetchHeader = ({location, title, data}) => { 
  const intl = useIntl()
  const rootPath = `${__PATH_PREFIX__}/${intl.locale}/`

  return (
    <StyledHeader>
      {location === rootPath ? <Logo /> : <Backdrop fluid={data.background.childImageSharp.fluid} style={{position: 'absolute'}}/>}
      <FloatedTitle location={location}>{title}</FloatedTitle>
      <StyledHolder location={location}/>
    </StyledHeader>
  )
}

export const Header = props => {
    const data = useStaticQuery(graphql`
        query {
          background: file(absolutePath: { regex: "/river.jpg/" }) {
            childImageSharp {
              fluid(maxWidth: 4500, maxHeight: 3000) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      `)

    return (
      <FetchHeader 
        location={props.location.pathname} 
        title={props.title} 
        data={data} 
      />
  )
}