import React from "react"
import Footer from "./footer"
import Navbar from "./navbar"

const Layout = ({ sidebarText, children }) => {
  return (
    <div className="flex min-h-screen justify-between text-neutral-900">
      <Navbar sidebarText={sidebarText} />
      <div className="content-section">
        {children}
        <Footer />
      </div>
    </div>
  )
}

export default Layout
