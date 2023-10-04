import React, { useState, state } from "react"

const PageBlockFaq = ({ data }) => {
  const [clicked, setClicked] = useState("0")

  const handleToggle = index => {
    console.log(index)
    if (clicked === index) {
      return setClicked("0")
    }
    setClicked(index)
  }

  return data.qa.map((question, index) => {
    return (
      <div
        className={`accordion_item border-black border-2 rounded-3xl bg-white p-5 mb-10 ${
          clicked === index ? "active" : ""
        } `}
        key={index}
      >
        <button onClick={() => handleToggle(index)}>
          <div className="font-bold">{question.question}</div>
        </button>
        <div className={`answer_wrapper ${clicked === index ? "open" : ""}`}>
          <div className="pt-5">{question.answer}</div>
        </div>
      </div>
    )
  })
}

export default PageBlockFaq
