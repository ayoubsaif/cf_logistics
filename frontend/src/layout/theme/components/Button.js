
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
};

export const buttonTheme = {
  baseStyle,
  variants,
};
