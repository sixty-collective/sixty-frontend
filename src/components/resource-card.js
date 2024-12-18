import React from "react"
import { Link, graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

const ResourceCard = ({ resource, index }) => {
  function categoriesSection() {
    if (resource.categories.length > 0) {
      return resource.categories.map((category, index) => {
        return (
          <span key={index} className="text-xs mr-2 rounded-full px-1 bg-white font-fira border-black border inline-block">
            {category.name}
          </span>
        )
      })
    } else {
      return <div key={index}></div>
    }
  }

  function tagsSection() {
    if (resource.resource_tags.length > 0) {
      return resource.resource_tags.map((tag, index) => {
        return (
          <span key={index} className="text-xs mr-2 rounded-full px-1 bg-white font-fira border-black border inline-block">
            {tag.name}
          </span>
        )
      })
    } else {
      return <div key={index}></div>
    }
  }

  return (
    <div key={resource.title} className={`bg-white rounded-3xl border-black border-2 overflow-hidden rounded-xxl bg-white shadow-sm transition-shadow group hover:shadow-md hover:drop-shadow-2xl`}>
      <div className="flex card-header border-b-2 border-black px-5 py-3 justify-left items-center">
        <div className="flex flex-col min-h-[3rem] justify-center group-hover:h-auto">
          <h3 className="font-bold poppins font-medium text-black line-clamp-2 group-hover:line-clamp-3">{resource.title}</h3>
        </div>
      </div>
      <div className="">
        <p className="min-h-[7.8rem] m-5 line-clamp-5 text-black group-hover:line-clamp-none group-hover:h-auto">
          {resource.description}
        </p>
        {resource.link.length > 45 ? (<a target="_blank" rel="noreferrer" href={resource.link} className="">
          <div className="m-5 text-xs">
            <span className="knowledge-gradient font-semibold line-clamp-1 leading-5 rounded-full px-2 py-1 hover:underline">
              {resource.link}
            </span>
          </div>
        </a>): (<a target="_blank" rel="noreferrer" href={resource.link} className="">
          <div className="m-5 text-xs">
            <span className="knowledge-gradient font-semibold rounded-full px-2 py-1 hover:bg-gray-300 hover:underline">
              {resource.link}
            </span>
          </div>
        </a>)}
        <div className="p-4 border-t-2 border-black min-h-20 relative group-hover:h-auto text-center">
        {/* <div class="absolute w-full h-4 bg-white bottom-0	"></div> */}
          {categoriesSection()}{tagsSection()}
          </div>
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
    resource_tags {
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
    }
  }
`

export default ResourceCard
