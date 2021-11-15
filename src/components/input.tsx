import { FormControl, FormLabel, Input, FormErrorMessage } from "@chakra-ui/react";
import InputMask from "react-input-mask";

export const InputForm = ({label, name, mask, error = null, ...rest}) => {
    return (
        <FormControl marginY="1rem" isInvalid={!!error} {...rest}>
          <FormLabel key={name} {...rest}>{label}</FormLabel>
          <Input type="text" name={name} id={name} {...rest} borderRadius="xl" as={InputMask} mask={mask} maskChar={"_"}/>

          {!!error && <FormErrorMessage>{error}</FormErrorMessage>}
        </FormControl>
    )
};