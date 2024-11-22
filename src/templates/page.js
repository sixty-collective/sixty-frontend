import React from "react"
import { graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import Layout from "../components/layout"
import BlocksRenderer from "../components/blocks-renderer"

const Page = ({ data }) => {
  const { title, coverImage, blocks, sideBlocks } = data.strapiPage
  function columnsToggle() {
    if (sideBlocks === null) {
      return (
        <main className="w-full grid grid-cols-1 gap-3 pt-10">
          <BlocksRenderer blocks={blocks} />
        </main>
      )
    } else {
      return (
        <main className="lg:mt-8 grid lg:grid-cols-2 lg:gap-20">
          <BlocksRenderer blocks={blocks} />
          <BlocksRenderer blocks={sideBlocks} />
        </main>
      )
    }
  }

  function coverImageSection() {
    if (coverImage.ext === ".gif") {
      return (
        <img src={coverImage.url} alt={coverImage.alternativeText} className="max-h-56 w-full border-black border-b-2 object-cover" />
      )
    } else {
      return (
        <GatsbyImage
          image={getImage(coverImage.localFile)}
          alt={coverImage.alternativeText}
          className="max-h-56 w-full border-black border-b-2"
        />
      )
    }
  }

  return (
    <Layout as="profile">
      {coverImageSection()}
      <div className="container pt-10 md:pt-20">
        <h1 className="poppins text-4xl font-semibold text-black">{title}</h1>
        {columnsToggle()}
      </div>
    </Layout>
  )
}

export const pageQuery = graphql`
  query ($slug: String) {
    strapiPage(slug: { eq: $slug }) {
      id
      slug
      title
      coverImage {
        localFile {
          childImageSharp {
            gatsbyImageData
          }
        }
        ext
        url
      }
      blocks {
        ...Blocks
      }
      sideBlocks {
        ...Blocks
      }
    }
  }
`

export default Page
