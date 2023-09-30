import React from "react"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

const PageBlockImage = ({ data }) => {
  return (
    <div className="py-8">
      {/* <GatsbyImage
        image={getImage(data.image.localFile)}
        alt={data.image.alternativeText}
      /> */}
    </div>
  )
}

export default PageBlockImage
