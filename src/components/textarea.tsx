import { FormControl, FormLabel, FormErrorMessage, Textarea } from "@chakra-ui/react";

export const TextAreaForm = ({label, name, error = null, ...rest}) => {
    
    return (
        <FormControl marginY="1rem" isInvalid={!!error} {...rest}>
            <FormLabel key={name} {...rest}>{label}</FormLabel>
            <Textarea name={name} size="md" {...rest} borderRadius="xl"/>

            {!!error && <FormErrorMessage>{error}</FormErrorMessage>}
        </FormControl>
    )
};