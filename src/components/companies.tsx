import { Box, Button, Center, Divider, Flex, Grid, GridItem, SimpleGrid, Spinner, Switch, Text } from "@chakra-ui/react";
import { FaMapMarkerAlt, FaPen, FaTrash } from 'react-icons/fa';
import { useCompanies } from "../context/companies.context";
import api from "../services/api";
import { ModalCompanyForm } from "./modals/company";

export const TabCompaniesForm = ({}) => {
    
    const {
        toast,
        isOpen,
        onOpen,
        onClose,
        setLabel,
        companies,
        setCompanies,
        setCompany,
        setId,
        setName,
        setZipCode,
        setState,
        setCity,
        setNeighborhood,
        setAddress,
        setNumber,
        isStatus
    } = useCompanies();

    const _create = async () => {
        setLabel('Criar Empresa');
        setCompany(null);
        clear();
        onOpen();
    };

    const _edit = async (company) => {
        setLabel('Editar Empresa');
        setCompany(company);
        await serialize(company);
        onOpen();
    };

    const _delete = async (_id) => { 
        
        try {
            await api.delete(`/companies/${_id}`);
            setCompanies(companies.filter(company => company._id !== _id));
            toast({
                title: "Empresa excluída com sucesso!",
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

    const switchChange = async (e, company) => {
        
        console.log('update...');

        try {
            e.preventDefault();
            let active = e.target.checked;
            const update = {_id: company._id, status: active};
            const { data } = await api.put('/companies', update);
            setCompanies(companies.map(item => item._id === company._id ? data : item));
            clear();
            toast({
                title: "Empresa atualizada com sucesso!",
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

    const serialize = (company) => {

        setId(company._id);
        setName(company.name);
        setZipCode(company.zipCode);
        setState(company.state);
        setCity(company.city);
        setNeighborhood(company.neighborhood);
        setAddress(company.address);
        setNumber(company.number);
        isStatus(company.status);
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
        <>
            <Flex color="white" justifyContent="flex-end" mt="2">
                <Button color="white" bgColor="blue.550" size="sm" pt="1" onClick={() => {_create()}}>Criar Empresa</Button>
                <ModalCompanyForm isOpen={isOpen} onClose={onClose}></ModalCompanyForm>
            </Flex>

            <Divider mt="1" borderColor="gray.400"/>
            { companies === null && (
                <Center h="100vh">
                    <Spinner thickness="4px" speed="0.85s" emptyColor="gray.200" color="blue.550" size="xl"/>
                </Center>
            )}
            { companies?.length > 0 && (
                <SimpleGrid columns={1} spacing={6} mt={10}>
                    { companies?.map((company) => (
                        <Box border="1px" borderColor="gray.200" borderRadius="xl" height="80px" key={company._id}>
                            <Grid templateColumns="repeat(4, 1fr)" gap={2}>
                                <GridItem colSpan={3}>
                                    <Flex p="4">
                                        <Box>
                                            <Text fontWeight="bold">{company.name}</Text>
                                            <Flex color="gray.500">
                                                <FaMapMarkerAlt/><Text fontSize="sm">{company.address}</Text>
                                            </Flex>
                                        </Box>
                                    </Flex>
                                </GridItem>
                                <Center>
                                    <GridItem colSpan={1}>
                                        <Flex>
                                            <Button onClick={() => _edit(company)} w="80px" size="sm" mr="2">
                                                <FaPen/><Text ml="1" pt="1">Editar</Text>
                                            </Button>
                                            <Button onClick={() => _delete(company._id)} w="85px" size="sm" mr="2">
                                                <FaTrash/><Text ml="1" pt="1">Excluir</Text>
                                            </Button>
                                            <Switch size="lg" mt="1" mr="2" value={company.status} isChecked={company.status} onChange={(e) => switchChange(e, company)}/>
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