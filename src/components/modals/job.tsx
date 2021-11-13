import { Center, VStack, Text, Button, Modal, ModalOverlay, ModalContent, ModalBody, ModalCloseButton, Select } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useJobs } from "../../context/jobs.context";
import { InputForm } from "../input";
import { MultiSelect } from "../multiselect";
import { RadioForm } from "../radio";
import { TextAreaForm } from "../textarea";

import api from "../../services/api";

export const ModalJobForm = ({isOpen, onClose}) => {

    const {
        toast,
        label,
        job,
        jobs,
        setJobs,
        id,
        setId,
        name,
        setName,
        description,
        setDescription,
        type,
        setType,
        companies,
        setCompanies
    } = useJobs();

    const [ erros, setErros ] = useState({name: null, description: null, type: null, companies: null});
    const [ loading, isLoading ] = useState(false);

    const handleChangeName = (value) => { setName(value) };
    const handleChangeDescription = (value) => { setDescription(value) };

    const isValidForm = () => {

        if(!name) {
            setErros({name: 'Nome é obrigatório.', description: null, type: null, companies: null});
            return false;
        }

        if(!description){
            setErros({name: null, description: 'Descrição é obrigatório.', type: null, companies: null});
            return false;
        }

        if(!type){
            setErros({name: null, description: null, type: 'Tipo de Contratação é obrigatório.', companies: null});
            return false;
        }

        if(!companies){
            setErros({name: null, description: null, type: null, companies: 'Associar uma empresa é obrigatório.'});
            return false;
        }

        setErros({name: null, description: null, type: null, companies: null});
        return true;
    }

    const handleCreate = async (e) => {

        console.log('create...');

        e.preventDefault();

        if(!isValidForm()) return;

        try {
            isLoading(true);
            const { data } = await api.post('/job', {name, description, type, companies, status: true});
            setJobs(jobs.concat(data.job));  
            clear();
            isLoading(false);
            toast({
                title: "Vaga cadastrada com sucesso!",
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
            await api.put(`/job`, {_id: id, name, description, type, companies});
            setJobs(jobs.map(job => job._id === id ? {_id: id, name, description, type, companies} : job));
            clear();
            isLoading(false);
            toast({
                title: "Vaga atualizada com sucesso!",
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
        setDescription('');
        setType('');
        setCompanies([]);
    };

    return (
        <>
            <Modal isCentered onClose={onClose} isOpen={isOpen} motionPreset="slideInBottom">
                <ModalOverlay />
                <ModalContent>
                    <ModalBody>
                        <Center h="100%">
                            <VStack marginY="3rem" as="form" w="80%" spacing={4} onSubmit={ id ? handleUpdate : handleCreate}>

                                <Text fontSize="32px" fontWeight="bold" alignSelf="flex-start" letterSpacing="1.2px" mb="2">{label}</Text><ModalCloseButton/>

                                <InputForm name="name" label="Nome da Vaga" placeholder="Qual o nome da sua vaga?" value={name} onChange={e => handleChangeName(e.target.value)} error={erros.name}></InputForm>
                                <TextAreaForm name="descricao" label="Descrição da Vaga" placeholder="Descreva brevemente a vaga" value={description} onChange={e => handleChangeDescription(e.target.value)} error={erros.description}></TextAreaForm>

                                <RadioForm name="type" label="Tipo de contratação" error={erros.type}></RadioForm>

                                <MultiSelect name="companies" job={job} error={erros.companies}></MultiSelect>

                                <Button type="submit" pt="1" w="100%" isLoading={loading}>{label}</Button>
                            </VStack>
                        </Center>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
};