import { Link } from "gatsby"
import React from "react"

const routes = [
  {
    title: "Inicio",
    slug: "/",
  },
  {
    title: "Recursos",
    slug: "/colecciones",
  },
  {
    title: "3D",
    slug: "/chakana",
  },
]

const Navigation = ({ closeMenu }) => (
  <nav className="flex flex-col w-full">
    {routes.map((route, i) => {
      return (
        <Link
          key={i}
          onClick={closeMenu}
          activeClassName="text-indigo-300 "
          to={route.slug}
          className="my-2 font-mono text-base font-bold text-white cursor-pointer hover:text-indigo-800"
        >
          {route.title}
        </Link>
      )
    })}
  </nav>
)

export default Navigation
