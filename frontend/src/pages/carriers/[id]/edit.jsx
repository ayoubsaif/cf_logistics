import React from "react";
import {
    Flex, Heading, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Icon, Button
} from "@chakra-ui/react";
import Layout from "@/layout/Layout";
import CarrierEditForm from "@/components/carriers/CarrierEditForm";

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

import { useRouter } from "next/router";
import { NextSeo } from "next-seo";
import { getCarrierById } from "@/services/carriers";
import { getStores } from "@/services/stores";
import NextLink from "next/link";

import { ChevronRightIcon } from '@chakra-ui/icons'

export default function EditCarrier({ siteConfig, stores, carrier }) {

    siteConfig = {
        ...siteConfig,
        stores,
    }

    const router = useRouter();

    return (
        <>
            <NextSeo
                title={`Editar Transportista - ${carrier?.name}`}
                description={`Editar Transportista - ${carrier?.name}`}
                canonical={process.env.NEXT_PUBLIC_SITE_URL + router.pathname}
            />
            <Layout title="Edit Carrier" siteConfig={siteConfig}>
                <Flex gap={5} alignItems="flex-start" direction='column'>
                    <Breadcrumb separator={<ChevronRightIcon color='brand.300' fontSize='xl' mx='0' />}>
                        <BreadcrumbItem>
                            <BreadcrumbLink href='/' as={NextLink} >Inicio</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbItem>
                            <BreadcrumbLink href='/carriers' as={NextLink}>Transportistas</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbItem isCurrentPage>
                            <BreadcrumbLink>{carrier?.name}</BreadcrumbLink>
                        </BreadcrumbItem>
                    </Breadcrumb>
                    <CarrierEditForm
                        data={carrier}
                    />
                </Flex>
            </Layout>
        </>
    );
}

export async function getServerSideProps(context) {
    const session = await getServerSession(context.req, context.res, authOptions);
    if (session) {
        if (session.user.role !== 'admin') {
            return {
                redirect: {
                    destination: "/",
                    permanent: false,
                },
            };
        }
        const carrierId = context.query.id;
        const carrier = await getCarrierById(session.user.account.id, session.user.accessToken, carrierId);
        const stores = await getStores(session.user.accessToken, session.user.account.id);
        return {
            props: {
                stores,
                carrier,
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