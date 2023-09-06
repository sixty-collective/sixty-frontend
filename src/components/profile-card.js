import React from "react"
import { Link, graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

const ProfileCard = ({ profile, index }) => {
  const colorIndex = index % 6
  const availability = profile.availableForWork
    ? "Available for hire"
    : "Unavailable for hire"

  function disciplinesSection() {
    if (profile.disciplines.data.length > 0) {
      return profile.disciplines.data.map(discipline => {
        return (
          <span className="text-xs mr-2 rounded-full px-1 bg-gray-300">
            {discipline.attributes.name}
          </span>
        )
      })
    } else {
      return <div></div>
    }
  }

  return (
    <Link
      to={`/profile/${profile.slug}`}
      className={`bg-white rounded-3xl border-black border-2 overflow-hidden rounded-xxl bg-white shadow-sm transition-shadow hover:shadow-md hover:drop-shadow-2xl`}
    >
      <div className="">
        <div
          className={`flex card-header border-b-2 border-black px-5 py-3 justify-left items-center sixty-color-${colorIndex}`}
        >
          <img
            src={
              process.env.STRAPI_API_URL +
              profile.profilePicture?.data.attributes.url
            }
            alt={profile.profilePicture?.data.attributes.alternativeText}
            className="profile-icon"
          />
          <div className="flex flex-col ml-3">
            <h3 className="font-bold text-black">{profile.name}</h3>
            <div className="flex text-xs">
              <div className="border-2 border-black rounded-full px-1 bg-white">
                {profile.location}
              </div>
              <div className="ml-3 border-2 border-black rounded-full px-1 bg-white">
                {availability}
              </div>
            </div>
          </div>
        </div>
        <div className="">
          <p className="m-5 line-clamp-4 text-black">{profile.bio}</p>
          <div className="p-4 border-t-2 border-black">
            {disciplinesSection()}
          </div>
        </div>
      </div>
    </Link>
  )
}

export const query = graphql`
  fragment ProfileCard on STRAPI_PROFILE {
    id
    slug
    name
    bio
    profilePicture {
      localFile {
        childImageSharp {
          gatsbyImageData
        }
      }
    }
    availableForWork
    location
    disciplines {
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
      disciplines {
        nameForWorkSamples
      }
    }
  }
`

export default ProfileCard
