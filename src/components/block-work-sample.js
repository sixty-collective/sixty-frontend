import React from "react"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

const BlockWorkSample = ({ data }) => {
  console.log(data)
  const isVideo = data.images

  function disciplinesSection() {
    if (data.disciplines.length > 0) {
      return data.disciplines.map(discipline => {
        return (
          <span className="text-xs mr-2 rounded-full px-1 bg-gray-300">
            {discipline.nameForWorkSamples}
          </span>
        )
      })
    } else {
      return <div></div>
    }
  }

  return (
    <div className="card bg-white rounded-3xl border-black border-2">
      <div className="card-header border-b-2 border-black p-5 flex justify-center items-center">
        {disciplinesSection()}
      </div>
      <Slider
        dots={true}
        infinite={true}
        speed={300}
        slidesToShow={1}
        slidesToScroll={1}
        arrows={true}
        swipe={true}
      >
        {data.images.map(file => (
          <GatsbyImage
            key={file.id}
            image={getImage(file.localFile)}
            alt={file.alternativeText}
          />
        ))}
      </Slider>
      <div className="p-10">
        <p className="font-bold pb-4 text-2xl">{data.name}</p>
        <p className="pb-4">{data.description}</p>
        <a className="flex justify-left" href={data.link}>
          <button className="rounded-full bg-gray-200 hover:bg-gray-300 px-2 py-1">
            {data.link}
          </button>
        </a>
      </div>
    </div>
  )
}

export default BlockWorkSample
