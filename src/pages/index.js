import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
// import Image from "../components/image"
import SEO from "../components/seo"

const IndexPage = ({ data }) => {
  const content = data.contentfulBio;
  return (
    <Layout>
      <SEO title="front end developer" />
      <h1>Hi, I'm Danielle</h1>
      <div className="large" dangerouslySetInnerHTML={{__html: content.description.childMarkdownRemark.html}}></div>
      <div dangerouslySetInnerHTML={{__html: content.additionalInfo.childMarkdownRemark.html}}></div>
      
    </Layout>
  )
}

export default IndexPage

export const pageQuery = graphql`
  query {
    contentfulBio {
      description {
        childMarkdownRemark {
          html
        }
      }
      additionalInfo {
        childMarkdownRemark {
          html
        }
      }
    }
  }
`;
