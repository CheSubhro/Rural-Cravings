
import { TextInput, PasswordInput, Stack, Group, Text, Anchor } from '@mantine/core';
import { Link } from 'react-router-dom'; 
import { Button } from '../../components/common';

const LoginForm = ({ formData, setFormData, onSubmit, isLoading }) => {
    return (
        <form onSubmit={onSubmit}>
            <Stack gap="md">
                <TextInput 
                    label="Username" 
                    placeholder="Enter your username"
                    required 
                    size="md"
                    radius="md"
                    value={formData.username}
                    onChange={(e) => setFormData({...formData, username: e.target.value})}
                />
                
                <PasswordInput 
                    label="Password" 
                    placeholder="Enter your password"
                    required 
                    size="md"
                    radius="md"
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                />
                
                <Button 
                    type="submit" 
                    fullWidth 
                    size="md" 
                    radius="md"
                    isLoading={isLoading} 
                >
                    Sign in
                </Button>
                <Group justify="center" mt="xs">
                    <Text size="sm" c="dimmed">
                        Don't have an admin account?{' '}
                        <Anchor 
                            component={Link} 
                            to="/register" 
                            fw={600} 
                            c="#f26c23" 
                            inherit
                        >
                            Register here
                        </Anchor>
                    </Text>
                </Group>
            </Stack>
        </form>
    );
};

export default LoginForm;