import { Box, Button, Divider, Grid, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text } from "@chakra-ui/react";
import { CompanyData } from "../interfaces/CompanyData";
import { deleteCompanyById } from "../services/companies/companies-service";


interface ConfirmationDeleteCompanyModalProps {
    isOpen: boolean;
    onClose: () => void;
    getAllCompanies: () => void;
    editCompany?: CompanyData;
}


export function ConfirmationDeleteCompanyModal({isOpen, onClose, getAllCompanies, editCompany}: ConfirmationDeleteCompanyModalProps){
    function closeModal(){      
        onClose();
    }

    async function tryDeleteCompany(){
        try {
            await deleteCompanyById(editCompany?.id!);
            getAllCompanies();
        } catch (error) {
            console.log(error);
        }finally{     
            onClose();
        }
    }
    
    return (
        <Modal isCentered isOpen={isOpen} onClose={closeModal} size="3xl" >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader background="#C90808" color="white">Confirmação de exclusão</ModalHeader>
          <ModalCloseButton color="white" />
          <ModalBody padding="31px">
            <Box>
                <Text>A empresa {editCompany?.name} será excluída. Tem certeza dessa ação?</Text>
            </Box>
          </ModalBody>
          <Divider />
          <ModalFooter>
            <Button p="8px 40px" colorScheme='red' mr={3} onClick={tryDeleteCompany}>
              Excluir
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
}