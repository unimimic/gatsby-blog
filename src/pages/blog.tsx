import * as React from "react"
import type { HeadFC, PageProps } from "gatsby"
import Layout from "../components/layout"
import { SEO } from "../components/seo"
import { graphql } from 'gatsby'
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Link } from "gatsby"

interface BlogPost {
  id: string
  frontmatter: {
    title: string
    date: string
  }
  internal: {
    contentFilePath: string
  }
}

interface GroupedPosts {
  [year: string]: BlogPost[]
}

const BlogPage: React.FC<PageProps<{ allMdx: { nodes: BlogPost[] } }>> = ({ data }) => {
  if (!data || !data.allMdx || !data.allMdx.nodes) {
    return <p>No data found</p>
  }

  const groupPostsByYear = (posts: BlogPost[]): GroupedPosts => {
    return posts.reduce((acc, post) => {
      const year = new Date(post.frontmatter.date).getFullYear().toString()
      if (!acc[year]) {
        acc[year] = []
      }
      acc[year].push(post)
      return acc
    }, {} as GroupedPosts)
  }

  const extractContentDir = (filePath: string): string => {
    // 使用正規表達式來從路徑中提取資料夾名稱
    const match = filePath.match(/\/([^/]+)\/[^/]+$/);
    return match ? match[1].toLowerCase() : '';
  }

  const sortedYears = Object.keys(groupPostsByYear(data.allMdx.nodes)).sort((a, b) => parseInt(b) - parseInt(a))
  const groupedPosts = groupPostsByYear(data.allMdx.nodes)

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
      {sortedYears.map((year) => (
        <section key={year} className="mb-12">
          <h2 className="text-2xl font-bold mb-6">{year}</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {groupedPosts[year].map((post) => {
              const contentDir = extractContentDir(post.internal.contentFilePath)
              return (
                <Card key={post.id} className="flex flex-col">
                  <CardHeader className="flex-1 flex flex-col gap-1">
                    <CardTitle className="tracking-wide leading-5">{post.frontmatter.title}</CardTitle>
                    <CardDescription>{post.frontmatter.date}</CardDescription>
                  </CardHeader>
                  <CardFooter>
                    <Link to={`/posts/${contentDir}`}>
                      <Button variant="outline">Read More</Button>
                    </Link>
                  </CardFooter>
                </Card>
              )
            })}
          </div>
        </section>
      ))}
    </Layout>
  )
}

export const query = graphql`
  query {
    allMdx(
      sort: {frontmatter: {date: DESC}}
      filter: { internal: { contentFilePath: { regex: "/content/posts/" } } }
    ) {
      nodes {
        frontmatter {
          date(formatString: "MMMM D, YYYY")
          title
        }
        id
        internal {
          contentFilePath
        }
      }
    }
  }
`

export default BlogPage

export const Head: HeadFC = () => <SEO title="D.N. Blog" />
