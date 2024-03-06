import React, { useState, useEffect } from 'react'
import NavBar from '../../components/navbar/NavBar'
import { Box, Flex, HStack, Spacer, Text } from '@chakra-ui/react'
import Footer from '../../components/footer/Footer'
import Trip from './components/Trip'
import 'react-slideshow-image/dist/styles.css'
import { Checkbox } from '@chakra-ui/react'
import { MdDeleteForever } from "react-icons/md";
import { useLocation } from 'react-router-dom';
import { format } from 'date-fns';
import axios from 'axios';

function TripList() {
    let location = useLocation();
    const [trips, setTrips] = useState([]);
    const formattedDateTime = format(new Date(location.state.dateTime), "dd-MM-yyyy");

    useEffect(() => {
        // Lấy dữ liệu formData từ location state
        const { state } = location;
        if (state) {
            fetchTrips(state);
        } else {
            // Nếu không có dữ liệu formData, gọi API để lấy toàn bộ danh sách Trip
            fetchTrips("");
        }
    }, [location]);

    // @ts-ignore
    const urlBackend = import.meta.env.VITE_URL_BACKEND

    const fetchTrips = async (formData) => {
        try {
            // Tạo URL dựa trên dữ liệu formData
            let url = `${urlBackend}/api/v1/trip`;
            console.log(formData)
            if (formData) {
                const { departureCity, destinationCity, dateTime } = formData;
                url += `?origin=${departureCity}&dest=${destinationCity}&departureTime=${dateTime}`;
            }

            const response = await axios.get(url);
            setTrips(response.data);
        } catch (error) {
            console.error('Error fetching trips:', error.message);
        }
    };
    return (
        <div>
            <NavBar />
            <Flex w={{ base: "full", lg: "75%" }} margin="0 auto" gap="1rem" justifyContent="center" py={5}>
                <Flex flex={1} w="full" h="400px" flexDirection="column" borderRadius="1rem" boxShadow="0px 0px 5px 2px rgba(188,188,188,0.75)" p={4}>
                    <Flex w="full" justifyContent="space-between" borderBottom="1px solid gray" pb={2}>
                        <Text fontWeight="500">Bộ lọc tìm kiếm</Text>
                        <HStack alignItems="center">
                            <Text fontWeight="500" color="red">Bỏ lọc</Text>
                            <MdDeleteForever fontSize="20px" color="red" />
                        </HStack>
                    </Flex>
                    <Flex flexDirection="column" alignItems="start" py={4} borderBottom="1px solid gray" pb={2}>
                        <Text>Loại xe</Text>
                        <Checkbox size='md' colorScheme='orange'>
                            Ghế
                        </Checkbox>
                        <Checkbox size='md' colorScheme='orange'>
                            Giường
                        </Checkbox>
                        <Checkbox size='md' colorScheme='orange'>
                            Limousine
                        </Checkbox>
                    </Flex>
                    <Flex flexDirection="column" alignItems="start" py={4} borderBottom="1px solid gray" pb={2}>
                        <Text>Hàng ghế</Text>
                        <Checkbox size='md' colorScheme='orange'>
                            Hàng đầu
                        </Checkbox>
                        <Checkbox size='md' colorScheme='orange'>
                            Hàng giữa
                        </Checkbox>
                        <Checkbox size='md' colorScheme='orange'>
                            Hàng cuối
                        </Checkbox>
                    </Flex>
                    <Flex flexDirection="column" alignItems="start" py={4} borderBottom="1px solid gray" pb={2}>
                        <Text>Tầng</Text>
                        <Checkbox size='md' colorScheme='orange'>
                            Tầng trên
                        </Checkbox>
                        <Checkbox size='md' colorScheme='orange'>
                            Tầng dưới
                        </Checkbox>
                    </Flex>
                </Flex>
                <Flex flex={2.2} flexDirection="column" p={2}>
                    <Flex alignItems="center">
                        <Text fontSize="24px" fontWeight="500" mr={5}>Available Trips</Text>
                        <Text fontSize="14px" color="colors.subText">{trips.length} Trips available</Text>
                        <Spacer />
                        <Text fontSize="14px" color="colors.subText">Ngày : {formattedDateTime}</Text>
                    </Flex>
                    <Box h="1px" bg="#ccc" w="full" my={3}></Box>
                    {trips.map((trip, index) => (
                        <Trip trip={trip} key={index}/>
                    ))}
                </Flex>
            </Flex>
            <Footer />
        </div>
    )
}

export { TripList }