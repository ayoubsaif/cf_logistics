import React from "react";
import {
    Flex, Breadcrumb, BreadcrumbItem, BreadcrumbLink
} from "@chakra-ui/react";
import Layout from "@/layout/Layout";
import AccountEditForm from "@/components/accounts/AccountEditForm";

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

import { useRouter } from "next/router";
import { NextSeo } from "next-seo";
import { getStores } from "@/services/stores";
import { getAccountById } from "@/services/accounts";
import NextLink from "next/link";
import { ChevronRightIcon } from '@chakra-ui/icons'

export default function EditUser({ siteConfig, stores, account }) {

    siteConfig = {
        ...siteConfig,
        stores,
    }

    const router = useRouter();

    return (
        <>
            <NextSeo
                title={`Editar Cuenta - ${account?.companyName}`}
                description={`Editar Cuenta - ${account?.companyName}`}
                canonical={process.env.NEXT_PUBLIC_SITE_URL + router.pathname}
            />
            <Layout title="Edit Account" siteConfig={siteConfig}>
                <Flex gap={5} alignItems="flex-start" direction='column'>
                    <Breadcrumb separator={<ChevronRightIcon color='brand.300' fontSize='xl' mx='0' />}>
                        <BreadcrumbItem>
                            <BreadcrumbLink href='/' as={NextLink}>Inicio</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbItem>
                            <BreadcrumbLink href='/accounts' as={NextLink}>Cuentas</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbItem isCurrentPage>
                            <BreadcrumbLink>{account?.companyName}</BreadcrumbLink>
                        </BreadcrumbItem>
                    </Breadcrumb>
                    <AccountEditForm data={account}/>
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
        const accountId = context.query.id;
        const account = await getAccountById(accountId, session.user.accessToken);
        const stores = await getStores(session.user.accessToken, session.user.account.id);
        return {
            props: {
                stores,
                account,
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