"use client";
import {
  CSSVariablesResolver,
  DEFAULT_THEME,
  MantineColorsTuple,
  createTheme,
  mergeMantineTheme,
  Button,
} from "@mantine/core";
import themeClass from "./styles/theme.module.css";

const purple: MantineColorsTuple = [
  "#f8ebff",
  "#e9d4fc",
  "#cfa8f4",
  "#b477ec",
  "#9d4ee6",
  "#8f35e2",
  "#8827e1",
  "#751ac9",
  "#6815b4",
  "#5a0e9f",
];

const themeOverride = createTheme({
  fontFamily: "Space Grotesk, system-ui",
  headings: { fontFamily: "Space Grotesk, system-ui" },
  primaryColor: "purple",
  colors: {
    purple,
  },
  components: {
    Button: Button.extend({
      classNames: {
        root: themeClass.btn_root,
      },
    }),
  },
});

export const resolver: CSSVariablesResolver = () => ({
  variables: {},
  light: {},
  dark: {
    "--mantine-color-body": "#111111",
    "--mantine-color-text": "#fff",
  },
});

export const theme = mergeMantineTheme(DEFAULT_THEME, themeOverride);
