import React from "react"
import Footer from "./footer"
import Navbar from "./navbar"
import MobileNav from "./mobilenav"

const Layout = ({ sidebarText, children }) => {
  return (
    <div className="flex-col-reverse md:flex-col flex min-h-screen justify-end md:justify-start text-neutral-900">
      <Navbar sidebarText={sidebarText} />
      <div className="ml-0 md:ml-52">
        {children}
        <Footer />
      </div>
      <MobileNav />
    </div>
  )
}

export default Layout
