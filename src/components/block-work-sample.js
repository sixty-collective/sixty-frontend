import React from "react"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faLink } from "@fortawesome/free-solid-svg-icons"

const BlockWorkSample = ({ data, colorIndex }) => {
  const isVideo = data.images

  function disciplinesSection() {
    if (data.disciplines.length > 0) {
      return data.disciplines.map(discipline => {
        return (
          <span className="text-center line-clamp-1 text-xs mr-2 rounded-full px-1 bg-white font-fira border-black border inline-block">
            {discipline.nameForWorkSamples}
          </span>
        )
      })
    } else {
      return <div></div>
    }
  }

  function PreviousArrow(props) {
    const { className, style, onClick } = props
    return (
      <div
        className={className}
        style={{ ...style, left: "10px", zIndex: "10" }}
        onClick={onClick}
      />
    )
  }

  function NextArrow(props) {
    const { className, style, onClick } = props
    return (
      <div
        className={className}
        style={{ ...style, right: "10px" }}
        onClick={onClick}
      />
    )
  }

  function mediaSection() {
    if (!!data.embed && data.embedLink.includes("vimeo")) {
      const vimeoLink = data.embedLink.match(/[^/]+$/g)
      return (
        <div>
          <div style={{ padding: "56.25% 0 0 0", position: "relative" }}>
            <iframe
              // src={"https://player.vimeo.com/video/" + vimeoLink}
              src={data.embedLink}
              style={{
                position: "absolute",
                top: "0",
                left: "0",
                width: "100%",
                height: "100%",
              }}
              frameborder="0"
              allow="autoplay; fullscreen; picture-in-picture"
              allowfullscreen
            ></iframe>
          </div>
          <script src="https://player.vimeo.com/api/player.js"></script>
        </div>
      )
    } else if (!!data.embed && data.embedLink.includes("youtube")) {
      const youTubeLink = data.embedLink.match(/[^/=]+$/g)
      return (
        <div>
          <iframe
            className="aspect-video	w-full"
            // src={"https://www.youtube.com/embed/" + youTubeLink}
            src={data.embedLink}
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          ></iframe>
        </div>
      )
    } else if (data.images) {
      return (
        <Slider
          dots={true}
          infinite={true}
          speed={300}
          slidesToShow={1}
          slidesToScroll={1}
          arrows={true}
          swipe={true}
          adaptiveHeight={true}
          nextArrow={<NextArrow />}
          prevArrow={<PreviousArrow />}
        >
          {data.images.map(file => (
            <GatsbyImage
              key={file.id}
              image={getImage(file.localFile)}
              alt={file.alternativeText}
            />
          ))}
        </Slider>
      )
    } else {
      <div></div>
    }
  }

  return (
    <div className="card bg-white rounded-3xl border-black border-2">
      <div className="card-header border-b-2 border-black p-5 flex justify-center items-center">
        {disciplinesSection()}
      </div>
      {mediaSection()}
      <div className="p-10">
        <p className="font-bold pb-4 text-2xl">{data.name}</p>
        <p className="pb-4">{data.description}</p>
        <a className="flex justify-left" href={data.link}>
          <button className={`rounded-full sixty-color-${colorIndex} hover:opacity-70 px-2 py-1`}>
            <FontAwesomeIcon icon={faLink} />{" "}
            <span className="underline">{data.link}</span>
          </button>
        </a>
      </div>
    </div>
  )
}

export default BlockWorkSample
