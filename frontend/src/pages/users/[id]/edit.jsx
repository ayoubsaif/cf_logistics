import React from "react";
import {
    Flex, Breadcrumb, BreadcrumbItem, BreadcrumbLink
} from "@chakra-ui/react";
import Layout from "@/layout/Layout";
import UserEditForm from "@/components/users/UserEditForm";

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

import { useRouter } from "next/router";
import { NextSeo } from "next-seo";
import { getUserById } from "@/services/users";
import { getStores } from "@/services/stores";
import { getUserAccounts, getAccounts } from "@/services/accounts";
import NextLink from "next/link";
import { ChevronRightIcon } from '@chakra-ui/icons'

export default function EditUser({ siteConfig, stores, user, accounts, userAccounts }) {

    siteConfig = {
        ...siteConfig,
        stores,
    }

    const router = useRouter();

    return (
        <>
            <NextSeo
                title={`Editar Usuario - ${user?.name}`}
                description={`Editar Usuario - ${user?.name}`}
                canonical={process.env.NEXT_PUBLIC_SITE_URL + router.pathname}
            />
            <Layout title="Edit User" siteConfig={siteConfig}>
                <Flex gap={5} alignItems="flex-start" direction='column'>
                    <Breadcrumb separator={<ChevronRightIcon color='brand.300' fontSize='xl' mx='0' />}>
                        <BreadcrumbItem>
                            <BreadcrumbLink href='/' as={NextLink}>Inicio</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbItem>
                            <BreadcrumbLink href='/users' as={NextLink}>Usuarios</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbItem isCurrentPage>
                            <BreadcrumbLink>{user?.name}</BreadcrumbLink>
                        </BreadcrumbItem>
                    </Breadcrumb>
                    <UserEditForm
                        data={user} userAccounts={userAccounts} accounts={accounts}
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
        const userId = context.query.id;
        const user = await getUserById(userId, session.user.accessToken);
        const stores = await getStores(session.user.accessToken, session.user.account.id);
        const userAccounts = await getUserAccounts(session.user.accessToken);
        const accounts = await getAccounts(session.user.accessToken);
        return {
            props: {
                stores,
                user,
                accounts,
                userAccounts
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