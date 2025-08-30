import * as React from "react"
import type { HeadFC, PageProps } from "gatsby"
import Layout from "../components/layout"
import { SEO } from "../components/seo"
import { graphql } from 'gatsby'
import { useTranslation } from "gatsby-plugin-react-i18next"
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Link } from "gatsby"

interface Note {
  id: string
  frontmatter?: {
    title?: string
    date?: string
  }
  internal: {
    contentFilePath: string
  }
  body?: string
  rawBody?: string
}

const NotesPage: React.FC<PageProps<{ allMdx: { nodes: Note[] } }>> = ({ data }) => {
  const { t } = useTranslation()
  
  if (!data || !data.allMdx || !data.allMdx.nodes) {
    return <p>No notes found</p>
  }

  const extractNoteInfo = (filePath: string) => {
    // 提取檔案名稱並處理 notes 的特殊格式
    const fileName = filePath.split('/').pop() || ''
    const titleMatch = fileName.match(/^(.+?)\s+[a-f0-9]{32}\.md$/)
    const title = titleMatch ? titleMatch[1] : fileName.replace('.md', '')
    
    // 判斷是否為根目錄檔案（主要筆記）
    const pathAfterNotes = filePath.split('content/notion/')[1] || ''
    const isRootNote = !pathAfterNotes.includes('/')
    
    // 創建與 gatsby-node.ts 相同的 slug
    const cleanTitle = titleMatch ? titleMatch[1] : fileName.replace('.md', '')
    const slug = cleanTitle
      .replace(/\s+/g, '-')
      .replace(/[^\w\-\u4e00-\u9fff]/g, '')
      .toLowerCase()
    
    return {
      title,
      isRootNote,
      slug
    }
  }

  // 過濾出根目錄的筆記（不包含子資料夾）
  const rootNotes = data.allMdx.nodes.filter(note => {
    const { isRootNote } = extractNoteInfo(note.internal.contentFilePath)
    return isRootNote
  })

  return (
    <Layout pageTitle={t('notes.title')}>
      <section className="mb-12">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>📝 {t('notes.title')}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 dark:text-gray-300">
              {t('notes.description')}
            </p>
          </CardContent>
        </Card>
      </section>

      <section>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {rootNotes.map((note) => {
            const { title, slug } = extractNoteInfo(note.internal.contentFilePath)
            return (
              <Card key={note.id} className="flex flex-col hover:shadow-lg transition-shadow">
                <CardHeader className="flex-1">
                  <CardTitle className="text-lg">{title}</CardTitle>
                  <CardDescription>
                    {note.frontmatter?.date && (
                      <span className="text-sm text-gray-500">
                        {note.frontmatter.date}
                      </span>
                    )}
                  </CardDescription>
                </CardHeader>
                <CardFooter>
                  <Link to={`/notes/${slug}`} className="w-full">
                    <Button variant="outline" className="w-full">
                      {t('common.readMore')}
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            )
          })}
        </div>
      </section>
    </Layout>
  )
}

export const query = graphql`
  query ($language: String!) {
    locales: allLocale(filter: {language: {eq: $language}}) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
    allMdx(
      filter: { internal: { contentFilePath: { regex: "/content/notion/" } } }
      sort: { internal: { contentFilePath: ASC } }
    ) {
      nodes {
        frontmatter {
          title
          date(formatString: "MMMM D, YYYY")
        }
        id
        internal {
          contentFilePath
        }
      }
    }
  }
`

export default NotesPage

export const Head: HeadFC = () => <SEO title="Notes - D.N." />
