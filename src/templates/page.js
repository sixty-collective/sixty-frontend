import React from "react"
import { graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import Layout from "../components/layout"
import BlocksRenderer from "../components/blocks-renderer"

const Page = ({ data }) => {
  const { title, coverImage, blocks, sideBlocks } = data.strapiPage

  function columnsToggle() {
    console.log(data.strapiPage)
    if (sideBlocks === null) {
      return (
        <main className="grid grid-cols-1 gap-3 p-20">
          <BlocksRenderer blocks={blocks} />
        </main>
      )
    } else {
      return (
        <main className="mt-8 grid grid-cols-2 gap-20 pl-20 pr-20">
          <BlocksRenderer blocks={blocks} />
          <BlocksRenderer blocks={sideBlocks} />
        </main>
      )
    }
  }

  return (
    <Layout as="profile">
      <GatsbyImage
        image={getImage(coverImage.localFile)}
        alt={coverImage.alternativeText}
        className="max-h-96 w-full"
      />
      <div className="pt-20 pl-20 pr-20">
        <h1 className="text-4xl font-bold text-black">{title}</h1>
      </div>
      {columnsToggle()}
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
