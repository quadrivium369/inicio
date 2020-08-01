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
  ${tw`flex items-center justify-center h-64 text-3xl text-white bg-indigo-800`}
`

const Item = styled.div`
  ${tw`px-8 py-12 text-left transition-all duration-500 ease-in-out bg-white shadow-md`}

  a {
    ${tw`text-2xl font-bold text-indigo-600 transition-all duration-500 ease-in-out `}
  }

  &:hover {
    ${tw`bg-indigo-600 shadow-lg`}

    a {
      ${tw`text-white `}
    }
  }
`

const Container = styled.div`
  ${tw`grid max-w-6xl grid-cols-3 gap-4 pt-3 mx-auto `}
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
