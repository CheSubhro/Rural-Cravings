
import { TextInput, PasswordInput, Select, FileInput, Stack, SimpleGrid, Group, Text, Anchor } from '@mantine/core';
import { Link } from 'react-router-dom';
import { Button } from '../../components/common';

const RegisterForm = ({ formData, setFormData, onSubmit, isLoading }) => {
    return (
        <form onSubmit={onSubmit}>
            <Stack gap="md">
                <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
                    <TextInput 
                        label="Full Name" 
                        placeholder="Enter full name"
                        required 
                        size="md" radius="md"
                        value={formData.fullName}
                        onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                    />

                    <TextInput 
                        label="Email Address" 
                        placeholder="Enter email address"
                        type="email"
                        required 
                        size="md" radius="md"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                </SimpleGrid>

                <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
                    <TextInput 
                        label="Username" 
                        placeholder="Choose a username"
                        required 
                        size="md" radius="md"
                        value={formData.username}
                        onChange={(e) => setFormData({...formData, username: e.target.value})}
                    />

                    <PasswordInput 
                        label="Password" 
                        placeholder="Create a strong password"
                        required 
                        size="md" radius="md"
                        value={formData.password}
                        onChange={(e) => setFormData({...formData, password: e.target.value})}
                    />
                </SimpleGrid>

                <Select
                    label="Role"
                    placeholder="Pick user role"
                    data={['Admin', 'Manager', 'Staff']}
                    required
                    size="md" radius="md"
                    value={formData.role}
                    onChange={(value) => setFormData({...formData, role: value})}
                />

                <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
                    <FileInput 
                        label="Avatar (Profile Picture)" 
                        placeholder="Upload avatar image"
                        accept="image/png,image/jpeg"
                        required
                        size="md" radius="md"
                        value={formData.avatar}
                        onChange={(file) => setFormData({...formData, avatar: file})}
                    />

                    <FileInput 
                        label="Cover Image" 
                        placeholder="Upload cover background image"
                        accept="image/png,image/jpeg"
                        size="md" radius="md"
                        value={formData.coverImage}
                        onChange={(file) => setFormData({...formData, coverImage: file})}
                    />
                </SimpleGrid>

                {/* Register Button */}
                <Button 
                    type="submit" 
                    fullWidth 
                    size="md" radius="md"
                    isLoading={isLoading} 
                    mt="lg"
                >
                    Register Account
                </Button>
                <Group justify="center" mt="xs">
                    <Text size="sm" c="dimmed">
                        Already have an admin account?{' '}
                        <Anchor 
                            component={Link} 
                            to="/login" 
                            fw={600} 
                            c="#f26c23" 
                            inherit
                        >
                            Sign in here
                        </Anchor>
                    </Text>
                </Group>
            </Stack>
        </form>
    );
};

export default RegisterForm;