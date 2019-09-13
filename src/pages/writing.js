import React from "react"

import Layout from "../components/layout"
import BlogSquare from "../components/blogSquare"

import SEO from "../components/seo"

const WritingPage = ({ data }) => (
  <Layout>
    <SEO title="Writing" />
    <h1>I write about things</h1>
    {data.allMarkdownRemark.edges.map(post => (
      <BlogSquare 
        key={post.node.id} 
        title={post.node.frontmatter.title} 
        date={post.node.frontmatter.date} 
        description={post.node.frontmatter.description} 
        path={post.node.frontmatter.path} 
      />     
    ))}
  </Layout>
)

export const allBlogsQuery = graphql`
  query AllBlogPosts {
    allMarkdownRemark {
      edges {
        node {
          frontmatter {
            date
            description
            title
            path
          }
          id
        }
      }
    }
  }
`

export default WritingPage