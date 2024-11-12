import React from "react"
import { graphql } from "gatsby"
import PageBlockEmbed from "./page-block-embed"
import PageBlockImage from "./page-block-image"
import PageBlockText from "./page-block-text"
import PageBlockFaq from "./page-block-faq"

const componentsMap = {
  STRAPI__COMPONENT_PAGE_EMBED: PageBlockEmbed,
  // STRAPI__COMPONENT_PAGE_IMAGE: PageBlockImage,
  STRAPI__COMPONENT_PAGE_TEXT: PageBlockText,
  // STRAPI__COMPONENT_PAGE_FAQ: PageBlockFaq,
}

const Block = ({ block }) => {
  const Component = componentsMap[block.__typename]

  if (!Component) {
    return null
  }

  return <Component data={block} />
}

const BlocksRenderer = ({ blocks }) => {
  return (
    <div>
      {blocks.map((block, index) => (
        <Block key={`${index}${block.__typename}`} block={block} />
      ))}
    </div>
  )
}

export const query = graphql`
  fragment Blocks on STRAPI__COMPONENT_PAGE_EMBEDSTRAPI__COMPONENT_PAGE_FAQSTRAPI__COMPONENT_PAGE_IMAGESTRAPI__COMPONENT_PAGE_TEXTUnion {
    __typename
    ... on STRAPI__COMPONENT_PAGE_TEXT {
      richTextBody: text {
        __typename
        data {
          id
          childMarkdownRemark {
            html
          }
        }
      }
    }
    # ... on STRAPI__COMPONENT_PAGE_IMAGE {
    #   image {
    #     mime
    #     localFile {
    #       childImageSharp {
    #         gatsbyImageData
    #       }
    #     }
    #   }
    #   __typename
    # }
    ... on STRAPI__COMPONENT_PAGE_EMBED {
      embed
    }
    # ... on STRAPI__COMPONENT_PAGE_FAQ {
    #   __typename
    #   qa {
    #     question
    #     answer
    #   }
    # }
  }
`

export default BlocksRenderer
