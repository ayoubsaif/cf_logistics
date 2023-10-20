import React from "react";
import {
  Flex, Icon, Button, useToast, Text
} from "@chakra-ui/react";
import Layout from "@/layout/Layout";

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

import { useRouter } from "next/router";
import { NextSeo } from "next-seo";

import { getUsers } from "@/services/users";
import { getStores } from "@/services/stores";
import UsersTable from "@/components/users/UsersTable";

import NextLink from "next/link";

import {
  RiAddLine as AddIcon
} from "react-icons/ri";

const UsersPage = ({ siteConfig, stores, users, role, error }) => {

  siteConfig = {
    ...siteConfig,
    stores,
  }
  const router = useRouter();

  if (error) {
    const toast = useToast();
    toast({
      title: "Error",
      description: "Ocurrió un error al cargar los usuarios",
      status: "error",
      duration: 5000,
      isClosable: true,
    });
  }

  return (
    <>
      <NextSeo
        title={`Usuarios`}
        description="Usuarios"
        canonical={process.env.NEXT_PUBLIC_SITE_URL + router.pathname}
      />
      <Layout title="Usuarios" siteConfig={siteConfig}>
        <Flex mb={5} flexDirection={['column', 'row']} justifyContent='space-between' gap={4}>
            <Text fontSize='2xl' fontWeight='bold'>Administración de Usuarios</Text>
          {role === 'admin' && (
            <Button colorScheme='brand' as={NextLink} href='/admin/users/create'>
              <Icon as={AddIcon} boxSize={5} mr={3} />
              Crear Usuario
            </Button>
          )}
        </Flex>
        <UsersTable users={users} />
      </Layout>
    </>
  );
};

export default UsersPage;

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);
  if (session) {
    try {
      const stores = await getStores(session.user.accessToken, session.user.account.id);
      const users = await getUsers(session.user.accessToken);
      return {
        props: {
          stores,
          users,
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
