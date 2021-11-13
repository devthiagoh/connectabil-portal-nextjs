import { FormControl, FormLabel, Input, FormErrorMessage } from "@chakra-ui/react";

export const InputForm = ({label, name, error = null, ...rest}) => {
    return (
        <FormControl marginY="1rem" isInvalid={!!error} {...rest}>
          <FormLabel key={name} {...rest}>{label}</FormLabel>
          <Input type="text" name={name} id={name} {...rest} borderRadius="xl"/>

          {!!error && <FormErrorMessage>{error}</FormErrorMessage>}
        </FormControl>
    )
};