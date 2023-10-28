import React, { useState } from "react";
import { useForm } from "react-hook-form"
import { useRouter } from "next/router";

import {
    Flex,
    InputGroup,
    Tooltip,
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
    RiSaveLine as SaveIcon
} from "react-icons/ri";

import { editAccount } from "@/services/accounts";
import { useSession } from "next-auth/react";

export default function AccountCreateForm({data}) {
    const { data: session } = useSession();
    const user = session?.user;
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [isCopied, setIsCopied] = useState(false);
    const toast = useToast();
    const router = useRouter();

    const onSubmit = async (data) => {
        const update = await editAccount(data, user?.accessToken);
        if (update) {
            toast({
                title: "Cuenta actualizada",
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
                description: `No se ha podido actualizar la cuenta. Por favor, inténtalo de nuevo más tarde.`,
                status: "error",
                duration: 4000,
                isClosable: true,
            });
        }
    }

    const copyToClipboard = () => {
        navigator.clipboard.writeText(data?.accountId);
        setIsCopied(true);
        setTimeout(() => {
          setIsCopied(false);
        }, 2000)
    };

    return (
        <Box bgColor="bg.surface" p={5}
            borderWidth={1} borderRadius="md"
            boxShadow="sm"
            w='full'
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <Stack spacing={5}>
                    <Flex w='full' justifyContent='space-between'>
                        <Heading as="h2" fontSize='2xl' fontWeight='bold' mb="2">Editar Cuenta - {data?.companyName}</Heading>
                        <Tooltip hasArrow closeOnClick={false}
                            label={isCopied ? '✓ Copiado' : 'Copiar'}
                            borderRadius="md"
                            bg={isCopied ? 'bg.success' : null}>
                            <Heading  _hover={{ cursor: "pointer" }}
                                as="h4" fontSize='xl' fontWeight='normal' mb="2" onClick={copyToClipboard}>
                                {data?.accountId.toUpperCase()}
                            </Heading>
                        </Tooltip>
                    </Flex>
                    <Flex>
                        <FormControl>
                            <Text fontSize='md'>Activar/Desactivar</Text>
                            <Switch
                                mt={3}
                                defaultChecked={data?.status === 1 ? true : false}
                                colorScheme="brand"
                                {...register('status')}
                            />
                        </FormControl>
                    </Flex>
                    <Flex gap={5} flexDirection={["column", "row"]}>
                        <FormControl>
                            <Text fontSize='md'>Nombre</Text>
                            <InputGroup colorScheme="brand">
                                <Input 
                                    type='text' placeholder='Nombre de la cuenta' focusBorderColor='brand.400' {...register('name', { required: true })} 
                                    defaultValue={data?.name}
                                />
                            </InputGroup>
                            {errors.name && <Text color="red.300" fontsize="xs" mt={1}>El nombre de la cuenta es obligatorio</Text>}
                        </FormControl>
                        <FormControl>
                            <Text fontSize='md'>VAT</Text>
                            <InputGroup colorScheme="brand">
                                <Input 
                                    type='text' placeholder='VAT de la cuenta' focusBorderColor='brand.400' {...register('companyVat', { required: true })} 
                                    defaultValue={data?.companyVat}
                                />
                            </InputGroup>
                            {errors.companyVat && <Text color="red.300" fontsize="xs" mt={1}>El VAT de la cuenta es obligatorio</Text>}
                        </FormControl>
                    </Flex>
                    <Divider />
                    <Flex gap={5} flexDirection={["column", "row"]}>
                        <FormControl>
                            <Text fontSize='md'>Nombre de la Compañía</Text>
                            <InputGroup colorScheme="brand">
                                <Input 
                                    type='text' placeholder='Nombre de la Compañía' focusBorderColor='brand.400' {...register('companyName', { required: true })} 
                                    defaultValue={data?.companyName}
                                />
                            </InputGroup>
                            {errors.companyName && <Text color="red.300" fontsize="xs" mt={1}>El nombre de la compañia es obligatorio</Text>}
                        </FormControl>
                        <FormControl>
                            <Text fontSize='md'>Nombre legal de la Compañía</Text>
                            <InputGroup colorScheme="brand">
                                <Input 
                                    type='text' placeholder='Nombre legal de la Compañía' focusBorderColor='brand.400' {...register('companyLegalName', { required: true })}
                                    defaultValue={data?.companyLegalName} 
                                />
                            </InputGroup>
                            {errors.companyLegalName && <Text color="red.300" fontsize="xs" mt={1}>El nombre legal de la compañia es obligatorio</Text>}
                        </FormControl>
                    </Flex>
                    <Button mt={10} colorScheme='brand' type='submit' >
                        <Icon as={SaveIcon} boxSize={5} mr={3} />
                        Guardar
                    </Button>
                </Stack>
            </form>
        </Box >
    )
}