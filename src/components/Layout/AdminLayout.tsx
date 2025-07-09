import { AppShell, Burger, Group, Title, Text, Avatar, Menu, UnstyledButton } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Navbar } from './Navbar';
import { ColorSchemeToggle } from '../ColorSchemeToggle/ColorSchemeToggle';
import { motion, AnimatePresence } from 'framer-motion';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const [opened, { toggle }] = useDisclosure();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const location = useLocation();

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: 'sm', collapsed: { mobile: !opened } }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <Title order={3} c="dimmed">Admin-IU</Title>
          <Group justify="flex-end" style={{ flex: 1 }}>
            <Menu shadow="md" width={200}>
              <Menu.Target>
                <UnstyledButton>
                  <Group>
                    <Avatar size="sm" radius="xl" />
                                      <div style={{ flex: 1 }}>
                    <Text size="sm" fw={500}>
                      {user?.name || 'Admin User'}
                    </Text>
                    <Text c="dimmed" size="xs">
                      {user?.email || 'admin@example.com'}
                    </Text>
                  </div>
                  </Group>
                </UnstyledButton>
              </Menu.Target>

              <Menu.Dropdown>
                <Menu.Item>Profile</Menu.Item>
                <Menu.Item>Settings</Menu.Item>
                <Menu.Divider />
                <Menu.Item 
                  color="red" 
                  onClick={() => {
                    logout();
                    navigate('/login');
                  }}
                >
                  Logout
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Group>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar p="md">
        <Navbar />
      </AppShell.Navbar>

      <AppShell.Main>
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </AppShell.Main>
      
      <ColorSchemeToggle />
    </AppShell>
  );
} 