import React, { useState } from 'react'
import { Slide } from 'react-slideshow-image';
import { Box, Flex, Tab, TabList, TabPanel, TabPanels, Tabs, VStack, Text, HStack, Spacer, Button, Link } from '@chakra-ui/react'
import { FaDotCircle } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { FaBed } from "react-icons/fa";
import { TbAirConditioning } from "react-icons/tb";
import { FaWifi } from "react-icons/fa";
import { FaRegCalendarTimes } from "react-icons/fa";
import { TbCashBanknoteOff } from "react-icons/tb";
import {
    ListItem,
    UnorderedList,
} from '@chakra-ui/react'
import { policies } from '../../../constants'
import moment from 'moment';
import { useNavigate } from 'react-router-dom';



const divStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundSize: 'cover',
    height: '400px',
}
const slideImages = [
    {
        url: 'https://blogcdn.muaban.net/wp-content/uploads/2023/10/29204320/ve-xe-ha-noi-sai-gon-10.jpg',
    },
    {
        url: 'https://blogcdn.muaban.net/wp-content/uploads/2023/10/29204256/ve-xe-ha-noi-sai-gon-6.jpg',
    },
    {
        url: 'https://blogcdn.muaban.net/wp-content/uploads/2023/10/29204302/ve-xe-ha-noi-sai-gon-7.jpg',
    },
];

export default function Trip({ trip }) {
    const navigate = useNavigate();
    const mockupRoute = {
        origin: "Đà Nẵng",
        origin_hub: "VP Đà Nẵng, 201 - 203 Tôn Đức Thắng, phường Hòa Minh, quận Liên Chiểu. , TP.Đà Nẵng",
        option: [
            {
                name: "BXN Huế",
                hub: "VP Huế, 97 An Dương Vương , P.An Đông , TP.Huế , Tỉnh Thừa Thiên Huế"
            },
            {
                name: "Quảng Bình",
                hub: "VP Quảng Bình, 57 Nguyễn Công Trứ, Nam Lý, TP. Đồng Hới, Quảng Bình"
            },
        ],
        dest: "Hà Nội",
        dest_hub: "VP: Bến xe Giáp Bát, P. Giáp Bát, TP. Hà Nội",
    }

    const startTimeString = trip.departureTime;
    const endTimeString = trip.arrivalTime;

    // Tạo đối tượng thời gian Moment cho startTime và endTime
    const startTime = moment(startTimeString);
    const endTime = moment(endTimeString);

    // Tính toán thời gian chênh lệch
    let duration = endTime.diff(startTime);

    if (duration < 0) {
        // Nếu endTime trước startTime, thêm 1 ngày vào endTime
        endTime.add(1, 'day');
        duration = endTime.diff(startTime);
    }

    // Chia thời gian chênh lệch thành số giờ và số phút
    const hours = Math.floor(duration / (1000 * 60 * 60));
    const minutes = Math.floor((duration % (1000 * 60 * 60)) / (1000 * 60));

    const handleBuy = () => {
        navigate('/booking', { state: trip });
    };

    return (
        <Flex w="full" flexDirection="column" borderRadius="1rem" boxShadow="0px 0px 5px 2px rgba(188,188,188,0.75)" p={4}>
            <Flex w="full" justifyContent={"space-between"} alignItems={"center"}>
                <VStack spacing={-1}>
                    <Text fontSize="24px" fontWeight="500">{moment(trip.departureTime).format('HH:mm')}</Text>
                    <Text>{trip.route.origin_hub}</Text>
                </VStack>
                <HStack p="0 1rem" flex={1}>
                    <FaDotCircle fontSize="24px" color="green" />
                    <Box pos="relative" h="2px" bg="#ccc" w="200px">
                        <Text top="50%" left="50%" transform="translate(-50%, -50%)" color="colors.subText" pos="absolute" zIndex="2" bg="white" p={2}>{`${hours}:${minutes}`} Giờ</Text>
                    </Box>
                    <FaLocationDot fontSize="24px" color="orange" />
                </HStack>
                <VStack spacing={-1}>
                    <Text fontSize="24px" fontWeight="500">{moment(trip.arrivalTime).format('HH:mm')}</Text>
                    <Text>{trip.route.dest_hub}</Text>
                </VStack>
                <Spacer />
                <VStack ml="1rem" flex={1}>
                    <HStack fontSize="14px" color="colors.subText"><FaBed /><Text>{trip.car.name}</Text></HStack>
                    <Text fontSize="14px" color="colors.subText">{trip.availableSeats.length} chỗ trống</Text>
                    <Text fontSize="24px" fontWeight="bold" color="colors.primary" >{trip.price}đ</Text>
                </VStack>
            </Flex>
            <Flex w="full">
                <Tabs w="100%" variant='enclosed' colorScheme="orange">
                    <TabList>
                        <Tab>Đặc trưng</Tab>
                        <Tab>Tuyến Đường</Tab>
                        <Tab>Chính sách</Tab>
                        <Spacer></Spacer>
                        <Button onClick={handleBuy} variant="primary">Buy</Button>
                    </TabList>
                    <TabPanels w="100%">
                        <TabPanel p={4}>
                            <Flex>
                                <Flex flex={1} flexDirection="column" gap={3}>
                                    <VStack alignItems="start">
                                        <Text fontWeight="500">Đặc điểm kỹ thuật xe</Text>
                                        <Box border="2px solid #ccc" borderRadius=".5rem" p={2}>
                                            <Text><span style={{ fontWeight: "500" }}>Chỗ ngồi </span>
                                                <span>{trip.availableSeats.length} chỗ ngồi</span></Text>
                                            <Text><span style={{ fontWeight: "500" }}>Kiểu ghế ngồi</span>
                                                <span>1-1</span></Text>
                                            <Text><span style={{ fontWeight: "500" }}>Tiện ích</span>
                                            </Text>
                                            <HStack gap="1rem">
                                                <HStack alignItems="center">
                                                    <TbAirConditioning />
                                                    <Text>Máy điều hòa</Text>
                                                </HStack>
                                                <HStack alignItems="center">
                                                    <FaWifi />
                                                    <Text>Wifi</Text>
                                                </HStack>
                                            </HStack>

                                        </Box>
                                    </VStack>
                                    <VStack alignItems="start">
                                        <Text fontWeight="500">Chính sách đổi và hoàn</Text>
                                        <Box border="2px solid #ccc" borderRadius=".5rem" p={2}>
                                            <VStack bg="white" gap=".5rem" alignItems="start">
                                                <HStack gap={2} opacity={.6} >
                                                    <FaRegCalendarTimes fontSize="20px" />
                                                    <Flex alignItems="start" flexDirection="column">
                                                        <Text fontWeight="500">Không đổi lịch</Text>
                                                        <Text>Không thể đổi lịch sau khi đặt chỗ</Text>
                                                    </Flex>
                                                </HStack>
                                                <HStack gap={2} opacity={.6}>
                                                    <TbCashBanknoteOff fontSize="20px" />
                                                    <Flex alignItems="start" flexDirection="column">
                                                        <Text fontWeight="500">Không hoàn lại</Text>
                                                        <Text>Vé không thể hủy sau khi đặt</Text>
                                                    </Flex>
                                                </HStack>
                                            </VStack>

                                        </Box>
                                    </VStack>
                                </Flex>
                                <Flex flex={1} w="350px">
                                    <div className="slide-container" style={{ width: "350px" }}>
                                        <Slide>
                                            {slideImages.map((slideImage, index) => (
                                                <div key={index}>
                                                    <div style={{ ...divStyle, "objectFit": "cover", 'backgroundImage': `url(${slideImage.url})` }}>
                                                    </div>
                                                </div>
                                            ))}
                                        </Slide>
                                    </div>
                                </Flex>
                            </Flex>
                        </TabPanel>
                        <TabPanel p={4}>
                            <Flex alignItems="start" flexDirection="column">
                                <Flex gap={3}>
                                    <Text>17:30</Text>
                                    <Flex flexDirection="column" justifyContent="center" alignItems="center">
                                        <FaDotCircle fontSize="24px" color="green" />
                                        <Box height="35px" w="1px" bg="#ccc"></Box>
                                    </Flex>
                                    <Flex flexDirection="column">
                                        <Text>{mockupRoute.origin}</Text>
                                        <Text fontSize="12px" color="colors.subText">{mockupRoute.origin_hub}</Text>
                                    </Flex>
                                </Flex>
                                {mockupRoute.option.length === 0 ? <></> :
                                    <>
                                        {mockupRoute.option.map((item) => (
                                            <Flex key={item.hub} gap={3}>
                                                <Text>17:30</Text>
                                                <Flex flexDirection="column" justifyContent="center" alignItems="center">
                                                    <FaDotCircle fontSize="24px" color="gray" />
                                                    <Box height="35px" w="1px" bg="#ccc"></Box>
                                                </Flex>
                                                <Flex flexDirection="column">
                                                    <Text>{item.name}</Text>
                                                    <Text fontSize="12px" color="colors.subText">{item.hub}</Text>
                                                </Flex>
                                            </Flex>
                                        ))}
                                    </>

                                }
                                <Flex gap={3} alignItems="start">
                                    <Text>17:30</Text>
                                    <Flex flexDirection="column" justifyContent="center" alignItems="center">
                                        <FaLocationDot fontSize="24px" color="orange" />
                                    </Flex>
                                    <Flex flexDirection="column">
                                        <Text>{mockupRoute.dest}</Text>
                                        <Text fontSize="12px" color="colors.subText">{mockupRoute.dest_hub}</Text>
                                    </Flex>
                                </Flex>
                                <Flex alignItems="start" flexDirection="column" fontSize="14px">
                                    <Text>Lưu ý</Text>
                                    <Text>Thời gian các mốc lịch trình là thời gian dự kiến. Lịch trình này có thể thay đổi tuỳ vào tình hình thực tế xuất bến sớm hay trễ.</Text>
                                </Flex>
                            </Flex>
                        </TabPanel>
                        <TabPanel p={4}>
                            <Flex flexDirection="column" gap={2}>
                                {policies.map((p) => (
                                    <Flex key={p.name} flexDirection="column">
                                        <Text fontWeight="500">{p.name}</Text>
                                        <UnorderedList>
                                            {p.item.map((item, index) => (
                                                <ListItem key={index}>{item}</ListItem>
                                            ))}
                                        </UnorderedList>
                                    </Flex>
                                ))}
                            </Flex>
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Flex>
        </Flex>
    )
}
