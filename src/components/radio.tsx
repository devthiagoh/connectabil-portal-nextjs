import { FormControl, FormLabel, FormErrorMessage, Radio, RadioGroup, Stack } from "@chakra-ui/react";

import { useState } from "react";
import { useJobs } from "../context/jobs.context";

export const RadioForm = ({label, name, error = null}) => {
    
    const { type, setType, setErros } = useJobs();
    const handleChangeType = (value) => { setType(value); setErros(null) };

    return (
        <FormControl marginY="1rem" isInvalid={!!error}>
            <FormLabel key={name}>{label}</FormLabel>
            <RadioGroup onChange={value => handleChangeType(value)} defaultValue={type} name={name}>
                <Stack spacing={4} alignItems="flex-start">
                    <Radio value="Misto">Misto</Radio>
                    <Radio value="Presencial">Presencial</Radio>
                    <Radio value="Remoto">Remoto</Radio>
                </Stack>
            </RadioGroup>
            {!!error && <FormErrorMessage>{error}</FormErrorMessage>}
        </FormControl>
    )
};