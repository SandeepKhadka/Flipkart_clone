import { Box, Button, Flex, HStack, Heading, Icon, Menu, MenuButton, MenuItem, MenuList, Stack } from "@chakra-ui/react";
import { FaBars, FaRegUserCircle } from "react-icons/fa";
import Balance from "./Balance";

const Topnav = ({ title, onOpen }) => {
    return (
        <Box px="4" bg="white">
            <HStack maxW="70rem" justify="space-between" boxShadow="sm" h="64px" mx="auto">
                <Icon as={FaBars} onClick={onOpen} display={{
                    base: "block",
                    lg: "none"
                }}/>
                {/* <Box pl="114px"> */}
                <Heading fontWeight="medium" fontSize="28px">{title}</Heading>
                {/* </Box> */}
                {/* <Box pr="210px"> */}
                <Menu>
                    <MenuButton>
                        <Icon as={FaRegUserCircle} fontSize="25px" />
                    </MenuButton>
                    <MenuList>
                        <MenuItem>Logout</MenuItem>
                        <MenuItem>Support</MenuItem>
                    </MenuList>
                </Menu>
                {/* </Box> */}
            </HStack>
            {/* <Balance /> */}
        </Box>
    )
}

export default Topnav
