import * as React from 'react'
import { Link } from 'gatsby'

const Layout = ({ pageTitle, children }: { pageTitle: string, children: React.ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 shadow">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">D.N.</h1>
          <nav>
            <ul className="flex space-x-4">
              <li><Link className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white" to="/">Home</Link></li>
              <li><Link className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white" to="/about">About</Link></li>
              <li><Link className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white" to="/blog">Blog</Link></li>
              <li><Link className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white" to="/notes">Notes</Link></li>
              <li><Link className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white" to="/resources">Resources</Link></li>
            </ul>
          </nav>
        </div>
      </header>
      <main className="flex-grow container mx-auto px-4 py-8">
        {children}
      </main>
      <footer className="bg-gray-800 text-white py-8 mt-20">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 D.N. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default Layout