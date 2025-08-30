import * as React from 'react'
import { Link, useTranslation } from 'gatsby-plugin-react-i18next'
import LanguageSelector from './LanguageSelector'

const Layout = ({ pageTitle, children }: { pageTitle: string, children: React.ReactNode }) => {
  const { t } = useTranslation()

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 shadow">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{t('site.title')}</h1>
          <div className="flex items-center space-x-6">
            <nav>
              <ul className="flex space-x-4">
                <li><Link className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white" to="/" placeholder="" onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>{t('navigation.home')}</Link></li>
                <li><Link className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white" to="/blog" placeholder="" onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>{t('navigation.blog')}</Link></li>
                <li><Link className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white" to="/notes" placeholder="" onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>{t('navigation.notes')}</Link></li>
                <li><Link className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white" to="/resources" placeholder="" onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>{t('navigation.resources')}</Link></li>
              </ul>
            </nav>
            <LanguageSelector />
          </div>
        </div>
      </header>
      <main className="flex-grow container mx-auto px-4 py-8">
        {children}
      </main>
      <footer className="bg-gray-800 text-white py-8 mt-20">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 {t('site.title')}. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default Layout