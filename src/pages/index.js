import React, { useState } from "react"
import { useStaticQuery, graphql } from "gatsby"
import Layout from "../components/layout"
import ProfilesGrid from "../components/profiles-grid"
import Seo from "../components/seo"
import Headings from "../components/headings"
import axios from "axios"
const IndexPage = () => {
  const {
    allStrapiProfile,
    strapiGlobal,
    allStrapiDiscipline,
    allStrapiDescriptor,
    search,
  } = useStaticQuery(graphql`
    query {
      allStrapiProfile(filter: { name: { regex: "/2/" } }) {
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
          }
        }
      }
      allStrapiDescriptor {
        edges {
          node {
            id
            name
            slug
          }
        }
      }
      strapiGlobal {
        siteName
        siteDescription
      }
    }
  `)

  const [input, setInput] = useState("")
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

  const toggleDisciplines = () => {
    setOpenDisciplines(!openDisciplines)
  }
  const toggleDescriptors = () => {
    setOpenDescriptors(!openDescriptors)
  }

  const sendSearch = (value, type) => {
    let url =
      "http://localhost:1337/api/profiles?populate[0]=disciplines,profilePicture"
    if (type == "input") {
      url = url.concat("&filters[name][$contains]=" + value)
    } else if (!!input) {
      url = url.concat("&filters[name][$contains]=" + input)
    }

    if (type == "descriptors") {
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

    if (type == "disciplines") {
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
  if (results.length == 0) {
    axios
      .get(
        "http://localhost:1337/api/profiles?populate[0]=disciplines,profilePicture"
      )
      .then(response => {
        setResults(response.data.data)
      })
  }
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
                    className="mr-2 rounded-full px-3 text-sm bg-black text-white p-1 border-black border-2"
                    onClick={toggleDisciplines}
                  >
                    Disciplines
                  </button>
                  {disciplinesSection}
                  <button
                    className="mr-2 rounded-full px-3 text-sm bg-black text-white p-1 border-black border-2"
                    onClick={toggleDescriptors}
                  >
                    Descriptors
                  </button>
                  {descriptorsSection}
                </div>
              </div>
            </div>
          </div>
        </div>
        <ProfilesGrid profiles={results} />
      </main>
    </Layout>
  )
}

export default IndexPage
