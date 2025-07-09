import { Welcome } from '../components/Welcome/Welcome';
import { Button, Stack, Title, Text, Paper, Group } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { ColorSchemeToggle } from '../components/ColorSchemeToggle/ColorSchemeToggle';
import { motion } from 'framer-motion';

export function HomePage() {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.98, filter: 'blur(8px)' }}
      animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
      exit={{ opacity: 0, y: -30, scale: 0.98, filter: 'blur(8px)' }}
      transition={{
        duration: 0.5,
        type: 'spring',
        bounce: 0.18,
        ease: [0.4, 0, 0.2, 1]
      }}
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Stack gap="lg" p="xl" style={{ maxWidth: 800, margin: '0 auto' }}>
        <Welcome />
        <Paper p="xl" withBorder>
          <Title order={2} mb="md">Admin Panel</Title>
          <Text mb="lg">
            Welcome to the admin interface. Click below to access the admin panel.
          </Text>
          <Group>
            <Button onClick={() => navigate('/login')}>
              Login to Admin Panel
            </Button>
            <Button variant="outline" onClick={() => navigate('/admin')}>
              Go to Admin (if authenticated)
            </Button>
          </Group>
        </Paper>
        <ColorSchemeToggle />
      </Stack>
    </motion.div>
  );
}
