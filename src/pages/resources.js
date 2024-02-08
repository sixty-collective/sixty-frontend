import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import Layout from "../components/layout"
import ResourceGrid from "../components/resource-grid"
import Seo from "../components/seo"
import Headings from "../components/headings"
import axios from "axios"
import withLocation from "../components/with-location"
import { StaticImage } from "gatsby-plugin-image"
import { CookieNotice } from "gatsby-cookie-notice"



const ResourcePage = ({ queryStrings }) => {
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
  const [cookieAllow, setCookieAllow] = React.useState(false)
  const agreements = [
    "Assume the best of people and situations (until proven otherwise) by treating everyone you meet through this platform with grace, kindness, and respect.",
    "Listen to understand each other’s perspectives, boundaries, needs, curiosities, and opinions.",
    "Strive for clarity and accuracy with the terms, payment, timelines, and other details of gigs and collaborations, including when those terms shift and change.",
    "Place people over productivity by acknowledging that while we’re all doing incredibly important work, we’re also living during wild and challenging times.",
    "Keep things confidential between collaborators, unless consent is clearly expressed by everyone involved.",
  ]
  const { tagName, tagSlug } = queryStrings
  const { strapiGlobal, allStrapiCategory, allStrapiResourceTag } = useStaticQuery(graphql`
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
      allStrapiResourceTag {
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

  const [initial, setInitial] = useState(true)
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([])
  const [selectedTags, setSelectedTags] = useState([])
  const [results, setResults] = useState([])
  const [checkedCategoriesState, setCheckedCategoriesState] = useState(
    new Array(allStrapiCategory.edges.length).fill({status: false, category: ""})
  )
  const [checkedTagsState, setCheckedTagsState] = useState(
    new Array(allStrapiResourceTag.edges.length).fill({status: false, tag: ""})
  )
  const [openCategories, setOpenCategories] = React.useState(false)
  const [openTags, setOpenTags] = React.useState(false)

  const toggleCategories = () => {
    setOpenCategories(!openCategories)
    setOpenTags(false)
  }

  const toggleTags = () => {
    setOpenTags(!openTags)
    setOpenCategories(false)
  }

  const categoriesCountSection = () => {
    if (selectedCategories.length > 0) {
      return <span className="mr-2">({selectedCategories.length})</span>
    } else {
      return <span className="mr-2"></span>
    }
  }

  const tagsCountSection = () => {
    if (selectedTags.length > 0) {
      return <span className="mr-2">({selectedTags.length})</span>
    } else {
      return <span className="mr-2"></span>
    }
  }

  const sendSearch = async (resetPage) => {
    setIsLoading(true);
    let url;
    if (resetPage) {
      url =
      "https://sixty-backend.onrender.com" + "/api/resources?pagination[page]="+ 1 + "&populate[0]=categories,resource_tags"
    } else {
      url =
      "https://sixty-backend.onrender.com" + "/api/resources?pagination[page]="+ page + "&populate[0]=categories,resource_tags"
    }
    
    if (selectedCategories.length > 0) {
      selectedCategories.forEach((selected, index) => {
        url = url.concat("&filters[$or][" + index + "][categories][slug][$in]=" + selected.slug)
      })
    }
    
    if (selectedTags.length > 0) {
      selectedTags.forEach((selected, index) => {
        url = url.concat("&filters[$or][" + index + "][resource_tags][slug][$in]=" + selected.slug)
      })
    }

    try {
      await axios.get(url).then(async response => {
        if (resetPage) {
          setResults(response.data.data)
          setPage(() => {
            return 2;
          });
        } else {
          setResults((prevResults) => {
            return [...prevResults, ...response.data.data]
          })
          setPage((prevPage) => {
            return prevPage + 1;
          });
        }
      })
    } finally {
      setIsLoading(false);
    }
  }

  const handleScroll = () => {
    if (window.innerHeight + document.documentElement.scrollTop + 5 < document.documentElement.offsetHeight || isLoading) {
      return;
    }
    sendSearch();
  };

  useEffect(() => {
    if (tagSlug && initial) {
      setInitial(false)
      setSelectedTags([{ name: tagName, slug: tagSlug }])
    }
    sendSearch(true)
  }, [selectedCategories, selectedTags])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isLoading]);
  

  const handleCategoriesApply = () => {
    const checkedBoxes = document.querySelectorAll(
      "input[class=categories-box]:checked"
    )
    const categoriesFilters = Array.from(checkedBoxes).map(input => {
      return { name: input.name, slug: input.value }
    })

    setSelectedCategories(categoriesFilters)
    toggleCategories()
  }

  const handleTagsApply = () => {
    const checkedBoxes = document.querySelectorAll(
      "input[class=tags-box]:checked"
    )
    const tagsFilters = Array.from(checkedBoxes).map(input => {
      return { name: input.name, slug: input.value }
    })

    setSelectedTags(tagsFilters)
    toggleTags()
  }

  const handleClearCategories = () => {
    setSelectedCategories([])
    toggleCategories()
    setCheckedCategoriesState(
      new Array(allStrapiCategory.edges.length).fill({status: false, category: ""})
    )
  }

  const handleClearTags = () => {
    setSelectedTags([])
    toggleTags()
    setCheckedTagsState(
      new Array(allStrapiResourceTag.edges.length).fill({status: false, tag: ""})
    )
  }

  const handleCategoriesChange = (position, category) => {
    const updatedCheckedCategoriesState = checkedCategoriesState.map(
      (item, index) => {
        return (index === position ? {status: !item.status, category: category} : item)
      }
    )

    setCheckedCategoriesState(updatedCheckedCategoriesState)
  }

  const handleTagsChange = (position, tag) => {
    const updatedCheckedTagsState = checkedTagsState.map(
      (item, index) => {
        return (index === position ? {status: !item.status, tag: tag} : item)
      }
    )

    setCheckedTagsState(updatedCheckedTagsState)
  }

  const handleClearSpecificCategory = (clearCategory) => {
    setSelectedCategories(selectedCategories.filter(function(category) { 
        return category != clearCategory 
    }));
    let newArray = checkedCategoriesState.map(function(category) { 
      if (category.category.slug != clearCategory.slug) {
        return category
      } else {
        return {status: false, category: category.category}
      }
    })
    setCheckedCategoriesState(newArray)
  }

  const handleClearSpecificTag = (clearTag) => {
    setSelectedTags(selectedTags.filter(function(tag) { 
        return tag != clearTag 
    }));
    let newArray = checkedTagsState.map(function(tag) { 
      if (tag.tag.slug != clearTag.slug) {
        return tag
      } else {
        return {status: false, tag: tag.tag}
      }
    })
    setCheckedTagsState(newArray)
  }

  const Checkbox = ({ obj, index, check, checked, onChange }) => {
    return (
      <>
        <input
          type="checkbox"
          id={`custom-checkbox-${obj.node.slug}`}
          className={check}
          name={obj.node.name}
          value={obj.node.slug}
          checked={checked}
          onChange={onChange}
        />
        <span className="ml-2">{obj.node.name}</span>
      </>
    )
  }

  function categories() {
    return (
      <div className=" bg-white border-2 border-black rounded-2xl bg-white">
        <div className="p-5">
          {allStrapiCategory.edges.map((category, index) => {
            return (
              <li className="list-none" key={index}>
                <Checkbox
                  obj={category}
                  index={index}
                  check="categories-box"
                  checked={checkedCategoriesState[index].status}
                  onChange={() => handleCategoriesChange(index, category)}
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

  function tags() {
    return (
      <div className=" bg-white border-2 border-black rounded-2xl bg-white">
        <div className="p-5">
          {allStrapiResourceTag.edges.map((tag, index) => {
            return (
              <li className="list-none" key={index}>
                <Checkbox
                  obj={tag}
                  index={index}
                  check="tags-box"
                  checked={checkedTagsState[index].status}
                  onChange={() => handleTagsChange(index,tag)}
                />
              </li>
            )
          })}
        </div>
        <div className="flex border-t-2 border-black p-5 justify-between items-center">
          <a href="#" onClick={handleClearTags}>
            Clear All
          </a>
          <button
            className="rounded-full px-3 text-sm bg-black text-white p-1 border-black border-2"
            onClick={handleTagsApply}
          >
            Apply
          </button>
        </div>
      </div>
    )
  }

  const categoriesSection = openCategories ? (
    <div className="absolute mt-3 z-50">{categories()}</div>
  ) : (
    <span></span>
  )

  const tagsSection = openTags ? (
    <div className="absolute mt-3 z-50">{tags()}</div>
  ) : (
    <span></span>
  )

  const yourSearch =
    selectedCategories.length > 0 || selectedTags.length > 0 ? (
      <div className="mt-5">
        <div className="text-xs">Your search:</div>
        {selectedCategories.map((categories, index) => {
          return (
            <span
            className="text-xs mr-2 rounded-full px-1 bg-white inline-flex font-fira border-black border items-center"
              key={index}
            >
              <a href="#" onClick={() => handleClearSpecificCategory(categories)}>
                <StaticImage alt="" className="w-4 h-4" objectFit="contain" src="../images/close.png" />
              </a>
              <span className="pl-1">{categories.name}</span>
            </span>
          )
        })}
        {selectedTags.map((tag, index) => {
          return (
            <span
            className="text-xs mr-2 rounded-full px-1 bg-white inline-block font-fira border-black border"
              key={index}
            >
              <a href="#" onClick={() => handleClearSpecificTag(tag)}>
                <StaticImage alt="" className="w-4 h-4" objectFit="contain" src="../images/close.png" />
              </a>
              {tag.name}
            </span>
          )
        })}
      </div>
    ) : (
      <div></div>
    )

  const downArrow = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="11" height="5" viewBox="0 0 11 5" fill="none">
      <path d="M5.26759 4.99831C5.09179 4.99864 4.92143 4.94054 4.78606 4.83411L0.271798 1.26453C0.11815 1.14335 0.0215264 0.969215 0.00318368 0.780437C-0.0151591 0.591658 0.0462815 0.403697 0.173989 0.257904C0.301697 0.11211 0.48521 0.020426 0.684159 0.00302095C0.883107 -0.0143841 1.08119 0.0439153 1.23484 0.165095L5.26759 3.36344L9.30033 0.279322C9.37729 0.22002 9.46584 0.175734 9.5609 0.149011C9.65595 0.122288 9.75564 0.113654 9.85422 0.123605C9.9528 0.133557 10.0483 0.161897 10.1353 0.206998C10.2223 0.252099 10.2991 0.313071 10.3612 0.386409C10.4301 0.459815 10.4823 0.545932 10.5145 0.639365C10.5467 0.732798 10.5582 0.831533 10.5483 0.929385C10.5384 1.02724 10.5073 1.1221 10.457 1.20802C10.4067 1.29395 10.3382 1.36908 10.2559 1.42873L5.74158 4.87695C5.60233 4.96655 5.43544 5.00928 5.26759 4.99831Z" fill="#1B1B1B"/>
    </svg>
  );

  const upArrow = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="5" viewBox="0 0 10 5" fill="none">
      <path d="M5.00784 0.00168852C5.17445 0.00136286 5.3359 0.0594578 5.46419 0.165889L9.74241 3.73547C9.88803 3.85665 9.9796 4.03079 9.99698 4.21956C10.0144 4.40834 9.95614 4.5963 9.83511 4.7421C9.71408 4.88789 9.54016 4.97957 9.35161 4.99698C9.16307 5.01438 8.97534 4.95608 8.82973 4.83491L5.00784 1.63656L1.18596 4.72068C1.11303 4.77998 1.0291 4.82427 0.939019 4.85099C0.848934 4.87771 0.754464 4.88635 0.661036 4.87639C0.567607 4.86644 0.477064 4.8381 0.39461 4.793C0.312157 4.7479 0.239419 4.68693 0.180577 4.61359C0.115277 4.54018 0.0658217 4.45407 0.0353089 4.36063C0.00479609 4.2672 -0.00611584 4.16847 0.00325593 4.07061C0.0126277 3.97276 0.04208 3.8779 0.0897704 3.79198C0.137461 3.70605 0.202361 3.63092 0.280403 3.57127L4.55863 0.123055C4.6906 0.0334463 4.84876 -0.00928495 5.00784 0.00168852Z" fill="white"/>
    </svg>
  );

  const resourceGrid = (results.length > 0) ? (
    <ResourceGrid resources={results} />
  ) : (
    <div className="container">
    {isLoading ? (<div className="mt-10 p-10 bg-white rounded-3xl font-fira border-black border-2 shadow-md">
    Loading... 
    </div>): (<div className="mt-10 p-10 bg-white rounded-3xl font-fira border-black border-2 shadow-md">
    Unfortunately, there are no resources that match your search requirements. We are regularly updating our database with more members, so please check back again soon. 
    </div>)}
  </div>
  )

  return (
    <Layout>
      <Seo seo={{ metaTitle: "Home" }} />
      <Headings
        title={strapiGlobal.siteName}
        description={strapiGlobal.siteDescription}
      />
      <main className="flex flex-col justify-center items-center width-full">
      <div className="flex flex-col w-full border-black border-b-2 bg-[#F8E3D3]">
        <h2 className="text-5xl lg:text-8xl leading-extra-tight md:text-7xl text-center uppercase font-bold w-full md:px-8 pt-10 mb-10 knowledge-gradient">
            Knowledge Share
          </h2>
          <div className="flex w-full flex-col items-center justify-center">
            <div className="md:px-20 w-full">
            <div className="flex flex-col border-black px-8 lg:px-32 py-8 mx-10 rounded-t-extra rounded-t-3xl knowledge-gradient top-curve-border">
            <div className="flex flex-row justify-center w-full">
              <div className="mr-5 font-bold poppins hidden md:w-1/2 md:block">
                <div className="font-normal">Browse through our carefully selected articles, tools, career advice, and more.</div>
              </div>
              <div className="ml-5 w-full flex items-center flex-col md:w-1/2 md:items-start">
                <div className="hidden text-xs md:block">Select from these Categories and Tags:</div>
                <div className="block text-md md:hidden">
                  Select from these Categories and Tags:
                </div>
                <div className="mt-2 text-left">
                  <button
                    className={"mr-2 mb-2 rounded-full px-3 text-sm p-1 border-black border-2 inline-flex items-center " + 
                    (openCategories || selectedCategories.length > 0
                      ? "bg-black text-white "
                      : "bg-white text-black ")
                    }
                    onClick={toggleCategories}
                  >
                    Categories {categoriesCountSection()} {openCategories ? <svg xmlns="http://www.w3.org/2000/svg" width="10" height="5" viewBox="0 0 10 5" fill="none">
      <path d="M5.00784 0.00168852C5.17445 0.00136286 5.3359 0.0594578 5.46419 0.165889L9.74241 3.73547C9.88803 3.85665 9.9796 4.03079 9.99698 4.21956C10.0144 4.40834 9.95614 4.5963 9.83511 4.7421C9.71408 4.88789 9.54016 4.97957 9.35161 4.99698C9.16307 5.01438 8.97534 4.95608 8.82973 4.83491L5.00784 1.63656L1.18596 4.72068C1.11303 4.77998 1.0291 4.82427 0.939019 4.85099C0.848934 4.87771 0.754464 4.88635 0.661036 4.87639C0.567607 4.86644 0.477064 4.8381 0.39461 4.793C0.312157 4.7479 0.239419 4.68693 0.180577 4.61359C0.115277 4.54018 0.0658217 4.45407 0.0353089 4.36063C0.00479609 4.2672 -0.00611584 4.16847 0.00325593 4.07061C0.0126277 3.97276 0.04208 3.8779 0.0897704 3.79198C0.137461 3.70605 0.202361 3.63092 0.280403 3.57127L4.55863 0.123055C4.6906 0.0334463 4.84876 -0.00928495 5.00784 0.00168852Z" fill="white" />
    </svg> : (selectedCategories.length > 0 ? <svg xmlns="http://www.w3.org/2000/svg" width="11" height="5" viewBox="0 0 11 5" fill="none">
      <path d="M5.26759 4.99831C5.09179 4.99864 4.92143 4.94054 4.78606 4.83411L0.271798 1.26453C0.11815 1.14335 0.0215264 0.969215 0.00318368 0.780437C-0.0151591 0.591658 0.0462815 0.403697 0.173989 0.257904C0.301697 0.11211 0.48521 0.020426 0.684159 0.00302095C0.883107 -0.0143841 1.08119 0.0439153 1.23484 0.165095L5.26759 3.36344L9.30033 0.279322C9.37729 0.22002 9.46584 0.175734 9.5609 0.149011C9.65595 0.122288 9.75564 0.113654 9.85422 0.123605C9.9528 0.133557 10.0483 0.161897 10.1353 0.206998C10.2223 0.252099 10.2991 0.313071 10.3612 0.386409C10.4301 0.459815 10.4823 0.545932 10.5145 0.639365C10.5467 0.732798 10.5582 0.831533 10.5483 0.929385C10.5384 1.02724 10.5073 1.1221 10.457 1.20802C10.4067 1.29395 10.3382 1.36908 10.2559 1.42873L5.74158 4.87695C5.60233 4.96655 5.43544 5.00928 5.26759 4.99831Z" fill="white"/>
    </svg> : <svg xmlns="http://www.w3.org/2000/svg" width="11" height="5" viewBox="0 0 11 5" fill="none">
      <path d="M5.26759 4.99831C5.09179 4.99864 4.92143 4.94054 4.78606 4.83411L0.271798 1.26453C0.11815 1.14335 0.0215264 0.969215 0.00318368 0.780437C-0.0151591 0.591658 0.0462815 0.403697 0.173989 0.257904C0.301697 0.11211 0.48521 0.020426 0.684159 0.00302095C0.883107 -0.0143841 1.08119 0.0439153 1.23484 0.165095L5.26759 3.36344L9.30033 0.279322C9.37729 0.22002 9.46584 0.175734 9.5609 0.149011C9.65595 0.122288 9.75564 0.113654 9.85422 0.123605C9.9528 0.133557 10.0483 0.161897 10.1353 0.206998C10.2223 0.252099 10.2991 0.313071 10.3612 0.386409C10.4301 0.459815 10.4823 0.545932 10.5145 0.639365C10.5467 0.732798 10.5582 0.831533 10.5483 0.929385C10.5384 1.02724 10.5073 1.1221 10.457 1.20802C10.4067 1.29395 10.3382 1.36908 10.2559 1.42873L5.74158 4.87695C5.60233 4.96655 5.43544 5.00928 5.26759 4.99831Z" fill="#1B1B1B"/>
    </svg>)}
                  </button>
                  {categoriesSection}
                  <button
                    className={
                      "mr-2 rounded-full px-3 text-sm p-1 border-black border-2 inline-flex items-center " +
                      (openTags || selectedTags.length > 0
                        ? "bg-black text-white"
                        : "bg-white text-black")
                    }
                    onClick={toggleTags}
                  >
                    Tags {tagsCountSection()} {openTags ? <svg xmlns="http://www.w3.org/2000/svg" width="10" height="5" viewBox="0 0 10 5" fill="none">
      <path d="M5.00784 0.00168852C5.17445 0.00136286 5.3359 0.0594578 5.46419 0.165889L9.74241 3.73547C9.88803 3.85665 9.9796 4.03079 9.99698 4.21956C10.0144 4.40834 9.95614 4.5963 9.83511 4.7421C9.71408 4.88789 9.54016 4.97957 9.35161 4.99698C9.16307 5.01438 8.97534 4.95608 8.82973 4.83491L5.00784 1.63656L1.18596 4.72068C1.11303 4.77998 1.0291 4.82427 0.939019 4.85099C0.848934 4.87771 0.754464 4.88635 0.661036 4.87639C0.567607 4.86644 0.477064 4.8381 0.39461 4.793C0.312157 4.7479 0.239419 4.68693 0.180577 4.61359C0.115277 4.54018 0.0658217 4.45407 0.0353089 4.36063C0.00479609 4.2672 -0.00611584 4.16847 0.00325593 4.07061C0.0126277 3.97276 0.04208 3.8779 0.0897704 3.79198C0.137461 3.70605 0.202361 3.63092 0.280403 3.57127L4.55863 0.123055C4.6906 0.0334463 4.84876 -0.00928495 5.00784 0.00168852Z" fill="white" />
    </svg> : (selectedTags.length > 0 ? <svg xmlns="http://www.w3.org/2000/svg" width="11" height="5" viewBox="0 0 11 5" fill="none">
      <path d="M5.26759 4.99831C5.09179 4.99864 4.92143 4.94054 4.78606 4.83411L0.271798 1.26453C0.11815 1.14335 0.0215264 0.969215 0.00318368 0.780437C-0.0151591 0.591658 0.0462815 0.403697 0.173989 0.257904C0.301697 0.11211 0.48521 0.020426 0.684159 0.00302095C0.883107 -0.0143841 1.08119 0.0439153 1.23484 0.165095L5.26759 3.36344L9.30033 0.279322C9.37729 0.22002 9.46584 0.175734 9.5609 0.149011C9.65595 0.122288 9.75564 0.113654 9.85422 0.123605C9.9528 0.133557 10.0483 0.161897 10.1353 0.206998C10.2223 0.252099 10.2991 0.313071 10.3612 0.386409C10.4301 0.459815 10.4823 0.545932 10.5145 0.639365C10.5467 0.732798 10.5582 0.831533 10.5483 0.929385C10.5384 1.02724 10.5073 1.1221 10.457 1.20802C10.4067 1.29395 10.3382 1.36908 10.2559 1.42873L5.74158 4.87695C5.60233 4.96655 5.43544 5.00928 5.26759 4.99831Z" fill="white"/>
    </svg> : <svg xmlns="http://www.w3.org/2000/svg" width="11" height="5" viewBox="0 0 11 5" fill="none">
      <path d="M5.26759 4.99831C5.09179 4.99864 4.92143 4.94054 4.78606 4.83411L0.271798 1.26453C0.11815 1.14335 0.0215264 0.969215 0.00318368 0.780437C-0.0151591 0.591658 0.0462815 0.403697 0.173989 0.257904C0.301697 0.11211 0.48521 0.020426 0.684159 0.00302095C0.883107 -0.0143841 1.08119 0.0439153 1.23484 0.165095L5.26759 3.36344L9.30033 0.279322C9.37729 0.22002 9.46584 0.175734 9.5609 0.149011C9.65595 0.122288 9.75564 0.113654 9.85422 0.123605C9.9528 0.133557 10.0483 0.161897 10.1353 0.206998C10.2223 0.252099 10.2991 0.313071 10.3612 0.386409C10.4301 0.459815 10.4823 0.545932 10.5145 0.639365C10.5467 0.732798 10.5582 0.831533 10.5483 0.929385C10.5384 1.02724 10.5073 1.1221 10.457 1.20802C10.4067 1.29395 10.3382 1.36908 10.2559 1.42873L5.74158 4.87695C5.60233 4.96655 5.43544 5.00928 5.26759 4.99831Z" fill="#1B1B1B"/>
    </svg>)}
                  </button>
                  {tagsSection}
                </div>
              </div>
              </div>
              <div>{yourSearch}</div>
              </div>
            </div>
          </div>
        </div>
        <div className="container flex justify-start mt-10">
          <h2 className="text-xl font-bold">Search Results</h2>
        </div>
        {resourceGrid}
      </main>
      <CookieNotice
        acceptButtonText="Agree & Enter"
        declineButton={false}
        backgroundClasses=""
        personalizeButtonEnable={false}
        acceptButtonClasses={
          "rounded-full px-3 text-sm bg-black text-white p-1 border-black border-2 " +
          (cookieAllow ? "cookieAllow" : "cookieNotAllow")
        }
        backgroundWrapperClasses="absolute w-full h-full top-0 left-0 bg-gray-400/75"
        buttonWrapperClasses="pt-5 ml-5 mr-5 pb-10 md:m-auto flex justify-center bg-white w-auto md:w-1/2 border-b-2 border-l-2 border-r-2 rounded-b-3xl border-black m-auto"
      >
        <div className="ml-5 mr-5 w-auto md:w-1/2 md:m-auto bg-white md:mt-20 flex flex-col bg-white rounded-t-2xl">
          <h2 className="text-md md:text-xl font-medium bg-green text-black text-center w-full p-4 border-2 border-black rounded-t-2xl">
            Community Agreements
          </h2>
          <div className="pt-2 pb-0 pl-5 pr-5 md:p-10 border-l-2 border-r-2 border-black">
            {Array(5)
              .fill(0)
              .map((_, index) => (
                <li className="list-none flex">
                  <input
                    type="checkbox"
                    checked={checkboxStatus[index]}
                    onChange={() => buttonHandler(index)}
                  />
                  <span className="text-sm m-2 md:ml-5 md:mt-5 md:mb-5">{agreements[index]}</span>
                </li>
              ))}
            <p className="pt-5">
              This website uses cookies to keep track of whether the Community
              Agreements has been accepted.
            </p>
          </div>
        </div>
      </CookieNotice>
    </Layout>
  )
}

ResourcePage.propTypes = {
  queryStrings: PropTypes.object,
}

export default withLocation(ResourcePage)
