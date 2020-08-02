import React from "react"

import { Link } from "gatsby"

export default ({ article }) => (
  <>
    <Link
      to={`/colecciones/${article.slug}`}
      className="block mb-2 text-xl font-bold text-center title"
    >
      {article.title}
    </Link>
  </>
)
