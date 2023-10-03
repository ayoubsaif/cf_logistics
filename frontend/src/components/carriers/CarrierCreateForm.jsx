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
    Select,
    Switch,
    Divider,
    Icon,
    Box,
    useToast,
    FormControl,
    IconButton,
    Heading
} from "@chakra-ui/react";

import {
    RiEyeLine as EyeIcon,
    RiEyeOffLine as EyeCrossedIcon,
    RiAddLine as AddIcon
} from "react-icons/ri";

import { createCarrier } from "@/services/carriers";
import { useSession } from "next-auth/react";

export default function CarrierCreateForm({ token }) {
    const { data: session } = useSession();
    const user = session?.user;
    const { register, handleSubmit, formState: { errors } } = useForm();
    const toast = useToast();
    const router = useRouter();

    const [show, setShow] = useState(false)

    const onSubmit = async (data) => {
        const create = await createCarrier(user?.accountId, user?.accessToken, data);
        if (create?.status === 200) {
            toast({
                title: "Transportista Creado",
                status: "success",
                duration: 3000,
                isClosable: true,
            });
            setTimeout(() => {
                router.push('/carriers');
            }, 500);
        } else {
            toast({
                title: "Algo ha ido mal",
                description: `No se ha podido crear el transportista. Por favor, inténtalo de nuevo más tarde.`,
                status: "error",
                duration: 4000,
                isClosable: true,
            });
        }
    }

    const carrierOptions = [
        { label: 'Correos', value: 'CORREOS_ES' }
    ]

    const envOptions = [
        { label: 'Producción', value: 'production' },
        { label: 'Test', value: 'test' }
    ]

    return (
        <Box bgColor="bg.surface" p={5}
            borderWidth={1} borderRadius="md"
            boxShadow="sm"
            w='full'
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <Stack spacing={5}>
                    <Flex w='full' justifyContent='space-between'>
                        <Heading as="h2" fontSize='2xl' fontWeight='bold' mb="2">Crear Transportista</Heading>
                    </Flex>
                    <Flex>
                        <FormControl>
                            <Text fontSize='md'>Activar/Desactivar</Text>
                            <Switch
                                mt={3}
                                colorScheme="brand"
                                isReadOnly
                                {...register('isActive')}
                            />
                        </FormControl>
                    </Flex>
                    <Flex gap={5} flexDirection={["column", "row"]} >
                        <FormControl>
                            <Text fontSize='md'>Nombre</Text>
                            <InputGroup colorScheme="brand">
                                <Input type='text' placeholder='Nombre del Transportista' focusBorderColor='brand.400' {...register('name', { required: true })} />
                            </InputGroup>
                            {errors.name && <Text color="red.300" fontsize="xs" mt={1}>El nombre del transportista es obligatorio</Text>}
                        </FormControl>
                        <FormControl>
                            <Text fontSize='md'>Empresa de transporte</Text>
                            <InputGroup colorScheme="brand">
                                <Select focusBorderColor='brand.400' {...register('deliveryType', { required: true })}>
                                    {carrierOptions.map((carrier, index) => (
                                        <option key={index} value={carrier?.value}>{carrier?.label}</option>
                                    ))}
                                </Select>
                                {errors.deliveryType && <span>This field is required</span>}
                            </InputGroup>
                        </FormControl>
                    </Flex>
                    <Divider />
                    <Flex w='full' gap={5} flexDirection={['column', 'row']}>
                        <FormControl>
                            <Text fontSize='md'>Usuario</Text>
                            <InputGroup colorScheme="brand">
                                <Input 
                                    type='text' 
                                    placeholder='Nombre de usuario' 
                                    focusBorderColor='brand.400' 
                                    {...register('username', { required: true })}
                                    autoComplete="off"
                                    aria-autocomplete="none"
                                />
                            </InputGroup>
                            {errors.username && <Text color="red.300" fontsize="xs" mt={1}>El usuario es obligatorio</Text>}
                        </FormControl>
                        <FormControl>
                            <Text fontSize='md'>Contraseña</Text>
                            <InputGroup colorScheme="brand">
                                <Input
                                    type={show ? 'text' : 'password'}
                                    placeholder='Contraseña'
                                    focusBorderColor='brand.400' 
                                    autoComplete="new-password"
                                    {...register('password', { required: true })}
                                />
                                <InputRightElement>
                                    <IconButton size='sm' onClick={() => setShow(!show)} variant='ghost' icon={show ? <Icon as={EyeCrossedIcon} boxSize={5} /> : <Icon as={EyeIcon} boxSize={5} />} />
                                </InputRightElement>
                            </InputGroup>
                            {errors.password && <Text color="red.300" fontsize="xs" mt={1}>La contraseña es obligatoria</Text>}
                        </FormControl>
                    </Flex>
                    <Divider />
                    <Flex gap={5} flexDirection={["column", "row"]} >
                        <FormControl>
                            <Text fontSize='md'>Entorno</Text>
                            <InputGroup colorScheme="brand">
                                <Select focusBorderColor='brand.400' {...register('environment', { required: true })}>
                                    {envOptions.map((env, index) => (
                                        <option key={index} value={env?.value}>{env?.label}</option>
                                    ))}
                                </Select>
                                {errors.environment && <span>This field is required</span>}
                            </InputGroup>
                        </FormControl>
                        <FormControl>
                            <Text fontSize='md'>Código de etiquetado</Text>
                            <InputGroup colorScheme="brand">
                                <Input type='text' placeholder='Código de etiquetado' focusBorderColor='brand.400' {...register('labellerCode', { required: true })} />
                            </InputGroup>
                            {errors.labellerCode && <Text color="red.300" fontsize="xs" mt={1}>This field is required</Text>}
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