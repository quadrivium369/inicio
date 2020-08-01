import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import { Link } from "gatsby"
import { kebabCase } from "lodash"
//import "./post.css"

import SEO from "../components/seo"

import { BLOCKS, MARKS, INLINES } from "@contentful/rich-text-types"
//import { documentToReactComponents } from "@contentful/rich-text-react-renderer"

const Bold = ({ children }) => <span className="font-bold">{children}</span>
const Text = ({ children }) => <p className="my-3 text-lg">{children}</p>
const website_url = "https://www.lnqradio.com"
const options = {
  renderMark: {
    [MARKS.BOLD]: text => <Bold>{text}</Bold>,
    [MARKS.CODE]: embedded => (
      <div dangerouslySetInnerHTML={{ __html: embedded }} />
    ),
  },
  renderNode: {
    [BLOCKS.EMBEDDED_ASSET]: node => {
      if (!node.data || !node.data.target.fields) {
        return <span className="hidden">Embedded asset is broken</span>
      }
      return (
        <div className="post-image">
          <img
            className="w-full"
            alt={node.data.target.fields.title["es-AR"]}
            src={node.data.target.fields.file["es-AR"].url}
          />
        </div>
      )
    },
    [INLINES.HYPERLINK]: node => {
      return (
        <a
          href={node.data.uri}
          className="font-bold border-b border-red-500 hover:bg-red-700 hover:text-white"
          target={`${
            node.data.uri.startsWith(website_url) ? "_self" : "_blank"
          }`}
          rel={`${
            node.data.uri.startsWith(website_url) ? "" : "noopener noreferrer"
          }`}
        >
          {node.content[0].value}
        </a>
      )
    },
    [BLOCKS.PARAGRAPH]: (_, children) => <Text>{children}</Text>,
  },
}

const BlogPostTemplate = ({ data, pageContext, location }) => {
  const post = data.contentfulColeccion
  const { prev, next } = pageContext
  return (
    <Layout location={location}>
      <SEO title="Post" />
      <div className="max-w-2xl mx-auto text-4xl">
        <nav style={{ display: "flex", justifyContent: "space-between" }}>
          <div>
            {prev && (
              <Link to={`/colecciones/${kebabCase(prev.slug)}/`} rel="prev">
                ←
              </Link>
            )}
          </div>

          <div style={{ justifySelf: "flex-end" }}>
            {next && (
              <Link to={`/colecciones/${kebabCase(next.slug)}/`} rel="next">
                →
              </Link>
            )}
          </div>
        </nav>
      </div>
      <h1 className="pt-12 text-4xl">Página de {post.title}</h1>
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query PostBySlug($slug: String!) {
    contentfulColeccion(slug: { eq: $slug }) {
      slug
      title
    }
  }
`
