
const baseStyle = ({ colorMode }) => ({
  
});

const variants = {
  primary: ({ colorMode }) => ({
    color: "white",
    bg: "brand.300",
    _hover: {
      bg: "brand.400",
    },
    _active: {
      bg: "brand.500",
      color: "white",
    },
  }),
  transparent: ({ colorMode }) => ({
    color: "gray.400",
    bg: "transparent",
    _hover: {
      color: "gray.600",
    },
    _active: {
      color: "brand.300",
    },
  }),
};

export const buttonTheme = {
  baseStyle,
  variants,
};
