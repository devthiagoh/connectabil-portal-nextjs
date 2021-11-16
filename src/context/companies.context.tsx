import { useDisclosure } from "@chakra-ui/hooks";
import { useToast } from "@chakra-ui/react";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import api from "../services/api";

type ContextType = {
  toast: any;
  isOpen: any;
  onOpen: any;
  onClose: any;
  loading: boolean;
  isLoading: any;
  error: any;
  setError: any;
  label: string;
  setLabel: any;
  companies: any;
  setCompanies: any;
  company: any;
  setCompany: any;
  id: string;
  setId: any;
  name: string;
  setName: any;
  zipCode: string;
  setZipCode: any;
  state: string;
  setState: any;
  city: string;
  setCity: any;
  neighborhood: string;
  setNeighborhood: any;
  address: string;
  setAddress: any;
  number: string;
  setNumber: any;
  status: boolean;
  isStatus: any;
};

const defaultValues: ContextType = {
  toast: null,
  isOpen: null,
  onOpen: null,
  onClose: null,
  loading: null,
  isLoading: () => {},
  error: null,
  setError: () => {},
  label: null,
  setLabel: () => {},
  companies: null,
  setCompanies: () => {},
  company: null,
  setCompany: () => {},
  id: null,
  setId: () => {},
  name: null,
  setName: () => {},
  zipCode: null,
  setZipCode: () => {},
  state: null,
  setState: () => {},
  city: null,
  setCity: () => {},
  neighborhood: null,
  setNeighborhood: () => {},
  address: null,
  setAddress: () => {},
  number: null,
  setNumber: () => {},
  status: null,
  isStatus: () =>{}
};

const CompaniesContext = createContext<ContextType>(defaultValues);

export function useCompanies() {
    return useContext(CompaniesContext);
}

type Props = {
    children: ReactNode;
};

export function CompaniesProvider({ children }: Props) {
    
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [ loading, isLoading ] = useState(false);
  const [ error, setError ] = useState(null);

  const [ label, setLabel ] = useState(null);
  const [ companies, setCompanies ] = useState(null);
  const [ company, setCompany ] = useState(null);
  const [ id, setId ] = useState(null);
  const [ name, setName ] = useState('');
  const [ zipCode, setZipCode ] = useState('');
  const [ state, setState ] = useState('');
  const [ city, setCity ] = useState('');
  const [ neighborhood, setNeighborhood ] = useState('');
  const [ address, setAddress ] = useState('');
  const [ number, setNumber ] = useState('');
  const [ status, isStatus ] = useState(false);

  const value = {
    toast,
    isOpen,
    onOpen,
    onClose,
    loading,
    isLoading,
    error,
    setError,
    companies,
    setCompanies,
    label,
    setLabel,
    company,
    setCompany,
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
    status,
    isStatus
  };

  useEffect(() => {
    api.get('/companies').then(({ data }) => {
      setCompanies(data);
    });
  }, []);

  return (
      <>
          <CompaniesContext.Provider value={value}>
              {children}
          </CompaniesContext.Provider>
      </>
  );
}