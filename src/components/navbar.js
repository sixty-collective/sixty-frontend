import { Link, Script } from "gatsby"
import React from "react"
import { StaticImage } from "gatsby-plugin-image"

const Navbar = ({ sidebarText }) => {
  return (
    <header className="hidden md:block relative w-full md:fixed text-black md:w-52 md:h-full shadow-2xl border-r-2 border-black">
      <Script src="https://cdn.userway.org/widget.js" data-account="FDvSmHKPEz" />
      <nav className="flex flex-col items-baseline justify-between">
        <Link to="/" className="text-xl font-bold p-5 hover:opacity-50">
          <StaticImage alt="" className="" src="../images/logo.png" />
        </Link>
        <div className="flex flex-col items-baseline justify-end w-full text-black p-5 border-y-2 border-black">
          <Link
            className="font-bold w-full hover:text-gray-600 flex items-center justify-between"
            activeClassName="active underline"
            to="/profiles"
          >
            Member Profiles{" "}
            
          </Link>
          <Link
            className="font-bold w-full hover:text-gray-600 flex items-center justify-between"
            activeClassName="active underline"
            to="/resources"
          >
            Knowledge Share
            
          </Link>
          <Link
            className="font-bold w-full hover:text-gray-600 flex items-center justify-between"
            activeClassName="active underline"
            to="/about"
          >
            About Us
            
          </Link>
          <Link
            className="font-bold w-full hover:text-gray-600 flex items-center justify-between"
            activeClassName="active underline"
            to="/support"
          >
            Support Sixty
            
          </Link>
          <Link
            className="font-bold w-full hover:text-gray-600 flex items-center justify-between"
            activeClassName="active underline"
            to="/faq"
          >
            FAQ
            
          </Link>
        </div>
        <div className="p-5 w-full">
          {/* <p className="text-sm">{sidebarText}</p> */}
          <p className="text-sm">
          Paid opportunities, grants, residencies, and more sent to your inbox.
          </p>
          <a href="https://sixtyinchesfromcenter.us2.list-manage.com/subscribe?u=d2aa2358e3e7d016e0c842845&id=87d8eba843">
          <button className="rounded-full text-black text-sm px-2 py-1 mt-5 border-2 border-black w-full hover:bg-black hover:text-[#F7F4F0]">
            Subscribe
          </button>

          </a>
        </div>
        <div className="flex flex-col items-baseline justify-end w-full text-black p-5 border-y-2 border-black">
        <Link
            className="uppercase text-xs py-1 w-full hover:text-gray-600 flex items-center justify-between"
            activeClassName="active underline"
            to="/member"
          >
            Become a Member
            
          </Link>
          <Link
            className="uppercase text-xs py-1 w-full hover:text-gray-600 flex items-center justify-between"
            activeClassName="active underline"
            to="/community-agreements"
          >
            Community Agreements
            
          </Link>
          <Link
            className="uppercase text-xs py-1 w-full hover:text-gray-600 flex items-center justify-between"
            activeClassName="active underline"
            to="/testimonials"
          >
            Testimonials
            
          </Link>
          <Link
            className="uppercase text-xs py-1 border-black w-full hover:text-gray-600 flex items-center justify-between"
            activeClassName="active underline"
            to="/contact"
          >
            Contact Us
            
          </Link>
        </div>
          <div className="pt-5 pb-3 flex justify-center items-center w-full border-b-2 border-black">
          <div>
          <a
              target="_blank" rel="noreferrer"
              className="text-xl font-bold"
              href="https://www.instagram.com/sixtyinchesfromcenter/"
            >
              <StaticImage alt="" className="w-6 h-6" src="../images/instagram-black.svg" />
              </a>
            <a
              target="_blank" rel="noreferrer"
              className="text-xl font-bold  ml-3"
              href="http://www.x.com/fromthecenter"
            >
              <StaticImage alt="" className="w-6 h-6" src="../images/x-twitter-black.svg" />
              </a>
          </div>
        </div>
        <div className="p-4 flex justify-center items-center w-full border-b-2 border-black">
          {sidebarText}
        </div>
      </nav>
    </header>
  )
}

export default Navbar
