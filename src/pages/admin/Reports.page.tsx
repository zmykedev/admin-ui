import { useState } from 'react';
import { 
  Stack, 
  Title, 
  Paper, 
  Button, 
  Group, 
  Select, 
  Table,
  Text,
  Badge,
  ActionIcon,
  Modal,
  Textarea,
  TextInput
} from '@mantine/core';

interface Report {
  id: string;
  name: string;
  type: string;
  status: 'completed' | 'processing' | 'failed';
  createdAt: string;
  size: string;
}

const mockReports: Report[] = [
  { id: '1', name: 'User Activity Report', type: 'User Analytics', status: 'completed', createdAt: '2024-01-15', size: '2.3 MB' },
  { id: '2', name: 'Revenue Report', type: 'Financial', status: 'completed', createdAt: '2024-01-14', size: '1.8 MB' },
  { id: '3', name: 'System Performance', type: 'System', status: 'processing', createdAt: '2024-01-15', size: '-' },
  { id: '4', name: 'Error Log Report', type: 'System', status: 'failed', createdAt: '2024-01-13', size: '-' },
];

export function ReportsPage() {
  const [reports, setReports] = useState<Report[]>(mockReports);
  const [selectedReportType, setSelectedReportType] = useState<string>('');
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'green';
      case 'processing': return 'blue';
      case 'failed': return 'red';
      default: return 'gray';
    }
  };

  const handleGenerateReport = () => {
    const newReport: Report = {
      id: Date.now().toString(),
      name: `${selectedReportType} Report`,
      type: selectedReportType,
      status: 'processing',
      createdAt: new Date().toISOString().split('T')[0],
      size: '-'
    };
    setReports(prev => [newReport, ...prev]);
    setIsModalOpen(false);
  };

  const rows = reports.map((report) => (
    <Table.Tr key={report.id}>
      <Table.Td>
        <Text size="sm" fw={500}>{report.name}</Text>
      </Table.Td>
      <Table.Td>{report.type}</Table.Td>
      <Table.Td>
        <Badge color={getStatusColor(report.status)} variant="light">
          {report.status}
        </Badge>
      </Table.Td>
      <Table.Td>{report.createdAt}</Table.Td>
      <Table.Td>{report.size}</Table.Td>
      <Table.Td>
        <Group gap="xs">
          {report.status === 'completed' && (
            <ActionIcon variant="subtle" color="blue">
              Download
            </ActionIcon>
          )}
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
        <Title order={2}>Reports</Title>
        <Button onClick={() => setIsModalOpen(true)}>Generate Report</Button>
      </Group>

      <Paper p="md" withBorder>
        <Title order={3} mb="md">Recent Reports</Title>
        <Table>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Name</Table.Th>
              <Table.Th>Type</Table.Th>
              <Table.Th>Status</Table.Th>
              <Table.Th>Created</Table.Th>
              <Table.Th>Size</Table.Th>
              <Table.Th>Actions</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </Paper>

      <Modal 
        opened={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        title="Generate New Report"
        size="md"
      >
        <Stack gap="md">
          <Select
            label="Report Type"
            placeholder="Select report type"
            value={selectedReportType}
            onChange={(value) => setSelectedReportType(value || '')}
            data={[
              'User Analytics',
              'Financial',
              'System',
              'Security',
              'Performance'
            ]}
            required
          />
          <TextInput
            label="Start Date"
            placeholder="YYYY-MM-DD"
            value={startDate?.toISOString().split('T')[0] || ''}
            onChange={(e) => setStartDate(e.currentTarget.value ? new Date(e.currentTarget.value) : null)}
          />
          <TextInput
            label="End Date"
            placeholder="YYYY-MM-DD"
            value={endDate?.toISOString().split('T')[0] || ''}
            onChange={(e) => setEndDate(e.currentTarget.value ? new Date(e.currentTarget.value) : null)}
          />
          <Textarea
            label="Description (Optional)"
            placeholder="Add a description for this report"
            rows={3}
          />
          <Group justify="flex-end">
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleGenerateReport}
              disabled={!selectedReportType}
            >
              Generate Report
            </Button>
          </Group>
        </Stack>
      </Modal>
    </Stack>
  );
} 