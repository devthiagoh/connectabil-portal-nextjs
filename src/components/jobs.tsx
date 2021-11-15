import { Badge, Box, Button, Center, Divider, Flex, Grid, GridItem, SimpleGrid, Spinner, Switch, Text } from "@chakra-ui/react";
import { FaPen, FaTrash } from 'react-icons/fa';
import { useJobs } from "../context/jobs.context";
import { ModalJobForm } from "./modals/job";
import api from "../services/api";

export const TabJobsForm = ({}) => {
    
    const {
        toast,
        isOpen,
        onOpen,
        onClose,
        setLabel,
        jobs,
        setJobs,
        setJob,
        setId,
        setName,
        setDescription,
        setType,
        setCompanies,
        isStatus
    } = useJobs();

    const _create = async () => {
        setLabel('Criar Vaga');
        setJob(null);
        clear();
        onOpen();
    };
    
    const _edit = async (job) => {
        setLabel('Editar Vaga');
        setJob(job);
        await serialize(job);
        onOpen();
    };

    const _delete = async (_id) => { 
        
        try {
            await api.delete(`/job/${_id}`);
            setJobs(jobs.filter(job => job._id !== _id));
            toast({
                title: "Vaga excluída com sucesso!",
                status: "success",
                duration: 3000,
                isClosable: true
            })
        } catch (error) {
            console.log(error.response.data);
            toast({
                title: error.response.data.message,
                status: "error",
                duration: 3000,
                isClosable: true
            })
        }
    };

    const switchChange = async (e, job) => {
        
        console.log('update...');

        try {
            e.preventDefault();
            let active = e.target.checked;
            const { data } = await api.put('/job', {_id: job._id, status: active});
            setJobs(jobs.map(item => item._id === job._id ? data.job : item));
            clear();
            toast({
                title: "Vaga atualizada com sucesso!",
                status: "success",
                duration: 3000,
                isClosable: true,
            })
        } catch (error) {
            console.log(error.response.data);
            toast({
                title: error.response.data.message,
                status: "error",
                duration: 3000,
                isClosable: true
            })
        }
    }

    const serialize = async (job) => {

        setId(job._id);
        setName(job.name);
        setDescription(job.description);
        setType(job.type);
        setCompanies(job.companies);
        isStatus(job.status);
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
            <Flex color="white" justifyContent="flex-end" mt="2">
                <Button color="white" bgColor="blue.550" size="sm" pt="1" onClick={() => {_create()}}>Criar Vaga</Button>
                <ModalJobForm isOpen={isOpen} onClose={onClose}></ModalJobForm>
            </Flex>

            <Divider mt="1" borderColor="gray.400"/>
            { jobs === null && (
                <Center h="100vh">
                    <Spinner thickness="4px" speed="0.85s" emptyColor="gray.200" color="blue.550" size="xl"/>
                </Center>
            )}
            { jobs?.length > 0 && (
                <SimpleGrid columns={1} spacing={6} mt={10}>
                    { jobs?.map((job) => (
                        <Box border="1px" borderColor="gray.200" borderRadius="xl" minHeight="80px" key={job._id}>
                            <Grid templateColumns="repeat(4, 1fr)" gap={2}>
                                <GridItem colSpan={3}>
                                    <Flex p="4">
                                        <Box>
                                            <Text fontWeight="bold">{job.name}<Badge>{job.type}</Badge></Text>
                                            <Text fontSize="sm" color="gray.500">{job.description}</Text>
                                        </Box>
                                    </Flex>
                                </GridItem>
                                <Center>
                                    <GridItem colSpan={1}>
                                        <Flex>
                                            <Button onClick={() => _edit(job)} w="80px" size="sm" mr="2">
                                                <FaPen/><Text ml="1" pt="1">Editar</Text>
                                            </Button>
                                            <Button onClick={() => _delete(job._id)} w="85px" size="sm" mr="2">
                                                <FaTrash/><Text ml="1" pt="1">Excluir</Text>
                                            </Button>
                                            <Switch size="lg" mt="1" mr="2" value={job.status} isChecked={job.status} onChange={(e) => switchChange(e, job)}/>
                                        </Flex>
                                    </GridItem>
                                </Center>
                            </Grid>
                        </Box>
                    ))}
                </SimpleGrid>
            )}
        </>
    )
};