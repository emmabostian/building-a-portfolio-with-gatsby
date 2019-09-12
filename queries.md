# All Blog Posts
## writing.js

```
export const allBlogsQuery = graphql`
query AllBlogPosts {
    allMarkdownRemark {
      edges {
        node {
          frontmatter {
            author
            date
            title
            path
						description
          }
          id
        }
      }
    }
  }  
`;
```

# Single Blog Post
# templates/blogPost.js

```
export const postQuery = graphql`
query BlogPost($path: String!) {
  markdownRemark(frontmatter: { path: { eq: $path } }) {
    html
    frontmatter {
      date
      path
      title
    }
  }
}
`
```

# Dynamically Generate
## gatsby-node.js

```
const path = require('path')

exports.createPages = ({ boundActionCreators, graphql }) => {
  const { createPage } = boundActionCreators

  const postTemplate = path.resolve('src/templates/blogPost.js')

  return graphql(`
    {
      allMarkdownRemark {
        edges {
          node {
            html
            id
            frontmatter {
              path
              title
              date
              author
            }
          }
        }
      }
    }
  `).then(res => {
    if (res.errors) {
      return Promise.reject(res.errors)
    }

    res.data.allMarkdownRemark.edges.forEach(({ node }) => {
      createPage({
        path: node.frontmatter.path,
        component: postTemplate,
      })
    })
  })
}
```
