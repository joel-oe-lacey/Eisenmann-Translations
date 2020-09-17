import React from "react"
import {
  graphql,
  StaticQuery
} from "gatsby"
import styled from 'styled-components'
// import { styled } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Link from './link';

const Wrapper = styled(List)({
    height: 'max-content',
    width: '100%',
    backgroundColor: '#333333',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    overflow: 'scroll',
    marginBottom: '2rem'
})

// const selectorWrapper = styled.section`
//     height: 20%;
//     width: min-content;
//     background-color: #333333;
//     display: flex;
//     flex-direction: row;
//     justify-content: space-between;
//     align-items: center;
// `;

//languages are already filtered here. Categories might be useful for footer and header 

const FetchSelector = ({ data }) => { 
  const languages = data.allMarkdownRemark.edges;

  const list = () => (
    <React.Fragment>
        {
            languages.map(({ node }) => {
                const slug = node.fields.slug;
                const title = node.frontmatter.title;
                
                return (
                <Link to={slug}>
                    <ListItem button key={title}>
                        <ListItemText primary={title} />
                    </ListItem>
                </Link>
                )
            })
        }
    </React.Fragment>
  );

  return (
    <Wrapper>
        {list()}
    </Wrapper>
  )
}

const LangSelector = () => {
    return (
    <StaticQuery
      query={graphql`
        query {
          site {
            siteMetadata {
              title
            }
          }
          allMarkdownRemark(filter: {
                  frontmatter: {
                      category: {
                          eq: "Languages"
                      }
                  }
              }) {
            edges {
              node {
                excerpt
                fields {
                  slug
                }
                frontmatter {
                  title
                  type
                  category
                }
              }
            }
          }
        }
      `}
      render={data => <FetchSelector data={data} />}
    />
  )
}

export default LangSelector