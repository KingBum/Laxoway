import { Flex, Text, Input, Spacer, InputGroup, InputRightElement, Link } from '@chakra-ui/react'
import React from 'react'
import { Button } from '@chakra-ui/button'
import { LogoBackup } from '../logo'
import { IoIosSend } from "react-icons/io";
import { menus } from '../../constants'
import { FiFacebook } from "react-icons/fi";
import { FaInstagram } from "react-icons/fa";
import { CiTwitter } from "react-icons/ci";

export default function Footer() {
  return (
    <Flex
      w="full"
      flexDirection="column"
      margin="0px auto"
    >

      <Flex bg="colors.primary" w="full" alignItems="center" justifyContent="center" flexDirection="column" p="2rem 0">
        <Flex w={{ base: "full", lg: "90%" }} alignItems="center" justifyContent="space-between" gap="3rem">
          <LogoBackup />
          <Flex flex="1" flexDirection="column" align="start" color="white">
            <Text fontSize="24px">Planning your next trip?</Text>
            <Text fontSize="14px">Subscribe to our newsletter. Get the latest travel trends & deals!</Text>
          </Flex>
          <InputGroup flex="1">
            <Input variant='flushed' color="white" _placeholder={{ color: "white" }} _focus={{ borderColor: "white", boxShadow: 'none' }} placeholder='Enter Email ID' />
            <InputRightElement>
              <IoIosSend color='white' />
            </InputRightElement>
          </InputGroup>

        </Flex>
        <Flex></Flex>
        <Flex w={{ base: "full", lg: "90%" }} mt="3rem" color="white" alignItems="center" justifyContent="space-between" gap="3rem">
          <Flex gap="2rem">
            {menus.map((menu) => <Link href={menu.url} key={menu.name}>
              <span>
                <Text>{menu.name}</Text>
              </span>
            </Link>)}
          </Flex>
          <Flex gap="2rem" fontSize="24px">
            <FiFacebook />
            <FaInstagram />
            <CiTwitter />
          </Flex>
        </Flex>
      </Flex>
    </Flex>

  )
}

