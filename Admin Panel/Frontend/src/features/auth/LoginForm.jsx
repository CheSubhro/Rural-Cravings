
import { TextInput, PasswordInput, Stack } from '@mantine/core';
import Button from '../../components/common/Button';

const LoginForm = ({ formData, setFormData, onSubmit }) => {
    return (
        <form onSubmit={onSubmit}>
            <Stack>
                <TextInput 
                    label="Username" 
                    required 
                    onChange={(e) => setFormData({...formData, username: e.target.value})}
                />
                <PasswordInput 
                    label="Password" 
                    required 
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                />
                <Button type="submit" fullWidth>Sign in</Button>
            </Stack>
        </form>
    );
};

export default LoginForm;