import React from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
    Button,
    FormControl,
    FormLabel,
    Input,
    FormErrorMessage,
    useToast
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


const Login = () => {
    const navigate = useNavigate();
    const toast = useToast();
    const Schema = yup.object().shape({
        email: yup.string().email('Invalid email').required('Email is required'),
        password: yup.string().min(6, 'Min length is 6').required('Password is required'),
    });

    const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(Schema) });

    const onSubmit =async (data) => {
        try {
            let response = await axios({
                url: '/api/login',
                method: 'post',
                headers: {
                    "Content-Type": "application/json",
                },
                data: data,
            })
            localStorage.setItem('user', JSON.stringify(response.data));
            navigate('/');
            toast({
                description: 'Logged in successfully',
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
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
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
            >Login</Button>
        </form>
    );
}

export default Login;
