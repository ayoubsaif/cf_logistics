import React, { useState } from "react";
import { useForm } from "react-hook-form"
import { useRouter } from "next/router";

import {
    Flex,
    InputGroup,
    InputRightElement,
    Input,
    Text,
    Button,
    Stack,
    Switch,
    Divider,
    Icon,
    Box,
    useToast,
    FormControl,
    Heading
} from "@chakra-ui/react";

import {
    RiAddLine as AddIcon
} from "react-icons/ri";

import { createAccount } from "@/services/accounts";
import { useSession } from "next-auth/react";

export default function AccountCreateForm() {
    const { data: session } = useSession();
    const user = session?.user;
    const { register, handleSubmit, formState: { errors } } = useForm();
    const toast = useToast();
    const router = useRouter();

    const onSubmit = async (data) => {
        const create = await createAccount(data, user?.accessToken);
        if (create) {
            toast({
                title: "Cuenta creado",
                status: "success",
                duration: 3000,
                isClosable: true,
            });
            setTimeout(() => {
                router.push('/accounts');
            }, 500);
        } else {
            toast({
                title: "Algo ha ido mal",
                description: `No se ha podido crear la cuenta. Por favor, inténtalo de nuevo más tarde.`,
                status: "error",
                duration: 4000,
                isClosable: true,
            });
        }
    }

    return (
        <Box bgColor="bg.surface" p={5}
            borderWidth={1} borderRadius="md"
            boxShadow="sm"
            w='full'
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <Stack spacing={5}>
                    <Flex w='full' justifyContent='space-between'>
                        <Heading as="h2" fontSize='2xl' fontWeight='bold' mb="2">Crear Cuenta</Heading>
                    </Flex>
                    <Flex>
                        <FormControl>
                            <Text fontSize='md'>Activar/Desactivar</Text>
                            <Switch
                                mt={3}
                                colorScheme="brand"
                                {...register('status')}
                            />
                        </FormControl>
                    </Flex>
                    <Flex gap={5} flexDirection={["column", "row"]}>
                        <FormControl>
                            <Text fontSize='md'>Nombre</Text>
                            <InputGroup colorScheme="brand">
                                <Input type='text' placeholder='Nombre de la cuenta' focusBorderColor='brand.400' {...register('name', { required: true })} />
                            </InputGroup>
                            {errors.name && <Text color="red.300" fontsize="xs" mt={1}>El nombre de la cuenta es obligatorio</Text>}
                        </FormControl>
                        <FormControl>
                            <Text fontSize='md'>VAT</Text>
                            <InputGroup colorScheme="brand">
                                <Input type='text' placeholder='VAT de la cuenta' focusBorderColor='brand.400' {...register('companyVat', { required: true })} />
                            </InputGroup>
                            {errors.companyVat && <Text color="red.300" fontsize="xs" mt={1}>El VAT de la cuenta es obligatorio</Text>}
                        </FormControl>
                    </Flex>
                    <Divider />
                    <Flex gap={5} flexDirection={["column", "row"]}>
                        <FormControl>
                            <Text fontSize='md'>Nombre de la Compañía</Text>
                            <InputGroup colorScheme="brand">
                                <Input type='text' placeholder='Nombre de la Compañía' focusBorderColor='brand.400' {...register('companyName', { required: true })} />
                            </InputGroup>
                            {errors.companyName && <Text color="red.300" fontsize="xs" mt={1}>El nombre de la compañia es obligatorio</Text>}
                        </FormControl>
                        <FormControl>
                            <Text fontSize='md'>Nombre legal de la Compañía</Text>
                            <InputGroup colorScheme="brand">
                                <Input type='text' placeholder='Nombre legal de la Compañía' focusBorderColor='brand.400' {...register('companyLegalName', { required: true })} />
                            </InputGroup>
                            {errors.companyLegalName && <Text color="red.300" fontsize="xs" mt={1}>El nombre legal de la compañia es obligatorio</Text>}
                        </FormControl>
                    </Flex>
                    <Button mt={10} colorScheme='brand' type='submit' >
                        <Icon as={AddIcon} boxSize={5} mr={3} />
                        Crear
                    </Button>
                </Stack>
            </form>
        </Box >
    )
}