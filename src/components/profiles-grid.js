import React, { useState, state } from "react"
import { graphql } from "gatsby"
import axios from "axios"

import ProfileCard from "./profile-card"

const ProfilesGrid = ({ profiles }) => {
  return (
    <div>
      <div className="container py-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {profiles.map((profile, index) => (
          <ProfileCard profile={profile} key={index} index={index} />
        ))}
      </div>
    </div>
  )
}

export default ProfilesGrid
