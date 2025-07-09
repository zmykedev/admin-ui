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
  Select,
  Textarea
} from '@mantine/core';

interface Organization {
  id: string;
  name: string;
  description: string;
  type: string;
  status: 'active' | 'inactive' | 'pending';
  members: number;
  createdAt: string;
}

const mockOrganizations: Organization[] = [
  { 
    id: '1', 
    name: 'Tech Corp', 
    description: 'Technology company', 
    type: 'Enterprise', 
    status: 'active', 
    members: 150, 
    createdAt: '2024-01-15' 
  },
  { 
    id: '2', 
    name: 'Startup Inc', 
    description: 'Innovative startup', 
    type: 'Startup', 
    status: 'active', 
    members: 25, 
    createdAt: '2024-01-20' 
  },
  { 
    id: '3', 
    name: 'Consulting Group', 
    description: 'Business consulting', 
    type: 'Consulting', 
    status: 'inactive', 
    members: 75, 
    createdAt: '2024-01-25' 
  },
];

export function OrganizationsPage() {
  const [organizations, setOrganizations] = useState<Organization[]>(mockOrganizations);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOrg, setSelectedOrg] = useState<Organization | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredOrganizations = organizations.filter(org =>
    org.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    org.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'green';
      case 'inactive': return 'red';
      case 'pending': return 'yellow';
      default: return 'gray';
    }
  };

  const handleEditOrg = (org: Organization) => {
    setSelectedOrg(org);
    setIsModalOpen(true);
  };

  const handleSaveOrg = (updatedOrg: Organization) => {
    setOrganizations(orgs => orgs.map(org => org.id === updatedOrg.id ? updatedOrg : org));
    setIsModalOpen(false);
    setSelectedOrg(null);
  };

  const rows = filteredOrganizations.map((org) => (
    <Table.Tr key={org.id}>
      <Table.Td>
        <Text size="sm" fw={500}>{org.name}</Text>
      </Table.Td>
      <Table.Td>{org.description}</Table.Td>
      <Table.Td>{org.type}</Table.Td>
      <Table.Td>
        <Badge color={getStatusColor(org.status)} variant="light">
          {org.status}
        </Badge>
      </Table.Td>
      <Table.Td>{org.members}</Table.Td>
      <Table.Td>{org.createdAt}</Table.Td>
      <Table.Td>
        <Group gap="xs">
          <ActionIcon variant="subtle" color="blue" onClick={() => handleEditOrg(org)}>
            Edit
          </ActionIcon>
          <ActionIcon variant="subtle" color="red">
            Delete
          </ActionIcon>
        </Group>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Stack gap="lg">
      <Group justify="space-between">
        <Title order={2}>Organizations</Title>
        <Button>Add Organization</Button>
      </Group>

      <Paper p="md" withBorder>
        <Group mb="md">
          <TextInput
            placeholder="Search organizations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.currentTarget.value)}
            style={{ flex: 1 }}
          />
        </Group>

        <Table>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Name</Table.Th>
              <Table.Th>Description</Table.Th>
              <Table.Th>Type</Table.Th>
              <Table.Th>Status</Table.Th>
              <Table.Th>Members</Table.Th>
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
        title="Edit Organization"
        size="md"
      >
        {selectedOrg && (
          <Stack gap="md">
            <TextInput
              label="Name"
              value={selectedOrg.name}
              onChange={(e) => setSelectedOrg({...selectedOrg, name: e.currentTarget.value})}
            />
            <Textarea
              label="Description"
              value={selectedOrg.description}
              onChange={(e) => setSelectedOrg({...selectedOrg, description: e.currentTarget.value})}
            />
            <Select
              label="Type"
              value={selectedOrg.type}
              onChange={(value) => setSelectedOrg({...selectedOrg, type: value || ''})}
              data={['Enterprise', 'Startup', 'Consulting', 'Non-profit']}
            />
            <Select
              label="Status"
              value={selectedOrg.status}
              onChange={(value) => setSelectedOrg({...selectedOrg, status: value as any})}
              data={['active', 'inactive', 'pending']}
            />
            <Group justify="flex-end">
              <Button variant="outline" onClick={() => setIsModalOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => handleSaveOrg(selectedOrg)}>
                Save
              </Button>
            </Group>
          </Stack>
        )}
      </Modal>
    </Stack>
  );
} 