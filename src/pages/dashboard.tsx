import { Box, Tabs, TabList, TabPanels, Tab, TabPanel, Center } from "@chakra-ui/react";

import { TabCompaniesForm } from "../components/companies";
import { TabJobsForm } from "../components/jobs";

export default function DashboardForm(){
    return (
        <Center >
            <Box h="100vh" w="80%" bg="white">
                <Center>
                    <Tabs w="55rem" mt="6">
                        <TabList w="100%">
                            <Tab w="50%">Vagas</Tab>
                            <Tab w="50%">Empresas</Tab>
                        </TabList>

                        <TabPanels w="100%">
                            <TabPanel>
                                <TabJobsForm></TabJobsForm>
                            </TabPanel>
                            <TabPanel>
                                <TabCompaniesForm></TabCompaniesForm>
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                </Center>
            </Box>
        </Center>
    )
};