import { useState, useEffect } from 'react';
import { 
  Table, 
  Group, 
  Text, 
  ActionIcon, 
  Stack, 
  Title, 
  Button, 
  TextInput, 
  Paper,
  Modal,
  Loader,
  Alert
} from '@mantine/core';
import { api } from '../../api';

interface User {
  id: number;
  username: string;
  email: string;
  created_at: string;
}

interface ApiResponse {
  users: User[];
}

export function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newUser, setNewUser] = useState({ username: '', email: '' });
  const [isAddingUser, setIsAddingUser] = useState(false);

  // Función para obtener usuarios desde la API
  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`${api.baseURL}/users`);
      
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
      
      const data: ApiResponse = await response.json();
      setUsers(data.users);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar usuarios');
      console.error('Error fetching users:', err);
    } finally {
      setLoading(false);
    }
  };

  // Función para agregar un nuevo usuario
  const handleAddUser = async () => {
    if (!newUser.username.trim() || !newUser.email.trim()) {
      return;
    }

    try {
      setIsAddingUser(true);
      const response = await fetch(`${api.baseURL}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      // Limpiar el formulario
      setNewUser({ username: '', email: '' });
      
      // Volver a cargar todos los usuarios desde la API
      await fetchUsers();
    } catch (err) {
      console.error('Error adding user:', err);
      setError(err instanceof Error ? err.message : 'Error al agregar usuario');
    } finally {
      setIsAddingUser(false);
    }
  };

  // Cargar usuarios al montar el componente
  useEffect(() => {
    fetchUsers();
  }, []);

  const filteredUsers = users.filter(user =>
    user.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleSaveUser = (updatedUser: User) => {
    setUsers(users.map(user => user.id === updatedUser.id ? updatedUser : user));
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  // Mostrar loader mientras carga
  if (loading) {
    return (
      <Stack gap="lg" align="center" justify="center" style={{ minHeight: '200px' }}>
        <Loader size="lg" />
        <Text>Cargando usuarios...</Text>
      </Stack>
    );
  }

  // Mostrar error si hay alguno
  if (error) {
    return (
      <Stack gap="lg">
        <Group justify="space-between">
          <Title order={2}>Users</Title>
          <Button onClick={fetchUsers}>Reintentar</Button>
        </Group>
        <Alert color="red" title="Error">
          {error}
        </Alert>
      </Stack>
    );
  }

  const rows = filteredUsers.map((user) => (
    <Table.Tr key={user.id}>
      <Table.Td>
        <Text size="sm" fw={500}>{user.username}</Text>
      </Table.Td>
      <Table.Td>{user.email}</Table.Td>
      <Table.Td>{new Date(user.created_at).toLocaleDateString()}</Table.Td>
      <Table.Td>
        <Group gap="xs">
          <ActionIcon variant="subtle" color="blue" onClick={() => handleEditUser(user)}>
            <span role="img" aria-label="Edit">✏️</span>
          </ActionIcon>
          <ActionIcon variant="subtle" color="red">
            <span role="img" aria-label="Delete">🗑️</span>
          </ActionIcon>
        </Group>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Stack gap="lg">
      <Group justify="space-between">
        <Title order={2}>Users</Title>
      </Group>

      <Paper p="md" withBorder>
        <Group mb="md">
          <TextInput
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.currentTarget.value)}
            style={{ flex: 1 }}
          />
          <Button variant="light" onClick={fetchUsers}>
            Actualizar
          </Button>
        </Group>

        <Table>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Username</Table.Th>
              <Table.Th>Email</Table.Th>
              <Table.Th>Created</Table.Th>
              <Table.Th>Actions</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {/* Fila de entrada moderna para agregar usuario */}
            <Table.Tr
              style={{
                background: 'linear-gradient(135deg, rgba(74, 144, 226, 0.08) 0%, rgba(80, 200, 120, 0.08) 100%)',
                borderRadius: '12px',
                border: '2px dashed rgba(74, 144, 226, 0.3)',
                transition: 'all 0.3s ease',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <Table.Td>
                <TextInput
                  placeholder="Enter username..."
                  value={newUser.username}
                  onChange={(e) => setNewUser({...newUser, username: e.currentTarget.value})}
                  styles={{
                    input: {
                      border: 'none',
                      background: 'rgba(255, 255, 255, 0.9)',
                      backdropFilter: 'blur(10px)',
                      borderRadius: '8px',
                      fontSize: '14px',
                      fontWeight: 500,
                      transition: 'all 0.3s ease',
                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                    }
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.transform = 'scale(1.02)';
                    e.currentTarget.style.boxShadow = '0 4px 16px rgba(74, 144, 226, 0.3)';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
                  }}
                />
              </Table.Td>
              <Table.Td>
                <TextInput
                  placeholder="Enter email..."
                  value={newUser.email}
                  onChange={(e) => setNewUser({...newUser, email: e.currentTarget.value})}
                  styles={{
                    input: {
                      border: 'none',
                      background: 'rgba(255, 255, 255, 0.9)',
                      backdropFilter: 'blur(10px)',
                      borderRadius: '8px',
                      fontSize: '14px',
                      fontWeight: 500,
                      transition: 'all 0.3s ease',
                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                    }
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.transform = 'scale(1.02)';
                    e.currentTarget.style.boxShadow = '0 4px 16px rgba(74, 144, 226, 0.3)';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
                  }}
                />
              </Table.Td>
              <Table.Td>
                <Text size="xs" c="dimmed" fw={500}>
                  New user
                </Text>
              </Table.Td>
              <Table.Td>
                <Group gap="xs">
                  <ActionIcon
                    variant="gradient"
                    gradient={{ from: 'teal', to: 'lime', deg: 45 }}
                    onClick={handleAddUser}
                    loading={isAddingUser}
                    disabled={!newUser.username.trim() || !newUser.email.trim()}
                    style={{
                      transition: 'all 0.3s ease',
                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'scale(1.1)';
                      e.currentTarget.style.boxShadow = '0 4px 16px rgba(80, 200, 120, 0.4)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'scale(1)';
                      e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
                    }}
                  >
                    <span role="img" aria-label="Add">➕</span>
                  </ActionIcon>
                  <ActionIcon
                    variant="subtle"
                    color="gray"
                    onClick={() => setNewUser({ username: '', email: '' })}
                    style={{
                      transition: 'all 0.3s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'scale(1.1)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'scale(1)';
                    }}
                  >
                    <span role="img" aria-label="Clear">🗑️</span>
                  </ActionIcon>
                </Group>
              </Table.Td>
            </Table.Tr>
            {rows}
          </Table.Tbody>
        </Table>
      </Paper>

      <Modal 
        opened={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        title="Edit User"
        size="md"
      >
        {selectedUser && (
          <Stack gap="md">
            <TextInput
              label="Username"
              value={selectedUser.username}
              onChange={(e) => setSelectedUser({...selectedUser, username: e.currentTarget.value})}
            />
            <TextInput
              label="Email"
              value={selectedUser.email}
              onChange={(e) => setSelectedUser({...selectedUser, email: e.currentTarget.value})}
            />
            <Group justify="flex-end">
              <Button variant="outline" onClick={() => setIsModalOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => handleSaveUser(selectedUser)}>
                Save
              </Button>
            </Group>
          </Stack>
        )}
      </Modal>
    </Stack>
  );
} 