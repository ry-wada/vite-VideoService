import { Button as ChakraButton } from "@chakra-ui/react";

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
}

export const Button = ({ onClick, children }: ButtonProps) => (
  <ChakraButton onClick={onClick} mt={4} width="full">
    {children}
  </ChakraButton>
);
