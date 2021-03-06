import { createContext, useContext, ReactNode, useState, useEffect } from "react";
import { useToast } from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/hooks";
import { service } from "../services/jobs.service";
import { Method } from "../util/util";

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
  jobs: any;
  setJobs: any;
  job: any;
  setJob: any;
  id: string;
  setId: any;
  name: string;
  setName: any;
  description: string;
  setDescription: any;
  type: string;
  setType: any;
  status: boolean;
  isStatus: any;
  companies: string[];
  setCompanies: any;
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
  jobs: [],
  setJobs: () => {},
  job: null,
  setJob: () => {},
  id: null,
  setId: () => {},
  name: null,
  setName: () => {},
  description: null,
  setDescription: () => {},
  type: null,
  setType: () => {},
  status: null,
  isStatus: () =>{},
  companies: [],
  setCompanies: () => {}
};

const JobsContext = createContext<ContextType>(defaultValues);

export function useJobs() {
    return useContext(JobsContext);
}

type Props = {
    children: ReactNode;
};

export function JobsProvider({ children }: Props) {
    
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [ loading, isLoading ] = useState(false);
  const [ error, setError ] = useState(null);

  const [ label, setLabel ] = useState(null);
  const [ jobs, setJobs ] = useState(null);
  const [ job, setJob ] = useState(null);
  const [ id, setId ] = useState(null);
  const [ name, setName ] = useState(null);
  const [ description, setDescription ] = useState(null);
  const [ type, setType ] = useState(null);
  const [ status, isStatus ] = useState(false);
  const [ companies, setCompanies ] = useState([]);

  const value = {
    toast,
    isOpen,
    onOpen,
    onClose,
    loading,
    isLoading,
    error,
    setError,
    label,
    setLabel,
    jobs,
    setJobs,
    job,
    setJob,
    id,
    setId,
    name,
    setName,
    description,
    setDescription,
    type,
    setType,
    status,
    isStatus,
    companies,
    setCompanies
  };

  useEffect(() => {
    service(Method.FINDALL).then(( data ) => {
      setJobs(data);
    });
  }, []);

  return (
      <>
          <JobsContext.Provider value={value}>
              {children}
          </JobsContext.Provider>
      </>
  );
}