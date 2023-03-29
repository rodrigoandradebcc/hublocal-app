import { Box, Flex, Heading, Image, Text, VStack } from "@chakra-ui/react";
import { useCallback, useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import personImg from '../assets/loginPersonImg.png';
import logoHubLocal from '../assets/logoHubLocal.png';
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { AuthContext } from "../contexts/auth";
import { LoginFormData } from "../interfaces/LoginFormData";

export function LoginPage (): JSX.Element {
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm<LoginFormData>();
    const { signIn } = useContext(AuthContext);

    function goToSignUp(): void {
        navigate('/sign-up');
    }

    const onSubmit = useCallback((formData: LoginFormData) => {
        signIn({ email: formData.email, password: formData.password });
    }, [signIn])


    return (
        <Flex h='calc(100vh)' width="full">
            <Box h="full" flex="1" background="#0485FF" maxH="max-content" >
                <Flex h='calc(100vh)' flexDirection="column" alignItems="center" justifyContent="flex-end">
                    <Image src={personImg} alt="background" />

                    <Flex w="full" background="#00CC99" height="198px" color="white" display="flex" flexDirection="column" alignItems="center" justifyContent="center">
                        <Heading textAlign="center" alignItems="center" paddingX="20" as='h1' fontSize="35px" fontWeight="bold">Junte-se a vários clientes satisfeitos.</Heading>
                        <Text fontSize="16px" paddingX="66" textAlign="center">
                            Cliente HubLocal ganha mais relevância, autoridade e visibilidade. Mais de 7.000 marcas confiam na nossa plataforma. Seja uma delas!
                        </Text>
                    </Flex>
                </Flex>
            </Box>
            <Box h="full" flex="1" background="white" >
                <Flex h='calc(100vh)' flexDirection="column" alignItems="center" justifyContent="center">
                    <Image w="306px" src={logoHubLocal} alt="logo" mb="33px" />

                    <VStack as="form" alignItems="flex-start" onSubmit={handleSubmit(onSubmit)}>
                        <Text>Email</Text>
                        <Input {...register("email")} width="400px" padding="18px" title="Email" borderRadius="5px" mb="11px"/>

                        <Text>Senha</Text>
                        <Input {...register("password")} type="password" width="400px" padding="18px" borderRadius="5px" mb="24px" />

                        <Button
                            type="submit"
                            title="Logar"
                            background="#0385FD"
                            width="400px"
                            height="60px"
                            color="white"
                            borderRadius="5px"
                            textTransform="uppercase"
                            fontWeight="bold"
                        />

                        <Button
                            title="Criar Conta"
                            background="#00CC99"
                            width="400px" height="60px"
                            color="white" borderRadius="5px"
                            textTransform="uppercase"
                            mt="136px"
                            fontWeight="bold"
                            onClick={goToSignUp}
                        />
                    </VStack>
                </Flex>
            </Box>
        </Flex>
  )
}
