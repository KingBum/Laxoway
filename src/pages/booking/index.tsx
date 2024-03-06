import React, { useEffect, useState } from "react";
import NavBar from '../../components/navbar/NavBar'
import Footer from '../../components/footer/Footer'
import { Box, Button, Card, CardBody, CardFooter, Divider, Flex, HStack, Heading, IconButton, Image, Input, Link, Spacer, Stack, Text, VStack } from '@chakra-ui/react'
import { GoDotFill } from "react-icons/go";
import { BiSolidOffer } from "react-icons/bi";
import { MdPeople } from "react-icons/md";
import { Radio, RadioGroup } from '@chakra-ui/react'
import { MdEventSeat } from "react-icons/md";
import { IoIosAddCircleOutline } from "react-icons/io";
import { GrSubtractCircle } from "react-icons/gr";

import numeral from 'numeral';
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";
import axios from "axios"
import { IFood, IOffer } from "../../_types_";

type SeatProps = {
    selected: boolean;
    reserved: boolean;
    onClick: () => void;
};

const Seat: React.FC<SeatProps> = ({ selected, reserved, onClick }) => (
    <Button
        size="sm"
        w="10"
        h="10"
        borderRadius="md"
        bg={reserved ? "gray" : selected ? "colors.primary" : "colors.bg"}
        color={reserved ? "black" : selected ? "white" : "gray"}
        onClick={onClick}
        _hover={{ bg: "colors.primary", color: "#fff" }}
        m={1}
        disabled={reserved}
    >
        <MdEventSeat fontSize="20px" />
    </Button>
);
function Booking() {
    const state = useLocation().state;
    const [foods, setFoods] = useState([]);
    const [offers, setOffers] = useState([]);
    const [formData, setFormData] = useState({
        fullName: '',
        gender: 'male', // Giả sử mặc định là 'male'
        phoneNumber: '',
        email: ''
    });

    // @ts-ignore
    const urlBackend = import.meta.env.VITE_URL_BACKEND

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [foodsRes, offersRes] = await Promise.all([
                    axios.get(`${urlBackend}/api/v1/menu`),
                    axios.get(`${urlBackend}/api/v1/offer`)
                ]);
                setFoods(foodsRes.data);
                setOffers(offersRes.data);
            } catch (error) {
                console.error("Error fetching data:", error.message);
            }
        };

        fetchData(); // Call the fetchData function when the component mounts
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const [quantities, setQuantities] = useState({});
    const [selectedSeats, setSelectedSeats] = useState<number[]>([]);
    const [selectedOffers, setSelectedOffers] = useState<IOffer>({ id: '', code: '' });

    const handleSeatClick = (seatNumber: number) => {
        if (reservedSeats.includes(seatNumber)) {
            // Nếu ghế đã được đặt trước, không cho phép chọn
            return;
        }

        // Toggle trạng thái ghế đã chọn
        if (selectedSeats.includes(seatNumber)) {
            setSelectedSeats(selectedSeats.filter((seat) => seat !== seatNumber));
        } else {
            setSelectedSeats([...selectedSeats, seatNumber]);
        }
    };

    console.log(selectedSeats)
    // Số lượng ghế và hàng có thể được điều chỉnh theo nhu cầu của bạn
    const numSeatsPerRow = 3;
    const numRows = state.availableSeats.length / numSeatsPerRow;
    const firstPartLimit = Math.floor(numRows / 2);
    const secondPartLimit = Math.floor(numRows);

    const calculateTotalPrice = (): number => {
        let totalPrice: number = 0;
        for (const food of foods || []) {
            // @ts-ignore
            const quantity: number = quantities[food.name] || 0;
            // @ts-ignore
            totalPrice += quantity * food.price;
        }
        return totalPrice;
    };

    const calculateOffer = (): number => {
        let totalOffer: number = 0;
        const currentDate = new Date();

        // Lọc ra offer có id tương tự selectedOffers.id
        // @ts-ignore
        const selectedOffer = offers.find(offer => offer._id === selectedOffers.id);

        // Kiểm tra xem selectedOffer tồn tại và có nằm trong khoảng thời gian hợp lệ không
        // @ts-ignore
        if (selectedOffer && currentDate >= new Date(selectedOffer.validFrom) && currentDate <= new Date(selectedOffer.validUntil)) {
            // Tính toán giảm giá tối đa theo discountPercentage
            // @ts-ignore
            totalOffer = selectedOffer.maxDiscountAmount * (selectedOffer.discountPercentage / 100);
        }

        return totalOffer;
    };

    const calculateTotal = () => {
        let totalPrice = selectedSeats.length * state.price + calculateTotalPrice() + 0 - calculateOffer();
        return totalPrice;
    };
    const reservedSeats = state.availableSeats
        .map((seat, index) => seat.isBooked ? index + 1 : null)
        .filter(index => index !== null);

    const selectedSeatIds = selectedSeats.map(seatNumber => {
        let seatPrefix: string;
        if (seatNumber <= state.availableSeats.length / 2 - 1) {
            seatPrefix = 'A';
        } else {
            seatPrefix = 'B';
            seatNumber -= state.availableSeats.length / 2; // Adjust seat number for range B
        }
        const seat = state.availableSeats.find(seat => seat.seatNumber === `${seatPrefix}${seatNumber}`);
        return seat ? seat._id : null;
    }).filter(id => id !== null && id !== undefined);

    console.log("al", selectedSeatIds)
    const navigate = useNavigate();
    const handleBooking = async () => {
        try {
            const response = await axios.post("http://localhost:3000/api/v1/booking/", {
                tripId: state._id,
                seatIds: selectedSeatIds,
                offer: selectedOffers.id,
                service: quantities,
                totalPrice: calculateTotal(),
                userOption: formData
            });
            navigate(`/payment/${response.data._id}`, {
                state: {
                    price: selectedSeats.length * state.price,
                    service: calculateTotalPrice(),
                    offers: calculateOffer(),
                    totalPrice: calculateTotal(),
                }
            });
        } catch (error) {
            console.error('Error fetching trips:', error.message);
        }
    };

    return (
        <>
            <NavBar />

            <Flex w={{ base: "full", lg: "75%" }} margin="0 auto" gap="2rem" justifyContent="center" py={5}>
                <Flex flex={2} w="full" flexDirection="column" >
                    <VStack alignItems="start" my={3}>
                        <Text fontWeight="500" fontSize="24px">Đặt chỗ của tôi</Text>
                        <Text fontSize="14px" color="colors.subText">Điền thông tin và xem lại đặt chỗ</Text>
                        <Box w="full" borderRadius="1rem" boxShadow="0px 0px 5px 2px rgba(188,188,188,0.75)" p={4}>
                            <Flex alignItems="center" gap={3}>
                                <Image
                                    boxSize='150px'
                                    objectFit='cover'
                                    src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWZEd7pw0c5T_JelZYGULCoHxhEUaH_1Kwog&usqp=CAU'
                                    alt='Dan Abramov'
                                />
                                <VStack alignItems="start">
                                    <Text fontWeight="500" fontSize="20px">Đăng nhập hoặc Đăng ký và tận hưởng ưu đãi dành riêng cho thành viên
                                    </Text>
                                    <Flex alignItems="center" color="colors.subText" gap={3}>
                                        <MdPeople />
                                        <Text>Đặt chỗ nhanh và dễ dàng hơn với Passenger Quick Pick
                                        </Text>
                                    </Flex>
                                    <Text>Đăng nhập hoặc Đăng ký
                                    </Text>
                                </VStack>
                            </Flex>
                        </Box>
                    </VStack>
                    <VStack alignItems="start" my={3}>
                        <Text fontWeight="500" fontSize="24px">Chọn chỗ ngồi</Text>
                        <Flex w="full" justifyContent={"space-evenly"} borderRadius="1rem" boxShadow="0px 0px 5px 2px rgba(188,188,188,0.75)">
                            <Box p={4}>
                                <Heading size="md">Tầng dưới</Heading>
                                {[...Array(firstPartLimit)].map((_, rowIndex) => (
                                    <Flex key={rowIndex} align="center">
                                        {[...Array(numSeatsPerRow)].map((_, seatIndex) => {
                                            const seatNumber = rowIndex * numSeatsPerRow + seatIndex + 1;
                                            const isSelected = selectedSeats.includes(seatNumber);
                                            const isReserved = reservedSeats.includes(seatNumber);
                                            return (
                                                <Seat
                                                    key={seatIndex}
                                                    selected={isSelected}
                                                    reserved={isReserved}
                                                    onClick={() => handleSeatClick(seatNumber)}
                                                />
                                            );
                                        })}
                                    </Flex>
                                ))}
                            </Box>

                            <Box p={4}>
                                <Heading size="md">Tầng trên</Heading>
                                {[...Array(secondPartLimit - firstPartLimit)].map((_, rowIndex) => (
                                    <Flex key={rowIndex} align="center">
                                        {[...Array(numSeatsPerRow)].map((_, seatIndex) => {
                                            const seatNumber = (rowIndex + firstPartLimit) * numSeatsPerRow + seatIndex + 1;
                                            const isReserved = reservedSeats.includes(seatNumber);
                                            const isSelected = selectedSeats.includes(seatNumber);
                                            return (
                                                <Seat
                                                    reserved={isReserved}
                                                    key={seatIndex}
                                                    selected={isSelected}
                                                    onClick={() => handleSeatClick(seatNumber)}
                                                />
                                            );
                                        })}
                                    </Flex>
                                ))}
                            </Box>
                            <Box p={4}>
                                <VStack alignItems="start">
                                    <Text fontWeight="500">Seats : {selectedSeats.join(", ")}</Text>
                                    <HStack>
                                        <Flex
                                            w="10"
                                            h="10"
                                            borderRadius="md"
                                            bg={"colors.primary"}
                                            color={"white"}
                                            m={1}
                                            alignItems="center"
                                            justifyContent={"center"}
                                        >
                                            <MdEventSeat fontSize="20px" />
                                        </Flex>
                                        <Text>Đang chọn</Text>
                                    </HStack>
                                    <HStack>
                                        <Flex
                                            w="10"
                                            h="10"
                                            borderRadius="md"
                                            bg={"colors.bg"}
                                            color={"gray"}
                                            m={1}
                                            alignItems="center"
                                            justifyContent={"center"}
                                        >
                                            <MdEventSeat fontSize="20px" />
                                        </Flex>
                                        <Text>Còn trống</Text>
                                    </HStack>
                                    <HStack>
                                        <Flex
                                            w="10"
                                            h="10"
                                            borderRadius="md"
                                            bg={"gray"}
                                            color={"black"}
                                            m={1}
                                            alignItems="center"
                                            justifyContent={"center"}
                                        >
                                            <MdEventSeat fontSize="20px" />
                                        </Flex>
                                        <Text>Đã bán</Text>
                                    </HStack>
                                </VStack>
                            </Box>

                        </Flex>
                    </VStack>
                    <VStack alignItems="start" my={3}>
                        <Text fontWeight="500" fontSize="24px">Thông tin liên hệ</Text>
                        <Box w="full" borderRadius="1rem" boxShadow="0px 0px 5px 2px rgba(188,188,188,0.75)" p={4}>
                            <Flex alignItems="center" flexDirection="column" gap={3}>
                                <Flex justifyContent="space-between" w="full">
                                    <Text fontWeight="500">Thông tin liên hệ</Text>
                                    <Text color="colors.primary">Điền thông tin</Text>
                                </Flex>
                                <Box w="full" height="1px" bg="#ccc"></Box>
                                <HStack w="full" gap={5}>
                                    <Input name='fullName' variant='flushed' placeholder='Họ và Tên' value={formData.fullName} onChange={handleInputChange} />
                                    <RadioGroup name='gender' defaultValue='male' value={formData.gender} onChange={handleInputChange}>
                                        <HStack>
                                            <Radio colorScheme='orange' value='male'>
                                                Ông
                                            </Radio>
                                            <Radio colorScheme='orange' value='female'>
                                                Bà
                                            </Radio>
                                        </HStack>
                                    </RadioGroup>
                                </HStack>
                                <HStack w="full" gap={5}>
                                    <Input name='phoneNumber' variant='flushed' placeholder='Số điện thoại' value={formData.phoneNumber} onChange={handleInputChange} />
                                    <Input name='email' type='email' variant='flushed' placeholder='Email' value={formData.email} onChange={handleInputChange} />
                                </HStack>
                            </Flex>
                        </Box>
                    </VStack>

                    <VStack alignItems="start" my={3}>
                        <Text fontWeight="500" fontSize="24px">Thêm dịch vụ</Text>
                        <Box w="full" borderRadius="1rem" boxShadow="0px 0px 5px 2px rgba(188,188,188,0.75)" p={4}>
                            <Flex w="full" overflowX="scroll" justifyContent="space-between" overflow="hidden" wrap="wrap">
                                {foods.map((f: IFood) => (
                                    <Card w="30%" h="400px" key={f.name}>
                                        <CardBody>
                                            <Image
                                                maxW="170px"
                                                maxH="200px"
                                                objectFit="cover"
                                                src={f.image}
                                                alt={f.name}
                                                borderRadius='lg'
                                            />
                                            <Stack mt='6' spacing='3'>
                                                <Heading size='md'>{f.name}</Heading>
                                                <Text noOfLines={2} fontSize="14px">
                                                    {f.description}
                                                </Text>
                                                <Text color='colors.primary' fontSize='24px'>
                                                    {numeral(f.price).format('0,0')}đ
                                                </Text>
                                            </Stack>
                                        </CardBody>
                                        <Divider />
                                        <CardFooter display="flex" alignItems="center" justifyContent="space-between">
                                            {quantities[f.name] === 0 || !quantities[f.name] ? (
                                                <Button
                                                    variant='primary'
                                                    onClick={() => {
                                                        setQuantities({
                                                            ...quantities,
                                                            [f.name]: (quantities[f.name] || 0) + 1
                                                        });
                                                    }}
                                                >
                                                    Add to ticket
                                                </Button>
                                            ) : (
                                                <Flex alignItems="center">
                                                    <Button
                                                        onClick={() => {
                                                            setQuantities({
                                                                ...quantities,
                                                                [f.name]: Math.max((quantities[f.name] || 0) - 1, 0)
                                                            });
                                                        }}
                                                    ><IoIosAddCircleOutline /></Button>
                                                    <Input
                                                        textAlign={"center"}
                                                        value={quantities[f.name]}
                                                        onChange={(e) => {
                                                            setQuantities({
                                                                ...quantities,
                                                                [f.name]: e.target.value
                                                            });
                                                        }}
                                                    />
                                                    <Button
                                                        w={"30px"}
                                                        onClick={() => {
                                                            setQuantities({
                                                                ...quantities,
                                                                [f.name]: Math.min((quantities[f.name] || 0) + 1, 5)
                                                            });
                                                        }}
                                                    ><GrSubtractCircle width={"30px"} /></Button>
                                                </Flex>
                                            )}
                                        </CardFooter>
                                    </Card>
                                ))}

                            </Flex>
                        </Box>
                    </VStack>

                </Flex>
                <Flex flex={1} w="full" maxH="700px" top={0} pos="sticky" flexDirection="column" borderRadius="1rem" boxShadow="0px 0px 5px 2px rgba(188,188,188,0.75)" p={4}>
                    <Box bg="#FDE5DE" p={4}>
                        <Text fontWeight="500" fontSize="20px">Boarding Details</Text>
                        <Text fontWeight="500">Seats : {selectedSeats.join(", ")}</Text>
                        <Flex justifyContent="space-between" fontWeight="500">
                            <Text>{moment(state.departureTime).format('MMM DD')}</Text>
                            <Text>{moment(state.arrivalTime).format('MMM DD')}</Text>
                        </Flex>
                        <Flex alignItems="center" justifyContent="space-between" fontSize="14px">
                            <Flex flexDirection="column">
                                <Text>{moment(state.departureTime).format('HH:mm')}</Text>
                                <Text>{state.route.origin}</Text>
                            </Flex>
                            <Flex alignItems="center" flex={1} px={2}>
                                <GoDotFill color='gray' />
                                <Box bg="gray" h="1px" w="full"></Box>
                                <GoDotFill color='gray' />
                            </Flex>
                            <Flex flexDirection="column">
                                <Text>{moment(state.arrivalTime).format('HH:mm')}</Text>
                                <Text>{state.route.dest}</Text>
                            </Flex>
                        </Flex>
                    </Box>
                    <Box bg="gray" w="full" h="1px" my={5}></Box>
                    <Box border="2px dashed #FA7436" borderRadius="1rem" p={4}>
                        <Text fontWeight="500" fontSize="20px" color="colors.primary">Offers</Text>
                        {offers.map((item: IOffer) => (
                            <Flex alignItems="center" key={item.code} fontSize="14px">
                                <BiSolidOffer color="orange" fontSize="20px" />
                                <Text ml="10px">{item.code}</Text>
                                <Spacer />
                                <Text cursor={"pointer"} onClick={() => setSelectedOffers({ id: item._id, code: item.code })} color="colors.primary">Apply</Text>
                            </Flex>
                        ))}

                    </Box>
                    <Box border="2px dashed #ccc" borderRadius="1rem" my={5} p={4}>
                        <Flex alignItems="center" justifyContent="space-between" fontSize="14px">
                            <Flex flex={1}>
                                <BiSolidOffer color="orange" fontSize="26px" />
                                <Text ml="10px">Apply code</Text>
                            </Flex>
                            <Input flex={1} variant='flushed' fontSize="14px" placeholder={selectedOffers.code} />
                        </Flex>
                    </Box>
                    <Box border="2px dashed #ccc" borderRadius="1rem" p={4}>
                        <Text fontWeight="500" fontSize="20px">Bill details</Text>
                        <Flex alignItems="center" fontSize="12px" color="colors.subText" justifyContent="space-between">
                            <Text>Ticket</Text>
                            <Text>{numeral(selectedSeats.length * state.price).format('0,0')}</Text>
                        </Flex>
                        <Flex alignItems="center" fontSize="12px" color="colors.subText" justifyContent="space-between">
                            <Text>Service</Text>
                            <Text>{numeral(calculateTotalPrice()).format('0,0')}</Text>
                        </Flex>
                        <Flex alignItems="center" fontSize="12px" color="colors.subText" justifyContent="space-between">
                            <Text>Tax</Text>
                            <Text>0</Text>
                        </Flex>
                        <Flex alignItems="center" fontSize="12px" color="colors.subText" justifyContent="space-between">
                            <Text>Offer {selectedOffers.code}</Text>
                            <Text>{selectedOffers.code === "" ? "0" : `- ${numeral(calculateOffer()).format('0,0')}`}</Text>
                        </Flex>
                        <Flex alignItems="center" fontSize="20px" color="colors.subText" justifyContent="space-between">
                            <Text fontWeight="500">Total Charge</Text>
                            <Text>{numeral(calculateTotal()).format('0,0')}đ</Text>
                        </Flex>
                    </Box>
                    <Button onClick={handleBooking} variant="primary" my={5}>Booking</Button>
                </Flex>
            </Flex>
            <Footer />
        </>
    )
}

export { Booking }