import '../styles/globals.css';
import { ChakraProvider } from "@chakra-ui/react";
import theme from "../../public/theme/theme";
import Fonts from "../../public/fonts/fonts";
import { CompaniesProvider } from '../context/companies.context';
import { JobsProvider } from '../context/jobs.context';

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}> 
        <Fonts />
        <CompaniesProvider>
          <JobsProvider>
            <Component { ...pageProps }/>
          </JobsProvider>
        </CompaniesProvider>
    </ChakraProvider>
  )
}

export default MyApp
