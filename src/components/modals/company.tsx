import { Button, Center, Flex, Modal, ModalBody, ModalCloseButton, ModalContent, ModalOverlay, Text, VStack } from "@chakra-ui/react";
import { useCompanies } from "../../context/companies.context";
import { useJobs } from "../../context/jobs.context";
import api from "../../services/api";
import { InputForm } from "../input";

export const ModalCompanyForm = ({isOpen, onClose}) => {

    const {
        toast,
        label,
        loading,
        isLoading,
        error,
        setError,
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

    const handleChangeName = (value) => { setName(value), setError(null) };
    const handleChangeCep = (value) => { setZipCode(value), setError(null) };
    const handleChangeEstado = (value) => { setState(value), setError(null) };
    const handleChangeCidade = (value) => { setCity(value), setError(null) };
    const handleChangeBairro = (value) => { setNeighborhood(value), setError(null) };
    const handleChangeLogradouro = (value) => { setAddress(value), setError(null) };
    const handleChangeNumero = (value) => { setNumber(value), setError(null) };

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

                                <InputForm name="name"   label="Nome Fantasia" placeholder="Qual o nome fantasia da sua empresa?" value={name}          onChange={e => handleChangeName(e.target.value)}   mask="" error={error?.name}></InputForm>
                                <InputForm name="cep"    label="CEP"           placeholder="Qual o CEP da sua empresa?"           value={zipCode}       onChange={e => handleChangeCep(e.target.value)}    mask="99999-999" error={error?.zipCode}></InputForm>
                                <InputForm name="estado" label="Estado"        placeholder="Qual o estado?"                       value={state}         onChange={e => handleChangeEstado(e.target.value)} mask="aa" error={error?.state}></InputForm>
                                <InputForm name="cidade" label="Cidade"        placeholder="Qual a cidade?"                       value={city}          onChange={e => handleChangeCidade(e.target.value)} mask="" error={error?.city}></InputForm>
                                <InputForm name="bairro" label="Bairro"        placeholder="Qual a bairro?"                       value={neighborhood}  onChange={e => handleChangeBairro(e.target.value)} mask="" error={error?.neighborhood}></InputForm>

                                <Flex justifyContent="space-between">
                                    <InputForm name="logradouro" label="Logradouro" placeholder="Qual o logradouro?" value={address} onChange={e => handleChangeLogradouro(e.target.value)} error={error?.address}mask=""></InputForm>
                                    <InputForm name="numero"     label="Número"     placeholder="Nº"                 value={number}  onChange={e => handleChangeNumero(e.target.value)}     error={error?.number} mask="" w="95%" ml="2" ></InputForm>
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