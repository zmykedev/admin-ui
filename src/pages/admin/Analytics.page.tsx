import { Stack, Title, Paper, Grid, Text, Group, RingProgress, SimpleGrid } from '@mantine/core';

export function AnalyticsPage() {
  const metrics = [
    { label: 'Total Revenue', value: '$125,000', change: '+15%', changeType: 'positive' },
    { label: 'Active Users', value: '2,847', change: '+8%', changeType: 'positive' },
    { label: 'Conversion Rate', value: '3.2%', change: '+0.5%', changeType: 'positive' },
    { label: 'Bounce Rate', value: '42%', change: '-2%', changeType: 'positive' },
  ];

  const topPages = [
    { page: '/dashboard', views: 1247, uniqueVisitors: 892 },
    { page: '/users', views: 856, uniqueVisitors: 634 },
    { page: '/settings', views: 543, uniqueVisitors: 421 },
    { page: '/analytics', views: 432, uniqueVisitors: 298 },
  ];

  const userActivity = [
    { time: '00:00', users: 45 },
    { time: '04:00', users: 23 },
    { time: '08:00', users: 156 },
    { time: '12:00', users: 234 },
    { time: '16:00', users: 189 },
    { time: '20:00', users: 98 },
  ];

  return (
    <Stack gap="lg">
      <Title order={2}>Analytics</Title>

      <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }}>
        {metrics.map((metric) => (
          <Paper key={metric.label} p="md" withBorder>
            <Stack gap="xs">
              <Text size="xs" c="dimmed" tt="uppercase">
                {metric.label}
              </Text>
              <Group justify="space-between">
                <Text size="xl" fw={700}>
                  {metric.value}
                </Text>
                <Text 
                  size="sm" 
                  c={metric.changeType === 'positive' ? 'green' : 'red'}
                >
                  {metric.change}
                </Text>
              </Group>
            </Stack>
          </Paper>
        ))}
      </SimpleGrid>

      <Grid>
        <Grid.Col span={{ base: 12, lg: 8 }}>
          <Paper p="md" withBorder>
            <Title order={3} mb="md">User Activity (24h)</Title>
            <div style={{ height: 200, display: 'flex', alignItems: 'end', gap: '8px' }}>
              {userActivity.map((data, index) => (
                <div
                  key={index}
                  style={{
                    flex: 1,
                    backgroundColor: 'var(--mantine-color-blue-6)',
                    height: `${(data.users / 250) * 100}%`,
                    minHeight: '20px',
                    borderRadius: '4px 4px 0 0',
                    display: 'flex',
                    alignItems: 'end',
                    justifyContent: 'center',
                    paddingBottom: '8px',
                    color: 'white',
                    fontSize: '12px'
                  }}
                >
                  {data.users}
                </div>
              ))}
            </div>
            <Group justify="space-between" mt="xs">
              {userActivity.map((data, index) => (
                <Text key={index} size="xs" c="dimmed">
                  {data.time}
                </Text>
              ))}
            </Group>
          </Paper>
        </Grid.Col>

        <Grid.Col span={{ base: 12, lg: 4 }}>
          <Paper p="md" withBorder>
            <Title order={3} mb="md">Traffic Sources</Title>
            <Stack gap="md">
              <div>
                <Group justify="space-between" mb="xs">
                  <Text size="sm">Direct</Text>
                  <Text size="sm" fw={500}>45%</Text>
                </Group>
                <RingProgress
                  size={60}
                  thickness={6}
                  sections={[{ value: 45, color: 'blue' }]}
                />
              </div>
              <div>
                <Group justify="space-between" mb="xs">
                  <Text size="sm">Organic Search</Text>
                  <Text size="sm" fw={500}>32%</Text>
                </Group>
                <RingProgress
                  size={60}
                  thickness={6}
                  sections={[{ value: 32, color: 'green' }]}
                />
              </div>
              <div>
                <Group justify="space-between" mb="xs">
                  <Text size="sm">Social Media</Text>
                  <Text size="sm" fw={500}>23%</Text>
                </Group>
                <RingProgress
                  size={60}
                  thickness={6}
                  sections={[{ value: 23, color: 'orange' }]}
                />
              </div>
            </Stack>
          </Paper>
        </Grid.Col>
      </Grid>

      <Paper p="md" withBorder>
        <Title order={3} mb="md">Top Pages</Title>
        <Stack gap="sm">
          {topPages.map((page, index) => (
            <Group key={index} justify="space-between" p="xs">
              <div>
                <Text size="sm" fw={500}>{page.page}</Text>
                <Text size="xs" c="dimmed">{page.uniqueVisitors} unique visitors</Text>
              </div>
              <Text size="sm" fw={500}>{page.views} views</Text>
            </Group>
          ))}
        </Stack>
      </Paper>
    </Stack>
  );
} 