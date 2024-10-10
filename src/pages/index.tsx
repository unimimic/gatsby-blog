import * as React from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Layout from "@/components/layout"

const TechCard: React.FC<{ title: string; description: string; icon: React.ReactNode }> = ({ title, description, icon }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className="h-full"
  >
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {icon}
          <span>{title}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p>{description}</p>
      </CardContent>
    </Card>
  </motion.div>
)


export default function TechWonderland() {
  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.4, 0.6, 0.8], [0, 1, 1, 1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.4, 0.6, 0.8], [0.8, 1, 1, 1, 0.8])

  return (
    <Layout pageTitle="Welcome to My Dynamic Tech Showcase">
        <section id="hero" className="min-h-screen flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <motion.h1
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-500 text-transparent bg-clip-text"
            >
              Tech Wonderland
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="text-xl md:text-2xl text-gray-600 mb-8"
            >
              Embark on a journey through modern web development
            </motion.p>
            <Button asChild size="lg">
              <a href="#about">Explore Now</a>
            </Button>
          </motion.div>
        </section>

        <motion.section
          id="about"
          className="py-20"
          style={{ opacity, scale }}
        >
          <h2 className="text-4xl font-bold text-center mb-8">About This Wonderland</h2>
          <Card>
            <CardHeader>
              <CardTitle>Discover the Magic</CardTitle>
              <CardDescription>Uncover the secrets behind this digital playground</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                Step into a world where cutting-edge web technologies come to life! This site is not just a demonstration—it's an adventure through the realms of modern web development.
              </p>
              <p>
                Whether you're a curious developer, a tech enthusiast, or just someone who appreciates beautiful and functional websites, you'll find something to marvel at here.
              </p>
            </CardContent>
          </Card>
        </motion.section>

        <motion.section
          id="tech-stack"
          className="py-20"
          style={{ opacity, scale }}
        >
          <h2 className="text-4xl font-bold text-center mb-8">Our Tech Stack</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <TechCard
              title="Next.js"
              description="A React framework that enables server-side rendering and generates static websites for React based web applications"
              icon={<span className="text-2xl">🚀</span>}
            />
            <TechCard
              title="shadcn/ui"
              description="A collection of beautifully designed, accessible components for modern web applications"
              icon={<span className="text-2xl">🎨</span>}
            />
            <TechCard
              title="TypeScript"
              description="A typed superset of JavaScript that compiles to plain JavaScript, adding optional types"
              icon={<span className="text-2xl">📘</span>}
            />
            <TechCard
              title="Framer Motion"
              description="A production-ready motion library for React that makes it easy to create stunning animations"
              icon={<span className="text-2xl">✨</span>}
            />
          </div>
        </motion.section>

        <motion.section
          id="showcase"
          className="py-20"
          style={{ opacity, scale }}
        >
          <h2 className="text-4xl font-bold text-center mb-8">Interactive Showcase</h2>
          <Card>
            <CardHeader>
              <CardTitle>Experience the Power</CardTitle>
              <CardDescription>See our tech stack in action</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <motion.div
                animate={{
                  scale: [1, 2, 2, 1, 1],
                  rotate: [0, 0, 270, 270, 0],
                  borderRadius: ["20%", "20%", "50%", "50%", "20%"],
                }}
                transition={{
                  duration: 2,
                  ease: "easeInOut",
                  times: [0, 0.2, 0.5, 0.8, 1],
                  repeat: Infinity,
                  repeatDelay: 1
                }}
                className="w-32 h-32 bg-blue-500"
              />
              <p className="text-center mt-4">This animation showcases the smooth capabilities of Framer Motion!</p>
            </CardContent>
          </Card>
        </motion.section>
    </Layout>
  )
}
