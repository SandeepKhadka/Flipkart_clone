import { Box, HStack, Heading, Icon, Stack, Text } from "@chakra-ui/react";
import { RxDashboard } from 'react-icons/rx';
import { MdOutlineProductionQuantityLimits } from 'react-icons/md';
import { FaBorderAll } from 'react-icons/fa';
import { FiUsers } from 'react-icons/fi';
import { BiSupport } from 'react-icons/bi';
import { Link, useLocation } from "react-router-dom";

const Sidenav = () => {
    const location = useLocation();

    const navLinks = [
        {
            icon: RxDashboard,
            text: "Dashboard",
            link: "/admin",
        },
        {
            icon: MdOutlineProductionQuantityLimits,
            text: "Products",
            link: "/admin/products",
        },
        {
            icon: FaBorderAll,
            text: "Orders",
            link: "/admin/orders",
        },
        {
            icon: FiUsers,
            text: "Users",
            link: "/admin/users",
        }
    ];

    return (
        <Stack bg="white" justifyContent="space-between" boxShadow={{
            base: 'none',
            lg: 'lg',
        }} w="16rem" h="100%">
            <Box>
                <Heading textAlign="center" fontSize="20px" as="h1" pt="3.5rem">Flipkart</Heading>
                <Box mt="6" mx="3" style={{ cursor: 'pointer' }}>
                    {navLinks.map((nav) => (
                        <Link
                            to={nav.link}
                            style={{ textDecoration: 'none', color: 'inherit', }}
                            key={nav.text}
                        >
                            <HStack
                                borderRadius="10px"
                                py="3"
                                px="4"
                                _hover={{
                                    bg: "#F3F3F7",
                                    color: "#171717",
                                }}
                                color="#797E82"
                                className={location.pathname === nav.link ? 'active-link' : ''}

                            >
                                <Icon as={nav.icon} />
                                <Text fontSize="14px" fontWeight="medium">{nav.text}</Text>
                            </HStack>
                        </Link>
                    ))}
                </Box>
            </Box>
            <Box mt="6" mx="3" mb="6">
                <Link
                    to="/support"
                    style={{ textDecoration: 'none', color: 'inherit' }}
                >
                    <HStack
                        borderRadius="10px"
                        py="3"
                        px="4"
                        _hover={{
                            bg: "#F3F3F7",
                            color: "#171717",
                        }}
                        color="#797E82"
                        className={location.pathname === '/support' ? 'active-link' : ''}

                    >
                        <Icon as={BiSupport} />
                        <Text fontSize="14px" fontWeight="medium">Support</Text>
                    </HStack>
                </Link>
            </Box>
        </Stack>
    );
}

export default Sidenav;
