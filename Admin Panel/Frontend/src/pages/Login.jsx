
import { Container, Paper, Title, Box, LoadingOverlay, Text, Flex } from '@mantine/core';
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
        <Flex align="center" justify="center" style={{ minHeight: 'calc(100vh - 120px)' }} w="100%">
            <Container size={460} w="100%" px="md">
                <Box mb={25} ta="center">
                    <Title order={2} fw={800} lts={-0.5} c="dark.7">
                        Welcome Back!
                    </Title>
                    <Text size="sm" c="dimmed" mt={5}>
                        Sign in to access your Rural Cravings admin panel
                    </Text>
                </Box>

                <Paper withBorder shadow="md" p={35} radius="lg" bg="white">
                    <Box pos="relative">
                        <LoadingOverlay 
                            visible={isLoading} 
                            zIndex={1000} 
                            overlayProps={{ radius: 'lg', blur: 1.5 }}
                            loaderProps={{ color: '#f26c23', type: 'oval' }} 
                        />
                        <LoginForm 
                            formData={formData} 
                            setFormData={setFormData} 
                            onSubmit={handleSubmit} 
                            isLoading={isLoading} 
                        />
                    </Box>
                </Paper>
            </Container>
        </Flex>
    );
};

export default Login;