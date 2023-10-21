import React from "react";
import {
  Flex, Icon, Button, useToast, Text
} from "@chakra-ui/react";
import Layout from "@/layout/Layout";

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

import { useRouter } from "next/router";
import { NextSeo } from "next-seo";

import { getAccounts } from "@/services/accounts";
import { getStores } from "@/services/stores";
import AccountsTable from "@/components/accounts/AccountsTable";

import NextLink from "next/link";

import {
  RiAddLine as AddIcon
} from "react-icons/ri";

const AccountsPage = ({ siteConfig, stores, accounts, role, error, token }) => {
  siteConfig = {
    ...siteConfig,
    stores,
  }
  const router = useRouter();

  if (error) {
    const toast = useToast();
    toast({
      title: "Error",
      description: "Ocurrió un error al cargar las cuentas",
      status: "error",
      duration: 5000,
      isClosable: true,
    });
  }

  return (
    <>
      <NextSeo
        title={`Cuentas`}
        description="Cuentas"
        canonical={process.env.NEXT_PUBLIC_SITE_URL + router.pathname}
      />
      <Layout title="Cuentas" siteConfig={siteConfig}>
        <Flex mb={5} flexDirection={['column', 'row']} justifyContent='space-between' gap={4}>
            <Text fontSize='2xl' fontWeight='bold'>Administración de Cuentas</Text>
            {role === 'admin' && (
              <Button colorScheme='brand' as={NextLink} href='/accounts/create'>
                <Icon as={AddIcon} boxSize={5} mr={3} />
                  Crear Cuenta
              </Button>
            )}
        </Flex>
        <AccountsTable initialAccounts={accounts} token={token}/>
      </Layout>
    </>
  );
};

export default AccountsPage;

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);
  if (session) {
    try {
      const stores = await getStores(session.user.accessToken, session.user.account.id);
      const accounts = await getAccounts(session.user.accessToken);
      return {
        props: {
          stores,
          accounts,
          token: session.user.accessToken,
          role: session.user.role,
        },
      };
    } catch (error) {
      return {
        props: {
          stores: [],
          users: [],
          role: session.user.role,
        },
      };
    }
  } else {
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };
  }
}
