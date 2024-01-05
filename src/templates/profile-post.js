import React, { useState } from "react"
import { graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import Layout from "../components/layout"
import BlockWorkSample from "../components/block-work-sample"
import Seo from "../components/seo"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { StaticImage } from "gatsby-plugin-image"

import {
  faGlobe,
  faLocationDot,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons"

const ProfilePage = ({ data }) => {
  const [visible, setVisible] = useState(false)

  const handleToggle = () => {
    setVisible(current => !current)
  }
  const profile = data.strapiProfile
  const colorIndex = Math.floor(Math.random() * 6)

  const availability = profile.availableForWork
    ? "Available for hire"
    : "Unavailable for hire"
  const seo = {
    metaTitle: profile.name,
    metaDescription: profile.description,
    shareImage: profile.name,
  }

  const availabilityColor = profile.availableForWork ? (
    <div className="rounded-full bg-green-500 w-3 h-3 border-2 border-black inline-block mr-2"></div>
  ) : (
    <div className="rounded-full bg-red-500 w-3 h-3 border-2 border-black inline-block mr-2"></div>
  )

  function contactText() {
    if (visible) {
      return "PROFILE"
    } else {
      return "CONTACT"
    }
  }

  function disciplinesSection() {
    if (profile.disciplines.length > 0) {
      return profile.disciplines.map(discipline => {
        return (
          <span className="text-center line-clamp-1 text-xs mr-2 rounded-full px-1 bg-white font-fira border-black border inline-block">
            {discipline.name}
          </span>
        )
      })
    } else {
      return <div></div>
    }
  }

  function descriptorsSection() {
    if (profile.descriptors.length > 0) {
      return profile.descriptors.map(descriptor => {
        return (
          <span className="text-center line-clamp-1 text-xs mr-2 rounded-full px-1 bg-white font-fira border-black border inline-block">
            {descriptor.name}
          </span>
        )
      })
    } else {
      return <div></div>
    }
  }

  function mainProfileSection() {
    if (visible) {
      return (
        <div className="main-content col-span-3 pt-5 md:p-5 mt-10 md:mt-0 relative">
          <div
            className="absolute -top-5 left-5 z-10 cursor-pointer hover:underline"
            onClick={handleToggle}
          >
            <FontAwesomeIcon icon={faArrowLeft} /> Back to Profile
          </div>
          <div className="card bg-white rounded-3xl border-black border-2">
            <div className="card-header border-b-2 border-black p-5 flex justify-center items-center">
              <h2 className="text-xl font-bold">Contact {profile.name}</h2>
            </div>
            <form
              id="fs-frm"
              name="simple-contact-form"
              acceptCharset="utf-8"
              action="https://formspree.io/f/xknlrzln"
              method="post"
              className="pb-10"
            >
              <fieldset id="fs-frm-inputs" className="flex flex-col p-10">
                <label htmlFor="full-name" className="mb-2">
                  First and Last Name*
                </label>
                <input
                  type="text"
                  name="name"
                  id="full-name"
                  required=""
                  className="bg-gray-200 rounded-lg p-2"
                />
                <label htmlFor="email-address" className="mt-10 mb-2">
                  Email Address*
                </label>
                <input
                  type="email"
                  name="_replyto"
                  id="email-address"
                  required=""
                  className="bg-gray-200 rounded-lg p-2"
                />
                <label htmlFor="statement" className="mt-10 mb-2">
                  Write a brief statement about yourself and/or the collective,
                  project, or organization you are affiliated with.*
                </label>
                <textarea
                  rows={5}
                  name="statement"
                  id="statement"
                  required=""
                  defaultValue={""}
                  className="bg-gray-200 rounded-lg p-2"
                />
                <label htmlFor="seeking" className="mt-10 mb-2">
                  Tell us about the skills or services you're looking for and
                  any relevant gig information. Are there specific skill sets,
                  experiences, or backgrounds you're seeking?*
                </label>
                <textarea
                  rows={5}
                  name="seeking"
                  id="seeking"
                  required=""
                  defaultValue={""}
                  className="bg-gray-200 rounded-lg p-2"
                />
                <label htmlFor="timeframe" className="mt-10 mb-2">
                  When do you need to have this job filled by? (Date,
                  Timeframe)*
                </label>
                <textarea
                  rows={5}
                  name="timeframe"
                  id="timeframe"
                  required=""
                  defaultValue={""}
                  className="bg-gray-200 rounded-lg p-2"
                />
                <label htmlFor="materials" className="mt-10 mb-2">
                  Please share any relevant links, websites or materials that
                  would help us to better understand the job, your work, and/or
                  your organization's work?*
                </label>
                <textarea
                  rows={5}
                  name="materials"
                  id="materials"
                  required=""
                  defaultValue={""}
                  className="bg-gray-200 rounded-lg p-2"
                />
                <>
                  <div className="mt-10 mb-2">What is the budget for this project?*</div>
                  <div className="flex mt-5">
                    <input
                      type="radio"
                      id="0-500"
                      name="budget"
                      defaultValue="0-500"
                      className="mr-3 bg-gray-200"
                    />
                    <label htmlFor="0-500">$0-$500</label>
                  </div>
                  <div className="flex mt-2">
                    <input
                      type="radio"
                      id="500-1000"
                      name="budget"
                      defaultValue="500-1000"
                      className="mr-3 bg-gray-200"
                    />
                    <label htmlFor="500-1000">$500-$1,000</label>
                  </div>
                  <div className="flex mt-2">
                    <input
                      type="radio"
                      id="1000-5000"
                      name="budget"
                      defaultValue="1000-5000"
                      className="mr-3 bg-gray-200"
                    />
                    <label htmlFor="1000-5000">$1,000-$5,000</label>
                  </div>
                  <div className="flex mt-2">
                    <input
                      type="radio"
                      id="5000+"
                      name="budget"
                      defaultValue="5000+"
                      className="mr-3 bg-gray-200"
                    />
                    <label htmlFor="5000+">$5,000+</label>
                  </div>
                </>

                <label htmlFor="interest" className="mt-10 mb-2">
                  Why are you interested in working with this artist?*
                </label>
                <textarea
                  rows={5}
                  name="interest"
                  id="interest"
                  required=""
                  defaultValue={""}
                  className="bg-gray-200 rounded-lg p-2"
                />
                <input
                  type="hidden"
                  name="_subject"
                  id="email-subject"
                  defaultValue="Contact Form Submission"
                />
              </fieldset>
              <div className="text-center">
                <input
                  className="rounded-full px-3 text-sm bg-black text-white p-1 border-black border-2"
                  type="submit"
                  defaultValue="Submit"
                />
              </div>
            </form>
          </div>
        </div>
      )
    } else {
      return (
        <div className="main-content col-span-3 pt-5 md:p-5">
          <div className="card bg-white rounded-3xl border-black border-2">
            <div className="px-10 py-10">
              <p className="font-bold mb-2">What you should know about me</p>
              <p className="mb-6">{profile.bio}</p>
              <p className="font-bold mb-2">
                What you should know about my work and work style
              </p>
              <p className="mb-6">{profile.workStyleBio}</p>
              <p className="font-bold mb-2">
                Gigs I'm seeking (and not seeking)
              </p>
              <p className="mb-6">{profile.gigsSeeking}</p>
              <p className="font-bold mb-2">Past works</p>
              <p>{profile.pastWork}</p>
            </div>
          </div>
          <div className="mt-12">
            <h2 className="text-3xl font-bold">Work Samples</h2>
            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-1 lg:grid-cols-1">
              {profile.workSamples.map(sample => (
                <BlockWorkSample data={sample} colorIndex={colorIndex} />
              ))}
            </div>
          </div>
        </div>
      )
    }
  }

  return (
    <Layout as="profile">
      <Seo seo={seo} />
      <main className="flex flex-col-reverse mt-8 md:grid md:grid-cols-4 md:gap-3 md:p-20 container">
        {mainProfileSection()}
        <div className="side-content flex flex-col col-span-1 md:p-5">
          <div
            className={`sixty-color-${colorIndex} py-8 flex flex-col justify-center items-center border-2 rounded-2xl border-black`}
          >
            <GatsbyImage
              image={getImage(profile?.profilePicture?.localFile)}
              alt={profile?.profilePicture?.alternativeText}
              className="profile-picture border-2 border-black"
            />
            <div className="pt-2 name-card flex justify-center items-center flex-col">
              <h1 className="text-lg font-bold text-neutral-700">
                {profile.name}
              </h1>
              <div className="mt-2 text-sm text-neutral-700">
                {profile.pronouns}
              </div>
              <div className="mt-2 text-sm text-neutral-700 rounded-full bg-white border-2 border-black px-2 flex items-center">
                <FontAwesomeIcon icon={faLocationDot} />{" "}
                <span className="ml-2">{profile.location}</span>
              </div>
              <div className="mt-2 text-sm text-neutral-700 rounded-full bg-white border-2 border-black px-2 flex items-center">
                {availabilityColor}
                {availability}
              </div>
            </div>
          </div>
          <div className="mt-5 card bg-white rounded-3xl border-black border-2 p-4 overflow-clip text-center">
            {disciplinesSection()}{descriptorsSection()}
          </div>
          <div className="mt-5 card bg-white rounded-3xl border-black border-2 p-5 overflow-clip break-words justify-center	hyphens-auto items-center	flex">
              <a className="hover:opacity-50 px-2 text-2xl" href={profile.website}>
                <FontAwesomeIcon icon={faGlobe} />
              </a>
              <a
                className="hover:opacity-50 px-2	"
                href={"https://instagram.com/" + profile.instagramHandle}
              >
              <StaticImage
                alt=""
                className="w-6"
                src="../images/instagram-black.svg"
              />
              </a>
          </div>
          <button
            onClick={handleToggle}
            className="font-bold text-xl bg-slate-900 width-full text-white py-3 px-5 mt-5 rounded-full"
          >
            {contactText()}
          </button>
        </div>
      </main>
    </Layout>
  )
}

export const pageQuery = graphql`
  query ($slug: String) {
    strapiProfile(slug: { eq: $slug }) {
      id
      slug
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
        embed
        embedLink
      }
      pronouns
      website
      pastWork
      name
      instagramHandle
      gigsSeeking
      email
      bio
      twitterHandle
      availableForWork
      location
      workStyleBio
      profilePicture {
        localFile {
          childImageSharp {
            gatsbyImageData
          }
        }
      }
      disciplines {
        name
      }
      descriptors {
        name
      }
    }
  }
`

export default ProfilePage
