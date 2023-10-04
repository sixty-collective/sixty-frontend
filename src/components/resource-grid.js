import React, { useState, state } from "react"
import { graphql } from "gatsby"
import axios from "axios"

import ResourceCard from "./resource-card"

const ResourceGrid = ({ resources }) => {
  return (
    <div className="container py-20 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {resources.map((resource, index) => (
        <ResourceCard resource={resource} key={resource} index={index} />
      ))}
    </div>
  )
}

export default ResourceGrid
