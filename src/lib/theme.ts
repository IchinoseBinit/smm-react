// theme.ts
import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";

const config = defineConfig({
  // Color mode settings
  globalCss: {
    "html, body": {
      margin: 0,
      padding: 0,
    },
  },
  theme: {
    breakpoints: {
      sm: "320px",
      md: "768px",
      lg: "960px",
      xl: "1200px",
    },
    tokens: {
      colors: {
        // Gray scale (for borders, text, backgrounds)
        primary: {
          50: { value: "#f0f0f0" }, // very light gray (backgrounds)
          100: { value: "#d9d9d9" }, // light gray
          200: { value: "#bfbfbf" }, // soft border
          300: { value: "#a6a6a6" }, // muted text
          400: { value: "#8c8c8c" }, // secondary text
          500: { value: "#737373" }, // main gray (primary text)
          600: { value: "#595959" }, // dark text
          700: { value: "#404040" }, // darker text
          800: { value: "#262626" }, // dark background
          900: { value: "#0d0d0d" }, // very dark (almost black)
        },
        secondary: {
          50: { value: "#e6f4ea" }, // very light green (hover bg)
          100: { value: "#c0e4cb" }, // light green
          200: { value: "#99d4ab" }, // soft accent
          300: { value: "#73c48c" }, // accent border
          400: { value: "#4db46d" }, // secondary button hover
          500: { value: "#26a54d" }, // main green (buttons, highlights)
          600: { value: "#1e843e" }, // hover state
          700: { value: "#16632f" }, // active state
          800: { value: "#0f421f" }, // darker shade
          900: { value: "#072110" }, // deepest green
        },
        black: { value: "#000000" }, // pure black
        white: { value: "#FFFFFF" }, // pure white
        // success: { value: "#22c55e" }, // green-500
        // error: { value: "#ef4444" }, // red-500
        // warning: { value: "#f59e0b" }, // amber-500
        // info: { value: "#3b82f6" }, // blue-500
        // Shadow token (used in cards/forms)
        shadow: {
          sm: { value: "0px 1px 2px rgba(0, 0, 0, 0.05)" },
          md: { value: "0px 4px 6px rgba(0, 0, 0, 0.1)" },
        },
      },

      fonts: {
        heading: { value: "Inter, system-ui, sans-serif" },
        body: { value: "Inter, system-ui, sans-serif" },
      },

      fontSizes: {
        xs: { value: "0.75rem" },
        sm: { value: "0.875rem" },
        md: { value: "1rem" },
        lg: { value: "1.125rem" },
        xl: { value: "1.25rem" },
        "2xl": { value: "1.5rem" },
        "3xl": { value: "1.875rem" },
        "4xl": { value: "2.25rem" },
      },

      fontWeights: {
        normal: { value: "400" },
        medium: { value: "500" },
        bold: { value: "700" },
      },

      lineHeights: {
        normal: { value: "1.5" },
        short: { value: "1.25" },
        tall: { value: "1.75" },
      },

      spacing: {
        px: { value: "1px" },
        1: { value: "4px" },
        2: { value: "8px" },
        3: { value: "12px" },
        4: { value: "16px" },
        6: { value: "24px" },
        8: { value: "32px" },
        12: { value: "48px" },
      },

      sizes: {
        container: {
          sm: { value: "640px" },
          md: { value: "768px" },
          lg: { value: "1024px" },
          xl: { value: "1280px" },
        },
      },

      radii: {
        none: { value: "0" },
        sm: { value: "4px" },
        md: { value: "8px" },
        lg: { value: "12px" },
        xl: { value: "16px" },
        full: { value: "9999px" },
      },

      borderWidths: {
        thin: { value: "1px" },
        thick: { value: "2px" },
      },
    },
    semanticTokens: {
      colors: {
        // Page & form BG
        bg: {
          DEFAULT: {
            value: {
              _light: "{colors.white}",
              _dark: "{colors.black}",
            },
          },
        },
        // Text
        fg: {
          DEFAULT: {
            value: {
              _light: "{colors.primary.900}",
              _dark: "{colors.primary.50}",
            },
          },
          MUTED: {
            value: {
              _light: "{colors.primary.500}",
              _dark: "{colors.primary.400}",
            },
          },
          LINK: {
            value: {
              _light: "{colors.secondary.500}",
              _dark: "{colors.secondary.300}",
            },
          },
          INVERT: {
            value: { _light: "{colors.white}", _dark: "{colors.primary.900}" },
          },
        },
        // Borders
        border: {
          DEFAULT: {
            value: {
              _light: "{colors.primary.200}",
              _dark: "{colors.primary.700}",
            },
          },
          FOCUS: {
            value: {
              _light: "{colors.secondary.500}",
              _dark: "{colors.secondary.300}",
            },
          },
        },
        // Buttons
        button: {
          DEFAULT: {
            value: { _light: "{colors.black}", _dark: "{colors.white}" },
          },
          HOVER: {
            value: {
              _light: "{colors.secondary.600}",
              _dark: "{colors.secondary.400}",
            },
          },
          ACTIVE: {
            value: {
              _light: "{colors.secondary.700}",
              _dark: "{colors.secondary.300}",
            },
          },
        },
      },
    },
  },
});

export const system = createSystem(defaultConfig, config);
