import React from "react";
import {
  Flex, InputGroup, InputLeftElement, Input, Box
} from "@chakra-ui/react";
import Layout from "@/layout/Layout";

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

import { useRouter } from "next/router";
import { NextSeo } from "next-seo";
import { getCarrierById } from "@/services/carriers";
import { getStores } from "@/services/stores";

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
                <div>
                    Edit {carrier?.name}
                </div>
            </Layout>
        </>
    );
}

export async function getServerSideProps(context) {
    const session = await getServerSession(context.req, context.res, authOptions);
    const stores = await getStores(session?.user?.accessToken);

    if (session) {
        if(session?.user?.role !== 'admin') {
            return {
                redirect: {
                    destination: "/",
                    permanent: false,
                },
            };
        }
        const carrier = await getCarrierById('64b267fcd4f08', session?.user?.accessToken, context.query.id);
        return {
            props: {
                stores: stores?.data,
                carrier: carrier?.data,
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