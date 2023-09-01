import {
  Box,
  Container,
  Stack,
  Text,
} from "@chakra-ui/react";

export default function Footer({ siteConfig }) {
  return (
    <Box>
      <Container
        as={Stack}
        maxW={"6xl"}
        py={4}
        direction={{ base: "column", md: "row" }}
        spacing={4}
        justify={{ base: "center", md: "space-between" }}
        align={{ base: "center", md: "center" }}
      >
        <Text>
          © {new Date().getFullYear()} {siteConfig?.title}
        </Text>
      </Container>
    </Box>
  );
}
