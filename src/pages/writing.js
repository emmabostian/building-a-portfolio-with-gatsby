import React from "react"

import Layout from "../components/layout"
import BlogSquare from "../components/blogSquare"

import SEO from "../components/seo"

const WritingPage = ({ data }) => (
  <Layout>
    <SEO title="Writing" />
    <h1>I write about things</h1>
  </Layout>
)

export default WritingPage
