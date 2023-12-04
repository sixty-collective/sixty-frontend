import React from "react"
import { useStaticQuery, graphql } from "gatsby"

const PageBlockEmbed = ({ data }) => {
  const { allStrapiTestimonial } = useStaticQuery(graphql`
    query {
      allStrapiTestimonial {
        edges {
          node {
            id
            name
            body
          }
        }
      }
    }
  `)

  switch (data.embed) {
    case "donorbox":
      return <div>DONORBOX</div>
    case "testimonialList":
      return (
        <div className="">
          {allStrapiTestimonial.edges.map((testimonial, index) => {
            return (
              <div
                className="border-black border-2 rounded-3xl bg-white p-5 mb-10 font-fira"
                key={index}
              >
                {testimonial.node.body}
              </div>
            )
          })}
        </div>
      )
    case "testimonialSubmission":
      return (
        <div className="card bg-white rounded-3xl border-black border-2">
          <form
            id="fs-frm"
            name="simple-contact-form"
            acceptCharset="utf-8"
            action="https://formspree.io/f/xnqkozgl"
            method="post"
            className="pb-10"
          >
            <fieldset id="fs-frm-inputs" className="flex flex-col p-10">
              <label htmlFor="name" className="mb-2">
                Name and/or Organization:
              </label>
              <input
                type="text"
                name="name"
                id="name"
                required=""
                className="bg-gray-200 rounded-lg p-2"
              />
              <div className="mt-5">
                <input type="checkbox" id="anonymous" name="anonymous" />
                <label for="anonymous" className="ml-5">
                  Keep me anonymous
                </label>
              </div>
              <label htmlFor="testimonial" className="mt-10 mb-2">
                Your Testimonial:
              </label>
              <textarea
                rows={5}
                name="testimonial"
                id="testimonial"
                required=""
                defaultValue={""}
                className="bg-gray-200 rounded-lg p-2"
              />

              <input
                type="hidden"
                name="_subject"
                id="email-subject"
                defaultValue="Contact Form Submission"
              />
            </fieldset>
            <div className="text-center">
              <input
                className="rounded-full px-3 text-sm bg-black text-white p-1 border-black border-2"
                type="submit"
                defaultValue="Submit"
              />
            </div>
          </form>
        </div>
      )
    case "contact":
      return (
        <div className="card bg-white rounded-3xl border-black border-2">
          <form
            id="fs-frm"
            name="simple-contact-form"
            acceptCharset="utf-8"
            action="https://formspree.io/f/mvojqybl"
            method="post"
            className="pb-10"
          >
            <fieldset id="fs-frm-inputs" className="flex flex-col p-10">
              <label htmlFor="name" className="mb-2">
                First and last name*
              </label>
              <input
                type="text"
                name="name"
                id="name"
                required=""
                className="bg-gray-200 rounded-lg p-2"
              />
              <label htmlFor="email" className="mt-10 mb-2">
                Email address*
              </label>
              <input
                type="text"
                name="email"
                id="email"
                required=""
                className="bg-gray-200 rounded-lg p-2"
              />
              <label htmlFor="message" className="mt-10 mb-2">
                Your message (please be descriptive)*
              </label>
              <textarea
                rows={5}
                name="message"
                id="message"
                required=""
                defaultValue={""}
                className="bg-gray-200 rounded-lg p-2"
              />

              <input
                type="hidden"
                name="_subject"
                id="email-subject"
                defaultValue="Contact Form Submission"
              />
            </fieldset>
            <div className="text-center">
              <input
                className="rounded-full px-3 text-sm bg-black text-white p-1 border-black border-2"
                type="submit"
                defaultValue="Submit"
              />
            </div>
          </form>
        </div>
      )
  }
  return <div className="prose mx-auto py-8">{data.embed}</div>
}

export default PageBlockEmbed
