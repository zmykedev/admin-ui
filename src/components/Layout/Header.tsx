import { Group, Title, Text, Avatar, Menu, UnstyledButton } from '@mantine/core';

export function Header() {
  return (
    <Group h="100%" px="md">
      <Title order={3} c="dimmed">Admin-UI</Title>
      <Group justify="flex-end" style={{ flex: 1 }}>
        <Menu shadow="md" width={200}>
          <Menu.Target>
            <UnstyledButton>
              <Group>
                <Avatar size="sm" radius="xl" />
                <div style={{ flex: 1 }}>
                  <Text size="sm" fw={500}>
                    Admin User
                  </Text>
                  <Text c="dimmed" size="xs">
                    admin@example.com
                  </Text>
                </div>
              </Group>
            </UnstyledButton>
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Item>Profile</Menu.Item>
            <Menu.Item>Settings</Menu.Item>
            <Menu.Divider />
            <Menu.Item color="red">Logout</Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Group>
    </Group>
  );
} 