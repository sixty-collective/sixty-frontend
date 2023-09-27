import React from "react"
import { Link, graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

const ProfileCard = ({ profile, index }) => {
  const colorIndex = index % 6
  const availability = profile.availableForWork ? (
    <div className="rounded-full bg-green-500 w-3 h-3 border-2 border-black"></div>
  ) : (
    <div className="rounded-full bg-red-500 w-3 h-3 border-2 border-black"></div>
  )

  function disciplinesSection() {
    if (profile.disciplines?.length > 0) {
      return profile.disciplines.map(discipline => {
        return (
          <span className="text-xs mr-2 rounded-full px-1 bg-gray-300">
            {discipline.name}
          </span>
        )
      })
    } else {
      return <div></div>
    }
  }

  function profilePicture() {
    if (profile?.profilePicture?.localFile) {
      return (
        <GatsbyImage
          image={getImage(profile?.profilePicture?.localFile)}
          alt={profile?.profilePicture?.alternativeText}
          className="profile-icon"
        />
      )
    } else {
      return (
        <img
          src={process.env.STRAPI_API_URL + profile.profilePicture?.url}
          alt={profile.profilePicture?.alternativeText}
          className="profile-icon"
        />
      )
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
          {profilePicture()}
          <div className="flex flex-col ml-3">
            <div className="flex items-center">
              <h3 className="font-bold text-black mr-2">{profile.name}</h3>
              {availability}
            </div>
            <div className="flex text-xs items-center">
              <div className="border-2 border-black rounded-full px-1 mr-2 bg-white">
                {profile.location}
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
