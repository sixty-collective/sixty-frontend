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
      return <div><script src="https://donorbox.org/widget.js" paypalExpress="true"></script>
      <iframe src="https://donorbox.org/embed/support-sixty-s-future-fund?language=en" name="donorbox" allowpaymentrequest="allowpaymentrequest" seamless="seamless" frameborder="0" scrolling="no" height="900px" width="100%">

      </iframe>
      </div>
    case "testimonialList":
      return (
        <div className="py-8 lg:py-0">
          {allStrapiTestimonial.edges.map((testimonial, index) => {
            function testimonyName() {
              if (testimonial.node.name.length > 1) {
                return <div className="pt-5 font-medium">{testimonial.node.name}</div>
              }
            }

            return (
              <div
                className="border-black border-2 rounded-3xl bg-white p-5 mb-10 font-fira"
                key={index}
              >
                <div>{testimonial.node.body}</div>
                {testimonyName()}
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
            action="https://formspree.io/f/xbjnylqj"
            method="post"
            className="pb-10"
            netlify
          >
            <fieldset id="fs-frm-inputs" className="flex flex-col p-10">
            <h2 className="font-semibold text-lg">Share Your Testimonial</h2>
              <label htmlFor="name" className="mb-2 mt-5">
                Name (First and Last)
              </label>
              <input
                type="text"
                name="name"
                id="name"
                required=""
                className="bg-gray-200 rounded-lg p-2"
              />
              <label htmlFor="name" className="mb-2 mt-5">
                Organization or Affiliation
              </label>
              <input
                type="text"
                name="organization"
                id="organization"
                required=""
                className="bg-gray-200 rounded-lg p-2"
              />
              <label htmlFor="name" className="mb-2 mt-5">
                Email
              </label>
              <input
                type="text"
                name="email"
                id="email"
                required=""
                className="bg-gray-200 rounded-lg p-2"
              />
              <label htmlFor="name" className="mb-2 mt-5">
                Who did you hire or collaborate with?
              </label>
              <input
                type="text"
                name="collaborate"
                id="collaborate"
                required=""
                className="bg-gray-200 rounded-lg p-2"
              />
              <label htmlFor="testimonial" className="mt-5 mb-2">
                Tell us about your experience
              </label>
              <textarea
                rows={5}
                name="testimonial"
                id="testimonial"
                required=""
                defaultValue={""}
                className="bg-gray-200 rounded-lg p-2"
              />
              <div className="mt-5">
                <input type="checkbox" id="anonymous" name="anonymous" />
                <label for="anonymous" className="ml-5">
                  Keep me anonymous
                </label>
              </div>
              <div className="mt-5">
                <input type="checkbox" id="allow" name="allow" />
                <label for="allow" className="ml-5">
                  I allow Sixty to use this testimonial for promotional purposes. Sixty may lightly edit this submission for clarity and length.
                </label>
              </div>
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
            action="https://formspree.io/f/xrbzvdew"
            method="post"
            className="pb-10"
            netlify
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
