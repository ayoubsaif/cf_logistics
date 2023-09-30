import React from "react";
import {
  Flex, Icon, Breadcrumb, Button, BreadcrumbItem, BreadcrumbLink
} from "@chakra-ui/react";
import Layout from "@/layout/Layout";

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

import { useRouter } from "next/router";
import { NextSeo } from "next-seo";

import { getCarriers } from "@/services/carriers";
import { getStores } from "@/services/stores";
import CarriersList from "@/components/carriers/CarriersList";

import { ChevronRightIcon } from '@chakra-ui/icons'
import NextLink from "next/link";

import {
  RiAddLine as AddIcon
} from "react-icons/ri";

const CarriersPage = ({ siteConfig, stores, carriers, token, role }) => {
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
        <Flex mb={5} flexDirection={['column', 'row']} justifyContent='space-between' gap={4}>
          <Breadcrumb separator={<ChevronRightIcon color='brand.300' fontSize='xl' mx='0'/>}>
              <BreadcrumbItem>
                  <BreadcrumbLink as={NextLink} href='/'>Inicio</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbItem isCurrentPage>
                  <BreadcrumbLink>Transportistas</BreadcrumbLink>
              </BreadcrumbItem>
          </Breadcrumb>
          {role === 'admin' && (
            <Button colorScheme='brand' as={NextLink} href='/carriers/create'>
              <Icon as={AddIcon} boxSize={5} mr={3} />
              Crear Transportista
            </Button>
          )}
        </Flex>
        <CarriersList
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
        role: session?.user?.role,
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
