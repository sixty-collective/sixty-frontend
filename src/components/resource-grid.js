import React from "react"
import ResourceCard from "./resource-card"

const ResourceGrid = ({ resources }) => {
  return (
    <div className="container py-10 grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3">
      {resources.map((resource, index) => (
        <ResourceCard resource={resource} key={resource} index={index} />
      ))}
    </div>
  )
}

export default ResourceGrid
