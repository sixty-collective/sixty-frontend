import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"

import { useStaticQuery, graphql } from "gatsby"
import Layout from "../components/layout"
import ProfilesGrid from "../components/profiles-grid"
import Seo from "../components/seo"
import Headings from "../components/headings"
import axios from "axios"
// import { CookieNotice } from "gatsby-cookie-notice"
import withLocation from "../components/with-location"

const IndexPage = ({ queryStrings }) => {
  const { q } = queryStrings

  const { strapiGlobal, allStrapiDiscipline, allStrapiDescriptor } =
    useStaticQuery(graphql`
      query {
        allStrapiDiscipline {
          edges {
            node {
              id
              name
              slug
              discipline_category {
                slug
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
                slug
              }
            }
          }
        }
        strapiGlobal {
          siteName
          siteDescription
        }
      }
    `)

  const [checkboxStatus, setCheckboxStatus] = useState(Array(5).fill(false))

  function buttonHandler(index) {
    let status = [...checkboxStatus]
    status[index] = !status[index]
    setCheckboxStatus(status)

    if (status.filter(status => status === true).length === 5) {
      setCookieAllow(true)
    } else {
      setCookieAllow(false)
    }
  }

  const [input, setInput] = useState(q || "")
  const [visible, setVisible] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
  ])
  const [descriptorVisible, setDescriptorVisible] = useState([
    false,
    false,
    false,
    false,
  ])
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
    setOpenDescriptors(false)
  }
  const toggleDescriptors = () => {
    setOpenDescriptors(!openDescriptors)
    setOpenDisciplines(false)
  }

  const disciplinesCountSection = () => {
    if (selectedDisciplines.length > 0) {
      return <span>({selectedDisciplines.length})</span>
    } else {
      return <span></span>
    }
  }

  const descriptorsCountSection = () => {
    if (selectedDescriptors.length > 0) {
      return <span>({selectedDescriptors.length})</span>
    } else {
      return <span></span>
    }
  }

  const sendSearch = (value, type) => {
    let searchDisciplines, searchDescriptors
    let url =
      "https://sixty-backend.onrender.com" +
      "/api/profiles?populate[0]=disciplines,profilePicture"
    if (type === "input") {
      url = url.concat("&filters[name][$contains]=" + value)
    } else if (!!input) {
      url = url.concat("&filters[name][$contains]=" + input)
    }

    if (type === "descriptors") {
      searchDescriptors = value.map(selected => {
        return selected.slug
      })
      const descriptorsUrl = searchDescriptors.join(
        "&filters[$or][1][descriptors][slug][$in]="
      )
      url = url.concat(
        "&filters[$or][0][descriptors][slug][$in]=" + descriptorsUrl
      )
    } else if (selectedDescriptors.length > 0) {
      searchDescriptors = selectedDescriptors.map(selected => {
        return selected.slug
      })
      const descriptorsUrl = searchDescriptors.join(
        "&filters[$or][1][descriptors][slug][$in]="
      )
      url = url.concat(
        "&filters[$or][0][descriptors][slug][$in]=" + descriptorsUrl
      )
    }

    if (type === "disciplines") {
      searchDisciplines = value.map(selected => {
        return selected.slug
      })
      const disciplinesUrl = searchDisciplines.join(
        "&filters[$or][1][disciplines][slug][$in]="
      )
      url = url.concat(
        "&filters[$or][0][disciplines][slug][$in]=" + disciplinesUrl
      )
    } else if (selectedDisciplines.length > 0) {
      searchDisciplines = selectedDisciplines.map(selected => {
        return selected.slug
      })
      const disciplinesUrl = searchDisciplines.join(
        "&filters[$or][1][disciplines][slug][$in]="
      )
      url = url.concat(
        "&filters[$or][0][disciplines][slug][$in]=" + disciplinesUrl
      )
    }
    axios.get(url).then(response => {
      console.log(response)
      setResults(response.data.data)
    })
  }

  useEffect(() => {
    if (q) {
      sendSearch(q, "input")
    } else {
      sendSearch("", "input")
    }
  }, [])

  const handleInputChange = e => {
    setInput(e.target.value)
    sendSearch(e.target.value, "input")
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
          id={`custom-checkbox-${obj.slug}`}
          className={check}
          name={obj.name}
          value={obj.slug}
          checked={checked}
          onChange={onChange}
        />
        <span className="ml-2">{obj.name}</span>
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
    const disciplinesFilters = Array.from(checkedBoxes).map(input => {
      return { name: input.name, slug: input.value }
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
    sendSearch([])
  }

  const handleDescriptorsApply = () => {
    const checkedBoxes = document.querySelectorAll(
      "input[class=descriptors-box]:checked"
    )
    const descriptorsFilters = Array.from(checkedBoxes).map(input => {
      return { name: input.name, slug: input.value }
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
    sendSearch([])
  }

  function disciplines() {
    let pDisciplines = []
    let vDisciplines = []
    let rDisciplines = []
    let wDisciplines = []
    let aDisciplines = []
    let lDisciplines = []
    allStrapiDiscipline.edges.forEach(discipline => {
      switch (discipline.node.discipline_category.slug) {
        case "performance-music-sound":
          pDisciplines.push(discipline.node)
          return
        case "visual-art-design-film":
          vDisciplines.push(discipline.node)
          return
        case "3-d-art-and-design-fashion-styling":
          rDisciplines.push(discipline.node)
          return
        case "archiving-research-history":
          aDisciplines.push(discipline.node)
          return
        case "arts-administration-leadership-education-therapy":
          lDisciplines.push(discipline.node)
          return
        case "writing-editing-interviewing":
          wDisciplines.push(discipline.node)
          return
      }
    })
    return (
      <div className="border-2 border-black rounded-2xl max-h-96 overflow-scroll">
        <div className="relative m-5 pb-5 border-b-2 border-black max-w-md	">
          <div
            className={
              visible[0] ? "overflow-none" : "overflow-hidden max-h-24"
            }
          >
            <h2 className="font-bold">Visual Art & Design</h2>
            <div className="flex flex-wrap mt-2">
              {vDisciplines.map((discipline, index) => {
                return (
                  <div className="w-1/2 text-xs items-center flex" key={index}>
                    <Checkbox
                      obj={discipline}
                      index={index}
                      check="disciplines-box"
                      checked={checkedDisciplinesState[index]}
                      onChange={() => handleDisciplinesChange(index)}
                    />
                  </div>
                )
              })}
            </div>
          </div>
          <button
            className="text-sm font-bold mt-3"
            onClick={() =>
              setVisible([!visible[0], false, false, false, false, false])
            }
          >
            {visible[0] ? "See less" : "See more"}
          </button>
        </div>
        <div className="relative m-5 pb-5 border-b-2 border-black max-w-md	">
          <div
            className={
              visible[1] ? "overflow-none" : "overflow-hidden max-h-24"
            }
          >
            <h2 className="font-bold">Writing & Editing</h2>
            <div className="flex flex-wrap mt-2">
              {wDisciplines.map((discipline, index) => {
                return (
                  <div className="w-1/2 text-xs items-center flex" key={index}>
                    <Checkbox
                      obj={discipline}
                      index={index}
                      check="disciplines-box"
                      checked={
                        checkedDisciplinesState[vDisciplines.length + index]
                      }
                      onChange={() =>
                        handleDisciplinesChange(vDisciplines.length + index)
                      }
                    />
                  </div>
                )
              })}
            </div>
          </div>
          <button
            className="text-sm font-bold mt-3"
            onClick={() =>
              setVisible([false, !visible[1], false, false, false, false])
            }
          >
            {visible[1] ? "See less" : "See more"}
          </button>
        </div>
        <div className="relative m-5 pb-5 border-b-2 border-black max-w-md	">
          <div
            className={
              visible[2] ? "overflow-none" : "overflow-hidden max-h-24"
            }
          >
            <h2 className="font-bold">Research & Curation</h2>
            <div className="flex flex-wrap mt-2">
              {aDisciplines.map((discipline, index) => {
                return (
                  <div className="w-1/2 text-xs items-center flex" key={index}>
                    <Checkbox
                      obj={discipline}
                      index={index}
                      check="disciplines-box"
                      checked={
                        checkedDisciplinesState[
                          vDisciplines.length + wDisciplines.length + index
                        ]
                      }
                      onChange={() =>
                        handleDisciplinesChange(
                          vDisciplines.length + wDisciplines.length + index
                        )
                      }
                    />
                  </div>
                )
              })}
            </div>
          </div>
          <button
            className="text-sm font-bold mt-3"
            onClick={() =>
              setVisible([false, false, !visible[2], false, false, false])
            }
          >
            {visible[2] ? "See less" : "See more"}
          </button>
        </div>
        <div className="relative m-5 pb-5 border-b-2 border-black max-w-md	">
          <div
            className={
              visible[3] ? "overflow-none" : "overflow-hidden max-h-24"
            }
          >
            <h2 className="font-bold">Performance & Sound</h2>
            <div className="flex flex-wrap mt-2">
              {pDisciplines.map((discipline, index) => {
                return (
                  <div className="w-1/2 text-xs items-center flex" key={index}>
                    <Checkbox
                      obj={discipline}
                      index={index}
                      check="disciplines-box"
                      checked={
                        checkedDisciplinesState[
                          vDisciplines.length +
                            wDisciplines.length +
                            aDisciplines.length +
                            index
                        ]
                      }
                      onChange={() =>
                        handleDisciplinesChange(
                          vDisciplines.length +
                            wDisciplines.length +
                            aDisciplines.length +
                            index
                        )
                      }
                    />
                  </div>
                )
              })}
            </div>
          </div>
          <button
            className="text-sm font-bold mt-3"
            onClick={() =>
              setVisible([false, false, false, !visible[3], false, false])
            }
          >
            {visible[3] ? "See less" : "See more"}
          </button>
        </div>
        <div className="relative m-5 pb-5 border-b-2 border-black max-w-md	">
          <div
            className={
              visible[4] ? "overflow-none" : "overflow-hidden max-h-24"
            }
          >
            <h2 className="font-bold">Arts Administration & Leadership</h2>
            <div className="flex flex-wrap mt-2">
              {lDisciplines.map((discipline, index) => {
                return (
                  <div className="w-1/2 text-xs items-center flex" key={index}>
                    <Checkbox
                      obj={discipline}
                      index={index}
                      check="disciplines-box"
                      checked={
                        checkedDisciplinesState[
                          vDisciplines.length +
                            wDisciplines.length +
                            aDisciplines.length +
                            pDisciplines.length +
                            index
                        ]
                      }
                      onChange={() =>
                        handleDisciplinesChange(
                          vDisciplines.length +
                            wDisciplines.length +
                            aDisciplines.length +
                            pDisciplines.length +
                            index
                        )
                      }
                    />
                  </div>
                )
              })}
            </div>
          </div>
          <button
            className="text-sm font-bold mt-3"
            onClick={() =>
              setVisible([false, false, false, false, !visible[4], false])
            }
          >
            {visible[4] ? "See less" : "See more"}
          </button>
        </div>
        <div className="relative m-5 border-black max-w-md	">
          <div
            className={
              visible[5] ? "overflow-none" : "overflow-hidden max-h-24"
            }
          >
            <h2 className="font-bold">3D Art & Design, Fashion</h2>
            <div className="flex flex-wrap mt-2">
              {rDisciplines.map((discipline, index) => {
                return (
                  <div className="w-1/2 text-xs items-center flex" key={index}>
                    <Checkbox
                      obj={discipline}
                      index={index}
                      check="disciplines-box"
                      checked={
                        checkedDisciplinesState[
                          vDisciplines.length +
                            wDisciplines.length +
                            pDisciplines.length +
                            aDisciplines.length +
                            lDisciplines.length +
                            index
                        ]
                      }
                      onChange={() =>
                        handleDisciplinesChange(
                          vDisciplines.length +
                            wDisciplines.length +
                            pDisciplines.length +
                            aDisciplines.length +
                            lDisciplines.length +
                            index
                        )
                      }
                    />
                  </div>
                )
              })}
            </div>
          </div>
          <button
            className="text-sm font-bold mt-3"
            onClick={() =>
              setVisible([false, false, false, false, false, !visible[5]])
            }
          >
            {visible[5] ? "See less" : "See more"}
          </button>
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

  const disciplinesSection = () => {
    if (openDisciplines) {
      return <div className="absolute bg-white mt-3 z-10">{disciplines()}</div>
    } else {
      ;<span></span>
    }
  }

  function descriptors() {
    let cDescriptors = []
    let jDescriptors = []
    let aDescriptors = []
    let eDescriptors = []
    allStrapiDescriptor.edges.forEach(descriptor => {
      switch (descriptor.node.descriptor_category.slug) {
        case "culture-and-identity-alignment":
          cDescriptors.push(descriptor.node)
          return
        case "justice-organizing-labor":
          jDescriptors.push(descriptor.node)
          return
        case "area-of-focus-practice":
          aDescriptors.push(descriptor.node)
          return
        case "education":
          eDescriptors.push(descriptor.node)
          return
      }
    })
    return (
      <div className="border-2 border-black rounded-2xl max-h-96 overflow-scroll">
        <div className="relative m-5 pb-5 border-b-2 border-black max-w-md	">
          <div
            className={
              descriptorVisible[0]
                ? "overflow-none"
                : "overflow-hidden max-h-24"
            }
          >
            <h2 className="font-bold">Culture & Identity Alignment</h2>
            <div className="flex flex-wrap mt-2">
              {cDescriptors.map((descriptor, index) => {
                return (
                  <div className="w-1/2 text-xs items-center flex" key={index}>
                    <Checkbox
                      obj={descriptor}
                      index={index}
                      check="descriptors-box"
                      checked={checkedDescriptorsState[index]}
                      onChange={() => handleDescriptorsChange(index)}
                    />
                  </div>
                )
              })}
            </div>
          </div>
          <button
            className="text-sm font-bold mt-3"
            onClick={() =>
              setDescriptorVisible([!descriptorVisible[0], false, false, false])
            }
          >
            {descriptorVisible[0] ? "See less" : "See more"}
          </button>
        </div>
        <div className="relative m-5 pb-5 border-b-2 border-black max-w-md	">
          <div
            className={
              descriptorVisible[1]
                ? "overflow-none"
                : "overflow-hidden max-h-24"
            }
          >
            <h2 className="font-bold">Justice, Organizing, Labor</h2>
            <div className="flex flex-wrap mt-2">
              {jDescriptors.map((descriptor, index) => {
                return (
                  <div className="w-1/2 text-xs items-center flex" key={index}>
                    <Checkbox
                      obj={descriptor}
                      index={index}
                      check="descriptors-box"
                      checked={
                        checkedDescriptorsState[cDescriptors.length + index]
                      }
                      onChange={() =>
                        handleDescriptorsChange(cDescriptors.length + index)
                      }
                    />
                  </div>
                )
              })}
            </div>
          </div>
          <button
            className="text-sm font-bold mt-3"
            onClick={() =>
              setDescriptorVisible([false, !descriptorVisible[1], false, false])
            }
          >
            {descriptorVisible[1] ? "See less" : "See more"}
          </button>
        </div>
        <div className="relative m-5 pb-5 border-b-2 border-black max-w-md	">
          <div
            className={
              descriptorVisible[2]
                ? "overflow-none"
                : "overflow-hidden max-h-24"
            }
          >
            <h2 className="font-bold">Area of Focus</h2>
            <div className="flex flex-wrap mt-2">
              {aDescriptors.map((descriptor, index) => {
                return (
                  <div className="w-1/2 text-xs items-center flex" key={index}>
                    <Checkbox
                      obj={descriptor}
                      index={index}
                      check="descriptors-box"
                      checked={
                        checkedDescriptorsState[
                          cDescriptors.length + jDescriptors.length + index
                        ]
                      }
                      onChange={() =>
                        handleDescriptorsChange(
                          cDescriptors.length + jDescriptors.length + index
                        )
                      }
                    />
                  </div>
                )
              })}
            </div>
          </div>
          <button
            className="text-sm font-bold mt-3"
            onClick={() =>
              setDescriptorVisible([false, false, !descriptorVisible[2], false])
            }
          >
            {descriptorVisible[2] ? "See less" : "See more"}
          </button>
        </div>
        <div className="relative m-5 border-black max-w-md	">
          <div
            className={
              descriptorVisible[3]
                ? "overflow-none"
                : "overflow-hidden max-h-24"
            }
          >
            <h2 className="font-bold">Education</h2>
            <div className="flex flex-wrap mt-2">
              {eDescriptors.map((descriptor, index) => {
                return (
                  <div className="w-1/2 text-xs items-center flex" key={index}>
                    <Checkbox
                      obj={descriptor}
                      index={index}
                      check="descriptors-box"
                      checked={
                        checkedDescriptorsState[
                          cDescriptors.length +
                            jDescriptors.length +
                            aDescriptors.length +
                            index
                        ]
                      }
                      onChange={() =>
                        handleDescriptorsChange(
                          cDescriptors.length +
                            jDescriptors.length +
                            aDescriptors.length +
                            index
                        )
                      }
                    />
                  </div>
                )
              })}
            </div>
          </div>
          <button
            className="text-sm font-bold mt-3"
            onClick={() =>
              setDescriptorVisible([false, false, false, !descriptorVisible[3]])
            }
          >
            {descriptorVisible[3] ? "See less" : "See more"}
          </button>
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
    <div className="absolute bg-white mt-3 z-10">{descriptors()}</div>
  ) : (
    <span></span>
  )

  const yourSearch =
    selectedDisciplines.length > 0 || selectedDescriptors.length > 0 ? (
      <div className="mt-5">
        <div className="text-xs">Your Search:</div>
        {selectedDisciplines.map((discipline, index) => {
          return (
            <span
              className="text-xs mr-2 rounded-full px-1 bg-gray-300"
              key={index}
            >
              {discipline.name}
            </span>
          )
        })}
        {selectedDescriptors.map((descriptors, index) => {
          return (
            <span
              className="text-xs mr-2 rounded-full px-1 bg-gray-300"
              key={index}
            >
              {descriptors.name}
            </span>
          )
        })}
      </div>
    ) : (
      <div></div>
    )

  return (
    <Layout>
      <Seo seo={{ metaTitle: "Home" }} />
      <Headings
        title={strapiGlobal.siteName}
        description={strapiGlobal.siteDescription}
      />
      <main className="flex flex-col justify-center items-center width-full">
        <div className=" w-1/2 bg-white mt-20 flex flex-col gap-3 bg-white rounded-3xl border-2 border-black">
          <h2 className="text-xl font-bold bg-black text-white w-full px-8 p-2 rounded-t-2xl">
            Search and Hire Talent
          </h2>
          <div className="px-8 pb-8">
            <p className="max-w-lg mt-3">
              Some introductory text about searching for members to hire. This
              part could be a few lines long and be similar to the copy on the
              donation pages (weaving in some storytelling aspect, or something,
              I dunno).
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
                <button className="ml-2 rounded-full px-3 text-sm bg-black text-white p-1 border-black border-2">
                  Search
                </button>
              </div>
              <div className="ml-5">
                <div className="text-xs">
                  Or select from these Disciplines and Descriptors:
                </div>
                <div className="mt-2">
                  <button
                    className={
                      "mr-2 rounded-full px-3 text-sm p-1 border-black border-2 " +
                      (selectedDisciplines.length > 0
                        ? "bg-black text-white"
                        : "bg-white text-black")
                    }
                    onClick={toggleDisciplines}
                  >
                    Disciplines {disciplinesCountSection()}
                  </button>
                  {disciplinesSection()}
                  <button
                    className={
                      "mr-2 rounded-full px-3 text-sm p-1 border-black border-2 " +
                      (selectedDescriptors.length > 0
                        ? "bg-black text-white"
                        : "bg-white text-black")
                    }
                    onClick={toggleDescriptors}
                  >
                    Descriptors {descriptorsCountSection()}
                  </button>
                  {descriptorsSection}
                </div>
              </div>
            </div>
            <div>{yourSearch}</div>
          </div>
        </div>
        <div className="container flex justify-start mt-10">
          <h2 className="text-xl font-bold">Search Results</h2>
        </div>
        <ProfilesGrid profiles={results} home={false} />
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
