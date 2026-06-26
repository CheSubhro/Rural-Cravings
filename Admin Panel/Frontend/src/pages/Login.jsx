
import { Container, Paper, Title, Box, LoadingOverlay, Text, Flex } from '@mantine/core';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react'; 
import { loginUser } from '../store/authSlice';
import LoginForm from '../features/auth/LoginForm'; 
import loginBg from '../assets/images/login-bg.png';

const Login = () => {
    const [formData, setFormData] = useState({ username: '', password: '' });
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const { user, isAuthenticated, isLoading } = useSelector((state) => state.auth);

    useEffect(() => {
        if (isAuthenticated && user) {
            if (user.role === 'Delivery') {
                window.location.href = '/delivery';
            } else {
                window.location.href = '/';
            }
        }
    }, [isAuthenticated, user]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await dispatch(loginUser(formData));
    };

    return (
        <Flex 
            align="center"
            justify="center"
            style={{ 
                backgroundImage: `url(${loginBg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                minHeight: '100vh', 
            }} 
            w="100%"
        >
            <Container size={460} w="100%" px="md">
                <Box 
                    mb={25} 
                    ta="center" 
                    style={{ 
                        backgroundColor: 'rgba(255, 255, 255, 0.8)', 
                        padding: '10px 20px', 
                        borderRadius: '12px',
                        backdropFilter: 'blur(5px)'
                    }}
                >
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