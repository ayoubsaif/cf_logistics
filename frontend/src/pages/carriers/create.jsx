import React from "react";
import {
  Flex, Heading, Breadcrumb, BreadcrumbItem, BreadcrumbLink
} from "@chakra-ui/react";
import Layout from "@/layout/Layout";
import CarrierCreateForm from "@/components/carriers/CarrierCreateForm";

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

import { useRouter } from "next/router";
import { NextSeo } from "next-seo";
import { getStores } from "@/services/stores";
import NextLink from "next/link";

import { ChevronRightIcon } from '@chakra-ui/icons'

export default function CreateCarrier({ siteConfig, stores, token }) {

    siteConfig = {
        ...siteConfig,
        stores,
    }

    const router = useRouter();

    return (
        <>
            <NextSeo
                title='Crear Transportista'
                description='Crear Transportista'
                canonical={process.env.NEXT_PUBLIC_SITE_URL + router.pathname}
            />
            <Layout title="Create Carrier" siteConfig={siteConfig}>
                <Flex gap={5} alignItems="flex-start" direction='column'>
                    <Breadcrumb separator={<ChevronRightIcon color='brand.300' fontSize='xl' mx='0'/>}>
                        <BreadcrumbItem>
                            <BreadcrumbLink href='/' as={NextLink} >Inicio</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbItem>
                            <BreadcrumbLink href='/carriers' as={NextLink}>Transportistas</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbItem isCurrentPage>
                            <BreadcrumbLink>Nuevo</BreadcrumbLink>
                        </BreadcrumbItem>
                    </Breadcrumb>
                    <CarrierCreateForm/>
                </Flex>
            </Layout>
        </>
    );
}

export async function getServerSideProps(context) {
    const session = await getServerSession(context.req, context.res, authOptions);

    if (session) {
        if(session.user.role !== 'admin') {
            return {
                redirect: {
                    destination: "/",
                    permanent: false,
                },
            };
        }
        const stores = await getStores(session.user.accountId, session.user.accessToken);
        return {
            props: {
                stores: stores,
                token: session.user.accessToken,
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