import React, { useState, state } from "react"
import { graphql } from "gatsby"
import axios from "axios"

import ProfileCard from "./profile-card"

const ProfilesGrid = ({ profiles }) => {
  if (profiles.length === 0) {
    <div>
    <div className="container py-10">
      <p>
      Unfortunately, there are no profiles that match your search requirements. We are regularly updating our database with more members, so please check back again soon. 
      </p>
    </div>
    </div>
  } else {
    return (
      <div>
        <div className="container py-10 grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3">
          {profiles.map((profile, index) => (
            <ProfileCard profile={profile} key={index} index={index} />
          ))}
        </div>
      </div>
    )
  }
}

export default ProfilesGrid
