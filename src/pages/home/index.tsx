import React, { useState } from 'react'
import NavBar from '../../components/navbar/NavBar'
import Footer from '../../components/footer/Footer'
import { Button, Flex, Image, Input, Link, Select, Stack, Text } from "@chakra-ui/react"
import { LogoMain } from '../../components/logo'
import { Radio, RadioGroup } from '@chakra-ui/react'
import { cities } from '../../constants'
import { useNavigate } from 'react-router-dom';

function Home() {
  const [way, setWay] = useState('1')
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    passengers: '',
    departureCity: '',
    destinationCity: '',
    dateTime: '',
    dateTimeReturn : '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSearch = () => {
    // Chuyển đến trang '/trip' và gửi dữ liệu formData qua
    navigate('/trip', { state : formData });
  };

  return (
    <>
      <Flex w="full">
        <Flex p="2rem 2rem 2rem 4.5rem" flex="1" flexDirection="column" justifyContent="start" alignItems="start" w="full" gap={10}>
          <LogoMain />
          <Text p='.3rem 2rem' color="white" borderRadius="1rem" bg="colors.primary">Hello travellers</Text>
          <Text fontSize="64px" lineHeight="1">
            made your booking experience easy!
          </Text>
          <Text>
            Coach booking is a process of choosing and purchasing coach seats online. It is an easy process but were are here to make it much better & simple.
          </Text>
          <Flex w="full" flexDirection="column" p="0 2rem" gap="1rem">
            <Flex w="full" alignItems="center">
              <RadioGroup flex="1" onChange={setWay} value={way}>
                <Stack direction='row' gap="2rem">
                  <Radio colorScheme='orange' value='1'>One-way</Radio>
                  <Radio colorScheme='orange' value='2'>Round-trip</Radio>
                </Stack>
              </RadioGroup>
              <Select flex="1" name="passengers" placeholder={`Passengers`} onChange={handleChange} value={formData.passengers}>
                <option value='1'>1 Passengers</option>
                <option value='2'>2 Passengers</option>
                <option value='3'>3 Passengers</option>
              </Select>
            </Flex>
            <Flex w="full" alignItems="center" gap="3rem" >
              <Select name="departureCity" placeholder='Điểm xuất phát' onChange={handleChange} value={formData.departureCity}>
                {cities.map((city, index) => (
                  <option key={index} value={city}>{city}</option>
                ))}
              </Select>
              <Select name="destinationCity" placeholder='Điểm đến' onChange={handleChange} value={formData.destinationCity}>
                {cities.map((city, index) => (
                  <option key={index} value={city}>{city}</option>
                ))}
              </Select>
            </Flex>
            <Flex w="full" alignItems="center" gap="3rem">
              <Input
                name="dateTime"
                placeholder="Select Date and Time"
                type="date"
                onChange={handleChange}
                value={formData.dateTime}
                p={3}
              />
              {way === "1" ? <></> : <Input
                name="dateTimeReturn"
                placeholder="Select Date and Time"
                type="date"
                onChange={handleChange}
                value={formData.dateTimeReturn}
                p={3}
              />}
            </Flex>

            <Button onClick={handleSearch} variant="primary">Search for trips</Button>
          </Flex>

        </Flex>
        <Flex flex="1" >
          <Image
            objectFit='cover'
            src='https://vissaihotel.vn/photo/xe-khach-ninh-binh-3.jpg'
            alt='Dan Abramov'
          />
        </Flex>
      </Flex>
      <Footer />
    </>
  )
}

export { Home }