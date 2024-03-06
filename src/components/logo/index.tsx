import { Flex, Heading, Link, Text } from '@chakra-ui/react'
import React from 'react'

function LogoMain() {
  return (
    <Heading size="lg" fontWeight="bold">
      <Link href='/' _hover={{ border: "none" }}>
        <Flex><Text color="colors.primary">Laxo</Text><Text>way</Text></Flex>
      </Link>
    </Heading>
  )
}

function LogoBackup() {
  return (
    <Heading size="lg" fontWeight="bold">
      <Link href='/' _hover={{ border: "none" }}>
        <Flex><Text color="white">Laxo</Text><Text>way</Text></Flex>
      </Link>
    </Heading>
  )
}

export { LogoMain, LogoBackup } 