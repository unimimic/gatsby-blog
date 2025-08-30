import React from "react"
import { useTranslation, useI18next } from "gatsby-plugin-react-i18next"
import { navigate } from "gatsby"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Globe } from "lucide-react"

const LanguageSelector: React.FC = () => {
  const { i18n } = useTranslation()
  const { originalPath } = useI18next()

  const languages = [
    { code: 'zh', name: '中文', flag: '🇹🇼' },
    { code: 'en', name: 'English', flag: '🇺🇸' }
  ]

  const handleLanguageChange = (languageCode: string) => {
    if (languageCode === 'zh') {
      // 中文是預設語言，直接導向原始路徑
      navigate(originalPath)
    } else {
      // 其他語言需要添加語言前綴
      navigate(`/${languageCode}${originalPath}`)
    }
  }

  const currentLanguage = languages.find(lang => lang.code === i18n.language)

  return (
    <div className="flex items-center space-x-2">
      <Globe className="h-4 w-4 text-gray-500" />
      <Select value={i18n.language} onValueChange={handleLanguageChange}>
        <SelectTrigger className="w-32 h-8 text-sm">
          <SelectValue>
            <div className="flex items-center space-x-2">
              <span>{currentLanguage?.flag}</span>
              <span>{currentLanguage?.name}</span>
            </div>
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {languages.map((lang) => (
            <SelectItem key={lang.code} value={lang.code}>
              <div className="flex items-center space-x-2">
                <span>{lang.flag}</span>
                <span>{lang.name}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

export default LanguageSelector
