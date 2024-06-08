import React, { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Button, FormControl, FormLabel, Input, FormErrorMessage, useToast } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const Signup = () => {
    const navigate = useNavigate();
    const toast = useToast();
    const Schema = yup.object().shape({
        name: yup.string().required("Name is required"),
        email: yup.string().email("Invalid email").required("Email is required"),
        password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
    });

    const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(Schema) });

    const onSubmit = async (data) => {
        try {
            let response = await axios({
                url: '/api/signup',
                method: 'post',
                headers: {
                    "Content-Type": "application/json",
                },
                data: data,
            })
            localStorage.setItem('user', JSON.stringify(response.data));
            navigate('/');
            toast({
                description: 'Account created successfully.',
                status: 'success',
                duration: 3000,
                isClosable: true,
            })
        } catch (error) {
            toast({
                description: error.response.data.message,
                status: 'error',
                duration: 3000,
                isClosable: true,
            })
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl isInvalid={errors.name} className='mb-3'>
                <FormLabel color={'black'} fontSize="lg">Name</FormLabel>
                <Input
                    type='text'
                    _hover={{ borderColor: 'transparent' }}
                    _focus={{ borderColor: 'transparent' }}
                    color={'black'}
                    bg='#C6F6D5'
                    {...register('name')}
                />
                <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors.email} className='mb-3'>
                <FormLabel color={'black'} fontSize="lg">Email address</FormLabel>
                <Input
                    type='email'
                    _hover={{ borderColor: 'transparent' }}
                    _focus={{ borderColor: 'transparent' }}
                    color={'black'}
                    bg='#C6F6D5'
                    {...register('email')}
                />
                <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors.password} className='mb-3'>
                <FormLabel color={'black'} fontSize="lg">Password</FormLabel>
                <Input
                    type='password'
                    _hover={{ borderColor: 'transparent' }}
                    _focus={{ borderColor: 'transparent' }}
                    color={'black'}
                    bg='#C6F6D5'
                    {...register('password')}
                />
                <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
            </FormControl>
            <Button className='w-full mt-3' bg={'#09080A'}
                _hover={{
                    bg: ("blackAlpha.800"),
                }}
                type='submit'
            >Sign Up</Button>
        </form>
    );
}

export default Signup;
