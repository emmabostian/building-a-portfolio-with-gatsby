import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"

import SEO from "../components/seo"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <h1>This is my portfolio</h1>
    <h2>I build cool things.</h2>
  </Layout>
)

export default IndexPage
