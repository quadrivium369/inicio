import React from "react"
import PropTypes from "prop-types"
import "./layout.css"

import SimpleReactLightbox from "simple-react-lightbox"
import tw from "twin.macro"
import styled from "@emotion/styled"

const Layout = ({ children }) => {
  return (
    <>
      <div className="app-container">
        <SimpleReactLightbox>
          <main className="h-screen mt-24 text-center bg-gray-200 ">
            {children}
          </main>
        </SimpleReactLightbox>
        <Footer></Footer>
        <Stn>
          <Inner>
            <h3 className="pb-2 text-sm font-bold text-indigo-200">
              Quadrivium369 {new Date().getFullYear()}
            </h3>
            <div className="pr-2 text-sm opacity-75">
              Hecho en
              {` `}
              <a
                rel="noopener noreferrer"
                target="_blank"
                className="font-bold"
                href="https://www.cooparaje.com.ar"
              >
                cooparaje
              </a>
            </div>
          </Inner>
        </Stn>
      </div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout

const Footer = styled.footer`
  ${tw`relative hidden px-2 py-8 text-center text-gray-800 bg-white`}
`

const Stn = styled.div`
  ${tw`w-full p-2 py-4 bg-gray-900`}
`

const Inner = styled.div`
  ${tw`flex justify-between max-w-6xl p-2 py-3 mx-auto text-center text-indigo-200 `}
`
