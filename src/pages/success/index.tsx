import React from 'react'
import NavBar from '../../components/navbar/NavBar'
import Footer from '../../components/footer/Footer'
import { Box, Flex, Text, VStack, Image, Button, Center, AbsoluteCenter, HStack } from '@chakra-ui/react'
import { FaCheckCircle } from "react-icons/fa";
import { GoDotFill } from 'react-icons/go';

function Success() {
    return (
        <>
            <NavBar />
            <Flex w={{ base: "full", lg: "75%" }} flexDirection={"column"} margin="0 auto" gap="2rem" justifyContent="center" py={5}>
                <VStack>
                    <FaCheckCircle color='#31A91D' fontSize={"52px"} />
                    <Text color='#31A91D' fontSize="32px">Congratulations! You have successfully booked tickets</Text>
                    <Text color='colors.subText'>please carry ERS / VRM / SMS / Mail sent to your contact details, along with a relavant ID proof while travelling</Text>
                </VStack>
                <Flex w={"full"} gap={"2rem"}>
                    <Flex height={"fit-content"} flex={2} p={4} flexDirection={"column"} gap={3} borderRadius={"1rem"} border={"1px solid #ccc"}>
                        <Flex fontWeight={"500"} alignItems="center" justifyContent={"space-between"}>
                            <Text>Mã số vé: 1234567890</Text>
                            <Text>ID Giao dịch: 351511859256378</Text>
                        </Flex>
                        <Flex flexDirection={"column"}>
                            <Flex justifyContent="space-between" fontWeight="500">
                                <Text>Feb 16</Text>
                                <Text>Feb 17</Text>
                            </Flex>
                            <Flex alignItems="center" justifyContent="space-between" fontSize="14px">
                                <Flex flexDirection="column">
                                    <Text>17:30</Text>
                                    <Text>Đà Nẵng</Text>
                                </Flex>
                                <Flex alignItems="center" flex={1} px={2}>
                                    <GoDotFill color='gray' />
                                    <Box position='relative' bg="gray" h="1px" w="full">
                                        <AbsoluteCenter bg='white' px='4'>
                                            16 Giờ
                                        </AbsoluteCenter>
                                    </Box>
                                    <GoDotFill color='gray' />
                                </Flex>
                                <Flex flexDirection="column">
                                    <Text>5:30</Text>
                                    <Text>Hà Nội</Text>
                                </Flex>
                            </Flex>
                        </Flex>
                        <Flex justifyContent="space-between" alignItems={"center"}>
                            <Text fontWeight={"500"}>E-Tickets has been sent to:</Text>
                            <Flex flexDirection={"column"}>
                                <Text>nguyenvana@gmail.com</Text>
                                <Text>0123456789 (Messenger)</Text>
                            </Flex>
                        </Flex>
                        <Text fontWeight={"500"}>Traveller Details</Text>
                        <Flex flexDirection={"column"}>
                            <Flex justifyContent="space-between" fontWeight="500">
                                <Text color={"colors.subText"}>Họ và tên</Text>
                                <Text>Ông Nguyễn Văn A</Text>
                            </Flex>
                            <Flex justifyContent="space-between" fontWeight="500">
                                <Text color={"colors.subText"}>Số điện thoại</Text>
                                <Text>0123456789</Text>
                            </Flex>
                            <Flex justifyContent="space-between" fontWeight="500">
                                <Text color={"colors.subText"}>Email</Text>
                                <Text>nguyenvana@gmail.com</Text>
                            </Flex>
                        </Flex>
                        <Flex fontSize="20px" fontWeight={"500"} justifyContent={"space-between"}>
                            <Text>Total price</Text>
                            <Text>3000000</Text>
                        </Flex>
                    </Flex>
                    <Flex flex={1} flexDirection={"column"} gap={5}>
                        <Center><Image
                            boxSize='220px'
                            objectFit='cover'
                            src='https://t3.gstatic.com/licensed-image?q=tbn:ANd9GcSh-wrQu254qFaRcoYktJ5QmUhmuUedlbeMaQeaozAVD4lh4ICsGdBNubZ8UlMvWjKC'
                            alt='QR Code'
                        /></Center>
                        <Text textAlign={"center"} color={"colors.subText"}>Scan the code to view in any device</Text>
                        <Button variant='outline'>Print ticket</Button>
                        <Button variant='primary'>Book another ticket</Button>
                        <Button variant='primary'>Download Ticket</Button>
                    </Flex>

                </Flex>
            </Flex>
            <Footer />
        </>
    )
}

export {Success}