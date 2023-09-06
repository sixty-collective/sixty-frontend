const path = require("path")

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  // Define a template for blog post
  const profilePost = path.resolve("./src/templates/profile-post.js")

  const result = await graphql(
    `
      {
        allStrapiProfile {
          nodes {
            name
            slug
          }
        }
      }
    `
  )

  if (result.errors) {
    reporter.panicOnBuild(
      `There was an error loading your Strapi articles`,
      result.errors
    )

    return
  }

  const profiles = result.data.allStrapiProfile.nodes

  if (profiles.length > 0) {
    profiles.forEach(profile => {
      createPage({
        path: `/profile/${profile.slug}`,
        component: profilePost,
        context: {
          slug: profile.slug,
        },
      })
    })
  }
}
