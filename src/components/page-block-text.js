import React from "react"

const PageBlockText = ({ data }) => {
  return (
    <div className="prose mx-auto py-8 max-w-none">
      <div
        dangerouslySetInnerHTML={{
          __html: data.richTextBody.data.childMarkdownRemark.html,
        }}
      />
    </div>
  )
}

export default PageBlockText
