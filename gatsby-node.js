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

  // Define a template for pages
  const pageTemplate = path.resolve("./src/templates/page.js")

  const pageResult = await graphql(
    `
      {
        allStrapiPage {
          nodes {
            title
            slug
          }
        }
      }
    `
  )

  if (pageResult.errors) {
    reporter.panicOnBuild(
      `There was an error loading your Strapi pages`,
      pageResult.errors
    )

    return
  }

  const pages = pageResult.data.allStrapiPage.nodes

  if (pages.length > 0) {
    pages.forEach(page => {
      createPage({
        path: `/${page.slug}`,
        component: pageTemplate,
        context: {
          slug: page.slug,
        },
      })
    })
  }
}
