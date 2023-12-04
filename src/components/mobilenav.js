import { Link } from "gatsby"
import React from "react"
import { StaticImage } from "gatsby-plugin-image"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faBars,
} from "@fortawesome/free-solid-svg-icons"


const MobileNav = ({ sidebarText }) => {
  return (
    <header className="flex justify-between items-center w-full md:hidden text-black md:w-48 md:h-full shadow-2xl">
      <Link to="/" className="text-xl font-bold p-4 w-40">
        <StaticImage className="" src="../images/logo.png" />
      </Link>
      <FontAwesomeIcon className="p-4 text-3xl" icon={faBars} />
      <nav className="hidden flex flex-col items-baseline justify-between">
        <div className="mt-20 flex flex-col items-baseline justify-end list-purple w-full text-black p-6">
          <Link
            className="font-bold border-b border-black w-full hover:text-white flex items-center justify-between"
            activeStyle={{ color: "white" }}
            activeClassName="active"
            to="/profiles"
          >
            Member Profiles{" "}
            <StaticImage
              className="polygon w-3 h-3"
              src="../images/polygon.svg"
            />
          </Link>
          <Link
            className="font-bold border-b border-black w-full hover:text-white flex items-center justify-between"
            activeStyle={{ color: "white" }}
            activeClassName="active"
            to="/resources"
          >
            Resource Library
            <StaticImage
              className="polygon w-3 h-3"
              src="../images/polygon.svg"
            />
          </Link>
          <Link
            className="font-bold border-b border-black w-full hover:text-white flex items-center justify-between"
            activeStyle={{ color: "white" }}
            activeClassName="active"
            to="/merch"
          >
            Merch
            <StaticImage
              className="polygon w-3 h-3"
              src="../images/polygon.svg"
            />
          </Link>
          <Link
            className="font-bold border-b border-black w-full hover:text-white flex items-center justify-between"
            activeStyle={{ color: "white" }}
            activeClassName="active"
            to="/support"
          >
            Support Sixty
            <StaticImage
              className="polygon w-3 h-3"
              src="../images/polygon.svg"
            />
          </Link>
          <Link
            className="font-bold border-b border-black w-full hover:text-white flex items-center justify-between"
            activeStyle={{ color: "white" }}
            activeClassName="active"
            to="/about"
          >
            About Us
            <StaticImage
              className="polygon w-3 h-3"
              src="../images/polygon.svg"
            />
          </Link>
          <Link
            className="font-bold border-b border-black w-full hover:text-white flex items-center justify-between"
            activeStyle={{ color: "white" }}
            activeClassName="active"
            to="/faq"
          >
            FAQ
            <StaticImage
              className="polygon w-3 h-3"
              src="../images/polygon.svg"
            />
          </Link>
          <Link
            className="font-bold border-b border-black w-full hover:text-white flex items-center justify-between"
            activeStyle={{ color: "white" }}
            activeClassName="active"
            to="/testimonials"
          >
            Testimonials
            <StaticImage
              className="polygon w-3 h-3"
              src="../images/polygon.svg"
            />
          </Link>
          <Link
            className="font-bold border-black w-full hover:text-white flex items-center justify-between"
            activeStyle={{ color: "white" }}
            activeClassName="active"
            to="/contact"
          >
            Contact Us
            <StaticImage
              className="polygon w-3 h-3"
              src="../images/polygon.svg"
            />
          </Link>
        </div>
        <div className="p-5 w-full">
          {/* <p className="text-sm">{sidebarText}</p> */}
          <p className="text-sm">
            Sign up for newsletters and occasional additional announcements
            about events, articles, and other resources.
          </p>
          <input className="mt-4 rounded-xl w-full text-black px-2"></input>
          <button className="rounded-full bg-yellow text-black text-sm px-2 py-1 mt-2">
            Sign Up
          </button>
          <div className="mt-5 text-xs">Community Agreements</div>
          <div className="mt-5 flex justify-left items-center">
            <Link to="/" className="text-xl font-bold">
              <StaticImage className="w-6 h-6" src="../images/instagram.svg" />
            </Link>
            <Link to="/" className="text-xl font-bold  ml-3">
              <StaticImage className="w-6 h-6" src="../images/x-twitter.svg" />
            </Link>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default MobileNav
