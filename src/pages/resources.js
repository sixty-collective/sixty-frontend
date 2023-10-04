import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import Layout from "../components/layout"
import ResourceGrid from "../components/resource-grid"
import Seo from "../components/seo"
import Headings from "../components/headings"
import axios from "axios"
import withLocation from "../components/with-location"

const ResourcePage = ({ queryStrings }) => {
  const { q } = queryStrings
  const { strapiGlobal, allStrapiCategory } = useStaticQuery(graphql`
    query {
      strapiGlobal {
        siteName
        siteDescription
      }
      allStrapiCategory {
        edges {
          node {
            id
            name
            slug
          }
        }
      }
    }
  `)

  const [input, setInput] = useState(q)
  const [selectedCategories, setSelectedCategories] = useState([])
  const [results, setResults] = useState([])
  const [checkedCategoriesState, setCheckedCategoriesState] = useState(
    new Array(allStrapiCategory.edges.length).fill(false)
  )
  const [openCategories, setOpenCategories] = React.useState(false)

  const toggleCategories = () => {
    setOpenCategories(!openCategories)
  }

  const sendSearch = (value, type) => {
    let url =
      "https://sixty-backend.onrender.com" +
      "/api/resources?populate[0]=categories"
    if (type === "input") {
      url = url.concat("&filters[title][$contains]=" + value)
    } else if (!!input) {
      url = url.concat("&filters[title][$contains]=" + input)
    }

    if (type === "categories") {
      const categoriesUrl = value.join(
        "&filters[$or][1][categories][slug][$in]="
      )
      url = url.concat(
        "&filters[$or][0][categories][slug][$in]=" + categoriesUrl
      )
    } else if (selectedCategories.length > 0) {
      const categoriesUrl = selectedCategories.join(
        "&filters[$or][1][categories][slug][$in]="
      )
      url = url.concat(
        "&filters[$or][0][categories][slug][$in]=" + categoriesUrl
      )
    }

    axios.get(url).then(response => {
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

  const handleCategoriesApply = () => {
    const checkedBoxes = document.querySelectorAll(
      "input[class=categories-box]:checked"
    )
    // console.log(checkedBoxes)
    const categoriesFilters = Array.from(checkedBoxes).map(input => {
      return input.name
    })

    setSelectedCategories(categoriesFilters)
    toggleCategories()
    sendSearch(categoriesFilters, "categories")
  }

  const handleClearCategories = () => {
    setSelectedCategories([])
    toggleCategories()
    setCheckedCategoriesState(
      new Array(allStrapiCategory.edges.length).fill(false)
    )
    sendSearch([], "categories")
  }

  const handleCategoriesChange = position => {
    const updatedCheckedCategoriesState = checkedCategoriesState.map(
      (item, index) => (index === position ? !item : item)
    )

    setCheckedCategoriesState(updatedCheckedCategoriesState)
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

  function categories() {
    return (
      <div className="border-2 border-black rounded-2xl">
        <div className="p-5">
          {allStrapiCategory.edges.map((category, index) => {
            return (
              <li className="list-none" key={index}>
                <Checkbox
                  obj={category}
                  index={index}
                  check="categories-box"
                  checked={checkedCategoriesState[index]}
                  onChange={() => handleCategoriesChange(index)}
                />
              </li>
            )
          })}
        </div>
        <div className="flex border-t-2 border-black p-5 justify-between items-center">
          <a href="#" onClick={handleClearCategories}>
            Clear All
          </a>
          <button
            className="rounded-full px-3 text-sm bg-black text-white p-1 border-black border-2"
            onClick={handleCategoriesApply}
          >
            Apply
          </button>
        </div>
      </div>
    )
  }

  const categoriesSection = openCategories ? (
    <div className="absolute bg-white mt-3">{categories()}</div>
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
                  value={input}
                  onChange={handleInputChange}
                />
                <button className="ml-2 rounded-full px-3 text-sm bg-black text-white p-1 border-black border-2">
                  Search
                </button>
              </div>
              <div className="ml-5">
                <div className="text-xs">Or select from these Categories:</div>
                <div className="mt-2">
                  <button
                    className="mr-2 rounded-full px-3 text-sm bg-black text-white p-1 border-black border-2"
                    onClick={toggleCategories}
                  >
                    Categories
                  </button>
                  {categoriesSection}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container flex justify-start mt-10">
          <h2 className="text-xl font-bold">All Resources</h2>
        </div>
        <ResourceGrid resources={results} />
      </main>
    </Layout>
  )
}

ResourcePage.propTypes = {
  queryStrings: PropTypes.object,
}

export default withLocation(ResourcePage)
