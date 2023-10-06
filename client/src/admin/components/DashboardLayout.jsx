import { Box, Container, Flex, useDisclosure } from "@chakra-ui/react"
import Sidenav from "./Sidenav"
import Topnav from "./Topnav"
import SideDrawer from "./SideDrawer"

const DashboardLayout = ({ title, children }) => {

    const { isOpen, onClose, onOpen } = useDisclosure();

    return (
        <div>
            <Flex>
                <Box  minH="100vh" display={{
                    base: 'none',
                    lg: 'flex'
                }}>
                    <Sidenav />
                </Box>
                <SideDrawer isOpen={isOpen} onClose={onClose} />
                <Box flexGrow="1">
                    <Topnav title={title} onOpen={onOpen} />
                    <Container mt="6" maxW="80rem">{children}</Container>
                </Box>
            </Flex>
        </div>
    )
}

export default DashboardLayout
