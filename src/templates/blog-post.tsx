import * as React from "react"
import Layout from "../components/layout"
import { graphql } from "gatsby"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MDXProvider } from "@mdx-js/react"

// Custom components for markdown content
const components = {
  h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => <h1 className="text-3xl font-bold mt-8 mb-4" {...props} />,
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => <h2 className="text-2xl font-semibold mt-6 mb-3" {...props} />,
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => <h3 className="text-xl font-medium mt-4 mb-2" {...props} />,
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => <p className="my-2 text-gray-700 dark:text-gray-300" {...props} />,
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => <ul className="list-disc list-inside my-2" {...props} />,
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => <ol className="list-decimal list-inside my-2" {...props} />,
  li: (props: React.HTMLAttributes<HTMLLIElement>) => <li className="my-1" {...props} />,
  a: (props: React.HTMLAttributes<HTMLAnchorElement>) => <a className="text-blue-600 hover:underline dark:text-blue-400" {...props} />,
  blockquote: (props: React.HTMLAttributes<HTMLQuoteElement>) => <blockquote className="border-l-4 border-gray-300 pl-4 italic my-4" {...props} />,
  code: (props: React.HTMLAttributes<HTMLModElement>) => <code className="bg-gray-100 dark:bg-gray-800 rounded px-1 py-0.5" {...props} />,
  pre: (props: React.HTMLAttributes<HTMLPreElement>) => <pre className="bg-gray-100 dark:bg-gray-800 rounded p-4 my-4 overflow-x-auto" {...props} />,
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
