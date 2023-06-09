import { Box, Flex, Heading, Image, Text, VStack } from "@chakra-ui/react";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import personImg from '../assets/loginPersonImg.png';
import logoHubLocal from '../assets/logoHubLocal.png';
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { UserFormData } from "../interfaces/UserFormData";
import { yupResolver } from '@hookform/resolvers/yup';
import { signUpSchema } from "../validations/signUpSchema";
import { postCreateUser } from "../services/users/users-service";
import { toast } from "react-toastify";

export const SignUp = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<UserFormData>({
    resolver: yupResolver(signUpSchema),
  });
  const navigate = useNavigate();

  function clearForm(){
    reset();
  }

  async function onSubmit(formData: UserFormData) {
    console.log({formData});
    try {
        await postCreateUser(formData);
        toast.success('Usuário cadsatrado com sucesso');
        clearForm();
    } catch (error) {
        console.log(error);
        toast.error('Ops! Algo deu errado!');
    }
  }

  function goToLogin(): void {
    navigate('/');
  }

  return(
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
                      <Text>Nome</Text>
                      <Input {...register("name")} width="400px" padding="18px" title="Email" borderRadius="5px" mb="11px"/>
                      {errors.name && (
                        <Text color="red">{errors.name.message}</Text>
                       )}

                      <Text>Email</Text>
                      <Input type="email" {...register("email")} width="400px" padding="18px" title="Email" borderRadius="5px" mb="11px"/>
                      {errors.email && (
                        <Text color="red">{errors.email.message}</Text>
                       )}

                      <Text>Senha</Text>
                      <Input {...register("password")} type="password" width="400px" padding="18px" borderRadius="5px" mb="24px" />
                      {errors.password && (
                        <Text color="red">{errors.password.message}</Text>
                       )}

                      <Text>Repetir Senha</Text>
                      <Input {...register("confirmationPassword")} type="password" width="400px" padding="18px" borderRadius="5px" mb="24px" />
                      {errors.confirmationPassword && (
                        <Text color="red">{errors.confirmationPassword.message}</Text>
                       )}

                      <Button
                          type="submit"
                          title="Registrar"
                          background="#0385FD"
                          width="400px"
                          height="60px"
                          color="white"
                          borderRadius="5px"
                          textTransform="uppercase"
                          fontWeight="bold"
                      />
                        <Button
                            title="Logar"
                            background="#00CC99"
                            width="400px" height="60px"
                            color="white" borderRadius="5px"
                            textTransform="uppercase"
                            mt="136px"
                            fontWeight="bold"
                            onClick={goToLogin}
                        />
                  </VStack>
              </Flex>
          </Box>
      </Flex>
    );
}

