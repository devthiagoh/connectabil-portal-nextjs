import { Flex, Box, Heading, Text, Button, Center } from "@chakra-ui/react";
import { useState } from "react";
import { useRouter } from 'next/router';

export default function Home() {
  const [ loading, isLoading ] = useState(false);
  const router = useRouter();

  return (
      <Flex h="100vh" bg="blue.550" justifyContent="flex-end">
          <Box h="100vh" w="50rem" bg="blue.550">
              <Center h="100vh" pl="5rem" pt="15rem" pr="5rem" pb="5rem">
                  <Box bg="white" rounded="xl" w="533px" p="6" as="form">
                      <Text ml="6" mt="6" color="blue.550" fontSize="32px">A sua vaga é o quê faltava para</Text>
                      <Heading ml="6">a nossa magia!</Heading>
                      <Button w="160px" ml="6" mb="6" mt="5" pt="1" fontSize="12px" isLoading={loading} onClick={() => router.push('/register')}>Cadastre-se agora</Button>
                  </Box>
              </Center>
          </Box>
      </Flex>
  )
}
