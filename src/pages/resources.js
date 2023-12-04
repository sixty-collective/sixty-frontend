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
      process.env.STRAPI_API_URL + "/api/resources?populate[0]=categories"
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
      <div className="flex flex-col w-full border-black border-b-2">
        <h2 className="text-8xl text-center uppercase font-bold w-full px-8 pt-10 knowledge-gradient">
            Knowledge Share
          </h2>
          <div className="flex w-full flex-col items-center justify-center">
          <p className="p-10 text-center max-w-md poppins w-full">
          Browse through our carefully selected articles, tools, career advice, and more.
            </p>
            <div className="px-20 w-full">
            <div className="flex flex-col border-black px-48 py-8 mx-10 rounded-t-extra knowledge-gradient top-curve-border w-full">
            <div className="flex flex-row justify-center">
              <div className="mr-5 w-1/2">
                <div className="text-xs">Enter a custom search:</div>
                <input
                  className=" rounded-full px-3 text-sm border-2 border-black mt-2 p-1 w-64"
                  placeholder="Enter 'Taxes'"
                  value={input}
                  onChange={handleInputChange}
                />
                <button className="ml-2 rounded-full px-3 text-sm bg-black text-white p-1 border-black border-2">
                  Search
                </button>
              </div>
              <div className="ml-5 w-1/2">
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
