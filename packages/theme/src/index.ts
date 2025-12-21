// Theme configuration
export const defaultTheme = {
  primaryColor: '#1890ff',
  secondaryColor: '#f5222d',
  borderRadius: '4px',
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial'
}

export const darkTheme = {
  primaryColor: '#177ddc',
  secondaryColor: '#d32029',
  borderRadius: '4px',
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial'
}

export function createTheme(config = {}) {
  return { ...defaultTheme, ...config }
}

export function applyTheme(theme: any) {
  const root = document.documentElement
  root.style.setProperty('--primary-color', theme.primaryColor)
  root.style.setProperty('--secondary-color', theme.secondaryColor)
  root.style.setProperty('--border-radius', theme.borderRadius)
  root.style.setProperty('--font-family', theme.fontFamily)
}

export const version = '1.0.0'
