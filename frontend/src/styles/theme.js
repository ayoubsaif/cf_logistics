import { extendTheme } from "@chakra-ui/react";
import { cardTheme } from "@/layout/theme/components/Card";
import { buttonTheme } from "@/layout/theme/components/Button";
import { StyleFunctionProps } from '@chakra-ui/theme-tools';

import semanticTokens  from "./tokens";

// 2. Add your color mode config
const config = {
  initialColorMode: 'light',
  useSystemColorMode: true,
}

const theme = extendTheme({
  semanticTokens: {
    ...semanticTokens,
  },
  config,
  styles: {
    global: ({ colorMode }) => ({
      body: {
        bg: colorMode === "dark" ? "gray.900" : "gray.50",
      },
    }),
  },
  fonts: {
    heading: "MixcaseUnmixed, sans-serif",
    body: "HelveticaNow, sans-serif",
  },
  colors: {
    blackButton: {
      bg: 'black',
      text: 'white',
    },
    brand: {
      50: "#ffe9e0",
      100: "#ffc3b3",
      200: "#fb9d84",
      300: "#f77654",
      400: "#f45025",
      500: "#da370b",
      600: "#ab2908",
      700: "#7a1c04",
      800: "#4c0f00",
      900: "#1f0200",
    },
    gray: {
      50: "#F5F5F5",
      100: "#E0E0E0",
      200: "#A3A3A3",
      300: "#B8B8B8",
      400: "#7A7A7A",
      500: "#666666",
      600: "#525252",
      700: "#3D3D3D",
      800: "#292929",
      900: "#141414",
    }
  },
  components: {
    Button: buttonTheme,
    Card: cardTheme,
    Menu: {
      baseStyle: {
        bg: "gray.700",
        rounded: "md",
      },
    },
    Input: {
      baseStyle: {
        rounded: "md",
        border: "1px",
        borderColor: "gray.300",
        _hover: {
          borderColor: "black",
          boxShadow: "0 0 0 1px brand.300",
        },
        _focusWithin: {
          border: "1px",
          borderColor: "brand.300",
          outline: "2px solid",
          outlineColor: "brand.100",
          outlineOffset: "0px",
        },
      },
    },
    Select: {
      baseStyle: {
        rounded: "md",
        border: "1px",
        borderColor: "gray.300",
        _hover: {
          borderColor: "black",
          boxShadow: "0 0 0 1px brand.300",
        },
        _focusWithin: {
          outline: "2px solid",
          outlineColor: "brand.100",
          outlineOffset: "0px",
        },
      },
    },
    Tab: {
      _focusVisible: {
        outline: "0",
        outlineOffset: "0",
      },
    }
  },
});

export default theme;
