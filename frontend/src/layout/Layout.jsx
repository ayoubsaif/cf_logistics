import React from "react";
import { Container, Grid, GridItem } from "@chakra-ui/react";

import NavBar from "./NavBar";
import Footer from "./Footer";

export default function Layout(props) {
  const { children, siteConfig, page } = props;
  return (
    <Grid
      templateAreas={`
        "header" 
        "main"
        "footer"`}
      gap='1'
      minHeight="100vh"
      templateRows="auto 1fr auto"
    >
      <GridItem area={"header"}>
        <NavBar siteConfig={siteConfig} page={page} />
      </GridItem>

      <GridItem area={"main"} pt={page != undefined ? [90, 110] : [50,20]}>
        <Container maxW="container.lg" py={6} w="full">
          {children}
        </Container>
      </GridItem>

      <GridItem area={"footer"}>
        <Footer siteConfig={siteConfig} />
      </GridItem>
    </Grid>
  );
}
