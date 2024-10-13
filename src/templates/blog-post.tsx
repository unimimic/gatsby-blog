import * as React from "react"
import Layout from "../components/layout"
import { graphql } from "gatsby"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MDXProvider } from "@mdx-js/react"
import { components } from "@/components/mdx"


const BlogPost: React.FC<{ data: any; children: React.ReactNode }> = ({ data, children }) => {
  const { title, date } = data.allMdx.nodes[0].frontmatter;

  return (
    <Layout pageTitle={title}>
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl text-center">{title}</CardTitle>
            <CardDescription>{date}</CardDescription>
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
          date(formatString: "MMMM D, YYYY")
          title
        }
      }
    }
  }
`

export default BlogPost
