import { Flex, Link, Spacer, Text } from '@chakra-ui/react'
import React from 'react'
import { LogoMain } from '../logo'

export default function NavBar() {
  return (
    <Flex w={{ base: "full", lg: "90%" }} margin="0 auto" alignItems="center" justifyContent="center">
      <LogoMain />
      <Spacer />
       <Link href="#">
        <span>
          <Text mx="20px" fontSize="20px">My Booking</Text>
        </span>
      </Link>
       <Link href="#">
        <span>
          <Text mx="20px" fontSize="20px">Login</Text>
        </span>
      </Link>
    </Flex>
  )
}
