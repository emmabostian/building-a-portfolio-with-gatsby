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