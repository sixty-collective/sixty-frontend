import React from "react"
import { Link, graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

const ResourceCard = ({ resource, index }) => {
  console.log(resource)
  function categoriesSection() {
    if (resource.categories.data.length > 0) {
      return resource.categories.data.map(category => {
        return (
          <span className="text-xs mr-2 rounded-full px-2 py-1 bg-gray-300">
            {category.attributes.name}
          </span>
        )
      })
    } else {
      return <div></div>
    }
  }

  return (
    <div className="border-black border-2 rounded-3xl bg-white">
      <div className="flex card-header border-b-2 border-black px-2 py-3 justify-left items-center">
        <div className="flex flex-col ml-3">
          <h3 className="font-bold text-black">{resource.title}</h3>
        </div>
      </div>
      <div className="">
        <p className="m-5 line-clamp-4 text-black">{resource.description}</p>
        <Link to={resource.link} className="">
          <div className="m-5 text-xs">
            <span className="bg-gray-200 rounded-full px-2 py-1 hover:bg-gray-300">
              {resource.link}
            </span>
          </div>
        </Link>
        <div className="p-4 border-t-2 border-black">{categoriesSection()}</div>
      </div>
    </div>
  )
}

export const query = graphql`
  fragment ResourceCard on STRAPI_resource {
    id
    slug
    name
    bio
    resourcePicture {
      localFile {
        childImageSharp {
          gatsbyImageData
        }
      }
    }
    availableForWork
    location
    categories {
      name
    }
    workSamples {
      name
      link
      description
      images {
        id
        mime
        localFile {
          childImageSharp {
            gatsbyImageData
          }
        }
      }
      categories {
        nameForWorkSamples
      }
    }
  }
`

export default ResourceCard
