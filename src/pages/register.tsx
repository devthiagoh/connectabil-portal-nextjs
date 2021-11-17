import { Box, Button, Center, Flex, Text, VStack } from "@chakra-ui/react";
import { useRouter } from 'next/router';
import { InputForm } from "../components/input";
import { useCompanies } from "../context/companies.context";
import { service } from "../services/companies.service";
import { Method } from "../util/util";

export default function Register(){

    const router = useRouter();

    const {
        toast,
        loading,
        isLoading,
        error,
        setError,
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

    const handleChangeName = (value) => { setName(value); setError(null) };
    const handleChangeCep = (value) => { setZipCode(value); setError(null) };
    const handleChangeEstado = (value) => { setState(value); setError(null) };
    const handleChangeCidade = (value) => { setCity(value); setError(null) };
    const handleChangeBairro = (value) => { setNeighborhood(value); setError(null) };
    const handleChangeLogradouro = (value) => { setAddress(value); setError(null) };
    const handleChangeNumero = (value) => { setNumber(value); setError(null) };

    const isValidForm = () => {

        if(!name) { setError({ name: 'Nome é obrigatório.' }); return false; }

        if(!zipCode){ setError({ zipCode: 'Cep é obrigatório.' }); return false; }

        if(!state){ setError({ state: 'Estado é obrigatório.' });return false; }

        if(!city){setError({ city: 'Cidade é obrigatório.' });return false; }

        if(!neighborhood){ setError({ neighborhood: 'Bairro é obrigatório.' }); return false; }

        if(!address){ setError({ address: 'Logradourro é obrigatório.' }); return false; }

        if(!number){ setError({ number: 'Número é obrigatório.' }); return false; }

        setError(null);
        return true;
    }

    const handleCreate = async (e) => {

        console.log('create...');

        e.preventDefault();

        if(!isValidForm()) return;

        try {
            isLoading(true);
            const create = {name, zipCode, state, city, neighborhood, address, number, status: true};
            const created = await service(Method.CREATE, create);
            const companiesUpdated = companies.concat(created);
            setCompanies(companiesUpdated);  
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
            console.log(error.response.data);
            isLoading(false);
            toast({
                title: error.response.data.message,
                status: "error",
                duration: 3000,
                isClosable: true
            })
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

                        <InputForm name="name"   label="Nome Fantasia" placeholder="Qual o nome fantasia da sua empresa?" value={name}          onChange={e => handleChangeName(e.target.value)}   mask="" error={error?.name}></InputForm>
                        <InputForm name="cep"    label="CEP"           placeholder="Qual o CEP da sua empresa?"           value={zipCode}       onChange={e => handleChangeCep(e.target.value)}    mask="99999-999" error={error?.zipCode}></InputForm>
                        <InputForm name="estado" label="Estado"        placeholder="Qual o estado?"                       value={state}         onChange={e => handleChangeEstado(e.target.value)} mask="aa" error={error?.state}></InputForm>
                        <InputForm name="cidade" label="Cidade"        placeholder="Qual a cidade?"                       value={city}          onChange={e => handleChangeCidade(e.target.value)} mask="" error={error?.city}></InputForm>
                        <InputForm name="bairro" label="Bairro"        placeholder="Qual a bairro?"                       value={neighborhood}  onChange={e => handleChangeBairro(e.target.value)} mask="" error={error?.neighborhood}></InputForm>

                        <Flex justifyContent="space-between">
                            <InputForm name="logradouro" label="Logradouro" placeholder="Qual o logradouro?" value={address} onChange={e => handleChangeLogradouro(e.target.value)} error={error?.address} mask=""></InputForm>
                            <InputForm name="numero"     label="Número"     placeholder="Nº"                 value={number}  onChange={e => handleChangeNumero(e.target.value)}     error={error?.number}  mask="" w="95%" ml="2" ></InputForm>
                        </Flex>

                        <Button type="submit" pt="1" w="100%" isLoading={loading}>Finalizar Cadastro</Button>
                    </VStack>
                </Center>
            </Box>
        </Flex>
    )
};