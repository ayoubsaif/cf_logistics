import { extendTheme } from "@chakra-ui/react";
import { cardTheme } from "@/layout/theme/components/Card";
import { buttonTheme } from "@/layout/theme/components/Button";

const theme = extendTheme({
  fonts: {
    heading: "'MixcaseUnmixed', sans-serif",
    body: "'MixcaseUnmixed', sans-serif",
  },
  colors: {
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
  },
  components: {
    Button: buttonTheme,
    Card: cardTheme,
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
  },
});

export default theme;
