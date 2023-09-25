import React, { useEffect, useRef } from "react";
import {
  Flex, InputGroup, InputLeftElement, Input, Box
} from "@chakra-ui/react";
import Layout from "@/layout/Layout";

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

import { useRouter } from "next/router";
import { NextSeo } from "next-seo";

import { SearchIcon } from "@chakra-ui/icons";
import { getCarriers } from "@/services/carriers";
import { getStores } from "@/services/stores";
import CarriersListContainer from "@/components/carriers/CarriersListContainer";

const CarriersPage = ({ siteConfig, stores, carriers, token }) => {
  siteConfig = {
    ...siteConfig,
    stores,
  }
  const router = useRouter();

  return (
    <>
      <NextSeo
        title={`Todos los Transportistas`}
        description="Todos los Transportistas"
        canonical={process.env.NEXT_PUBLIC_SITE_URL + router.pathname}
      />
      <Layout title="Carriers" siteConfig={siteConfig}>
        <Flex gap={2} alignItems="center" mb={5} flexDirection={['column', 'row']}>
          <Box>
            <InputGroup colorScheme="brand">
              <InputLeftElement pointerEvents='none'>
                <SearchIcon color='gray.300' />
              </InputLeftElement>
              <Input type='text' placeholder='Buscar transportista' focusBorderColor='brand.400' />
            </InputGroup>
          </Box>
        </Flex>
        <CarriersListContainer
          data={carriers}
          token={token}
        />
      </Layout>
    </>
  );
};

export default CarriersPage;

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);
  const stores = await getStores(session?.user?.accessToken);
  const carriers = await getCarriers('64b267fcd4f08', session?.user?.accessToken);
  if (session) {
    return {
      props: {
        stores: stores?.data,
        carriers: carriers?.data,
        token: session?.user?.accessToken,
      },
    };
  } else {
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };
  }
}
