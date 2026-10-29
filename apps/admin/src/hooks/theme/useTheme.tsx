import { useEffect, useState } from 'react'
import { setToLS, getFromLS } from '../../utils/storage'
import _ from 'lodash'
import { themeKey } from '../../constants'

export const useTheme = (themes: any) => {
  const themesLS = getFromLS(themeKey)
  const [theme, setTheme] = useState(themesLS ? themesLS.data?.light : themes.data?.light)
  const [themeLoaded, setThemeLoaded] = useState(false)
  const finalTheme = themesLS ? themesLS : themes
  const setMode = (mode: any) => {
    setToLS('theme', mode)
    setTheme(mode)
  }

  const getFonts = () => {
    const allFonts = _.values(_.mapValues(finalTheme.data, 'font'))
    return allFonts
  }

  useEffect(() => {
    const localTheme = getFromLS('theme')
    localTheme ? setTheme(localTheme) : setTheme(finalTheme.data.light)
    setThemeLoaded(true)
  }, [])

  return { theme, themeLoaded, setMode, getFonts }
}
