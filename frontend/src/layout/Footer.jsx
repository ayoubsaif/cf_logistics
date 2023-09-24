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
      >
        <Text fontSize='xs' p="2" color="gray.300" >
          © {new Date().getFullYear()} {siteConfig?.title}
        </Text>
      </Container>
    </Box>
  );
}
