import { Flex, Box, Center, VStack, Text, Button } from "@chakra-ui/react";
import { useRouter } from 'next/router';

import { InputForm } from "../components/input";

export default function LoginForm(){
    const router = useRouter();
    return (
        <Flex h="100vh" bg="blue.550" justifyContent="flex-end">
            <Box h="100vh" bg="white" w="63rem">
                <Center h="100vh">
                    <VStack as="form" w="22rem">

                        <Text fontSize="32px" fontWeight="bold" alignSelf="flex-start" letterSpacing="1.2px">Seja bem vindo(a)</Text>

                        <InputForm type="email" name="email" label="Digite seu melhor e-mail" placeholder="seumelhoremail@email.com" onChange={e => console.log(e.target.value)} mask=""></InputForm>
                        <InputForm type="password" name="password" label="Digite sua senha favorita" placeholder="*************" onChange={e => console.log(e.target.value)} mb="4" mask=""></InputForm>

                        <Button pt="1" w="100%" onClick={() => router.push('/dashboard')}>Entrar</Button>
                    </VStack>
                </Center>
            </Box>
        </Flex>
    )
};