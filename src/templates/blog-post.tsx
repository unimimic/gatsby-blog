import * as React from "react"
import Layout from "../components/layout"
import { graphql } from "gatsby"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Link } from "gatsby-plugin-react-i18next"
import { MDXProvider } from "@mdx-js/react"
import { components } from "@/components/mdx"
import { useTranslation } from "gatsby-plugin-react-i18next"


const BlogPost: React.FC<{ data: any; children: React.ReactNode }> = ({ data, children }) => {
  const { t } = useTranslation()
  const { title, date } = data.allMdx.nodes[0].frontmatter;

  return (
    <Layout pageTitle={title}>
      <div className="max-w-4xl mx-auto">
        {/* 返回按鈕 */}
        <div className="mb-6">
          <Link to="/blog" placeholder="" onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
            <Button variant="outline">
              ← {t('common.backToBlog')}
            </Button>
          </Link>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl text-center">{title}</CardTitle>
            <CardDescription className="text-center">{t('common.publishedOn')} {date}</CardDescription>
          </CardHeader>
          <CardContent className="prose dark:prose-invert max-w-none">
            <MDXProvider components={components}>
              {children}
            </MDXProvider>
          </CardContent>
        </Card>

        {/* 返回按鈕 */}
        <div className="mt-6">
          <Link to="/blog" placeholder="" onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
            <Button variant="outline">
              ← {t('common.backToBlog')}
            </Button>
          </Link>
        </div>
      </div>
    </Layout>
  )
}

export const pageQuery = graphql`
  query PostTemplate($id: String!, $language: String!) {
    locales: allLocale(filter: {language: {eq: $language}}) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
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
