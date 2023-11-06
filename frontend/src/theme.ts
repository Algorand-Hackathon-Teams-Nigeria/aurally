import { CSSVariablesResolver, DEFAULT_THEME, MantineColorsTuple, createTheme, mergeMantineTheme } from '@mantine/core'

const purple: MantineColorsTuple = [
  '#f8ebff',
  '#e9d4fc',
  '#cfa8f4',
  '#b477ec',
  '#9d4ee6',
  '#8f35e2',
  '#8827e1',
  '#751ac9',
  '#6815b4',
  '#5a0e9f',
]

const themeOverride = createTheme({
  primaryColor: 'purple',
  colors: {
    purple,
  },
})

export const resolver: CSSVariablesResolver = () => ({
  variables: {},
  light: {},
  dark: {
    '--mantine-color-body': '#111111',
  },
})

export const theme = mergeMantineTheme(DEFAULT_THEME, themeOverride)
