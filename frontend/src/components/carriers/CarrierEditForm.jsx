import React, {useState} from "react";
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
    useToast
} from "@chakra-ui/react";

import {
    RiEyeLine as EyeIcon,
    RiEyeOffLine as EyeCrossedIcon,
    RiSaveLine as SaveIcon
} from "react-icons/ri";

import { updateCarrier } from "@/services/carriers";

export default function CarrierEditForm({ data, token }) {
    
    const {register, handleSubmit, formState: { errors }} = useForm();
    const toast = useToast();
    const router = useRouter();

    const [show, setShow] = useState(false)
    const handleClick = () => setShow(!show)
    
    const onSubmit = async (data) => {
        const update = await updateCarrier('64b267fcd4f08', token, data?.id, data);
        if (update?.status === 200) {
            toast({
              title: "Transportista actualizado",
              description: `Transportista "${data?.name}" actualizado correctamente.`,
              status: "success",
              duration: 5000,
              isClosable: true,
            });
            setTimeout(() => {
                router.push('/carriers');
            }, 1000);
        } else {
            toast({
                title: "Algo ha ido mal",
                description: `No se ha podido actualizar el transportista. Inténtalo más tarde.`,
                status: "error",
                duration: 4000,
                isClosable: true,
            });
        }
    }

    const carrierOptions = [
        {label: 'Correos', value: 'correos'},
        {label: 'DHL', value: 'dhl'},
        {label: 'GLS', value: 'gls'},
        {label: 'Correos Express', value: 'correosExpress'}
    ]

    return (
        <Box bgColor="bg.surface" p={5}
            borderWidth={1} borderRadius="md"
            boxShadow="sm"
            w='100%'
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <Flex gap={10}>
                    <Input type='hidden' defaultValue={data?.id} {...register('id')}/>
                    <Stack>
                        <Text fontSize='md'>Nombre del Transportista</Text>
                        <InputGroup colorScheme="brand">
                            <Input type='text' placeholder='Nombre del Transportista' focusBorderColor='brand.400' defaultValue={data?.name} {...register('name')}/>
                        </InputGroup>
                    </Stack>
                    <Stack>
                        <Text fontSize='md'>Tipo de Transportista</Text>
                        <InputGroup colorScheme="brand">
                            <Select placeholder='Tipo de Transportista' focusBorderColor='brand.400' defaultValue={data?.deliveryType} {...register('deliveryType')}>
                                {carrierOptions.map((carrier, index) => (
                                    <option key={index} value={carrier?.value}>{carrier?.label}</option>
                                ))}
                            </Select>
                        </InputGroup>
                    </Stack>
                    <Stack>
                        <Text fontSize='md'>Activar/Desactivar Transportista</Text>
                        <Switch
                            mt={3}
                            colorScheme="brand"
                            defaultChecked={data?.isActive}
                            isReadOnly={data?.isActive}
                            {...register('isActive')}
                        />
                    </Stack>
                </Flex>
                <Divider my={8} />
                <Flex w='100%' gap={10}>
                    <Stack w='50%'>
                        <Text fontSize='md'>Nombre de usuario</Text>
                        <InputGroup colorScheme="brand">
                            <Input type='text' placeholder='Nombre de usuario' focusBorderColor='brand.400' defaultValue={data?.username} {...register('username')}/>
                        </InputGroup>
                    </Stack>
                    <Stack w='50%'>
                        <Text fontSize='md'>Contraseña de usuario</Text>
                        <InputGroup colorScheme="brand">
                            <Input
                                type={show ? 'text' : 'password'}
                                placeholder='Contraseña'
                                focusBorderColor='brand.400' 
                                defaultValue={data?.password} {...register('password')}
                            />
                            <InputRightElement width='4.5rem'>
                                <Button h='1.75rem' size='sm' onClick={handleClick} variant='ghost'>
                                    {show ? <Icon as={EyeCrossedIcon} boxSize={5} /> : <Icon as={EyeIcon} boxSize={5} />}
                                </Button>
                            </InputRightElement>
                        </InputGroup>
                    </Stack>
                </Flex>
                <Button mt={10} colorScheme='brand' type='submit' >
                    <Icon as={SaveIcon} boxSize={5} mr={3}/>
                    Guardar
                </Button>
            </form>
        </Box>
    )
}