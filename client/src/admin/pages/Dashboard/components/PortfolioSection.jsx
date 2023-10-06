import { Box, Button, HStack, Heading, Icon, Text, VStack } from "@chakra-ui/react"
import { BiArrowToBottom } from "react-icons/bi"
import { BiArrowToTop } from "react-icons/bi"

const PortfolioSection = () => {
    return (
        // <Box>
        <Box h="106px" padding="24px" bg="white" boxShadow="md" border="1px solid #EEEEF4" borderRadius="16px">
            <HStack gap="213px">
                <HStack gap="64px">
                    <Box w="156px" h="58px">
                        <Box>
                            <Text fontSize="14px" color="#535D66" fontWeight="medium" marginBottom="12px">Total Portfolio Value</Text>
                            <Heading fontSize="24px" lineHeight="28px" color="#171717" fontWeight="medium">₹ 112,312.24</Heading>
                        </Box>
                    </Box>
                    <Box w="354px" h="56px">
                        <Box>
                            <Text fontSize="14px" color="#535D66" fontWeight="medium" marginBottom="12px">Wallet PortfolioSections</Text>
                            <HStack gap="32px">
                                <HStack>
                                    <Heading fontSize="24px" lineHeight="28px" color="#171717" fontWeight="medium">22.39401000</Heading>
                                    <Text fontSize="12px" color="#797E82" fontWeight="medium" padding="4px, 6px, 4px, 6px" borderRadius="100px" boxShadow='lg' background="#F3F3F7">BTC</Text>
                                </HStack>
                                <HStack>
                                    <Heading fontSize="24px" lineHeight="28px" color="#171717" fontWeight="medium">₹ 1,300.00</Heading>
                                    <Text fontSize="12px" color="#797E82" fontWeight="medium" padding="4px, 6px, 4px, 6px" borderRadius="100px" boxShadow='lg' outline="none" background="#F3F3F7">NPR</Text>
                                </HStack>
                            </HStack>
                        </Box>
                    </Box>
                </HStack>
                <Box w="235px" h="58px">
                    <HStack gap="8px">
                        <Button w='107px' h='38px' borderRadius='10px' padding='10px, 16px, 10px, 16px' background="#5F00D9">
                            <HStack gap="8px">
                                <Icon as={BiArrowToBottom} color="#FFFFFF" fontWeight="medium" />
                                <Text color="#FFFFFF" fontSize="14px" fontWeight="normal">
                                    Deposit
                                </Text>
                            </HStack>
                        </Button>
                        <Button w='107px' h='38px' borderRadius='10px' padding='10px, 16px, 10px, 16px' background="#5F00D9">
                            <HStack gap="8px">
                                <Icon as={BiArrowToTop} color="#FFFFFF" fontWeight="medium" />
                                <Text color="#FFFFFF" fontSize="14px" fontWeight="normal">
                                    Withdraw
                                </Text>
                            </HStack>
                        </Button>
                    </HStack>
                </Box>
            </HStack>
        </Box >
        // </Box >
    )
}

export default PortfolioSection
