import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import { SEO } from '../components/seo'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Link } from 'gatsby-plugin-react-i18next'
import { MDXProvider } from "@mdx-js/react"
import { components } from "@/components/mdx"
import { useTranslation } from "gatsby-plugin-react-i18next"

interface NotionNoteTemplateProps {
  data: {
    allMdx: {
      nodes: Array<{
        frontmatter?: {
          title?: string
          date?: string
        }
        internal: {
          contentFilePath: string
        }
      }>
    }
    allNotionNotes: {
      nodes: Array<{
        id: string
        internal: {
          contentFilePath: string
        }
        frontmatter?: {
          title?: string
        }
      }>
    }
  }
  children: React.ReactNode
}

const NotionNoteTemplate: React.FC<NotionNoteTemplateProps> = ({ data, children }) => {
  const { t } = useTranslation()
  const currentNote = data.allMdx.nodes[0]
  
  // 從檔案路徑提取標題
  const extractTitle = (filePath: string) => {
    const fileName = filePath.split('/').pop() || ''
    const titleMatch = fileName.match(/^(.+?)\s+[a-f0-9]{32}\.md$/)
    return titleMatch ? titleMatch[1] : fileName.replace('.md', '')
  }

  const noteTitle = currentNote.frontmatter?.title || extractTitle(currentNote.internal.contentFilePath)

  // 尋找相關的子筆記（同一資料夾下的其他檔案）
  const currentNotePath = currentNote.internal.contentFilePath
  const currentNoteDir = currentNotePath.substring(0, currentNotePath.lastIndexOf('/'))
  
  const relatedNotes = data.allNotionNotes.nodes.filter(note => {
    const notePath = note.internal.contentFilePath
    const noteDir = notePath.substring(0, notePath.lastIndexOf('/'))
    return noteDir.startsWith(currentNoteDir) && notePath !== currentNotePath
  })

  return (
    <Layout pageTitle={noteTitle}>
      <div className="max-w-4xl mx-auto">
        {/* 返回按鈕 */}
        <div className="mb-6">
          <Link to="/notes" placeholder="" onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
            <Button variant="outline">
              ← {t('common.backToNotes')}
            </Button>
          </Link>
        </div>

        {/* 主要內容 */}
        <Card className="mb-8">
          <CardHeader>
            {/* <CardTitle className="text-3xl text-center">{noteTitle}</CardTitle> */}
            {currentNote.frontmatter?.date && (
              <p className="text-gray-500 dark:text-gray-400 text-center">
                {t('common.publishedOn')} {currentNote.frontmatter.date}
              </p>
            )}
          </CardHeader>
          <CardContent className="prose dark:prose-invert max-w-none">
            <MDXProvider components={components}>
              {children}
            </MDXProvider>
          </CardContent>
        </Card>

        {/* 返回按鈕 */}
        <div className="mb-6">
          <Link to="/notes" placeholder="" onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
            <Button variant="outline">
              ← {t('common.backToNotes')}
            </Button>
          </Link>
        </div>

        {/* 相關筆記 */}
        {/* {relatedNotes.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">📋 {t('common.relatedNotes')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3">
                {relatedNotes.map((note) => {
                  const title = extractTitle(note.internal.contentFilePath)
                  const fileName = note.internal.contentFilePath.split('/').pop()?.replace('.md', '') || ''
                  
                  // 提取有意義的標題（移除 Notion UUID）
                  const titleMatch = fileName.match(/^(.+?)\s+[a-f0-9]{32}$/);
                  const cleanTitle = titleMatch ? titleMatch[1] : fileName;
                  
                  // 創建 slug
                  const slug = cleanTitle
                    .replace(/\s+/g, '-')
                    .replace(/[^\w\-\u4e00-\u9fff]/g, '')
                    .toLowerCase();
                  
                  return (
                    <Link 
                      key={note.id} 
                      to={`/notes/${slug}`}
                      className="block p-3 rounded-lg border hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                      placeholder="" 
                      onPointerEnterCapture={undefined} 
                      onPointerLeaveCapture={undefined}
                    >
                      <span className="font-medium">{title}</span>
                    </Link>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        )} */}
      </div>
    </Layout>
  )
}

export const query = graphql`
  query($id: String!, $language: String!) {
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
          title
          date(formatString: "MMMM D, YYYY")
        }
        internal {
          contentFilePath
        }
      }
    }
    allNotionNotes: allMdx(
      filter: { internal: { contentFilePath: { regex: "/content/notion/" } } }
    ) {
      nodes {
        id
        internal {
          contentFilePath
        }
        frontmatter {
          title
        }
      }
    }
  }
`

export default NotionNoteTemplate

export const Head = ({ data }: NotionNoteTemplateProps) => {
  const extractTitle = (filePath: string) => {
    const fileName = filePath.split('/').pop() || ''
    const titleMatch = fileName.match(/^(.+?)\s+[a-f0-9]{32}\.md$/)
    return titleMatch ? titleMatch[1] : fileName.replace('.md', '')
  }
  
  const currentNote = data.allMdx.nodes[0]
  const title = currentNote.frontmatter?.title || extractTitle(currentNote.internal.contentFilePath)
  return <SEO title={`${title} - Notes`} />
}
