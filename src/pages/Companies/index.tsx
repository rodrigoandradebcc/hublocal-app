import { Button, Divider, Flex, Heading, Table, IconButton, TableContainer, Tbody, Td, Th, Thead, Tr, useDisclosure, Box } from "@chakra-ui/react";
import { useCallback, useContext, useEffect, useState } from "react";
import { CompanyIcon } from "../../assets/icons/CompanyIcon";
import { EditIcon } from "../../assets/icons/EditIcon";
import { LocationIcon } from "../../assets/icons/LocationIcon";
import { TrashIcon } from "../../assets/icons/TrashIcon";
import { ConfirmationDeleteCompanyModal } from "../../components/ConfirmationDeleteCompanyModal";
import { CreateOrEditCompanyModal } from "../../components/CreateOrEditCompanyModal";
import { UserProfile } from "../../components/UserProfile";
import { AuthContext } from "../../contexts/auth";
import { CompanyData } from "../../interfaces/CompanyData";
import { CompanyResponseData } from "../../interfaces/CompanyResponseData";
import { getAllCompaniesByUserId, getCompanyById } from "../../services/companies/companies-service";

export const Companies = () => {
  const [companies, setCompanies] = useState<CompanyResponseData[]>([]);
  const [editCompany, setEditCompany] = useState<CompanyData>();

  const { user } = useContext(AuthContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenExcludeModal,
    onOpen: onOpenExcludeModal,
    onClose: onCloseExcludeModal
  } = useDisclosure()


  async function getAllCompanies(){
    if(user?.id){
      const response = await getAllCompaniesByUserId(user?.id);
      setCompanies(response);
    }
  }

  useEffect(() => {
    (async () => {
      await getAllCompanies();
    })();
  }, []);

  async function handleEditCompany(companyId: string) {
    const response = await getCompanyById(companyId);
    setEditCompany(response);
    onOpen();
  }

  async function handleRemoveCompany(companyId: string) {
    const response = await getCompanyById(companyId);
    setEditCompany(response);
    onOpenExcludeModal();
  }



  const columnsSchema = ['Empresa','Qt de Locais','Ações'];

  return (
    <Flex background="#F5F5F5" h='calc(100vh)' width="full" flexDirection="column">
      <Flex
          w="100%"
          px="6"
          align="center"
          justify="space-between"
          background="#FFFFFF"
          height="80px"
        >
          <Flex paddingLeft="34px" >
            <CompanyIcon />
            <Heading marginLeft="10px" fontWeight="bold" fontSize="20px">Minhas Empresas</Heading>
          </Flex>
          <UserProfile name="Janiu" />
      </Flex>

      <Flex>

        {companies.length > 0 ? (
          <Box w="full" flexDirection="column" >
            
          <Box w="full" flexDirection="column" display="flex" justifyContent="center" alignItems="center">
            <Box w="95%" marginBottom="25px">
              <Flex w="full" alignItems="flex-end" justifyContent="flex-end">
                <Button maxW="258px" onClick={onOpen} mt="35px" borderRadius="5px" boxShadow="0px 2px 2px rgba(0, 0, 0, 0.25)" fontWeight="bold" color="white" background="#0385FD" paddingX="44px" paddingY="16px">Adicionar Empresa</Button>
              </Flex>
            </Box>

            <Box w="95%" background="#fff">
              <TableContainer>
                <Table boxShadow="md" overflow="auto">
                  <Thead>
                    <Tr>
                      {columnsSchema.map(column => (
                        <Th key={column}>{column}</Th>
                      ))}
                    </Tr>
                  </Thead>
                  <Tbody>
                    {companies.map(company => (
                      <>
                        <Tr>
                          <Td>{company.name}</Td>
                          <Td>{company.numberOfLocations}</Td>
                          <Td>
                            <IconButton
                              variant="ghost"
                              icon={<EditIcon />}
                              aria-label="Pesquisa"
                              color="primary.default"
                              onClick={() => handleEditCompany(company.id)}
                            />
                            <IconButton
                              variant="ghost"
                              icon={<LocationIcon />}
                              aria-label="Pesquisa"
                              color="primary.default"
                            />
                            <IconButton
                              variant="ghost"
                              icon={<TrashIcon />}
                              aria-label="Pesquisa"
                              color="primary.default"
                              onClick={() => handleRemoveCompany(company.id)}
                            />
                          </Td>
                        </Tr>
                        <Divider />
                      </>
                    ))}
                  </Tbody>
                </Table>
              </TableContainer>
            </Box>
          </Box>
          </Box>
          ) :
          <Flex h="100%" alignItems="center" justifyContent="center" textAlign="center" flexDirection="column">
            <Heading fontWeight="bold" fontSize="50px" w="600px">
              Nenhuma empresa cadastrada!
            </Heading>
            <Button onClick={onOpen} mt="35px" borderRadius="5px" boxShadow="0px 2px 2px rgba(0, 0, 0, 0.25)" fontWeight="bold" color="white" background="#0385FD" paddingX="44px" paddingY="16px">Adicionar Empresa</Button>
          </Flex>
        }
      </Flex>
      <CreateOrEditCompanyModal
        isOpen={isOpen}
        onClose={onClose}
        editCompany={editCompany}
        getAllCompanies={getAllCompanies}
        onOpenExcludeModal={onOpenExcludeModal}
      />

      <ConfirmationDeleteCompanyModal
        isOpen={isOpenExcludeModal}
        onClose={onCloseExcludeModal}
        editCompany={editCompany}
        getAllCompanies={getAllCompanies}
      />
    </Flex>
  );
}
