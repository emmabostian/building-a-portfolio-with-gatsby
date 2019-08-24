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

# Step 3: Listing All Blog Posts
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
