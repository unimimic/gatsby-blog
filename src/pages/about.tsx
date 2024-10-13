import * as React from 'react'
import Layout from '../components/layout'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Github, Linkedin } from "lucide-react"
import { Button } from '@/components/ui/button'
import { Badge } from "@/components/ui/badge"
import { SEO } from '@/components/seo'
import { HeadFC } from 'gatsby'

// const MyProjects = [
//   {
//     project: "缺陷檢測軟體",
//     description: "一個用於檢測產品缺陷的 Python 應用程序，增強質量控制流程。",
//     skills: ["Python", "Tensorflow", "OpenCV"],
//   },
//   {
//     project: "缺陷檢測網頁服務",
//     description: "一個用於顯示缺陷檢測結果的使用者友好網頁介面，旨在改善使用者體驗。",
//     skills: ["Python", "React"],
//   },
//   {
//     project: "輔助設計軟體",
//     description: "一個利用 React 和 Electron 開發的桌面應用程序，輔助圖紋設計。",
//     skills: ["React", "Electron"],
//   }
// ];

// const SideProject = [
//   {
//     project: "標註工具",
//     description: "一個用於標註圖像以訓練機器學習模型的工具，旨在簡化數據準備過程。",
//     skills: ["React", "Electron"],
//   }
// ];

// const aboutMe = "大家好，我是一名專注於瑕疵檢測應用的工程師。自2020年踏入這一領域以來，我成功開發了多個項目，包括基於Python的缺陷檢測系統和用戶友好的網頁介面。我也利用React和Electron開發了桌面應用程序，提升了數據互動的使用體驗。我期待在軟體的領域繼續成長與探索。"

// const Journey =[
//   { "year": "2020", "title": "踏入瑕疵檢測的領域", "description": "開始探索瑕疵檢測這一專業領域，深入了解相關技術與應用。" },
//   { "year": "2021", "title": "開發第一個Python瑕疵檢測應用程式", "description": "成功開發了我的第一個瑕疵檢測應用程式，這使我在實踐中增強了對Python的理解和運用。" },
//   { "year": "2022", "title": "開發第一個網頁服務", "description": "設計並開發了第一個網頁介面，使用戶能夠方便地瀏覽瑕疵檢測結果，提升了用戶體驗。" },
//   { "year": "2023", "title": "開發第一個Electron應用程式", "description": "利用React與Electron框架開發了我的首個桌面應用程式，進一步擴展了我的開發技能。" },
// ]


const MyProjects = [
  {
    project: "Defect Detection Software",
    description: "A Python application for detecting product defects, enhancing quality control processes.",
    skills: ["Python", "Tensorflow", "OpenCV"],
  },
  {
    project: "Defect Detection Web Service",
    description: "A user-friendly web interface for displaying defect detection results, aimed at improving user experience.",
    skills: ["Python", "React"],
  },
  {
    project: "Design Assistance Software",
    description: "A desktop application developed with React and Electron to assist in pattern design.",
    skills: ["React", "Electron"],
  }
];

const SideProject = [
  {
    project: "Annotation Tool",
    description: "A tool for annotating images to train machine learning models, designed to streamline the data preparation process.",
    skills: ["React", "Electron"],
  }
];

const aboutMe = "Hello, I am an engineer specializing in defect detection applications. I look forward to growing and exploring further in the software field.";

const Journey = [
  { "year": "2020", "title": "Entering the Field of Defect Detection", "description": "Began exploring the specialized field of defect detection, gaining a deeper understanding of related technologies and applications." },
  { "year": "2021", "title": "Developed My First Python Defect Detection Application", "description": "Successfully developed my first defect detection application, which enhanced my understanding and application of Python in practice." },
  { "year": "2022", "title": "Developed My First Web Service", "description": "Designed and developed my first web interface, allowing users to conveniently browse defect detection results and improving user experience." },
  { "year": "2023", "title": "Developed My First Electron Application", "description": "Developed my first desktop application using React and Electron frameworks, further expanding my development skills." },
];


// { "year": "2024", "title": "開發第一個Qt C++瑕疵檢測應用程式", "description": "我著手於Qt C++，成功開發了第一個瑕疵檢測應用程式，進一步提升了我的技術能力。" }


const AboutPage = () => {
  return (
    <Layout pageTitle='About Me'>
        <Card className="w-full mb-8">
          <CardContent className="flex flex-col md:flex-row items-center p-6 gap-8">
            <img
              src={"../avatar.png"}
              alt="Profile Picture"
              className="rounded-full max-w-[250px] max-h-[250px]"
            />
            <div className="text-center md:text-left">
              <h2 className="text-3xl font-bold mb-2">Wei</h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-4">Developer</p>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {aboutMe}
              </p>
              <div className="flex justify-center md:justify-start space-x-4">
                <Button variant="outline" size="icon">
                  <Github className="h-4 w-4" />
                  <span className="sr-only">GitHub</span>
                </Button>
                <Button variant="outline" size="icon">
                  <Linkedin className="h-4 w-4" />
                  <span className="sr-only">LinkedIn</span>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>My Projects</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {MyProjects.map((item) => (
                <div key={item.project}>
                  <h3 className="text-lg font-semibold">{item.project}</h3>
                  <p className="text-gray-600">{item.description}</p>
                  <div className="mt-2">
                    {item.skills.map((skill) => (<Badge key={skill} className='ml-1'>{skill}</Badge>))}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Side Projects</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {SideProject.map((item) => (
                <div key={item.project}>
                  <h3 className="text-lg font-semibold">{item.project}</h3>
                  <p className="text-gray-600">{item.description}</p>
                  <div className="mt-2">
                    {item.skills.map((skill) => (<Badge key={skill} className='ml-1'>{skill}</Badge>))}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>My Journey</CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="relative border-l border-gray-200 dark:border-gray-700">
              {Journey.map((item) => (
                <li key={item.year} className="mb-10 ml-4">
                  <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
                  <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">{item.year}</time>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{item.title}</h3>
                  <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">{item.description}</p>
                </li>
              ))}
            </ol>
          </CardContent>
        </Card>
    </Layout>
  )
}

export default AboutPage

export const Head: HeadFC = () => <SEO title="About" />
