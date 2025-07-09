import { Button, Group, useMantineColorScheme, Paper, Text, Stack, rem } from '@mantine/core';

export function ColorSchemeToggle() {
  const { setColorScheme, colorScheme } = useMantineColorScheme();

  const themeOptions = [
    {
      value: 'light',
      label: 'Light',
      icon: '☀️',
      color: 'yellow'
    },
    {
      value: 'dark',
      label: 'Dark',
      icon: '🌙',
      color: 'blue'
    }
  ];

  return (
    <Paper
      shadow="xl"
      p="md"
      radius="xl"
      style={{
        position: 'fixed',
        bottom: rem(20),
        right: rem(20),
        zIndex: 1000,
        backdropFilter: 'blur(10px)',
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        transition: 'all 0.3s ease',
        cursor: 'pointer',
        minWidth: rem(160),
        animation: 'float 6s ease-in-out infinite',
      }}
    >
      <Stack gap="xs">
        <Text size="xs" fw={600} ta="center" c="dimmed">
          Theme
        </Text>
        <Group gap="xs" justify="center">
          {themeOptions.map((option) => {
            const isActive = colorScheme === option.value;
            
            return (
              <Button
                key={option.value}
                variant={isActive ? "filled" : "light"}
                color={option.color}
                size="sm"
                radius="lg"
                onClick={() => setColorScheme(option.value as any)}
                style={{
                  transition: 'all 0.2s ease',
                  transform: isActive ? 'scale(1.05)' : 'scale(1)',
                  boxShadow: isActive ? '0 4px 12px rgba(0,0,0,0.15)' : 'none',
                }}
                leftSection={<span style={{ fontSize: '14px' }}>{option.icon}</span>}
              >
                {option.label}
              </Button>
            );
          })}
        </Group>
      </Stack>
      
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        [data-mantine-color-scheme="dark"] .mantine-Paper-root {
          background-color: rgba(30, 30, 30, 0.9) !important;
          border: 1px solid rgba(255, 255, 255, 0.1) !important;
        }
        
        .mantine-Paper-root:hover {
          transform: translateY(-5px) scale(1.02);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
        }
      `}</style>
    </Paper>
  );
}
