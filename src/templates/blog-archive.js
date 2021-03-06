import React from "react"
import { graphql } from "gatsby"
import { Link } from "gatsby"
import Layout from "../components/layout"
import Pager from "../components/Pager"
import SEO from "../components/seo"
import { kebabCase } from "lodash"
import tw from "twin.macro"
import styled from "@emotion/styled"

const PageTitle = styled.h1`
  ${tw`flex items-center justify-center h-64 font-mono text-5xl font-bold text-white bg-indigo-800`}
`

const Item = styled.div`
  ${tw`px-8 py-12 text-center transition-all duration-500 ease-in-out bg-indigo-600 shadow-md`}

  a {
    ${tw`font-mono text-4xl font-bold text-white transition-all duration-500 ease-in-out `}
  }

  &:hover {
    ${tw`bg-white shadow-lg`}

    a {
      ${tw`text-indigo-600 `}
    }
  }
`

const Container = styled.div`
  ${tw`grid max-w-4xl gap-4 p-3 mx-auto md:grid-cols-3 `}
`

const BlogArchive = ({ data, pageContext, location }) => {
  const posts = data.allContentfulColeccion.edges

  return (
    <Layout location={location}>
      <SEO title="Recursos" />
      <PageTitle>Recursos</PageTitle>
      <Container>
        {posts.map(({ node }) => {
          const title = node.title || node.slug
          return (
            <Item key={node.slug}>
              <Link to={`/colecciones/${kebabCase(node.slug)}/`}>{title}</Link>
            </Item>
          )
        })}

        <Pager pageContext={pageContext} />
      </Container>
    </Layout>
  )
}

export default BlogArchive

export const pageQuery = graphql`
  query($skip: Int!, $limit: Int!) {
    allContentfulColeccion(
      sort: { fields: [title], order: ASC }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          id
          title
          slug
        }
      }
    }
  }
`
