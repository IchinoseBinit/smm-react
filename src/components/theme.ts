import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";

const config = defineConfig({
  theme: {
    tokens: {
      colors: {
        brand: {
          50: { value: "#e6f2ff" },
          100: { value: "#cce5ff" },
          200: { value: "#99ccff" },
          300: { value: "#66b3ff" },
          400: { value: "#3399ff" },
          500: { value: "#007fff" },
          600: { value: "#0066cc" },
          700: { value: "#004c99" },
          800: { value: "#003366" },
          900: { value: "#001a33" },
        },
      },
      fonts: {
        heading: {
          value: "Inter, system-ui, sans-serif",
        },
        body: {
          value: "Inter, system-ui, sans-serif",
        },
      },
      fontWeights: {
        medium: {
          value: "500",
        },
        bold: {
          value: "700",
        },
      },
      radii: {
        sm: { value: "4px" },
        md: { value: "8px" },
        lg: { value: "12px" },
        xl: { value: "16px" },
      },
    },
    semanticTokens: {
      colors: {
        brand: {
          solid: {
            value: {
              _light: "{colors.brand.500}",
              _dark: "{colors.brand.300}",
            },
          },
          contrast: {
            value: {
              _light: "{colors.brand.100}",
              _dark: "{colors.brand.900}",
            },
          },
          fg: {
            value: {
              _light: "{colors.brand.700}",
              _dark: "{colors.brand.200}",
            },
          },
          muted: {
            value: {
              _light: "{colors.brand.100}",
              _dark: "{colors.brand.800}",
            },
          },
          subtle: {
            value: {
              _light: "{colors.brand.200}",
              _dark: "{colors.brand.700}",
            },
          },
          emphasized: {
            value: {
              _light: "{colors.brand.300}",
              _dark: "{colors.brand.600}",
            },
          },
          focusRing: {
            value: {
              _light: "{colors.brand.500}",
              _dark: "{colors.brand.400}",
            },
          },
        },

        bg: {
          DEFAULT: {
            value: { _light: "{colors.white}", _dark: "#141414" }, // Custom dark background
          },
          subtle: {
            value: { _light: "{colors.gray.50}", _dark: "#1a1a1a" }, // Custom dark subtle background
          },
          muted: {
            value: { _light: "{colors.gray.100}", _dark: "#262626" }, // Custom dark muted background
          },
        },
        fg: {
          DEFAULT: {
            value: { _light: "{colors.black}", _dark: "#e5e5e5" }, // Custom dark text color
          },
          muted: {
            value: { _light: "{colors.gray.600}", _dark: "#a3a3a3" }, // Custom dark muted text
          },
        },
        border: {
          DEFAULT: {
            value: { _light: "{colors.gray.200}", _dark: "#404040" }, // Custom dark border
          },
        },
        blue: {
          solid: {
            value: { _light: "{colors.blue.600}", _dark: "#0284c7" }, // Custom dark blue
          },
          muted: {
            value: { _light: "{colors.blue.100}", _dark: "#082f49" }, // Custom dark muted blue
          },
        },
      },
    },
  },
});

export const system = createSystem(defaultConfig, config);
