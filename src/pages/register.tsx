import { Box, Button, Center, Flex, Text, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { InputForm } from "../components/input";
import { useCompanies } from "../context/companies.context";
import api from "../services/api";
import { useRouter } from 'next/router';

export default function Register(){

    const router = useRouter();

    const {
        toast,
        companies,
        setCompanies,
        setId,
        name,
        setName,
        zipCode,
        setZipCode,
        state,
        setState,
        city,
        setCity,
        neighborhood,
        setNeighborhood,
        address,
        setAddress,
        number,
        setNumber
    } = useCompanies();

    const [ erros, setErros ] = useState(null);
    const [ loading, isLoading ] = useState(false);

    const handleChangeName = (value) => { setName(value) };
    const handleChangeCep = (value) => { setZipCode(value) };
    const handleChangeEstado = (value) => { setState(value) };
    const handleChangeCidade = (value) => { setCity(value) };
    const handleChangeBairro = (value) => { setNeighborhood(value) };
    const handleChangeLogradouro = (value) => { setAddress(value) };
    const handleChangeNumero = (value) => { setNumber(value) };

    const isValidForm = () => {

        if(!name) {
            setErros({ name: 'Nome é obrigatório.' });
            return false;
        }

        if(!zipCode){
            setErros({ zipCode: 'Cep é obrigatório.' });
            return false;
        }

        if(!state){
            setErros({ state: 'Estado é obrigatório.' });
            return false;
        }

        if(!city){
            setErros({ city: 'Cidade é obrigatório.'});
            return false;
        }

        if(!neighborhood){
            setErros({ neighborhood: 'Bairro é obrigatório.' });
            return false;
        }

        if(!address){
            setErros({ address: 'Logradourro é obrigatório.' });
            return false;
        }

        if(!number){
            setErros({ number: 'Número é obrigatório.' });
            return false;
        }

        setErros(null);
        return true;
    }

    const handleCreate = async (e) => {

        console.log('create...');

        e.preventDefault();

        if(!isValidForm()) return;

        try {
            isLoading(true);
            const create = {name, zipCode, state, city, neighborhood, address, number, status: true};
            const { data } = await api.post('/companies', create);
            setCompanies(companies.concat(data));  
            clear();
            isLoading(false);
            toast({
                title: "Empresa cadastrada com sucesso!",
                status: "success",
                duration: 3000,
                isClosable: true,
            })
            router.push('/login');
        } catch (error) {
            console.log(error);
            isLoading(false);
        }

    };
    
    const clear = () => {
        console.log('clear...');
        setId(null);
        setName('');
        setZipCode('');
        setState('');
        setCity('');
        setNeighborhood('');
        setAddress('');
        setNumber('');
    };
    
    return (
        <Flex h="100vh" bg="blue.550" justifyContent="flex-end">
            <Box h="100vh" bg="white" w="63rem">
                <Center h="100vh"> 
                    <VStack as="form" w="22rem" my="10rem" onSubmit={handleCreate}>
                        <Text fontSize="32px" fontWeight="bold" alignSelf="flex-start" letterSpacing="1.2px">Nos conte um pouco sobre a sua empresa</Text>

                        <InputForm name="name"   label="Nome Fantasia" placeholder="Qual o nome fantasia da sua empresa?" value={name}   onChange={e => handleChangeName(e.target.value)}   error={erros?.name}></InputForm>
                        <InputForm name="cep"    label="CEP"           placeholder="Qual o CEP da sua empresa?"           value={zipCode}    onChange={e => handleChangeCep(e.target.value)}    error={erros?.zipCode}></InputForm>
                        <InputForm name="estado" label="Estado"        placeholder="Qual o estado?"                       value={state} onChange={e => handleChangeEstado(e.target.value)} error={erros?.state}></InputForm>
                        <InputForm name="cidade" label="Cidade"        placeholder="Qual a cidade?"                       value={city} onChange={e => handleChangeCidade(e.target.value)} error={erros?.city}></InputForm>
                        <InputForm name="bairro" label="Bairro"        placeholder="Qual a bairro?"                       value={neighborhood} onChange={e => handleChangeBairro(e.target.value)} error={erros?.neighborhood}></InputForm>

                        <Flex justifyContent="space-between">
                            <InputForm name="logradouro" label="Logradouro" placeholder="Qual o logradouro?" value={address} onChange={e => handleChangeLogradouro(e.target.value)} error={erros?.address}></InputForm>
                            <InputForm name="numero" label="Número"         placeholder="Nº"                 value={number} onChange={e => handleChangeNumero(e.target.value)} w="95%" ml="2" error={erros?.number}></InputForm>
                        </Flex>

                        <Button type="submit" pt="1" w="100%" isLoading={loading}>Finalizar Cadastro</Button>
                    </VStack>
                </Center>
            </Box>
        </Flex>
    )
};