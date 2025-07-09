import { useState } from 'react';
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
  Badge,
  Modal,
  Select
} from '@mantine/core';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive' | 'pending';
  createdAt: string;
}

const mockUsers: User[] = [
  { id: '1', name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'active', createdAt: '2024-01-15' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'active', createdAt: '2024-01-20' },
  { id: '3', name: 'Bob Johnson', email: 'bob@example.com', role: 'User', status: 'inactive', createdAt: '2024-01-25' },
  { id: '4', name: 'Alice Brown', email: 'alice@example.com', role: 'Moderator', status: 'pending', createdAt: '2024-01-30' },
];

export function UsersPage() {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'green';
      case 'inactive': return 'red';
      case 'pending': return 'yellow';
      default: return 'gray';
    }
  };

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleSaveUser = (updatedUser: User) => {
    setUsers(users.map(user => user.id === updatedUser.id ? updatedUser : user));
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  const rows = filteredUsers.map((user) => (
    <Table.Tr key={user.id}>
      <Table.Td>
        <Text size="sm" fw={500}>{user.name}</Text>
      </Table.Td>
      <Table.Td>{user.email}</Table.Td>
      <Table.Td>{user.role}</Table.Td>
      <Table.Td>
        <Badge color={getStatusColor(user.status)} variant="light">
          {user.status}
        </Badge>
      </Table.Td>
      <Table.Td>{user.createdAt}</Table.Td>
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
        <Button>Add User</Button>
      </Group>

      <Paper p="md" withBorder>
        <Group mb="md">
          <TextInput
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.currentTarget.value)}
            style={{ flex: 1 }}
          />
        </Group>

        <Table>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Name</Table.Th>
              <Table.Th>Email</Table.Th>
              <Table.Th>Role</Table.Th>
              <Table.Th>Status</Table.Th>
              <Table.Th>Created</Table.Th>
              <Table.Th>Actions</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
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
              label="Name"
              value={selectedUser.name}
              onChange={(e) => setSelectedUser({...selectedUser, name: e.currentTarget.value})}
            />
            <TextInput
              label="Email"
              value={selectedUser.email}
              onChange={(e) => setSelectedUser({...selectedUser, email: e.currentTarget.value})}
            />
            <Select
              label="Role"
              value={selectedUser.role}
              onChange={(value) => setSelectedUser({...selectedUser, role: value || ''})}
              data={['Admin', 'User', 'Moderator']}
            />
            <Select
              label="Status"
              value={selectedUser.status}
              onChange={(value) => setSelectedUser({...selectedUser, status: value as any})}
              data={['active', 'inactive', 'pending']}
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