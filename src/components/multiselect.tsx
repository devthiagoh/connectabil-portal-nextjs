
import { FormControl, FormErrorMessage } from '@chakra-ui/form-control';
import React, { useEffect, useState } from "react";
import Select, { OnChangeValue } from 'react-select';
import { useJobs } from '../context/jobs.context';
import api from "../services/api";


export const MultiSelect = ({job, name, error = null}) => {

    const { companies, setCompanies } = useJobs();
    const [ options, setOptions ] = useState([]);
    const selectedCompanies = [];
    
    useEffect(() => {
        api.get('/companies').then(({ data }) => {
            const options = [];

            data.map(company => {
                options.push({ value: company._id, label: company.name });
            });
            
            setOptions(options);
        });

        loadJobCompanies();
    }, []);
    
    const loadJobCompanies = async () => {
        const promise = job?.companies?.map( async company => {
            await selectedCompanies.push({ value: company._id, label: company.name });
        });
    
        await Promise?.all(promise);
    }
    
    const onChange = (selectedOptions: OnChangeValue<any, true>) => {
        let selecteds = [];
        selectedOptions.forEach( option => {
            selecteds.push(option.value);
        });
        setCompanies(selecteds);
    };

    return ( 
        <FormControl marginY="1rem" w="100%" borderRadius="xl" isInvalid={!!error}>
            <Select
                isMulti
                name={name}
                options={options}
                className="basic-multi-select"
                classNamePrefix="select"
                placeholder='Associar a uma empresa'
                onChange={onChange}
                defaultValue={selectedCompanies}
            />
            {!!error && <FormErrorMessage>{error}</FormErrorMessage>}
        </FormControl>
    )
}