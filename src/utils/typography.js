import Typography from "typography"
import doelgerTheme from 'typography-theme-doelger'

doelgerTheme.overrideThemeStyles = () => {
  return {
    "a": {
      textShadow: 'none',
      backgroundImage: 'none'
    },
    "a:hover": {
      textDecoration: 'none'
    },
    "h1, h2, h3, h4, h5, h6": {
      color: '#f44336'
    },
    "li > p": {
      fontWeight: 'bold'
    }
  }
}

// delete doelgerTheme.googleFonts

const typography = new Typography(doelgerTheme)

// Hot reload typography in development.
if (process.env.NODE_ENV !== `production`) {
  typography.injectStyles()
}

export default typography
export const rhythm = typography.rhythm
export const scale = typography.scale
