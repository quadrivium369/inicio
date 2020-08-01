import React from "react"
import Layout from "../components/layout"
import tw from "twin.macro"
import styled from "@emotion/styled"

export default () => {
  return (
    <Layout>
      <Home>
        <MainTitle className="text-center">Quadrivium369</MainTitle>
      </Home>
    </Layout>
  )
}

const Home = styled.div`
  ${tw`flex items-center justify-center h-64 text-white bg-indigo-900`}
`

const MainTitle = styled.h1`
  ${tw`text-3xl text-white`}
`
