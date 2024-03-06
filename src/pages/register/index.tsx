import React from 'react'
import NavBar from '../../components/navbar/NavBar'
import Footer from '../../components/footer/Footer'
import { Flex, Container, Stack, Heading, Text, Link, Box, FormControl, FormLabel, HStack, Input, Button, Checkbox, Divider, ButtonGroup, Image } from '@chakra-ui/react'
import { PasswordField } from '../../components/PasswordField/PasswordField'


function Register() {

    
    const providers = [
        { name: 'Google', icon: <Image boxSize={"20px"} src='https://cdn.iconscout.com/icon/free/png-256/free-google-1772223-1507807.png' alt='Dan Abramov' /> },
        { name: 'Twitter', icon: <Image boxSize={"20px"} src='https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Logo_of_Twitter.svg/2491px-Logo_of_Twitter.svg.png' alt='Dan Abramov' /> },
    ]
  return (
    <>
            <NavBar />
            <Flex w={{ base: "full", lg: "75%" }} margin="0 auto" gap="2rem" justifyContent="center" py={5}>

                <Container maxW="lg" py={{ base: '4', md: '8' }} px={{ base: '0', sm: '8' }}>
                    <Stack spacing="8">
                        <Stack spacing="6">
                            <Stack spacing={{ base: '2', md: '3' }} textAlign="center">
                                <Heading size={{ base: 'xs', md: 'xl' }}>Register</Heading>
                                <Text color="fg.muted">
                                    Do u want log in? <Link color={"colors.primary"} href="#">Click here</Link>
                                </Text>
                            </Stack>
                        </Stack>
                        <Box
                            py={{ base: '0', sm: '8' }}
                            px={{ base: '4', sm: '10' }}
                            bg={{ base: 'transparent', sm: 'bg.surface' }}
                            boxShadow={{ base: 'none', sm: 'md' }}
                            borderRadius={{ base: 'none', sm: 'xl' }}
                        >
                            <Stack spacing="6">
                                <Stack spacing="5">
                                    <FormControl>
                                        <FormLabel htmlFor="email">Email</FormLabel>
                                        <Input id="email" type="email" />
                                    </FormControl>
                                    <PasswordField label="Password"/>
                                    <PasswordField label="Password Again"/>
                                </Stack>
                                
                                <Stack spacing="6">
                                    <Button variant={"primary"}>Sign in</Button>
                                    <HStack>
                                        <Divider />
                                        <Text textStyle="sm" whiteSpace="nowrap" color="fg.muted">
                                            or continue with
                                        </Text>
                                        <Divider />
                                    </HStack>
                                    <ButtonGroup variant="secondary" spacing="5">
                                        {providers.map(({ name, icon }) => (
                                            <Button key={name} flexGrow={1} border={"1px solid #ccc"}>
                                                {icon}
                                            </Button>
                                        ))}
                                    </ButtonGroup>
                                </Stack>
                            </Stack>
                        </Box>
                    </Stack>
                </Container>
            </Flex>
            <Footer />
        </>
  )
}

export {Register}