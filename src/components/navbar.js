import { Link } from "gatsby"
import React from "react"
import { StaticImage } from "gatsby-plugin-image"

const Navbar = ({ sidebarText }) => {
  return (
    <header className="fixed bg-black text-white h-full shadow-2xl">
      <nav className="flex flex-col items-baseline justify-between">
        <Link to="/" className="text-xl font-medium p-4">
          <StaticImage className="" src="../images/logo.png" />
        </Link>
        <div className="mt-20 flex flex-col items-baseline justify-end list-purple w-full text-black p-6">
          <Link
            className="font-medium border-b-2 border-black w-full hover:text-white"
            to="/profiles"
          >
            Member Profiles
          </Link>
          <Link
            className="font-medium border-b-2 border-black w-full hover:text-white"
            to="/resources"
          >
            Resource Library
          </Link>
          <Link
            className="font-medium border-b-2 border-black w-full hover:text-white"
            to="/merch"
          >
            Merch
          </Link>
          <Link
            className="font-medium border-b-2 border-black w-full hover:text-white"
            to="/support"
          >
            Support Sixty
          </Link>
          <Link
            className="font-medium border-b-2 border-black w-full hover:text-white"
            to="/about"
          >
            About Us
          </Link>
          <Link
            className="font-medium border-b-2 border-black w-full hover:text-white"
            to="/faq"
          >
            FAQ
          </Link>
          <Link
            className="font-medium border-b-2 border-black w-full hover:text-white"
            to="/testimonials"
          >
            Testimonials
          </Link>
          <Link className="font-medium w-full hover:text-white" to="/contact">
            Contact Us
          </Link>
        </div>
        <div className="p-5 w-full">
          <p className="text-sm">{sidebarText}</p>
          <input className="mt-4 rounded-xl w-full"></input>
          <button className="rounded-full bg-yellow text-black text-sm px-2 py-1 mt-2">
            Sign Up
          </button>
          <div className="mt-5 text-xs">Community Agreements</div>
        </div>
      </nav>
    </header>
  )
}

export default Navbar
