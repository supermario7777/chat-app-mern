import React, { useEffect } from 'react'
import { Container, Box, Text, Tabs, TabPanel, Tab, TabList, TabPanels } from "@chakra-ui/react"
import Signup from '../components/Autentication/Signup';
import Login from '../components/Autentication/login';
import { useHistory } from "react-router-dom";

const HomePage = () =>
{
    const history = useHistory();

    useEffect( () =>
    {
        const user = JSON.parse( localStorage.getItem( "userInfo" ) );

        if ( user ) history.push( "/chats" );

    }, [ history ] )


    return (
        <Container maxW="xl" centerContent>
            <Box
                display="flex"
                justifyContent="center"
                p={ 3 }
                bg="white"
                w="100%"
                m="40px 0 15px 0"
                borderRadius="lg"
                borderWidth="1px"
            >
                <Text fontSize="4xl" fontFamily="Work sans" color="black">Chat App</Text>
            </Box>

            <Box bg="white" w="100%" p={ 4 } borderRadius="lg" borderWidth="1px" color="black">
                <Tabs variant='soft-rounded'>
                    <TabList mb="1em">
                        <Tab width="50%">Login</Tab>
                        <Tab width="50%">Sign Up</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            <Login />
                        </TabPanel>
                        <TabPanel>
                            <Signup />
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Box>
        </Container>
    )
}

export default HomePage
