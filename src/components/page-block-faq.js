import React, { useState, state } from "react"
import { StaticImage } from "gatsby-plugin-image"


const PageBlockFaq = ({ data }) => {
  const [clicked, setClicked] = useState("0")

  const handleToggle = index => {
    if (clicked === index) {
      return setClicked("0")
    }
    setClicked(index)
  }

  return  <div className="md:columns-1">

    {data.qa.map((question, index) => {
      return (
        <div
          className={`break-inside-avoid font-fira accordion_item border-black border-2 rounded-3xl bg-white pt-5 pl-5 pr-5 pb-2 mb-10 ${
            clicked === index ? "active" : ""
          } `}
          key={index}
        >
          <button onClick={() => handleToggle(index)}>
            <div className="font-medium text-left	">{question.question}</div>
          </button>
          <div className={`answer_wrapper ${clicked === index ? "open" : ""}`}>
            <div className="pt-5">{question.answer}</div>
          </div>
          <div className="text-center">
          <button className="w-5 pt-5 text-center" onClick={() => handleToggle(index)}>
          {(clicked === index) ? <StaticImage alt="" className="w-4 h-4" objectFit="contain" src="../images/up-arrow.svg" />: <StaticImage alt="" className="w-4 h-4" objectFit="contain" src="../images/down-arrow.svg" />}
  
          </button>
  
          </div>
        </div>
      )
    })}
  </div>
}

export default PageBlockFaq
