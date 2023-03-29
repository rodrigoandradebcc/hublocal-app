import { Flex, Heading, Image, Menu, MenuButton, MenuDivider, MenuGroup, MenuItem, MenuList } from "@chakra-ui/react";
import profileImg from '../assets/defaultProfile.png'
import { DownIcon } from "../assets/icons/DownIcon";

interface UserProfileProps {
    name: string;
    thumb?: string;
}

export function UserProfile({name}: UserProfileProps){
    return(
        <Flex h="100%" background="#EAEAEA" w="251px" alignItems="center" justifyContent="space-between" px="34px" >
            <Flex alignItems="center" >
                <Image src={profileImg} alt="background" w="50px" h="50px" />
                <Heading pl="9px" fontWeight="bold">{name}</Heading>
            </Flex>
            <Menu>
                <MenuButton as="button">
                    <DownIcon />
                </MenuButton>
                <MenuList>
                    <MenuGroup title='Profile'>
                    <MenuItem>Minha Conta</MenuItem>
                    <MenuItem>Configurações </MenuItem>
                    </MenuGroup>
                </MenuList>
            </Menu>
        </Flex>
    );
}