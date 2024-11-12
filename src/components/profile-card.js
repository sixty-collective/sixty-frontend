import React, { Img } from "react"
import { Link, graphql } from "gatsby"
import { GatsbyImage, StaticImage, getImage } from "gatsby-plugin-image"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import { faLocationDot } from "@fortawesome/free-solid-svg-icons"

const ProfileCard = ({ profile, index }) => {
  if (profile.attributes) {
    profile = profile.attributes
  }

  const colorIndex = index % 7
  function defaultProfileImage() {
    switch (colorIndex) {
      case 0:
        return (<StaticImage src="../images/Avatar_ProfilePic_Pink.jpg"
        alt={profile.profilePicture?.alternativeText}
        className="profile-icon  border-2 border-black">
        </StaticImage>);
      case 1:
        return (<StaticImage src="../images/Avatar_ProfilePic_Purple.jpg"
        alt={profile.profilePicture?.alternativeText}
        className="profile-icon  border-2 border-black">
        </StaticImage>);
      case 2:
        return (<StaticImage src="../images/Avatar_ProfilePic_Green.jpg"
        alt={profile.profilePicture?.alternativeText}
        className="profile-icon  border-2 border-black">
        </StaticImage>);
      case 3:
        return (<StaticImage src="../images/Avatar_ProfilePic_Orange.jpg"
        alt={profile.profilePicture?.alternativeText}
        className="profile-icon  border-2 border-black">
        </StaticImage>);
      case 4:
        return (<StaticImage src="../images/Avatar_ProfilePic_Blue.jpg"
        alt={profile.profilePicture?.alternativeText}
        className="profile-icon  border-2 border-black">
        </StaticImage>);
      case 5:
        return (<StaticImage src="../images/Avatar_ProfilePic_Yellow.jpg"
        alt={profile.profilePicture?.alternativeText}
        className="profile-icon  border-2 border-black">
        </StaticImage>);
      default:
        return (<StaticImage src="../images/Avatar_ProfilePic_Grey.jpg"
        alt={profile.profilePicture?.alternativeText}
        className="profile-icon  border-2 border-black">
        </StaticImage>);
  }}
  const availability = profile.availableForWork ? (
    <div className="rounded-full bg-green-500 w-3 h-3 border-2 border-black"></div>
  ) : (
    <div className="rounded-full bg-red-500 w-3 h-3 border-2 border-black"></div>
  )

  function disciplinesSection() {
    if (profile.disciplines) {
      if (profile.disciplines.data) {
        return profile.disciplines.data.map((discipline, index) => {
          return (
            <span
              className="text-xs mr-2 rounded-full px-1 bg-white font-fira border-black border inline-block"
              key={index}
            >
              {discipline.attributes.name}
            </span>
          )
        })
      } else {
        return profile.disciplines.map((discipline, index) => {
          return (
            <span
              className="text-xs mr-2 rounded-full px-1 bg-white font-fira border-black border inline-block"
              key={index}
            >
              {discipline.name}
            </span>
          )
        })
      }
    } else {
      return <div></div>
    }
  }

  function descriptorsSection() {
    if (profile.descriptors) {
      if (profile.descriptors.data) {
        return profile.descriptors.data.map((descriptor, index) => {
          return (
            <span
              className="text-xs mr-2 rounded-full px-1 bg-white font-fira border-black border inline-block"
              key={index}
            >
              {descriptor.attributes.name}
            </span>
          )
        })
      } else {
        return profile.descriptors.map((descriptor, index) => {
          return (
            <span
              className="text-xs mr-2 rounded-full px-1 bg-white font-fira border-black border inline-block"
              key={index}
            >
              {descriptor.name}
            </span>
          )
        })
      }
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
          className="profile-icon border-2 border-black"
        />
      )
      
    } else if (profile.profilePicture?.url) {
      return (
        <img
          src={profile?.profilePicture.url}
          alt={profile?.profilePicture?.alternativeText}
          className="profile-icon border-2 border-black"
        />
      )
    } else {
      return (
      defaultProfileImage()
      )
    }
  }

  return (
    <Link
      to={`/profile/${profile.slug}`}
      className={`z-10 bg-white rounded-3xl border-black border-2 overflow-hidden rounded-xxl bg-white shadow-sm transition-shadow hover:shadow-md hover:drop-shadow-2xl`}
    >
      <div className="">
        <div
          className={`flex card-header border-b-2 border-black px-5 py-3 justify-left items-center sixty-color-${colorIndex}`}
        >
          {profilePicture()}
          <div className="flex flex-col ml-3">
            <div className="flex items-center">
              <h3 className="font-medium poppins text-black mr-2 text-left leading-tight" >{profile.name}</h3>
              {availability}
            </div>
            <div className="flex text-xs items-center">
              <div className="border-2 border-black rounded-full px-1 mr-2 bg-white mt-2">
                <FontAwesomeIcon icon={faLocationDot} />
                <span className="ml-2">{profile.location}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="">
          <p className="m-5 line-clamp-4 text-black">{profile.bio}</p>
          <div className="p-4 border-t-2 border-black max-h-20 relative text-center overflow-hidden">
            <div className="absolute w-full h-4 bg-white bottom-0"></div>
            {disciplinesSection()}{descriptorsSection()}
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
    descriptors {
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
      work_sample_disciplines {
        name
      }
      embed
      embedLink
    }
  }
`

export default ProfileCard
