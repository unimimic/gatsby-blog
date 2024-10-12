import * as React from "react"
import { motion, useScroll, useTransform, useInView } from "framer-motion"
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

const AnimatedSection: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
};

export default function TechWonderland() {
  return (
    <Layout pageTitle="Welcome to My Dynamic Tech Showcase">
      <section id="hero" className="min-h-screen flex items-center justify-center">
        <AnimatedSection>
          <div className="text-center">
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
          </div>
        </AnimatedSection>
      </section>

      <AnimatedSection>
        <section id="about" className="py-20">
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
        </section>
      </AnimatedSection>

      <AnimatedSection>
        <section id="tech-stack" className="py-20">
          <h2 className="text-4xl font-bold text-center mb-8">Our Tech Stack</h2>
          <div className="grid md:grid-cols-2 gap-6">
          <TechCard
              title="Gatsby"
              description="A React-based framework that enables static site generation and provides a rich plugin ecosystem for optimizing performance."
              icon={<span className="text-2xl">🌌</span>}
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
        </section>
      </AnimatedSection>
    </Layout>
  );
}
