import React, { useState } from "react"
import PropTypes from "prop-types"

import { useStaticQuery, graphql, Link } from "gatsby"
import Layout from "../components/layout"
import ProfilesGrid from "../components/profiles-grid"
import Seo from "../components/seo"
import Headings from "../components/headings"
import axios from "axios"
// import { CookieNotice } from "gatsby-cookie-notice"
import withLocation from "../components/with-location"

const IndexPage = ({ queryStrings }) => {
  const { q } = queryStrings
  const {
    allStrapiProfile,
    strapiGlobal,
    allStrapiDiscipline,
    allStrapiDescriptor,
    search,
  } = useStaticQuery(graphql`
    query {
      allStrapiProfile(limit: 3, sort: { createdAt: ASC }) {
        nodes {
          ...ProfileCard
        }
      }
      allStrapiDiscipline {
        edges {
          node {
            id
            name
            slug
            discipline_category {
              name
            }
          }
        }
      }
      allStrapiDescriptor {
        edges {
          node {
            id
            name
            slug
            descriptor_category {
              name
            }
          }
        }
      }
      strapiGlobal {
        siteName
        siteDescription
        homeHeaderText {
          data {
            id
            childMarkdownRemark {
              html
            }
          }
        }
        sidebarText
      }
    }
  `)

  const [checkboxStatus, setCheckboxStatus] = useState(Array(5).fill(false))

  function buttonHandler(index) {
    let status = [...checkboxStatus]
    status[index] = !status[index]
    setCheckboxStatus(status)

    console.log(status)
    if (status.filter(status => status === true).length === 5) {
      setCookieAllow(true)
    } else {
      setCookieAllow(false)
    }
  }

  const [input, setInput] = useState("")
  const [resourceInput, setResourceInput] = useState("")
  const [selectedDisciplines, setSelectedDisciplines] = useState([])
  const [selectedDescriptors, setSelectedDescriptors] = useState([])
  const [results, setResults] = useState([])
  const [checkedDisciplinesState, setCheckedDisciplinesState] = useState(
    new Array(allStrapiDiscipline.edges.length).fill(false)
  )
  const [checkedDescriptorsState, setCheckedDescriptorsState] = useState(
    new Array(allStrapiDescriptor.edges.length).fill(false)
  )
  const [openDisciplines, setOpenDisciplines] = React.useState(false)
  const [openDescriptors, setOpenDescriptors] = React.useState(false)
  const [cookieAllow, setCookieAllow] = React.useState(false)

  const toggleDisciplines = () => {
    setOpenDisciplines(!openDisciplines)
  }
  const toggleDescriptors = () => {
    setOpenDescriptors(!openDescriptors)
  }

  const sendSearch = (value, type) => {
    let url =
      "https://sixty-backend.onrender.com" +
      "/api/profiles?populate[0]=disciplines,profilePicture"
    if (type === "input") {
      url = url.concat("&filters[name][$contains]=" + value)
    } else if (!!input) {
      url = url.concat("&filters[name][$contains]=" + input)
    }

    if (type === "descriptors") {
      const descriptorsUrl = value.join(
        "&filters[$or][1][descriptors][slug][$in]="
      )
      url = url.concat(
        "&filters[$or][0][descriptors][slug][$in]=" + descriptorsUrl
      )
    } else if (selectedDescriptors.length > 0) {
      const descriptorsUrl = selectedDescriptors.join(
        "&filters[$or][1][descriptors][slug][$in]="
      )
      url = url.concat(
        "&filters[$or][0][descriptors][slug][$in]=" + descriptorsUrl
      )
    }

    if (type === "disciplines") {
      const disciplinesUrl = value.join(
        "&filters[$or][1][disciplines][slug][$in]="
      )
      url = url.concat(
        "&filters[$or][0][disciplines][slug][$in]=" + disciplinesUrl
      )
    } else if (selectedDisciplines.length > 0) {
      const disciplinesUrl = selectedDisciplines.join(
        "&filters[$or][1][disciplines][slug][$in]="
      )
      url = url.concat(
        "&filters[$or][0][disciplines][slug][$in]=" + disciplinesUrl
      )
    }

    axios.get(url).then(response => {
      setResults(response.data.data)
    })
  }
  if (results.length === 0) {
    axios
      .get(
        "https://sixty-backend.onrender.com" +
          "/api/profiles?populate[0]=disciplines,profilePicture"
      )
      .then(response => {
        setResults(response.data.data)
      })
  }
  const handleInputChange = e => {
    setInput(e.target.value)
  }

  const handleResourceInputChange = e => {
    setResourceInput(e.target.value)
  }

  const handleDisciplinesChange = position => {
    const updatedCheckedDisciplinesState = checkedDisciplinesState.map(
      (item, index) => (index === position ? !item : item)
    )

    setCheckedDisciplinesState(updatedCheckedDisciplinesState)
  }

  const handleDescriptorsChange = position => {
    const updatedCheckedDescriptorsState = checkedDescriptorsState.map(
      (item, index) => (index === position ? !item : item)
    )

    setCheckedDescriptorsState(updatedCheckedDescriptorsState)
  }

  const Checkbox = ({ obj, index, check, checked, onChange }) => {
    return (
      <>
        <input
          type="checkbox"
          id={`custom-checkbox-${obj.node.slug}`}
          className={check}
          name={obj.node.slug}
          checked={checked}
          onChange={onChange}
        />
        <span className="ml-2">{obj.node.name}</span>
      </>
    )
  }

  const agreements = [
    "Assume the best of people and situations (until proven otherwise) by treating everyone you meet through this platform with grace, kindness, and respect.",
    "Listen to understand each other’s perspectives, boundaries, needs, curiosities, and opinions.",
    "Strive for clarity and accuracy with the terms, payment, timelines, and other details of gigs and collaborations, including when those terms shift and change.",
    "Place people over productivity by acknowledging that while we’re all doing incredibly important work, we’re also living during wild and challenging times.",
    "Keep things confidential between collaborators, unless consent is clearly expressed by everyone involved.",
  ]

  const handleDisciplinesApply = () => {
    const checkedBoxes = document.querySelectorAll(
      "input[class=disciplines-box]:checked"
    )
    // console.log(checkedBoxes)
    const disciplinesFilters = Array.from(checkedBoxes).map(input => {
      return input.name
    })

    setSelectedDisciplines(disciplinesFilters)
    toggleDisciplines()
    sendSearch(disciplinesFilters, "disciplines")
  }

  const handleClearDisciplines = () => {
    setSelectedDisciplines([])
    toggleDisciplines()
    setCheckedDisciplinesState(
      new Array(allStrapiDiscipline.edges.length).fill(false)
    )
    sendSearch([], "disciplines")
  }

  const handleDescriptorsApply = () => {
    const checkedBoxes = document.querySelectorAll(
      "input[class=descriptors-box]:checked"
    )
    // console.log(checkedBoxes)
    const descriptorsFilters = Array.from(checkedBoxes).map(input => {
      return input.name
    })

    setSelectedDescriptors(descriptorsFilters)
    toggleDescriptors()
    sendSearch(descriptorsFilters, "descriptors")
  }

  const handleClearDescriptors = () => {
    setSelectedDescriptors([])
    toggleDescriptors()
    setCheckedDescriptorsState(
      new Array(allStrapiDiscipline.edges.length).fill(false)
    )
    sendSearch([], "descriptors")
  }

  function disciplines() {
    return (
      <div className="border-2 border-black rounded-2xl">
        <div className="p-5">
          {allStrapiDiscipline.edges.map((discipline, index) => {
            return (
              <li className="list-none" key={index}>
                <Checkbox
                  obj={discipline}
                  index={index}
                  check="disciplines-box"
                  checked={checkedDisciplinesState[index]}
                  onChange={() => handleDisciplinesChange(index)}
                />
              </li>
            )
          })}
        </div>
        <div className="flex border-t-2 border-black p-5 justify-between items-center">
          <a href="#" onClick={handleClearDisciplines}>
            Clear All
          </a>
          <button
            className="rounded-full px-3 text-sm bg-black text-white p-1 border-black border-2"
            onClick={handleDisciplinesApply}
          >
            Apply
          </button>
        </div>
      </div>
    )
  }

  const disciplinesSection = openDisciplines ? (
    <div className="absolute bg-white mt-3">{disciplines()}</div>
  ) : (
    <span></span>
  )

  function descriptors() {
    return (
      <div className="border-2 border-black rounded-2xl">
        <div className="p-5">
          {allStrapiDescriptor.edges.map((descriptor, index) => {
            return (
              <li className="list-none" key={index}>
                <Checkbox
                  obj={descriptor}
                  index={index}
                  check="descriptors-box"
                  checked={checkedDescriptorsState[index]}
                  onChange={() => handleDescriptorsChange(index)}
                />
              </li>
            )
          })}
        </div>
        <div className="flex border-t-2 border-black p-5 justify-between items-center">
          <a href="#" onClick={handleClearDescriptors}>
            Clear All
          </a>
          <button
            className="rounded-full px-3 text-sm bg-black text-white p-1 border-black border-2"
            onClick={handleDescriptorsApply}
          >
            Apply
          </button>
        </div>
      </div>
    )
  }

  const descriptorsSection = openDescriptors ? (
    <div className="absolute bg-white mt-3">{descriptors()}</div>
  ) : (
    <span></span>
  )

  return (
    <Layout sidebarText={strapiGlobal.sidebarText}>
      <Seo seo={{ metaTitle: "Home" }} />
      <Headings
        title={strapiGlobal.siteName}
        description={strapiGlobal.siteDescription}
      />
      <main className="flex flex-col justify-center items-center width-full">
        <div className="container">
          <h1 className="text-3xl py-20 font-bold w-full rounded-t-2xl">
            <div
              dangerouslySetInnerHTML={{
                __html:
                  strapiGlobal.homeHeaderText.data.childMarkdownRemark.html,
              }}
            />
          </h1>
        </div>
        <div className="container grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2">
          <div className="bg-white mr-5 flex flex-col gap-3 bg-white rounded-3xl border-2 border-black">
            <h2 className="text-xl font-bold bg-black text-white w-full px-8 p-2 rounded-t-2xl">
              Search and Hire Talent
            </h2>
            <div className="px-8 pb-8">
              <p className="max-w-lg mt-3">
                Some introductory text about searching for members to hire. This
                part could be a few lines long and be similar to the copy on the
                donation pages (weaving in some storytelling aspect, or
                something, I dunno).
              </p>
              <div className="mt-5 flex">
                <div>
                  <div className="text-xs">Enter a custom search:</div>
                  <input
                    className=" rounded-full px-3 text-sm border-2 border-black max-w-xs mt-2 p-1"
                    placeholder="Enter 'Name'"
                    value={input}
                    onChange={handleInputChange}
                  />
                  <Link href={"/profiles?q=" + input}>
                    <button className="ml-2 rounded-full px-3 text-sm bg-black text-white p-1 border-black border-2">
                      Search
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white ml-5 flex flex-col gap-3 bg-white rounded-3xl border-2 border-black">
            <h2 className="text-xl font-bold bg-black text-white w-full px-8 p-2 rounded-t-2xl">
              Browse our Resource Library
            </h2>
            <div className="px-8 pb-8">
              <p className="max-w-lg mt-3">
                Browse our growing collection of carefully selected materials,
                tools, and career advice about freelance life, hiring artists,
                archiving, cultural advocacy, collective work, and more.
              </p>
              <div className="mt-5 flex">
                <div>
                  <div className="text-xs">Enter a custom search:</div>
                  <input
                    className=" rounded-full px-3 text-sm border-2 border-black max-w-xs mt-2 p-1"
                    placeholder="Enter 'Taxes'"
                    value={resourceInput}
                    onChange={handleResourceInputChange}
                  />
                  <Link href={"/resources?q=" + resourceInput}>
                    <button className="ml-2 rounded-full px-3 text-sm bg-black text-white p-1 border-black border-2">
                      Search
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex width-full justify-between container mt-20">
          <h3 className="text-xl font-bold">Member Profiles</h3>
          <Link href={"/profiles"}>
            <button className="ml-2 rounded-full px-3 text-sm bg-black text-white p-1 border-black border-2">
              View All Profiles
            </button>
          </Link>
        </div>
        <ProfilesGrid profiles={allStrapiProfile.nodes} />
      </main>
      {/* <CookieNotice
        acceptButtonText="Agree & Enter"
        declineButton={false}
        backgroundClasses=""
        personalizeButtonEnable={false}
        acceptButtonClasses={
          "rounded-full px-3 text-sm bg-black text-white p-1 border-black border-2 " +
          (cookieAllow ? "cookieAllow" : "cookieNotAllow")
        }
        backgroundWrapperClasses="absolute w-full h-full top-0 left-0 bg-gray-400/75"
        buttonWrapperClasses="pb-10 flex justify-center bg-white w-1/2 border-b-2 border-l-2 border-r-2 rounded-b-3xl border-black m-auto"
      >
        <div className="m-auto w-1/2 bg-white mt-20 flex flex-col gap-3 bg-white rounded-t-3xl border-t-2 border-l-2 border-r-2 border-black">
          <h2 className="text-xl font-bold bg-black text-white w-full px-8 p-2 rounded-t-2xl">
            Community Agreements
          </h2>
          <div className="p-10">
            {Array(5)
              .fill(0)
              .map((_, index) => (
                <li className="list-none flex">
                  <input
                    type="checkbox"
                    checked={checkboxStatus[index]}
                    onChange={() => buttonHandler(index)}
                  />
                  <span className="ml-5 mt-5 mb-5">{agreements[index]}</span>
                </li>
              ))}
            <p>
              This website uses cookies to keep track of whether the Community
              Agreements has been accepted.
            </p>
          </div>
        </div>
      </CookieNotice> */}
    </Layout>
  )
}

IndexPage.propTypes = {
  queryStrings: PropTypes.object,
}

export default withLocation(IndexPage)
