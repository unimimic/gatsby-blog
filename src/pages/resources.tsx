import * as React from "react"
import { useState } from "react"
import type { HeadFC, PageProps } from "gatsby"
import { motion } from "framer-motion"
import Layout from "../components/layout"
import { SEO } from "../components/seo"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Search, ExternalLink, Code, Palette, Briefcase, Laptop } from "lucide-react"
import { useTranslation } from "gatsby-plugin-react-i18next"
import { graphql } from "gatsby"

// 資源數據
const resources = [
  { name: "Refactoring.Guru", url: "https://refactoringguru.cn/", category: "Development", description: "學習代碼重構和設計模式的免費資源", icon: Code },
  { name: "GitHub", url: "https://github.com", category: "Development", description: "Version control and collaboration platform for developers", icon: Code },
  { name: "Stack Overflow", url: "https://stackoverflow.com", category: "Development", description: "Q&A platform for programmers", icon: Code },
  { name: "Figma", url: "https://www.figma.com", category: "Design", description: "Collaborative interface design tool", icon: Palette },
  { name: "Canva", url: "https://www.canva.com", category: "Design", description: "Graphic design platform for creating visual content", icon: Palette },
  { name: "Trello", url: "https://trello.com", category: "Productivity", description: "Web-based Kanban-style list-making application", icon: Briefcase },
  { name: "Notion", url: "https://www.notion.so", category: "Productivity", description: "All-in-one workspace for notes, tasks, wikis, and databases", icon: Briefcase },
  { name: "opensourcealternative.to", url: "https://www.opensourcealternative.to/", category: "Development", description: "Discover 400+ popular open source alternatives", icon: Code },
  { name: "ChatGPT 指令", url: "https://www.explainthis.io/zh-hant/chatgpt?mibextid=tejx2t", category: "AI", description: "ChatGPT 指令大全", icon: Laptop },
  { name: "Elicit", url: "https://elicit.org/", category: "AI", description: "AI 搜尋、摘要論文服務", icon: Laptop },
  { name: "Consensus", url: "https://consensus.app/", category: "AI", description: "AI 搜尋、摘要論文服務", icon: Laptop },
  { name: "Gamma", url: "https://gamma.app/", category: "AI", description: "AI 設計簡報、網頁", icon: Laptop },
  { name: "chatPDF", url: "https://www.chatpdf.com/", category: "AI", description: "分析PDF文件重點內容細節", icon: Laptop },
  { name: "Stock AI", url: "https://www.stockai.com/", category: "AI", description: "AI生成圖片的圖庫資源", icon: Laptop },
  { name: "PromptBase", url: "https://promptbase.com/", category: "AI", description: "AI咒語市集", icon: Laptop },
  { name: "Recraft.ai", url: "http://recraft.ai/", category: "AI", description: "免費 AI 繪圖工具，快速生成獨特的 ICON 圖示和向量插圖", icon: Laptop },
  { name: "webcode.tools", url: "https://webcode.tools/", category: "Design", description: "集合各類範例以及一些工具", icon: Palette },
  { name: "Coolors", url: "https://coolors.co/", category: "Design", description: "快速配色工具", icon: Palette },
  { name: "PatternPad", url: "https://patternpad.com/", category: "Design", description: "生成Pattern", icon: Palette },
  { name: "flaticon", url: "https://www.flaticon.com/", category: "Design", description: "免費icon下載", icon: Palette },
  { name: "ICONS8", url: "https://icons8.com/", category: "Design", description: "免費icon下載", icon: Palette },
  { name: "Whirl", url: "https://whirl.netlify.app/", category: "Design", description: "一些有趣的CSS 動畫庫", icon: Palette },
  { name: "layout.bradwoods.io", url: "https://layout.bradwoods.io/", category: "Design", description: "CSS 佈局語法生成", icon: Palette },
  { name: "WebGradients", url: "https://webgradients.com/", category: "Design", description: "CSS 漸層顏色生成", icon: Palette },
  { name: "Type Scale", url: "https://typescale.com/", category: "Design", description: "CSS 文字規範", icon: Palette },
  { name: "bootsnipp", url: "https://bootsnipp.com/", category: "Design", description: "Bootstrap程式片段", icon: Palette },
  { name: "grid.malven", url: "https://grid.malven.co/", category: "Design", description: "CSS Grid網格語法參考", icon: Palette },
  { name: "regex101", url: "https://regex101.com/", category: "Tools", description: "正則表示式線上產生器，可以用來測試正則表示式", icon: Laptop },
  { name: "Looka", url: "https://looka.com/", category: "Design", description: "協助生成Logo", icon: Laptop },
  { name: "Ray.so", url: "http://ray.so/", category: "Design", description: "將程式碼生成Instagram用圖片", icon: Laptop },
  { name: "RecordScreen.io", url: "https://recordscreen.io/", category: "Tools", description: "網頁版螢幕錄影工具", icon: Laptop },
  { name: "EmuOS", url: "https://emupedia.net/beta/emuos/", category: "Tools", description: "網頁版Windows模擬器，有提供很多懷舊應用程式", icon: Laptop },
  { name: "TWCERT/CC", url: "https://www.twcert.org.tw/", category: "Security", description: "我國企業資安事件通報及協處窗口", icon: Laptop },
  { name: "HKCERT", url: "https://www.hkcert.org/tc", category: "Security", description: "香港電腦保安事故協調中心", icon: Laptop },
  { name: "CVEdetails", url: "https://www.cvedetails.com/", category: "Security", description: "免費 CVE 資安漏洞資料庫", icon: Laptop },
  { name: "內政部警政署165 全民防騙網", url: "https://165.npa.gov.tw/#/", category: "Security", description: "防詐騙的資訊與指南", icon: Laptop },
  { name: "國家資通安全研究院", url: "https://www.nics.nat.gov.tw/", category: "Security", description: "推動國家資通安全科技的行政法人", icon: Laptop },
  { name: "釣魚網站通報PhishingCheck", url: "https://phishingcheck.tw/", category: "Security", description: "釣魚網站通報服務", icon: Laptop },
  { name: "Cybersecurity", url: "https://start.me/p/vjBeQ6/cybersecurity", category: "Security", description: "資安相關重要資訊的總覽", icon: Laptop },
]


// 獲取所有唯一的類別
const categories = ["Development", "Design", "Productivity", "AI", "Tools", "Security"]

// 類別圖標映射
const categoryIcons = {
  Development: Code,
  AI: Code,
  Tools: Code,
  Security: Code,
  Design: Palette,
  Productivity: Briefcase,
  All: Laptop
}

const ResourceCard: React.FC<{ resource: typeof resources[0] }> = ({ resource }) => {
  const { t } = useTranslation()
  const Icon = resource.icon
  return (
    <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
      <Card className="h-full">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Icon className="h-5 w-5" />
              {resource.name}
            </span>
            <Button variant="ghost" size="icon" asChild>
              <a href={resource.url} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4" />
                <span className="sr-only">{t('resources.visitSite', { name: resource.name })}</span>
              </a>
            </Button>
          </CardTitle>
          <CardDescription>{t(`resources.categories.${resource.category.toLowerCase()}`)}</CardDescription>
        </CardHeader>
        <CardContent>
          <p>{resource.description}</p>
        </CardContent>
      </Card>
    </motion.div>
  )
}

const ResourcesPage: React.FC<PageProps> = () => {
  const { t } = useTranslation()
  const [searchTerm, setSearchTerm] = useState("")
  const [activeCategory, setActiveCategory] = useState("All")

  const filteredResources = resources.filter(resource => 
    (activeCategory === "All" || resource.category === activeCategory) &&
    (resource.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
     resource.description.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  return (
    <Layout pageTitle={t('resources.pageTitle')}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 py-8"
      >
        <h1 className="text-4xl font-bold mb-8 text-center">{t('resources.pageTitle')}</h1>
        
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder={t('resources.searchPlaceholder')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <Tabs value={activeCategory} onValueChange={setActiveCategory} className="mb-8">
          <TabsList className="flex flex-wrap justify-center">
            {["All", ...categories].map(category => {
              const Icon = categoryIcons[category as keyof typeof categoryIcons]
              return (
                <TabsTrigger key={category} value={category} className="flex items-center gap-2">
                  <Icon className="h-4 w-4" />
                  {t(`resources.categories.${category.toLowerCase()}`)}
                </TabsTrigger>
              )
            })}
          </TabsList>
        </Tabs>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredResources.map((resource, index) => (
            <ResourceCard key={index} resource={resource} />
          ))}
        </div>

        {filteredResources.length === 0 && (
          <p className="text-center text-gray-500 mt-8">{t('resources.noResultsFound')}</p>
        )}
      </motion.div>
    </Layout>
  )
}

export default ResourcesPage

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
  }
`

export const Head: HeadFC = () => <SEO title="D.N. Resources" />
