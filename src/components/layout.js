import React from "react"
import Footer from "./footer"
import Navbar from "./navbar"

const Layout = ({ children }) => {
  return (
    <div class="flex min-h-screen justify-between text-neutral-900">
      <Navbar />
      <div className="content-section">
        {children}
        <Footer />
      </div>
    </div>
  )
}

export default Layout
