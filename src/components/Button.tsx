import { forwardRef } from "react";
import { Button as ChakraButton, ButtonProps as ChakraButtonProps } from "@chakra-ui/react";

interface ButtonProps extends ChakraButtonProps {
    title: string;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ title, ...rest }: ButtonProps, ref) => (
    <ChakraButton
      {...rest}
      ref={ref}
    >
      {title}
    </ChakraButton>
  ),
);
