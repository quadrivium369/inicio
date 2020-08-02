import React from "react"
import Layout from "../components/layout"
//import tw from "twin.macro"
//import styled from "@emotion/styled"
import { Player, BigPlayButton } from "video-react"
import "../components/VideoReact.css"
import { Link } from "gatsby"

export default () => {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center max-w-3xl p-3 py-32 mx-auto">
        <Player src="https://videos.ctfassets.net/qsqwpz5r09md/7q3y4hMcOj1RagOds3hikj/fd1430eae3f565d01777158ec8e2f7c1/2f3b029a-7df6-4b5e-b4c4-6184e796d96f.mp4">
          <BigPlayButton position="center" />
        </Player>
        <Link
          to={`/colecciones/`}
          className="block px-12 py-3 my-12 font-mono text-2xl font-bold text-center text-indigo-900 bg-white hover:bg-indigo-100 hover:text-indigo-900"
        >
          Ver recursos
        </Link>
      </div>
    </Layout>
  )
}
