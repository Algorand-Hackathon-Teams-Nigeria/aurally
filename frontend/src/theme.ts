import { CSSVariablesResolver, DEFAULT_THEME, MantineColorsTuple, Modal, createTheme, mergeMantineTheme, Menu, Button } from '@mantine/core'
import general from './styles/general.module.css'

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
  fontFamily: 'Space Grotesk, system-ui',
  headings: { fontFamily: 'Space Grotesk, system-ui' },
  primaryColor: 'purple',
  colors: {
    purple,
  },
  components: {
    Modal: Modal.extend({
      defaultProps: {
        classNames: {
          header: general.modalheader,
          content: general.modalcontent,
          title: general.modaltitle,
        },
        centered: true,
      },
    }),
    Menu: Menu.extend({
      defaultProps: {
        classNames: {
          dropdown: general.menudropdown,
          item: general.menulabel,
        },
      },
    }),
    Button: Button.extend({
      classNames: {
        root: general.btn_root,
      },
    }),
  },
})

export const resolver: CSSVariablesResolver = () => ({
  variables: {},
  light: {},
  dark: {
    '--mantine-color-body': '#111111',
    '--mantine-color-text': '#fff',
  },
})

export const theme = mergeMantineTheme(DEFAULT_THEME, themeOverride)

export const toastTheme = {
  style: {
    border: '1px solid #444',
    color: '#fff',
    background: '#1e1e1e',
    borderRadius: '100px',
    fontFamily: 'system-ui',
    fontSize: '14px',
  },
  success: {
    iconTheme: {
      primary: 'var(--mantine-color-purple-6)',
      secondary: '#1e1e1e',
    },
  },
}
