import { Button, Center, Modal, ModalBody, ModalCloseButton, ModalContent, ModalOverlay, Text, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { useJobs } from "../../context/jobs.context";
import { InputForm } from "../input";
import { MultiSelect } from "../multiselect";
import { RadioForm } from "../radio";
import { TextAreaForm } from "../textarea";
import api from "../../services/api";


export const ModalJobForm = ({isOpen, onClose}) => {

    const { toast,
            erros,
            setErros, 
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
            setCompanies, 
            status } = useJobs();

    
    const [ loading, isLoading ] = useState(false);

    const handleChangeName = (value) => { setName(value); setErros(null) };
    const handleChangeDescription = (value) => { setDescription(value); setErros(null) };

    const isValidForm = () => {

        if(!name) {
            setErros({name: 'Nome é obrigatório.'});
            return false;
        }

        if(!description){
            setErros({description: 'Descrição é obrigatório.'});
            return false;
        }

        if(!type){
            setErros({type: 'Tipo de Contratação é obrigatório.'});
            return false;
        }

        if(!companies){
            setErros({companies: 'Associar uma empresa é obrigatório.'});
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
            const create = {name, description, type, companies, status: true};
            const { data } = await api.post('/job', create);
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
            const update = {_id: id, name, description, type, companies, status};
            const { data } = await api.put(`/job`, update);
            setJobs(jobs.map(job => job._id === id ? data.job : job));
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

                                <InputForm name="name" label="Nome da Vaga" placeholder="Qual o nome da sua vaga?" value={name} onChange={e => handleChangeName(e.target.value)} error={erros?.name}></InputForm>
                                <TextAreaForm name="descricao" label="Descrição da Vaga" placeholder="Descreva brevemente a vaga" value={description} onChange={e => handleChangeDescription(e.target.value)} error={erros?.description}></TextAreaForm>

                                <RadioForm name="type" label="Tipo de contratação" error={erros?.type}></RadioForm>

                                <MultiSelect name="companies" job={job} error={erros?.companies}></MultiSelect>

                                <Button type="submit" pt="1" w="100%" isLoading={loading}>{label}</Button>
                            </VStack>
                        </Center>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
};