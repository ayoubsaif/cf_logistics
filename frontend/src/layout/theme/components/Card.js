import { cardAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(cardAnatomy.keys);

const variants = {
  outline: definePartsStyle(({ colorMode }) => ({
    container: {
      bg: "transparent",
      color: colorMode === "dark" ? "white" : "black",
      rounded: "md",
      border: "1px",
      borderColor: colorMode === "dark" ? "white" : "black",
      transition: "all 0.2s",
    },
  })),
};

export const cardTheme = defineMultiStyleConfig({ variants });
