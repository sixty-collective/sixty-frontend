require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  plugins: [
    {
      resolve: "gatsby-source-strapi",
      options: {
        apiURL: process.env.STRAPI_API_URL,
        accessToken: process.env.STRAPI_TOKEN,
        collectionTypes: [
          {
            singularName: "profile",
            queryParams: {
              populate: {
                workSamples: {
                  populate: "*",
                },
                disciplines: {
                  populate: "*",
                },
                descriptors: {
                  populate: "*",
                },
                profilePicture: "*",
              },
            },
          },
          {
            singularName: "author",
          },
          {
            singularName: "category",
          },
          {
            singularName: "resource-tag",
          },
          {
            singularName: "testimonial",
          },
          {
            singularName: "discipline",
          },
          {
            singularName: "discipline-category",
          },
          {
            singularName: "descriptor",
          },
          {
            singularName: "descriptor-category",
          },
          {
            singularName: "resource",
          },
          {
            singularName: "page",
            queryParams: {
              populate: {
                coverImage: "*",
                image: "*",
                blocks: {
                  populate: {
                    image: "*",
                    qa: "*",
                  },
                },
                sideBlocks: {
                  populate: {
                    image: "*",
                    qa: "*",
                  },
                },
              },
            },
          },
        ],
        singleTypes: [
          {
            singularName: "global",
            queryParams: {
              populate: {
                favicon: "*",
                headerImage: "*",
                defaultSeo: {
                  populate: "*",
                },
              },
            },
          },
        ],
      },
    },
    "gatsby-plugin-gatsby-cloud",
    "gatsby-plugin-postcss",
    {
      resolve: `gatsby-omni-font-loader`,
      options: {
        enableListener: true,
        preconnect: [
          `https://fonts.googleapis.com`,
          `https://fonts.gstatic.com`,
        ],
        web: [
          {
            name: `Fira Code`,
            file: `https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;700&display=swap`,
          },
          {
            name: `Nunito Sans`,
            file: `https://fonts.googleapis.com/css2?family=Nunito+Sans:opsz,wght@6..12,300;6..12,400;6..12,700&display=swap`,
          },
          {
            name: `Poppins`,
            file: `https://fonts.googleapis.com/css2?family=Poppins:wght@400;700;900&display=swap`,
          },
        ],
      },
    },
    "gatsby-plugin-image",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    "gatsby-transformer-remark",
  ],
}
