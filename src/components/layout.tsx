import * as React from 'react'
import { Link, useTranslation } from 'gatsby-plugin-react-i18next'
import LanguageSelector from './LanguageSelector'

const Layout = ({ pageTitle, children }: { pageTitle: string, children: React.ReactNode }) => {
  const { t } = useTranslation()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 shadow">
        <div className="container mx-auto px-4 py-4">
          {/* Desktop and mobile header */}
          <div className="flex justify-between items-center">
            <h1 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
              {t('site.title')}
            </h1>
            
            {/* Desktop navigation */}
            <div className="hidden md:flex items-center space-x-6">
              <nav>
                <ul className="flex space-x-4">
                  <li><Link className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors" to="/" placeholder="" onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>{t('navigation.home')}</Link></li>
                  <li><Link className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors" to="/blog" placeholder="" onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>{t('navigation.blog')}</Link></li>
                  <li><Link className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors" to="/notes" placeholder="" onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>{t('navigation.notes')}</Link></li>
                  <li><Link className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors" to="/resources" placeholder="" onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>{t('navigation.resources')}</Link></li>
                </ul>
              </nav>
              <LanguageSelector />
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center space-x-3">
              <LanguageSelector />
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
                aria-label="Toggle mobile menu"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {isMobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile navigation */}
          {isMobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t border-gray-200 dark:border-gray-700">
              <nav className="pt-4">
                <ul className="space-y-3">
                  <li>
                    <Link 
                      className="block text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white py-2 px-3 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors" 
                      to="/" 
                      placeholder="" 
                      onPointerEnterCapture={undefined} 
                      onPointerLeaveCapture={undefined}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {t('navigation.home')}
                    </Link>
                  </li>
                  <li>
                    <Link 
                      className="block text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white py-2 px-3 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors" 
                      to="/blog" 
                      placeholder="" 
                      onPointerEnterCapture={undefined} 
                      onPointerLeaveCapture={undefined}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {t('navigation.blog')}
                    </Link>
                  </li>
                  <li>
                    <Link 
                      className="block text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white py-2 px-3 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors" 
                      to="/notes" 
                      placeholder="" 
                      onPointerEnterCapture={undefined} 
                      onPointerLeaveCapture={undefined}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {t('navigation.notes')}
                    </Link>
                  </li>
                  <li>
                    <Link 
                      className="block text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white py-2 px-3 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors" 
                      to="/resources" 
                      placeholder="" 
                      onPointerEnterCapture={undefined} 
                      onPointerLeaveCapture={undefined}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {t('navigation.resources')}
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
          )}
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