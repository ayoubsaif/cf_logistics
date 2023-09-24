import { useRouter } from "next/router";
import { NextSeo } from "next-seo";
import { signIn, getProviders } from "next-auth/react";

import {
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Stack,
  Image,
  FormErrorMessage,
  Center,
  Text,
  Divider,
  useToast,
  Button,
  Input,
  Box,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FcGoogle } from "react-icons/fc";
import { RiArrowLeftLine } from "react-icons/ri";

import { Link } from "@chakra-ui/next-js";
import NextLink from "next/link"; 

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import Footer from "@/layout/Footer";

export default function Login(props) {
  const router = useRouter();
  const { error } = router.query;
  const { siteConfig, signInProviders } = props;
  const toast = useToast();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email().required("Correo electrónico requerido"),
      password: Yup.string().required("Contraseña requerida"),
    }),
    onSubmit: async (values) => {
      const signInStatus = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
        callbackUrl: "/",
      });
      if (signInStatus?.error) {
        toast({
          title: "Error al iniciar sesión",
          description: `Error: ${signInStatus?.error}. Intenta de nuevo.`,
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      } else if (signInStatus?.ok) {
        router.push(signInStatus?.url);
      }
      formik.setSubmitting(false);
    },
  });

  const handleGoogleSignIn = async () => {
    await signIn("google", {
      callbackUrl: "/",
    });
    if (error) {
      toast({
        title: "Error al iniciar sesión con Google",
        description: `${error.response.message}`,
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <NextSeo
        title={`Iniciar Sesión - ${siteConfig?.title}`}
        description={siteConfig?.description}
        openGraph={{
          title: `Iniciar Sesión - ${siteConfig?.title}`,
          description: siteConfig?.description,
        }}
      />
      <Stack minH={"100vh"} direction={{ base: "column", md: "row" }} gap={0}>
        <Box display="flex" flexDirection="column" minH={"100vh"} flex={1}>
          <Flex p={8} 
              flex={0} align={"center"} justify={"start"}>
            <Button
              leftIcon={<RiArrowLeftLine />}
              variant='ghost'
              as={NextLink}
              href="/"
            >
              Volver al inicio
            </Button>
          </Flex>

          <Flex p={8} flex={1} align={"center"} justify={"center"}>
            <Stack spacing={4} w={"full"} maxW={"md"}>
              <Heading size="xl" color="brand.300" textAlign="center">
                Cras Forum Logistics
              </Heading>
              <Heading fontSize="2xl">Bienvenid@ de nuevo</Heading>
              {signInProviders?.google && (
                <Stack spacing={6}>
                  <Button
                    variant="outline"
                    leftIcon={<FcGoogle />}
                    onClick={handleGoogleSignIn}
                  >
                    <Center>
                      <Text>Inicia sesión con Google</Text>
                    </Center>
                  </Button>
                </Stack>
              )}

              <Divider />

              <form onSubmit={formik.handleSubmit}>
                <FormControl>
                  <FormLabel>Correo electrónico</FormLabel>
                  <Input
                    id="email"
                    name="email"
                    {...formik.getFieldProps("email")}
                  />
                  <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
                </FormControl>

                <FormControl>
                  <FormLabel>Contraseña</FormLabel>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    {...formik.getFieldProps("password")}
                  />
                  <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
                </FormControl>

                <Stack spacing={6}>
                  <Stack
                    direction={{ base: "column", sm: "row" }}
                    align={"start"}
                    justify={"space-between"}
                  ></Stack>
                  <Button
                    variant="primary"
                    isLoading={formik.isSubmitting}
                    type="submit"
                  >
                    Iniciar Sesión
                  </Button>
                  <Text align={"center"}>
                    ¿No tienes cuenta?{" "}
                    <Link color={"brand.400"} href={"/auth/register"}>
                      ¡Registrate ahora!
                    </Link>
                  </Text>
                </Stack>
              </form>
            </Stack>
          </Flex>
          <Footer flex={1} siteConfig={siteConfig} />
        </Box>
        <Flex flex={1} display={{ base: "none", md: "flex" }}>
          <Image
            alt={"Login Image"}
            objectFit={"cover"}
            src={
              "/img/login.webp"
            }
          />
        </Flex>
      </Stack>
    </>
  );
}

export async function getServerSideProps({ req, res }) {
  const session = await getServerSession(req, res, authOptions);
  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  const signInProviders = await getProviders();
  return {
    props: {
      signInProviders,
    },
  };
}
