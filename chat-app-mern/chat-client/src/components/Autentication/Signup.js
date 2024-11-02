import React, { useState } from 'react'
import { VStack } from "@chakra-ui/layout";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { Button } from "@chakra-ui/react";
import { useToast } from '@chakra-ui/react';
import axios from "axios";
import { useHistory } from "react-router-dom";


const Signup = () =>
{
    const [ show, setShow ] = useState( false )
    const [ name, setName ] = useState();
    const [ email, setEmail ] = useState();
    const [ confirmPassword, setConfirmPassword ] = useState();
    const [ password, setPassword ] = useState();
    const [ picture, setPicture ] = useState();
    const [ loading, setLoading ] = useState( false );
    const toast = useToast();
    const history = useHistory();

    const handleClick = () => { setShow( !show ) }

    const postDetails = ( pictures ) =>
    {
        setLoading( true );
        if ( pictures === undefined ) {
            toast( {
                title: "please select an image!",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom"
            } )
            return;
        }

        if ( pictures.type === "image/jpeg" || pictures.type === "image/png" ) {
            const data = new FormData();

            data.append( "file", pictures );
            data.append( "upload_preset", "mern-chat-app" );
            data.append( "cloud_name", "dhwdz2pjc" );
            fetch( "https://api.cloudinary.com/v1_1/dhwdz2pjc/image/upload", {
                method: "post",
                body: data,
                // mode: "no-cors",
            } ).then( ( res ) => res.json() )
                .then( data =>
                {
                    setPicture( data.url.toString() );
                    // console.log( data.url.toString() );
                    setLoading( false );
                } )
                .catch( ( err ) =>
                {
                    console.log( err );
                    setLoading( false );
                } );
        } else {
            toast( {
                title: "please select an image!",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom"
            } );
            setLoading( false );
            return;
        }
    }

    const submitHandler = async () =>
    {
        setLoading( true );
        if ( !name || !email || !password || !confirmPassword ) {
            toast( {
                title: "please fill all the fields",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom"
            } );
            setLoading( false );
            return;
        }
        if ( password !== confirmPassword ) {
            toast( {
                title: "Password do not match",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            } );
            return;
        }
        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                },
            };
            const { data } = await axios.post( "/api/user", {
                name, email, password, picture
            }, config );

            toast( {
                title: "Registration Successful",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            } );

            localStorage.setItem( "userInfo", JSON.stringify( data ) );
            setLoading( false );
            history.push( "/chats" );


        } catch ( error ) {
            toast( {
                title: "Error occured",
                description: error.response.data.message,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            } )
            setLoading( false );
        }
    }


    return ( <VStack spacing="5px">
        <FormControl id='first-name' isRequired>
            <FormLabel>Name</FormLabel>
            <Input
                placeholder='Enter your name'
                onChange={ ( e ) => { setName( e.target.value ) } }
            ></Input>
        </FormControl>

        <FormControl id='email' isRequired>
            <FormLabel>Email</FormLabel>
            <Input
                placeholder='Enter your email'
                onChange={ ( e ) => { setEmail( e.target.value ) } }
            ></Input>
        </FormControl>

        <FormControl id="password" isRequired>
            <FormLabel>Password</FormLabel>
            <InputGroup size="md">
                <Input
                    type={ show ? "text" : "password" }
                    placeholder="Enter Password"
                    onChange={ ( e ) => setPassword( e.target.value ) }
                />
                <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={ handleClick }>
                        { show ? "Hide" : "Show" }
                    </Button>
                </InputRightElement>
            </InputGroup>
        </FormControl>

        <FormControl id="password" isRequired>
            <FormLabel>Confirm Password</FormLabel>
            <InputGroup size="md">
                <Input
                    type={ show ? "text" : "password" }
                    placeholder="Confirm password"
                    onChange={ ( e ) => setConfirmPassword( e.target.value ) }
                />
                <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={ handleClick }>
                        { show ? "Hide" : "Show" }
                    </Button>
                </InputRightElement>
            </InputGroup>
        </FormControl>

        <FormControl id='picture'>
            <FormLabel>Picture</FormLabel>
            <Input
                type="file"
                p={ 1.5 }
                accept='image/*'
                onChange={ ( e ) => { postDetails( e.target.files[ 0 ] ) } }
            ></Input>
        </FormControl>

        <Button
            colorScheme="blue"
            width="100%"
            style={ { marginTop: 15 } }
            onClick={ submitHandler }
            isLoading={ loading }
        >
            Login
        </Button>

    </VStack>
    )
}

export default Signup
