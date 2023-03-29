import { forwardRef } from "react";
import {
  FormControl,
  FormLabel,
  Input as ChakraInput,
  InputProps as ChakraInputProps,
  FormErrorMessage,
  FormHelperText,
} from "@chakra-ui/react";

interface InputProps extends ChakraInputProps {
  name: string;
  label?: string;
  isRequired?: boolean;
  error?: string;
  marginTop?: string;
  helperText?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({
    name, label, isRequired, error, helperText, marginTop, ...rest
  }: InputProps, ref) => (
    <FormControl
      id={name}
      isInvalid={!!error}
      marginTop={marginTop}
      isRequired={isRequired}
    >
      {label && (
        <FormLabel>
          {label}
        </FormLabel>
      )}
      <ChakraInput
        name={name}
        {...rest}
        ref={ref}
      />
      {helperText && (
        <FormHelperText>
          {helperText}
        </FormHelperText>
      )}
      <FormErrorMessage>{error}</FormErrorMessage>
    </FormControl>
  ),
);

Input.defaultProps = {
  label: "",
  isRequired: false,
  error: "",
  marginTop: "4",
  helperText: "",
};
