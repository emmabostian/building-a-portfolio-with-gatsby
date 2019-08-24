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