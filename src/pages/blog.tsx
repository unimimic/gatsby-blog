import * as React from "react"
import type { HeadFC, PageProps } from "gatsby"
import Layout from "../components/layout"
import Seo from '../components/seo'
import { graphql } from 'gatsby'
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ArrowRight, Mail } from "lucide-react"
import { Link } from "gatsby"

const BlogPage: React.FC<PageProps<{ allMdx: { nodes: { id: string, frontmatter: { title: string, date: string } }[] } }>> = ({ data }) => {
  // 檢查 data 或 nodes 是否存在
  if (!data || !data.allMdx || !data.allMdx.nodes) {
    return <p>No data found</p>;
  }

  return (
    <Layout pageTitle="">
      <section className="mb-12">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Welcome to My Blog</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 dark:text-gray-300">
              Here, I share my thoughts on technology, design, and life. Feel free to explore and engage with my content!
            </p>
          </CardContent>
        </Card>
      </section>
      <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {data.allMdx.nodes.map((post) => (
          <Card key={post.id}>
            <CardHeader>
              <CardTitle>{post.frontmatter.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-300">
                {post.frontmatter.title}
              </p>
            </CardContent>
            <CardFooter>
              <Link to={`/blog-post/${post.id}`}> {/* 使用 Link 組件包裹按鈕 */}
                <Button variant="outline">Read More</Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </section>
    </Layout>
  )
}

export const query = graphql`
  query {
    allMdx {
      nodes {
        frontmatter {
          date(formatString: "MMMM D, YYYY")
          title
        }
        id
      }
    }
  }
`

export default BlogPage

export const Head: HeadFC = () => <Seo title="Blog Page" />
