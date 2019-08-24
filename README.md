# Building A Portfolio With Gatsby
A step-by-step tutorial on how to build a portfolio with Gatsby

# Step 1: Getting Started
1. Fork & clone this repository
2. Change directories `cd building-a-portfolio-with-gatsby`
3. Install dependencies with `npm install`
4. Start the development server `gatsby develop`
5. Your site should look like this:
![Starting UI](https://user-images.githubusercontent.com/7671983/63641527-f7c17680-c6a7-11e9-8c8c-801f280ed795.png)

_If you ever need to revert to this state, you can use `git checkout step-1` to check out the tag for this state._

# Step 2: Create Navigation
We want to create a navigation sidebar with four links:
- Home
- Writing
- Speaking
- Podcasting

1. Open `nav.js` from the components folder.
2. Let's add some semantic HTML for a navigation component:
```jsx
<nav className="nav">
    <h3 className="nav__title">My Portfolio</h3>
    <ul className="nav__list">
        <li>Home</li>
        <li>Writing</li>
        <li>Speaking</li>
        <li>Podcasting</li>
    </ul>
</nav>
```

_I won't be covering CSS in this tutorial, but all the CSS you need is located in the respective `.css` files. To use the default styling, be sure to include the class names._

3. Now we need to turn these navigation items into links. You might notice we've already imported the Link component from `gatsby`.
```
import { Link } from "gatsby"
```
It's important to replace local links in your Gatsby project with the `<Link>` element. If we use the anchor tag, `<a>` for internal routing, it will cause a re-render of our content. We don't want this, because we want our site to be fast! So we use `<Link>`. You can read more about that in the [Gatsby Documentation](https://www.gatsbyjs.org/docs/gatsby-link/).

```jsx
<li><Link>Home</Link></li>
<li><Link>Writing</Link></li>
<li><Link>Speaking</Link></li>
<li><Link>Podcasting</Link></li>
```

4. Each `<Link>` element needs to know where to route to on click, and we do this with the `to` attribute. Let's add this attribute to all of our links:
```jsx
<li><Link to="/" className="nav__link">Home</Link></li>
<li><Link to="/writing" className="nav__link">Writing</Link></li>
<li><Link to="/speaking" className="nav__link">Speaking</Link></li>
<li><Link to="/podcasting" className="nav__link">Podcasting</Link></li>
```

5. If we head over to `layout.js`, we can see we have already imported the navigation component and rendered it above the main content area. Your site should look like this:
![Navigation](https://user-images.githubusercontent.com/7671983/63641714-052c3000-c6ab-11e9-93be-d74d7e690b5c.png)

6. The last thing we want to do is apply a special style to the selected navigation link. There are [two ways](https://www.gatsbyjs.org/docs/gatsby-link/#add-custom-styles-for-the-currently-active-link) we can approach this:
- Use inline styling (CSS-in-JS)
- Use a class name with an external stylesheet

To apply an inline style when the link is active, we can use `activeStyle`.

To apply an active class name when the link is active, we can use `activeClassName`.

For this tutorial we'll use the second approach of applying an active class, but either approach is valid.

Add the following attribute to each link:
```jsx
activeClassName="nav__link--active"
```

Your `nav.js` file should now look like this:
```jsx
import React from "react";
import { Link } from "gatsby";

import "./nav.css";

const Nav = () => (
    <nav className="nav">
        <h3 className="nav__title">My Portfolio</h3>
        <ul className="nav__list">
            <li><Link to="/" className="nav__link" activeClassName="nav__link--active">Home</Link></li>
            <li><Link to="/writing" className="nav__link" activeClassName="nav__link--active">Writing</Link></li>
            <li><Link to="/speaking" className="nav__link" activeClassName="nav__link--active">Speaking</Link></li>
            <li><Link to="/podcasting" className="nav__link" activeClassName="nav__link--active">Podcasting</Link></li>
        </ul>
    </nav>
)

export default Nav;
```

![Finished nav](https://user-images.githubusercontent.com/7671983/63641772-c0ed5f80-c6ab-11e9-9595-3bef54b6c17b.png)

_If you ever need to revert to this state, you can use `git checkout step-2` to check out the tag for this state._

# Step 3: Rendering Blog Posts
Having a blog on your portfolio is a great way to showcase your work. So let's add a blog to our portfolio!

Gatsby works with GraphQL to do all sorts of robust data fetching. We won't delve into GraphQL in this blog post, but you can check out the [documentation](https://www.gatsbyjs.org/docs/querying-with-graphql/).

When you run `gatsby develop`, you might have noticed two URLs posted in the terminal:
- The development server: [http://localhost:8000/](http://localhost:8000/)
- The GraphiQL playground: [http://localhost:8000/___graphql](http://localhost:8000/___graphql)

![Terminal output](https://user-images.githubusercontent.com/7671983/63641825-7e785280-c6ac-11e9-96fe-06bee72eb39f.png)

GraphiQL allows you to play around with GraphQL queries in your browser. So let's make some queries.

1. Open [http://localhost:8000/___graphql](http://localhost:8000/___graphql) in your browser.

Here is what the GraphiQL UI looks like:
![GraphiQL](https://user-images.githubusercontent.com/7671983/63641844-cd25ec80-c6ac-11e9-9fdd-d6125dbeebef.png)

I won't be delving into [GraphQL](https://graphql.org/) or [GraphiQL](https://electronjs.org/apps/graphiql) in this post. You can read the online documentation for more information.

2. We want to create two queries:
- One query for retrieving a list of all blog posts
- One query for retrieving details and markup for individual blog posts

3. First, we need to install a plug-in to work with our markdown files. We will use the [gatsby-transformer-remark](https://www.gatsbyjs.org/packages/gatsby-transformer-remark/) plug-in to accomplish this task.
```
npm i gatsby-transformer-remark --save
```

4. Now that we've installed the plug-in as a dependency, we need to tell Gatsby to actually use it.

Open `gatsby-config.js` and inside of the `plugins` array, add `gatsby-transformer-remark`.

```
plugins: [
    ...
    `gatsby-transformer-remark`,
    ...
]
```

5. We also need to configure the plug-in [gatsby-source-filesystem](https://www.gatsbyjs.org/packages/gatsby-source-filesystem/).  It's already installed as a dependency, so head over to `gatsby-config.js`.

Create a new object inside of the `plugins` array and add the following:
```
{
    resolve: 'gatsby-source-filesystem',
    options: {
    path: `${__dirname}/src/pages`,
    name: 'pages',
    },
},
```

This plug-in will transform our markdown files into `Markdown Remark` nodes so we can query their HTML and frontmatter.

5. Stop and re-start your development server. Each time we alter the `gatsby-config.js` file, we have to restart our server.

Now, we're ready to play with some GraphQL queries.

## Retrieving All Blog Posts
We will use the `AllMarkdownRemark` query to retrieve a list of all the blog posts.
1. Inside of GraphiQL, delete the boilerplate comments from the editor.

2. We can use the explorer on the left to select what we want to query for.

Using the explorer in the left-hand sidebar, select the following:
```
allMarkdownRemark
  | edges
    > node
        > frontmatter
            - date
            - description
            - title
            - path
        - id
```
3. Change the name of the query in the main text editor from `MyQuery` to `AllBlogPosts`.

4. Press the play button to see the query in action.

You should now see data for two blog posts:

![Blog post data](https://user-images.githubusercontent.com/7671983/63642008-dc5a6980-c6af-11e9-858b-68b8816efcd6.png)

5. Head over to `writing.js` and let's use our newly created query.

Right above the default export of the writing page, add the following:

```jsx
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
```

6. You'll notice we already have a de-structured prop being passed into the writing page. This is the data that results from our GraphQL query. We can map over this data using a JSX expression. 

To ensure our data is comning in as expected, add the following code underneath the `<h1>` tag:

```jsx
{data.allMarkdownRemark.edges.map(post => (
    document.write(post.node.frontmatter.title)      
))}
```

7. If we head over to the browser, we should see names of our two blog posts:
![Blog data](https://user-images.githubusercontent.com/7671983/63642049-8df99a80-c6b0-11e9-9a1f-9eda58bb0047.png)

8. Now we want to actually make this data look nice. We will create a structure for each blog post with the `blogSquare.js` component.

Inside `blogSquare.js`, we want to display some data about each blog post:
- title
- date
- path
-description

Let's go ahead and add these as de-structured properties on the component. We'll pass them in later.

```jsx
const BlogSquare = ({ title, date, path, description }) => (
    <div></div>
)
```

9. Let's add some semantic markup to display these properties nicely:

```jsx
<section className="blogSquare">
    <h2 className="blogSquare__title">{title}</h2>
    <p className="blogSquare__date">{date}</p>
    <p>{description}</p>
    <p>Read more</p>
</section >
```

10. We want to have each blog square link to the full blog post. So using the `<Link>` component we introduced earlier, let's wrap the inner HTML in a `<Link>` component.

We want the blog square to link to the post, so we'll use the `path` variable for the `to` attribute.:

```jsx
<section className="blogSquare">
    <Link to={path}>
    <h2 className="blogSquare__title">{title}</h2>
    <p className="blogSquare__date">{date}</p>
    <p>{description}</p>
    <p>Read more</p>
    </Link >
</section >
```

11. Lastly, let's add some inline styling to make this blog square look a little nicer:

```jsx
<section className="blogSquare">
    <Link to={path} style={{
    textDecoration: 'none',
    color: '#4a4a4a'
    }}>
    <h2 className="blogSquare__title">{title}</h2>
    <p className="blogSquare__date">{date}</p>
    <p>{description}</p>
    <p style={{ fontSize: '.8em', textDecoration: 'underline' }}>Read more</p>
    </Link >
</section >
```

_You can also use class names, as there is a linked stylesheet, but I wanted to demonstrate the inline styling approach._

Here is the final state of `blogSquare.js`:

```jsx
import React from 'react';
import { Link } from "gatsby";

import './blogSquare.css'

const BlogSquare = ({ title, date, path, description }) => (
<section className="blogSquare">
    <Link to={path} style={{
    textDecoration: 'none',
    color: '#4a4a4a'
    }}>
    <h2 className="blogSquare__title">{title}</h2>
    <p className="blogSquare__date">{date}</p>
    <p>{description}</p>
    <p style={{ fontSize: '.8em', textDecoration: 'underline' }}>Read more</p>
    </Link >
</section >
)

export default BlogSquare
```

12. Now that we have a component to render our blog data, let's use it!

Inside of `writing.js`, the component is already imported, so we can just jump right in.

Within our `map` function, let's render a `<BlogSquare>` component for each blog post. Remove the `document.write` we just included to test our data, and replace it with the following:

```jsx
<BlogSquare 
    key={post.node.id} 
    title={post.node.frontmatter.title} 
    date={post.node.frontmatter.date} 
    description={post.node.frontmatter.description} 
    path={post.node.frontmatter.path} 
/> 
```

Remember, we included the four properties inside of `blogSquare.js` (title, date, description, path), so they must be passed with the data for each post.

Additionally, when mapping over an array of data and rendering JSX for each iteration, we must include a unique `key` property.

Let's check out if our blog posts are being rendered:
![Blog posts](https://user-images.githubusercontent.com/7671983/63642113-20e70480-c6b2-11e9-84c0-cbeb88100c68.png)

Great! but we get a 404 error if we click the "Read more" link.

That's because we haven't created the query for our individual blog posts.


## Retrieving An Individual Blog Post
13. Back in [GraphiQL](http://localhost:8000/___graphql), let's create a new query.

Using the explorer in the left-hand sidebar, select the following:
```
markdownRemark
  > frontmatter
    - date
    - description
    - path
    - title
  - html
  - id
```

14. Change the name of the query to `BlogPost`.

15. We'll need to pass data for an individual blog post in order to retrieve its data, so let's create a `$path` argument. We'll set it to a `String` data type and require it be passed in.

```jsx
query BlogPost($path:String!){
  markdownRemark (frontmatter: { path: { eq: $path } }){
    frontmatter {
      date
      description
      path
      title
    }
    html
    id
  }
}
```

16. Let's test if this works by adding a query variable.

At the bottom of GraphiQL there is a Query Variables text editor. Click to open it, and add the following:

```jsx
{
 "path": "/five-tech-skills-to-master"
}
```

17. To test that this works, click the play button. You should see the "Five tech skills to master" blog post data populate the right side of GraphiQL.

![Five tech skills data](https://user-images.githubusercontent.com/7671983/63642544-a7064980-c6b8-11e9-8232-95da7087e86d.png)

18. Now let's use our data to build individual blog pages.

First, let's create a template which will be used to dynamically render each blog when the "Read more" link is clicked.

Open the `blogPost.js` file located in the `templates/` directory.

19. Inside of the `postQuery` declaration, paste our newly-created GraphQL query:
```jsx
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
```

20. Now we can pass `data` from the GraphQL query as a de-structured prop to the template and render the data:

We'll save `data.markdownRemark` as a constant called `post` to make our rendering a little nicer.

```jsx
const post = data.markdownRemark
```

21. Finally, let's add the following JSX elements:
- A `<h1>` containing the post title
- An `<h4>` containing the author and date
- A `<div>` containing the HTML for the post.

To render the HTML, we'll use Gatsby's `dangerouslySetInnerHTML` and pass in `post.html`:

```jsx
<div dangerouslySetInnerHTML={{ __html: post.html }} />
```

We will wrap all of the blog post JSX inside of the `<Layout>` component.

Here is the completed `blogPost.js` template:

```jsx

import React from 'react'
import { Link, graphql } from 'gatsby'

import Layout from '../components/layout'

export default function Template({ data }) {
  const post = data.markdownRemark

  return (
    <Layout>
      <Link
        to="/writing"
        style={{
          display: 'flex',
          alignItems: 'center',
          fontSize: '.8em',
          color: '#4A4A4A',
          textDecoration: 'none',
          marginTop: '50px',
        }}
      >
        Back to blogs
      </Link>
      <h1
        style={{
          marginTop: '20px',
        }}
      >
        {post.frontmatter.title}
      </h1>
      <h4
        style={{
          fontSize: '.8em',
          color: '#9fa7a7',
          fontWeight: '400',
        }}
      >
        Posted by {post.frontmatter.author} on {post.frontmatter.date}
      </h4>
      <div dangerouslySetInnerHTML={{ __html: post.html }} />
    </Layout>
  )
}
  
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

22. There's one last thing we have to add to get our blog posts to render.

We don't want to create individual pages for each blog post; that would be extremely time consuming!

Instead, we want to use GraphQL to dynamically create each page.

We can do this within `gatsby-node.js`.

- Inside of `gatsby-node.js`, import `path`, a [node module](https://nodejs.org/api/path.html) for working with our file directories.

```jsx
const path = require('path')
```

- Let's use the node `exports.createPages` [API](https://www.gatsbyjs.org/docs/node-apis/) to dynamically generate our pages.

I won't delve into the details of the `createPages` API in this post, but you can check out the documentation linked above.

Add the follwing code underneath the `path` module import:

```jsx
exports.createPages = ({ boundActionCreators, graphql }) => {
  const { createPage } = boundActionCreators

  const postTemplate = path.resolve('src/templates/blogPost.js')
  })
}
```

- Now we want to return a GraphQL query to grab all of the blog posts:

```jsx
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
`)
```

- Once we receive a response back from the query, we want to reject the promise if an error occurred, and otherwise create a page for each post.

This will create a post at the designated path received from the query results, and will use the `postTemplate` we declared above (our `blogPost.js` template) to render each post.

```jsx
...
).then(res => {
    if (res.errors) {
      return Promise.reject(res.errors)
    }

    res.data.allMarkdownRemark.edges.forEach(({ node }) => {
      createPage({
        path: node.frontmatter.path,
        component: postTemplate,
      })
})
```

Here's the finalized code for `gatsby-node.js`:

```jsx
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

Now we're ready to see if it worked!

23. Re-start your development server, then head over to the browser and click one of the blog post "Read more" links:

![Blog post](https://user-images.githubusercontent.com/7671983/63642557-dae16f00-c6b8-11e9-8cdf-dd7ed92307a6.png)

# Step 4: Adding Custom Google Fonts
You may want to add some custom [Google fonts](https://fonts.google.com/) to your Gatsby site. Luckily there's a plug-in for that!

1. In the terminal run the following command to install the Google fonts plugin:
```
npm i gatsby-plugin-google-fonts --save
```

2. Inside `gatsby-config.js`, we need to configure the plug-in. 

I'm choosing to use the font PT Serif, but you can select whichever font you prefer.

Add the following to the `plugins` array:

```jsx
plugins: [
    ...
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [
          `PT Serif`,
        ],
        display: 'swap'
      }
    },
]
```

You can check out the full list of options for this plugin in the [Gatsby docs](https://www.gatsbyjs.org/packages/gatsby-plugin-google-fonts/).

3. Inside of `nav.css` update the `.nav__list` selector to use `font-family: 'PT Serif', sans-serif`;

4. Restart your development server to see the updated font family.

![New font](https://user-images.githubusercontent.com/7671983/63642694-2006a080-c6bb-11e9-88a5-3f66138cb06f.png)