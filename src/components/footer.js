import { Link } from "gatsby"
import React from "react"
import { StaticImage } from "gatsby-plugin-image"

const Footer = () => {
  return (
    <footer className="mt-16 py-8 flex justify-center">
      <Link to="/" className="text-xl font-medium p-4">
        <StaticImage alt="" className="" src="../images/footer-logo.png" />
      </Link>
    </footer>
  )
}

export default Footer
