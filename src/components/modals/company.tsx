import { Button, Center, Flex, Modal, ModalBody, ModalCloseButton, ModalContent, ModalOverlay, Text, VStack } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useCompanies } from "../../context/companies.context";
import { useJobs } from "../../context/jobs.context";
import api from "../../services/api";
import { InputForm } from "../input";

export const ModalCompanyForm = ({isOpen, onClose}) => {

    const {
        toast,
        label,
        companies,
        setCompanies,
        id,
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
        setNumber, 
        status
    } = useCompanies();

    const { setJobs } = useJobs();

    const [ erros, setErros ] = useState(null);
    const [ loading, isLoading ] = useState(false);

    const handleChangeName = (value) => { setName(value), setErros(null) };
    const handleChangeCep = (value) => { setZipCode(value), setErros(null) };
    const handleChangeEstado = (value) => { setState(value), setErros(null) };
    const handleChangeCidade = (value) => { setCity(value), setErros(null) };
    const handleChangeBairro = (value) => { setNeighborhood(value), setErros(null) };
    const handleChangeLogradouro = (value) => { setAddress(value), setErros(null) };
    const handleChangeNumero = (value) => { setNumber(value), setErros(null) };

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
            setErros({ city: 'Cidade é obrigatório.' });
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
            let create = {name, zipCode, state, city, neighborhood, address, number, status: true};
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
            onClose();
        } catch (error) {
            console.log(error);
            isLoading(false);
        }

    };

    const handleUpdate = async (e) => {

        console.log('update...');
        
        e.preventDefault();

        if(!isValidForm()) return;

        try {
            isLoading(true);
            const update = {_id: id, name, zipCode, state, city, neighborhood, address, number, status};
            const { data } = await api.put(`/companies`, update);
            setCompanies(companies.map(company => company._id === id ? data : company));
            clear();
            updateJobs();
            isLoading(false);
            toast({
                title: "Empresa atualizada com sucesso!",
                status: "success",
                duration: 3000,
                isClosable: true,
            })
            onClose();
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

    const updateJobs = () => {
        api.get('/jobs').then(({ data }) => {
            setJobs(data);
            console.log('atualizando...');
        });
    }

    return (
        <>
            <Modal isCentered onClose={onClose} isOpen={isOpen} motionPreset="slideInBottom">
                <ModalOverlay />
                <ModalContent>
                    <ModalBody>
                        <Center h="100%">
                            <VStack marginY="3rem" as="form" w="80%" onSubmit={ id ? handleUpdate : handleCreate}>

                                <Text fontSize="32px" fontWeight="bold" alignSelf="flex-start" letterSpacing="1.2px" mb="2">{label}</Text><ModalCloseButton/>

                                <InputForm name="name"   label="Nome Fantasia" placeholder="Qual o nome fantasia da sua empresa?" value={name}   onChange={e => handleChangeName(e.target.value)}   error={erros?.name}></InputForm>
                                <InputForm name="cep"    label="CEP"           placeholder="Qual o CEP da sua empresa?"           value={zipCode}    onChange={e => handleChangeCep(e.target.value)}    error={erros?.zipCode}></InputForm>
                                <InputForm name="estado" label="Estado"        placeholder="Qual o estado?"                       value={state} onChange={e => handleChangeEstado(e.target.value)} error={erros?.state}></InputForm>
                                <InputForm name="cidade" label="Cidade"        placeholder="Qual a cidade?"                       value={city} onChange={e => handleChangeCidade(e.target.value)} error={erros?.city}></InputForm>
                                <InputForm name="bairro" label="Bairro"        placeholder="Qual a bairro?"                       value={neighborhood} onChange={e => handleChangeBairro(e.target.value)} error={erros?.neighborhood}></InputForm>

                                <Flex justifyContent="space-between">
                                    <InputForm name="logradouro" label="Logradouro" placeholder="Qual o logradouro?" value={address} onChange={e => handleChangeLogradouro(e.target.value)} error={erros?.address}></InputForm>
                                    <InputForm name="numero" label="Número"         placeholder="Nº"                 value={number} onChange={e => handleChangeNumero(e.target.value)} w="95%" ml="2" error={erros?.number}></InputForm>
                                </Flex>

                                <Button type="submit" pt="1" w="100%" isLoading={loading}>{label}</Button>
                            </VStack>
                        </Center>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
};