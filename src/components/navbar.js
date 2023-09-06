import { Link } from "gatsby"
import React from "react"
import { StaticImage } from "gatsby-plugin-image"

const Navbar = () => {
  return (
    <header className="fixed bg-black text-white h-full">
      <nav className="flex flex-col items-baseline justify-between">
        <Link to="/" className="text-xl font-medium p-4">
          <StaticImage className="" src="../images/logo.png" />
        </Link>
        <div className="flex flex-col items-baseline justify-end list-purple w-full text-black p-6">
          <Link
            className="font-medium border-b-2 border-black w-full hover:text-white"
            to="/"
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
            to="/about"
          >
            Merch
          </Link>
          <Link
            className="font-medium border-b-2 border-black w-full hover:text-white"
            to="/about"
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
            to="/about"
          >
            FAQ
          </Link>
          <Link
            className="font-medium border-b-2 border-black w-full hover:text-white"
            to="/about"
          >
            Testimonials
          </Link>
          <Link className="font-medium w-full hover:text-white" to="/about">
            Contact Us
          </Link>
        </div>
        <div className="p-2">
          <p className="text-sm p-2 ">
            Sign up for newsletters and occasional additional annoucnemtns about
            events, articles, and other resouces.
          </p>
          <input className="mt-4 rounded-xl"></input>
          <button className="rounded-full bg-yellow text-black text-sm px-2 py-1 mt-2">
            Sign Up
          </button>
          <div className="mt-10 text-xs">Community Agreements</div>
        </div>
      </nav>
    </header>
  )
}

export default Navbar
