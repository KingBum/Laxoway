import React, { useEffect, useState } from 'react'
import NavBar from '../../components/navbar/NavBar'
import { Box, Flex, HStack, Text, VStack, Image, Link } from '@chakra-ui/react'
import Footer from '../../components/footer/Footer'
import { FaBus } from 'react-icons/fa'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
import moment from 'moment';
import numeral from 'numeral'

function Payment() {
    const state = useLocation().state;
    const path = window.location.pathname;
    const id = path.substring(path.lastIndexOf('/') + 1);
    // @ts-ignore
    const urlBackend = import.meta.env.VITE_URL_BACKEND

    const [booking, setBooking] = useState<any>()

    console.log(state)
    console.log(booking)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${urlBackend}/api/v1/booking/${id}`);
                setBooking(response.data)
            } catch (error) {
                console.error('Error fetching data:', error.message);
            }
        };

        fetchData(); // Call the fetchData function when the component mounts
    }, [id]);

    return (
        <>
            <NavBar />
            <Flex w={{ base: "full", lg: "75%" }} margin="0 auto" gap="2rem" justifyContent="center" py={5}>
                <Flex flex={2} flexDirection="column" gap={5}>
                    <Text fontSize={"32px"} fontWeight="500">Chọn hình thức thanh toán</Text>
                    <Link href='/success' _hover={{ border: "none" }}>
                        <HStack justifyContent={"space-between"} borderRadius="1rem" boxShadow="0px 0px 5px 2px rgba(188,188,188,0.75)" p={4}>
                            <Text>Ứng dụng hỗ trợ thanh toán VNPAY QR</Text>
                            <Image
                                boxSize='64px'
                                objectFit='cover'
                                src='https://sandbox.vnpayment.vn/paymentv2/images/icons/mics/64x64-vnpay-qr.svg'
                            />
                        </HStack>
                    </Link>
                    <HStack justifyContent={"space-between"} borderRadius="1rem" boxShadow="0px 0px 5px 2px rgba(188,188,188,0.75)" p={4}>
                        <Text>Thẻ nội địa và thẻ ngân hàng</Text>
                        <Image
                            boxSize='64px'
                            objectFit='cover'
                            src='https://sandbox.vnpayment.vn/paymentv2/images/icons/mics/64x64-bank.svg'
                        />
                    </HStack>
                    <HStack justifyContent={"space-between"} borderRadius="1rem" boxShadow="0px 0px 5px 2px rgba(188,188,188,0.75)" p={4}>
                        <Flex flexDirection="column">
                            <Text>Thẻ thanh toán quốc tế</Text>
                            <Image
                                objectFit='cover'
                                src='https://sandbox.vnpayment.vn/paymentv2/images/icons/mics/176x24-credit.svg'
                            />

                        </Flex>
                        <Image
                            boxSize='64px'
                            objectFit='cover'
                            src='https://sandbox.vnpayment.vn/paymentv2/images/icons/mics/64x64-atm.svg'
                        />
                    </HStack>
                    <HStack justifyContent={"space-between"} borderRadius="1rem" boxShadow="0px 0px 5px 2px rgba(188,188,188,0.75)" p={4}>
                        <Text>Ví điện tử VNPAY</Text>
                        <Image
                            boxSize='64px'
                            objectFit='cover'
                            src='https://sandbox.vnpayment.vn/paymentv2/images/icons/mics/64x64-vi-vnpay.svg'
                        />
                    </HStack>
                </Flex>
                <Flex flex={1} w="full" maxH="720px" top={0} pos="sticky" flexDirection="column" borderRadius="1rem" boxShadow="0px 0px 5px 2px rgba(188,188,188,0.75)" p={4} gap={4}>
                    <Box border="2px dashed #FA7436" borderRadius="1rem" p={4}>
                        <HStack gap={3}>
                            <FaBus fontSize={"32px"} color="#FA7436" />
                            <VStack alignItems="start">
                                <Text fontSize="24px" fontWeight={"500"}>
                                    Thông tin vé xe
                                </Text>
                                <Text color={"colors.subText"}>
                                    Mã đặt chỗ {booking?._id && booking._id.slice(-6)}
                                </Text>
                            </VStack>
                        </HStack>
                    </Box>
                    <Box border="2px dashed #FA7436" borderRadius="1rem" p={4}>
                        <Text fontWeight="500" fontSize="20px">Thông tin hành khách</Text>
                        <Flex justifyContent="space-between" fontWeight="500">
                            <Text color={"colors.subText"}>Họ và tên</Text>
                            <Text>{booking?.userOption.gender === "male" ? "Ông" : "Bà"} {booking?.userOption.fullName}</Text>
                        </Flex>
                        <Flex justifyContent="space-between" fontWeight="500">
                            <Text color={"colors.subText"}>Số điện thoại</Text>
                            <Text>{booking?.userOption.phoneNumber}</Text>
                        </Flex>
                        <Flex justifyContent="space-between" fontWeight="500">
                            <Text color={"colors.subText"}>Email</Text>
                            <Text>{booking?.userOption.email}</Text>
                        </Flex>
                    </Box>
                    <Box border="2px dashed #FA7436" borderRadius="1rem" p={4}>
                        <Text fontWeight="500" fontSize="20px">Thông tin chuyến đi</Text>
                        <Flex justifyContent="space-between" fontWeight="500">
                            <Text color={"colors.subText"}>Tuyến xe</Text>
                            <Text>{booking?.trip.route.name}</Text>
                        </Flex>
                        <Flex justifyContent="space-between" fontWeight="500">
                            <Text color={"colors.subText"}>Điểm đón/trả</Text>
                            <Text>{booking?.trip.route.origin_hub} - {booking?.trip.route.dest_hub}</Text>
                        </Flex>
                        <Flex justifyContent="space-between" fontWeight="500">
                            <Text color={"colors.subText"}>Thời gian</Text>
                            <Text>{moment(booking?.trip.departureTime).format('HH:mm MMM DD')} - {moment(booking?.trip.arrivalTime).format('HH:mm MMM DD')}</Text>
                        </Flex>
                        <Flex justifyContent="space-between" fontWeight="500">
                            <Text color={"colors.subText"}>Số ghế</Text>
                            <Text>
                                {booking?.numberOfSeats.map((seat, index) => (
                                    <React.Fragment key={seat._id}>
                                        <span>{seat.seatNumber}</span>
                                        {index !== booking.numberOfSeats.length - 1 && <span>, </span>}
                                    </React.Fragment>
                                ))}
                            </Text>
                        </Flex>
                    </Box>
                    <Box border="2px dashed #FA7436" borderRadius="1rem" p={4}>
                        <Text fontWeight="500" fontSize="20px">Chi tiết giá</Text>
                        <Flex justifyContent="space-between" fontWeight="500">
                            <Text color={"colors.subText"}>Giá vé</Text>
                            <Text>{numeral(state.price).format('0,0')}</Text>
                        </Flex>
                        <Flex justifyContent="space-between" fontWeight="500">
                            <Text color={"colors.subText"}>Giá dịch vụ</Text>
                            <Text>{numeral(state.service).format('0,0')}</Text>
                        </Flex>
                        <Flex justifyContent="space-between" fontWeight="500">
                            <Text color={"colors.subText"}>Phí thanh toán</Text>
                            <Text>0</Text>
                        </Flex>
                        <Flex justifyContent="space-between" fontWeight="500">
                            <Text color={"colors.subText"}>Giá giảm</Text>
                            <Text>- {numeral(state.offers).format('0,0')}</Text>
                        </Flex>
                        <Box bg="gray" w="full" h="1px" my={1}></Box>
                        <Flex justifyContent="space-between" fontWeight="500">
                            <Text color={"colors.subText"}>Tổng tiền</Text>
                            <Text color={"colors.primary"}>{numeral(state.totalPrice).format('0,0')}</Text>
                        </Flex>
                    </Box>
                </Flex>
            </Flex >
            <Footer />
        </>
    )
}

export { Payment }