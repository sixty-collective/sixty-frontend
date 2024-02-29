import React, {useEffect, useState} from "react"
import Footer from "./footer"
import Navbar from "./navbar"
import MobileNav from "./mobilenav"
import { CookieNotice } from "gatsby-cookie-notice"

const agreements = [
  "Assume the best of people and situations (until proven otherwise) by treating everyone you meet through this platform with grace, kindness, and respect.",
  "Listen to understand each other’s perspectives, boundaries, needs, curiosities, and opinions.",
  "Strive for clarity and accuracy with the terms, payment, timelines, and other details of gigs and collaborations, including when those terms shift and change.",
  "Place people over productivity by acknowledging that while we’re all doing incredibly important work, we’re also living during wild and challenging times.",
  "Keep things confidential between collaborators, unless consent is clearly expressed by everyone involved.",
]

const Layout = ({ sidebarText, children }) => {
  const [checkboxStatus, setCheckboxStatus] = useState(Array(5).fill(false))

  function buttonHandler(index) {
    let status = [...checkboxStatus]
    status[index] = !status[index]
    setCheckboxStatus(status)

    if (status.filter(status => status === true).length === 5) {
      setCookieAllow(true)
      if (typeof window !== `undefined`) {
        document.body.style.overflow = 'auto';
      }
    } else {
      setCookieAllow(false)
    }
  }
  const [cookieAllow, setCookieAllow] = React.useState(false)
  useEffect(() => {
    document.body.style.position = 'relative';
    document.body.style.overflow = 'hidden';
    if (typeof window !== `undefined`) {
      if (document.cookie.indexOf('necessary=true') == 0 || cookieAllow === true) {
        document.body.style.overflow = 'auto';
      } else {
        document.body.style.position = 'relative';
        document.body.style.overflow = 'hidden';
      }
    }
  },[])

  return (
    <div className="flex-col-reverse md:flex-col flex min-h-screen justify-end md:justify-start text-neutral-900">
      <Navbar sidebarText={sidebarText} />
      <div className="ml-0 md:ml-52">
        {children}
        <Footer />
      </div>
      <MobileNav />
      <CookieNotice
        acceptButtonText="Agree & Enter"
        declineButton={false}
        backgroundClasses=""
        personalizeButtonEnable={false}
        acceptButtonClasses={
          "rounded-full px-3 text-sm bg-black text-white p-1 border-black border-2 " +
          (cookieAllow ? "cookieAllow" : "cookieNotAllow")
        }
        backgroundWrapperClasses="absolute w-full h-full top-0 left-0 bg-gray-400/75 overflow-hidden z-50"
        buttonWrapperClasses="pt-5 ml-5 mr-5 pb-10 md:m-auto flex justify-center bg-white w-auto md:w-1/2 border-b-2 border-l-2 border-r-2 rounded-b-3xl border-black"
      >
        <div className="ml-5 mr-5 w-auto md:w-1/2 md:m-auto bg-white mt-20 md:mt-20 flex flex-col bg-white rounded-t-2xl">
          <h2 className="text-md md:text-xl font-medium bg-green text-black text-center w-full p-4 border-2 border-black rounded-t-2xl">
            Community Agreements
          </h2>
          <div className="pt-2 pb-0 pl-5 pr-5 border-l-2 border-r-2 border-black">
            {Array(5)
              .fill(0)
              .map((_, index) => (
                <li className="list-none flex items-center">
                  <input
                    type="checkbox"
                    checked={checkboxStatus[index]}
                    onChange={() => buttonHandler(index)}
                  />
                  <span className="text-xs md:text-base m-2 md:ml-5 md:mt-5 md:mb-5">{agreements[index]}</span>
                </li>
              ))}
            <p className="text-xs md:text-base pt-5">
              This website uses cookies to keep track of whether the Community
              Agreements has been accepted.
            </p>
          </div>
        </div>
      </CookieNotice>
    </div>
  )
}

export default Layout
