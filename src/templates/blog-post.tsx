import * as React from "react"
import Layout from "../components/layout"
import { graphql } from "gatsby"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MDXProvider } from "@mdx-js/react"

// Custom components for markdown content
const components = {
  h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1 className="text-4xl font-extrabold mt-10 mb-5 text-gray-800 dark:text-gray-200" {...props} />
  ),
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 className="text-3xl font-bold mt-8 mb-4 text-gray-800 dark:text-gray-200" {...props} />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 className="text-2xl font-semibold mt-6 mb-3 text-gray-800 dark:text-gray-200" {...props} />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className="my-3 text-gray-800 dark:text-gray-300 text-lg leading-relaxed" {...props} />
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className="list-disc list-inside my-3 pl-5" {...props} />
  ),
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
    <ol className="list-decimal list-inside my-3 pl-5" {...props} />
  ),
  li: (props: React.HTMLAttributes<HTMLLIElement>) => (
    <li className="my-1 text-gray-700 dark:text-gray-300" {...props} />
  ),
  a: (props: React.HTMLAttributes<HTMLAnchorElement>) => (
    <a className="text-blue-500 hover:text-blue-700 hover:underline dark:text-blue-400" {...props} />
  ),
  blockquote: (props: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote className="border-l-4 border-blue-500 pl-4 italic my-6 text-gray-600 dark:text-gray-400" {...props} />
  ),
  code: (props: React.HTMLAttributes<HTMLModElement>) => (
    <code className="bg-blue-100 dark:bg-blue-800 rounded px-1 py-0.5 font-mono text-sm" {...props} />
  ),
  pre: (props: React.HTMLAttributes<HTMLPreElement>) => (
    <pre style={{overflowX: "auto"}} className="bg-gray-200 dark:bg-gray-700 rounded p-6 my-4 overflow-x-auto text-sm font-mono" {...props} />
  ),
}


const BlogPost: React.FC<{ data: any; children: React.ReactNode }> = ({ data, children }) => {
  const { title } = data.allMdx.nodes[0].frontmatter;
  return (
    <Layout pageTitle={title}>
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl text-center">{title}</CardTitle>
          </CardHeader>
          <CardContent>
            <MDXProvider components={components}>
              {children}
            </MDXProvider>
          </CardContent>
        </Card>
    </Layout>
  )
}

export const pageQuery = graphql`
  query PostTemplate($id: String!) {
    allMdx(filter: { id: { eq: $id } }) {
      nodes {
        frontmatter {
          title
        }
      }
    }
  }
`


export default BlogPost
