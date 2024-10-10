import * as React from 'react'
import Layout from '../components/layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Github, Linkedin, Mail, Twitter } from "lucide-react"
import { Button } from '@/components/ui/button'
import { Progress } from "@/components/ui/progress"


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
              Hi there! I'm a full-stack engineer with a focus on defect detection applications. 
              When I'm not coding or optimizing detection algorithms, you can find me enjoying a fresh cup of coffee, exploring the latest trends in tech, or sharing insights on how AI is transforming industries.
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
              <CardTitle>My Skills</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { skill: "JavaScript", level: 90 },
                { skill: "React", level: 85 },
                { skill: "Node.js", level: 80 },
                { skill: "CSS", level: 75 },
                { skill: "Python", level: 70 },
              ].map((item) => (
                <div key={item.skill}>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{item.skill}</span>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{item.level}%</span>
                  </div>
                  <Progress value={item.level} className="h-2" />
                </div>
              ))}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>My Interests</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300">
                <li>Web Development</li>
                <li>Artificial Intelligence</li>
                <li>Open Source Projects</li>
                <li>Blogging</li>
                <li>Photography</li>
              </ul>
            </CardContent>
          </Card>
        </div>
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>My Journey</CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="relative border-l border-gray-200 dark:border-gray-700">
              {[
                { year: "2018", title: "Started Learning Web Development", description: "Began my journey into the world of web development, learning HTML, CSS, and JavaScript." },
                { year: "2020", title: "Landed First Developer Job", description: "Secured my first position as a junior web developer at a local tech startup." },
                { year: "2023", title: "Started My Blog", description: "Launched this blog to share my experiences and knowledge with the developer community." },
              ].map((item) => (
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