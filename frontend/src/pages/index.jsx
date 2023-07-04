import * as React from "react";
import {
  Stack,
  Text,
  useColorModeValue,
  Image,
  Skeleton,
  Box,
  Icon,
  Button,
  Heading,
} from "@chakra-ui/react";
import { RiLoginBoxLine } from "react-icons/ri";
import { NextSeo } from "next-seo";

import { signIn } from "next-auth/react";
import Dashboard from "@/components/home/dashboard";
import Layout from "@/layout/Layout";

import { useSession } from "next-auth/react";

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export default function HomePage(props) {
  const { data: session } = useSession();
  const { user } = session || {};
  return (
    <>
      <NextSeo
        title={process.env.NEXT_PUBLIC_SITE_NAME || ""}
        description={process.env.NEXT_PUBLIC_SITE_DESCRIPTION || ""}
        canonical={process.env.NEXT_PUBLIC_SITE_URL || ""}
        openGraph={{
          url: process.env.NEXT_PUBLIC_SITE_URL || "",
          title: process.env.NEXT_PUBLIC_SITE_NAME || "",
          description: process.env.NEXT_PUBLIC_SITE_DESCRIPTION || "",
          images: [
            {
              url: process.env.NEXT_PUBLIC_SITE_URL + "/img/hero.webp",
              width: 800,
              height: 600,
              alt: process.env.NEXT_PUBLIC_SITE_NAME || "",
            },
          ],
          site_name: process.env.NEXT_PUBLIC_SITE_NAME || "",
        }}
      />
      <Layout {...props}>
        {user && user?.firstname ? (
          <Box py={10}>
            <Heading>Hola {user?.firstname},</Heading>
            <Dashboard />
          </Box>
        ) : (
          <Stack
            direction={{ base: "column", md: "row" }}
            justifyContent="center"
            gap={10}
            mt={10}
          >
            <Stack direction="column" spacing={6} justifyContent="center">
              <Heading
                as="h1"
                fontSize="5xl"
                lineHeight={1}
                fontWeight="bold"
                fontFamily="heading"
                textAlign="left"
              >
                <Text color="brand.300">Envía Paquetes</Text>
                <Text color="gray.600">Fácil y Rápido con</Text>
                <Text>Cras Forum </Text>
                <Text color="brand.300">Logistics</Text>
              </Heading>
              <Text
                fontSize="1.2rem"
                textAlign="left"
                lineHeight="1.375"
                fontWeight="400"
                color="gray.500"
              >
                Enviar paquetes con CF Logistics es simple y rápido. Intergra
                tus pedidos con CF Logistics y gestiona tus envios de tus
                Marketplace favoritos y eCommerces.
              </Text>
              <Stack direction="row" spacing={4}>
                <Button onClick={() => signIn()} size="lg" variant="primary">
                  <Text>Iniciar Sesión</Text>
                  <Icon as={RiLoginBoxLine} h={4} w={4} ml={1} />
                </Button>
              </Stack>
            </Stack>
            <Box pos="relative" m="0 auto">
              <DottedBox />
              <Image
                h={{ base: 350, md: 500 }}
                minW={{ base: "auto", md: 300 }}
                m="0 auto"
                objectFit="cover"
                objectPosition="top"
                src={`/img/hero.webp`}
                rounded="md"
                alt="hero image"
                aspectRatio={9 / 16}
                fallback={<Skeleton />}
              />
            </Box>
          </Stack>
        )}
      </Layout>
    </>
  );
};

function DottedBox() {
  return (
    <Box
      position="absolute"
      left="-45px"
      top="-30px"
      height="full"
      maxW="700px"
      zIndex={-1}
    >
      <svg
        color={useColorModeValue("rgba(55,65,81, 0.1)", "rgba(55,65,81, 0.7)")}
        width="350"
        height="420"
        fill="none"
      >
        <defs>
          <pattern
            id="5d0dd344-b041-4d26-bec4-8d33ea57ec9b"
            x="0"
            y="0"
            width="20"
            height="20"
            patternUnits="userSpaceOnUse"
          >
            <rect x="0" y="0" width="4" height="4" fill="currentColor"></rect>
          </pattern>
        </defs>
        <rect
          width="404"
          height="404"
          fill="url(#5d0dd344-b041-4d26-bec4-8d33ea57ec9b)"
        ></rect>
      </svg>
    </Box>
  );
}
