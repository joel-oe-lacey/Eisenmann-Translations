import React from "react"
import {
  graphql,
  StaticQuery
} from "gatsby"
import styled from 'styled-components'
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
    overflow: 'scroll'
})

const FetchInfoSelector = ({ data }) => { 
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
                        <ListItemText inset={true} primary={title} />
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

const LangInfoSelector = () => {
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
      render={data => <FetchInfoSelector data={data} />}
    />
  )
}

export default LangInfoSelector