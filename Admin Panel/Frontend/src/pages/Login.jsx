

import { Container, Paper, Title, Box, LoadingOverlay } from '@mantine/core';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { loginUser } from '../store/authSlice';
import LoginForm from '../features/auth/LoginForm'; 

const Login = () => {
    const [formData, setFormData] = useState({ username: '', password: '' });
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isLoading } = useSelector((state) => state.auth);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await dispatch(loginUser(formData));
        if (result.meta.requestStatus === 'fulfilled') navigate('/');
    };

    return (
        <Container size={420} my={40}>
            <Title ta="center" mb={30}>Welcome Back!</Title>
            <Paper withBorder p={30} radius="md">
                <Box pos="relative">
                    <LoadingOverlay visible={isLoading} />
                    <LoginForm 
                        formData={formData} 
                        setFormData={setFormData} 
                        onSubmit={handleSubmit} 
                    />
                </Box>
            </Paper>
        </Container>
    );
};

export default Login;