import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Paper, 
  TextInput, 
  PasswordInput, 
  Button, 
  Title, 
  Text, 
  Stack, 
  Alert 
} from '@mantine/core';
import { useAuth } from '../contexts/AuthContext';
import { ColorSchemeToggle } from '../components/ColorSchemeToggle/ColorSchemeToggle';

export function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const success = await login(email, password);
      if (success) {
        navigate('/admin');
      } else {
        setError('Invalid email or password');
      }
    } catch (err) {
      setError('An error occurred during login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      background: 'var(--mantine-color-blue-6)',
      backgroundImage: 'linear-gradient(135deg, var(--mantine-color-blue-6) 0%, var(--mantine-color-violet-6) 100%)'
    }}>
      <Paper shadow="md" p="xl" radius="md" style={{ width: '100%', maxWidth: 400 }}>
        <Title order={2} ta="center" mb="lg">
          Admin Login
        </Title>
        
        <form onSubmit={handleSubmit}>
          <Stack gap="md">
            {error && (
              <Alert color="red" title="Error">
                {error}
              </Alert>
            )}
            
            <TextInput
              label="Email"
              placeholder="admin@example.com"
              value={email}
              onChange={(e) => setEmail(e.currentTarget.value)}
              required
              type="email"
            />
            
            <PasswordInput
              label="Password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.currentTarget.value)}
              required
            />
            
            <Button 
              type="submit" 
              loading={loading}
              fullWidth
            >
              Login
            </Button>
          </Stack>
        </form>
        
        <Text size="sm" c="dimmed" ta="center" mt="md">
          Demo credentials: admin@example.com / password
        </Text>
      </Paper>
      
      <ColorSchemeToggle />
    </div>
  );
} 