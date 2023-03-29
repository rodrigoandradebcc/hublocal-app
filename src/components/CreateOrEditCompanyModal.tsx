import { Box, Button, Divider, Grid, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text } from "@chakra-ui/react";
import debounce from "lodash.debounce";
import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';
import { AuthContext } from "../contexts/auth";
import { CompanyEditOrCreateData } from "../interfaces/CompanyCreateData";
import { CompanyData } from "../interfaces/CompanyData";
import { CompanyFormData } from "../interfaces/CompanyFormData";
import { postCreateCompany, updateCompany } from "../services/companies/companies-service";
import { formatCNPJ } from "../utils/formatCNPJ";
import { isCNPJValid } from "../utils/isCNPJValid";
import { cnpjRegex } from "../utils/regexCNPJ";

interface CreateOrEditCompanyModalProps {
    isOpen: boolean;
    onClose: () => void;
    editCompany?: CompanyData;
    getAllCompanies: () => void;
}

export function CreateOrEditCompanyModal({isOpen, onClose, editCompany, getAllCompanies}: CreateOrEditCompanyModalProps){
    const { register, handleSubmit, control, reset ,setError, formState: { errors } } = useForm<CompanyEditOrCreateData>({
      mode: "onChange",
      reValidateMode: "onChange",
    });
    const { user } = useContext(AuthContext);
  
    function setClearFields(){
      reset({});
    }

    async function fillFormCompanyData() {
      if(editCompany !== undefined){
        reset({
          cnpj: editCompany.cnpj,
          name: editCompany.name,
          website: editCompany.website 
        })
      }
    }

    useEffect(() => {
      fillFormCompanyData();
    }, [editCompany]);

    async function onSubmit(data: CompanyEditOrCreateData){
      try {
        if(editCompany === undefined){
          await postCreateCompany(user?.id!, data);
        } else {
          await updateCompany(editCompany?.id!, data);
          getAllCompanies();
        }

        toast.success('Empresa cadsatrada com sucessp')
      } catch (error) {
        console.log(error);
      } finally {
        closeModal();
      }
    }

    const validateCNPJ = debounce((cnpj: string) => {
        if (!isCNPJValid(cnpj)) { 
          setError('cnpj', { type: 'custom', message: 'custom message' });
        }
    }, 500);

    function handleCNPJChange(event: any) {
      const value = event.target.value.replace(/\D/g, "");
      const formattedValue = formatCNPJ(value);
      event.target.value = formattedValue;
      validateCNPJ(formattedValue);
    }

    function closeModal(){
      console.log('sendo chamado');
      
      setClearFields();
      onClose();
    }
   

    return(
        <Modal isCentered isOpen={isOpen} onClose={closeModal} size="3xl" >
        <ModalOverlay />
        <ModalContent as="form" onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader background="#0385FD" color="white">Adicionar empresa</ModalHeader>
          <ModalCloseButton color="white" />
          <ModalBody padding="31px">
            <Box>
              <Grid
                  templateColumns={{ base: "1fr", md: "repeat(1, 1fr)" }}
                  gap={{ base: 0, md: 6 }}
                >
                <Box>
                  <Text>Nome</Text>
                  <Input  {...register("name")} padding="18px" title="Email" borderRadius="5px" mb="11px"/>
                </Box>
              </Grid>
              <Grid
                  templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
                  gap={{ base: 0, md: 6 }}
                >
                <Box>
                  <Text>Website</Text>
                  <Input  {...register("website")} padding="18px" borderRadius="5px" mb="11px"/>
                </Box>
                <Box mb="70px">
                  <Text>CNPJ</Text>
                  <Input
                    {...register("cnpj", { required: true, pattern: cnpjRegex })}
                    padding="18px"
                    borderRadius="5px"
                    onChange={handleCNPJChange}
                    mb="11px"
                  />
                  {errors.cnpj && errors.cnpj.type === "pattern" && (
                    <Text color="red">Insira um CNPJ válido</Text>
                  )}
                </Box>
              </Grid>
            </Box>
          </ModalBody>
          <Divider />
          <ModalFooter>
            <Button colorScheme='blue' mr={3} type="submit">
              {editCompany?.name === undefined ? "Adicionar" : "Salvar"}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
}