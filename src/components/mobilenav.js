
import { Link } from "gatsby"
import React, {useState, useEffect} from "react"
import { StaticImage } from "gatsby-plugin-image"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faBars,
} from "@fortawesome/free-solid-svg-icons"



const MobileNav = ({ sidebarText }) => {
  const [open, setOpen] = useState(false)
  useEffect(() => {
    if (open) {
      document.body.style.position = 'initial';
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.position = 'relative';
      document.body.style.overflow = 'auto';
    }
  },[open])
  const handleClick = (e) => {
    e.preventDefault();
    setOpen(!open);
  }
  return (
    <header className="flex justify-between items-center w-full lg:hidden text-black lg:w-48 lg:h-full shadow-2xl">
      <Link to="/" className="text-xl font-bold p-4 w-40 z-50">
        <StaticImage alt="" className="" src="../images/logo.png" />
      </Link>
      <button className="z-50" onClick={handleClick}>
        <FontAwesomeIcon className="p-4 text-3xl" icon={faBars} />
      </button>
      <nav className={"" + (open ? 'overflow-scroll flex flex-col absolute items-baseline justify-start bg-[#F7F4F0] h-full w-full top-0 z-40' : 'hidden')}>
        <div className="block p-10"></div>
        <div className="flex grow flex-col items-baseline justify-center w-full text-2xl text-black p-5 border-y-2 border-black">
          <Link
            className="pb-2 font-bold w-full hover:text-gray-600 flex items-center justify-between"
            activeClassName="active underline"
            to="/profiles"
          >
            Member Profiles{" "}
            
          </Link>
          <Link
            className="py-2 font-bold w-full hover:text-gray-600 flex items-center justify-between"
            activeClassName="active underline"
            to="/resources"
          >
            Knowledge Share
            
          </Link>
          <Link
            className="py-2 font-bold w-full hover:text-gray-600 flex items-center justify-between"
            activeClassName="active underline"
            to="/about"
          >
            About Us
            
          </Link>
          <Link
            className="py-2 font-bold w-full hover:text-gray-600 flex items-center justify-between"
            activeClassName="active underline"
            to="/support"
          >
            Support Sixty
            
          </Link>
          <Link
            className="pt-2 font-bold w-full hover:text-gray-600 flex items-center justify-between"
            activeClassName="active underline"
            to="/faq"
          >
            FAQ
            
          </Link>
        </div>
        <div className="p-5 w-full">
          {/* <p className="text-sm">{sidebarText}</p> */}
          <p className="text-md lg:text-2xl pb-2">
          Paid opportunities, grants, residencies, and more sent to your inbox.
          </p>
          <a href="/sign-up">
          <button className="rounded-full text-black text-lg lg:text-xl px-2 py-2 lg:py-4 mt-5 border-2 border-black w-full hover:bg-black hover:text-[#F7F4F0]">
            Sign Me Up
          </button>

          </a>
        </div>
        <div className="flex flex-col items-baseline justify-end w-full text-black p-5 border-y-2 border-black">
          <Link
            className="uppercase text-lg py-2 w-full hover:text-gray-600 flex items-center justify-between"
            activeClassName="active underline"
            to="/member"
          >
            Become a Member
            
          </Link>
          <Link
            className="uppercase text-lg py-2 w-full hover:text-gray-600 flex items-center justify-between"
            activeClassName="active underline"
            to="/community-agreements"
          >
            Community Agreements
            
          </Link>
          <Link
            className="uppercase text-lg py-2 w-full hover:text-gray-600 flex items-center justify-between"
            activeClassName="active underline"
            to="/testimonials"
          >
            Testimonials
            
          </Link>
          <Link
            className="uppercase text-lg py-2 border-black w-full hover:text-gray-600 flex items-center justify-between"
            activeClassName="active underline"
            to="/contact"
          >
            Contact Us
            
          </Link>
        </div>
          <div className="pt-5 pb-3 flex justify-center items-center w-full border-b-2 border-black">
          <div className="p-2">
            <Link to="/" className="text-xl font-bold">
              <StaticImage alt="" className="w-10 h-10" src="../images/instagram-black.svg" />
            </Link>
            <Link to="/" className="text-xl font-bold  ml-5">
              <StaticImage alt="" className="w-10 h-10" src="../images/x-twitter-black.svg" />
            </Link>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default MobileNav
