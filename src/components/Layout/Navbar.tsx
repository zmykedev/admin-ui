import { NavLink } from 'react-router-dom';
import { Stack, Text, rem, Box } from '@mantine/core';

const navItems = [
  { label: 'Dashboard', href: '/admin', exact: true },
  { label: 'Users', href: '/admin/users' },
  { label: 'Organizations', href: '/admin/organizations' },
  { label: 'Reports', href: '/admin/reports' },
  { label: 'Analytics', href: '/admin/analytics' },
  { label: 'Settings', href: '/admin/settings' },
];

export function Navbar() {
  return (
    <Stack gap="xs">
      <Text size="xs" fw={500} c="dimmed" tt="uppercase" mb="md">
        Navigation
      </Text>
      
      {navItems.map((item) => (
        <NavLink
          key={item.href}
          to={item.href}
          end={item.exact}
          style={({ isActive }) => ({
            display: 'flex',
            alignItems: 'center',
            gap: rem(12),
            padding: `${rem(8)} ${rem(12)}`,
            borderRadius: rem(6),
            textDecoration: 'none',
            color: 'inherit',
            backgroundColor: isActive ? 'var(--mantine-color-blue-1)' : 'transparent',
            fontWeight: isActive ? 600 : 400,
            position: 'relative',
            transition: 'all 0.2s ease',
            borderLeft: isActive ? `3px solid var(--mantine-color-blue-6)` : '3px solid transparent',
          })}
        >
          {({ isActive }) => (
            <>
              {isActive && (
                <Box
                  style={{
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    bottom: 0,
                    width: '3px',
                    backgroundColor: 'var(--mantine-color-blue-6)',
                    borderRadius: '0 2px 2px 0',
                  }}
                />
              )}
              <Text 
                size="sm" 
                style={{
                  color: isActive ? 'var(--mantine-color-blue-6)' : 'inherit',
                  fontWeight: isActive ? 600 : 400,
                }}
              >
                {item.label}
              </Text>
            </>
          )}
        </NavLink>
      ))}
    </Stack>
  );
} 