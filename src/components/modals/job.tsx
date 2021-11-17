import { Button, Center, Modal, ModalBody, ModalCloseButton, ModalContent, ModalOverlay, Text, VStack } from "@chakra-ui/react";
import { useJobs } from "../../context/jobs.context";
import { InputForm } from "../input";
import { MultiSelect } from "../multiselect";
import { RadioForm } from "../radio";
import { TextAreaForm } from "../textarea";
import { Method } from "../../util/util";
import { service } from "../../services/jobs.service";

export const ModalJobForm = ({isOpen, onClose}) => {

    const { toast,
            loading,
            isLoading,
            error,
            setError, 
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

    const handleChangeName = (value) => { setName(value); setError(null) };
    const handleChangeDescription = (value) => { setDescription(value); setError(null) };

    const isValidForm = () => {

        if(!name) { setError({name: 'Nome é obrigatório.'}); return false; }

        if(!description){ setError({description: 'Descrição é obrigatório.'}); return false; }

        if(!type){ setError({type: 'Tipo de Contratação é obrigatório.'}); return false; }

        if(!companies){ setError({companies: 'Associar uma empresa é obrigatório.'}); return false; }

        setError(null);
        return true;
    }

    const handleCreate = async (e) => {

        console.log('create...');

        e.preventDefault();

        if(!isValidForm()) return;

        try {
            isLoading(true);
            const create = {name, description, type, companies, status: true};
            const created = await service(Method.CREATE, create);
            const jobsUpdated = jobs.concat(created); 
            setJobs(jobsUpdated);  
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
            console.log(error.response?.data);
            isLoading(false);
            toast({
                title: error.response?.data.message,
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
            const update = {_id: id, name, description, type, companies, status};
            const updated = await service(Method.UPDATE, update);
            const jobsUpdated = jobs.map(job => job._id === id ? updated : job);
            setJobs(jobsUpdated);
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
            console.log(error.response?.data);
            isLoading(false);
            toast({
                title: error.response?.data.message,
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

                                <InputForm    name="name"      label="Nome da Vaga"         placeholder="Qual o nome da sua vaga?"   value={name}        onChange={e => handleChangeName(e.target.value)}        error={error?.name} mask=""></InputForm>
                                <TextAreaForm name="descricao" label="Descrição da Vaga"    placeholder="Descreva brevemente a vaga" value={description} onChange={e => handleChangeDescription(e.target.value)} error={error?.description}></TextAreaForm>
                                <RadioForm    name="type"      label="Tipo de contratação"  error={error?.type}></RadioForm>
                                <MultiSelect  name="companies" job={job}                    error={error?.companies}></MultiSelect>

                                <Button type="submit" pt="1" w="100%" isLoading={loading}>{label}</Button>
                            </VStack>
                        </Center>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
};