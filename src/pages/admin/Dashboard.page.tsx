import { Grid, Paper, Text, Group, RingProgress, Stack, Title, SimpleGrid } from '@mantine/core';

export function DashboardPage() {
  const stats = [
    { label: 'Total Users', value: '1,234', change: '+12%', changeType: 'positive' },
    { label: 'Active Users', value: '892', change: '+8%', changeType: 'positive' },
    { label: 'Revenue', value: '$45,678', change: '+23%', changeType: 'positive' },
    { label: 'Orders', value: '567', change: '-3%', changeType: 'negative' },
  ];

  return (
    <Stack gap="lg">
      <Title order={2}>Dashboard</Title>
      
      <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }}>
        {stats.map((stat) => (
          <Paper key={stat.label} p="md" withBorder>
            <Stack gap="xs">
              <Text size="xs" c="dimmed" tt="uppercase">
                {stat.label}
              </Text>
              <Group justify="space-between">
                <Text size="xl" fw={700}>
                  {stat.value}
                </Text>
                <Text 
                  size="sm" 
                  c={stat.changeType === 'positive' ? 'green' : 'red'}
                >
                  {stat.change}
                </Text>
              </Group>
            </Stack>
          </Paper>
        ))}
      </SimpleGrid>

      <Grid>
        <Grid.Col span={{ base: 12, md: 8 }}>
          <Paper p="md" withBorder>
            <Title order={3} mb="md">Recent Activity</Title>
            <Stack gap="sm">
              {[1, 2, 3, 4, 5].map((i) => (
                <Group key={i} justify="space-between" p="xs">
                  <div>
                    <Text size="sm" fw={500}>User {i} registered</Text>
                    <Text size="xs" c="dimmed">2 hours ago</Text>
                  </div>
                  <Text size="xs" c="blue">View</Text>
                </Group>
              ))}
            </Stack>
          </Paper>
        </Grid.Col>
        
        <Grid.Col span={{ base: 12, md: 4 }}>
          <Paper p="md" withBorder>
            <Title order={3} mb="md">System Status</Title>
            <Stack gap="lg">
              <div>
                <Text size="sm" mb="xs">CPU Usage</Text>
                <RingProgress
                  size={80}
                  thickness={8}
                  sections={[{ value: 65, color: 'blue' }]}
                  label={
                    <Text ta="center" size="xs" fw={700}>
                      65%
                    </Text>
                  }
                />
              </div>
              <div>
                <Text size="sm" mb="xs">Memory Usage</Text>
                <RingProgress
                  size={80}
                  thickness={8}
                  sections={[{ value: 45, color: 'green' }]}
                  label={
                    <Text ta="center" size="xs" fw={700}>
                      45%
                    </Text>
                  }
                />
              </div>
            </Stack>
          </Paper>
        </Grid.Col>
      </Grid>
    </Stack>
  );
} 