import * as React from "react"
import { Link, HeadFC, PageProps } from "gatsby"

const pageStyles = "text-black p-24 font-sans"
const headingStyles = "mt-0 mb-16 max-w-screen-sm"
const paragraphStyles = "mb-12"
const codeStyles = "text-yellow-600 p-1 bg-yellow-100 text-lg rounded"

const NotFoundPage: React.FC<PageProps> = () => {
  return (
    <main className={pageStyles}>
      <h1 className={headingStyles}>Page not found</h1>
      <p className={paragraphStyles}>
        Sorry 😔, we couldn’t find what you were looking for.
        <br />
        <br />
        <Link to="/">Go home</Link>.
      </p>
    </main>
  )
}

export default NotFoundPage

export const Head: HeadFC = () => <title>Not found</title>
