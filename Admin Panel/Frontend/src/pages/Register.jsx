
import { Container, Paper, Title, Box, LoadingOverlay, Text, Flex } from '@mantine/core';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../store/authSlice';
import RegisterForm from '../features/auth/RegisterForm';

const Register = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        username: '',
        password: '',
        role: 'Admin', 
        avatar: null,
        coverImage: null
    });
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isLoading } = useSelector((state) => state.auth);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const multipartData = new FormData();
        multipartData.append('fullName', formData.fullName);
        multipartData.append('email', formData.email);
        multipartData.append('username', formData.username);
        multipartData.append('password', formData.password);
        multipartData.append('role', formData.role);
        
        if (formData.avatar) multipartData.append('avatar', formData.avatar);
        if (formData.coverImage) multipartData.append('coverImage', formData.coverImage);

        const result = await dispatch(registerUser(multipartData));
        
        if (result.meta.requestStatus === 'fulfilled') {
            navigate('/login'); 
        }
    };

    return (
        <Flex align="center" justify="center" style={{ minHeight: 'calc(100vh - 80px)' }} w="100%" py="xl">
            <Container size={760} w="100%" px="md">
                <Box mb={25} ta="center">
                    <Title order={2} fw={800} lts={-0.5} c="dark.7">
                        Create Admin Account
                    </Title>
                    <Text size="sm" c="dimmed" mt={5}>
                        Add a new administrator profile for Rural Cravings
                    </Text>
                </Box>

                <Paper withBorder shadow="md" p={40} radius="xl" bg="white">
                    <Box pos="relative">
                        <LoadingOverlay 
                            visible={isLoading} 
                            overlayProps={{ radius: 'lg', blur: 1.5 }}
                            loaderProps={{ color: '#f26c23', type: 'oval' }}
                        />
                        <RegisterForm 
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

export default Register;