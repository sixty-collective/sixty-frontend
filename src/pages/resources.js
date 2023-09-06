import React, { useState } from "react"
import { useStaticQuery, graphql } from "gatsby"
import Layout from "../components/layout"
import ResourceGrid from "../components/resource-grid"
import Seo from "../components/seo"
import Headings from "../components/headings"
import axios from "axios"
const ResourcePage = () => {
  const { allStrapiProfile, strapiGlobal, search } = useStaticQuery(graphql`
    query {
      allStrapiProfile(filter: { name: { regex: "/2/" } }) {
        nodes {
          ...ProfileCard
        }
      }
      strapiGlobal {
        siteName
        siteDescription
      }
    }
  `)

  const [input, setInput] = useState("")
  const [results, setResults] = useState([])
  if (results.length == 0) {
    axios
      .get("http://localhost:1337/api/resources?populate[0]=categories")
      .then(response => {
        setResults(response.data.data)
      })
  }
  const handleInputChange = e => {
    setInput(e.target.value)
    axios
      .get(
        "http://localhost:1337/api/resources?filters[title][$containsi]=" +
          e.target.value +
          "&populate[0]=categories"
      )
      .then(response => {
        setResults(response.data.data)
      })
  }

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
                  <button className="mr-2 rounded-full px-3 text-sm bg-black text-white p-1 border-black border-2">
                    Categories
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ResourceGrid resources={results} />
      </main>
    </Layout>
  )
}

export default ResourcePage
