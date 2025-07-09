import { useState } from 'react';
import { 
  Stack, 
  Title, 
  Paper, 
  TextInput, 
  Switch, 
  Select, 
  Button, 
  Group, 
  ColorInput,
  NumberInput
} from '@mantine/core';

export function SettingsPage() {
  const [settings, setSettings] = useState({
    siteName: 'Admin Panel',
    siteDescription: 'A modern admin interface',
    primaryColor: '#228be6',
    maxUsers: 1000,
    enableNotifications: true,
    enableAnalytics: true,
    maintenanceMode: false,
    timezone: 'UTC',
    language: 'en'
  });

  const handleSettingChange = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    // Here you would typically save to backend
    console.log('Saving settings:', settings);
  };

  return (
    <Stack gap="lg">
      <Title order={2}>Settings</Title>

      <Paper p="md" withBorder>
        <Title order={3} mb="md">General Settings</Title>
        <Stack gap="md">
          <TextInput
            label="Site Name"
            value={settings.siteName}
            onChange={(e) => handleSettingChange('siteName', e.currentTarget.value)}
          />
          <TextInput
            label="Site Description"
            value={settings.siteDescription}
            onChange={(e) => handleSettingChange('siteDescription', e.currentTarget.value)}
          />
          <ColorInput
            label="Primary Color"
            value={settings.primaryColor}
            onChange={(value) => handleSettingChange('primaryColor', value)}
          />
          <NumberInput
            label="Maximum Users"
            value={settings.maxUsers}
            onChange={(value) => handleSettingChange('maxUsers', value)}
            min={1}
            max={10000}
          />
        </Stack>
      </Paper>

      <Paper p="md" withBorder>
        <Title order={3} mb="md">System Settings</Title>
        <Stack gap="md">
          <Select
            label="Timezone"
            value={settings.timezone}
            onChange={(value) => handleSettingChange('timezone', value)}
            data={['UTC', 'America/New_York', 'Europe/London', 'Asia/Tokyo']}
          />
          <Select
            label="Language"
            value={settings.language}
            onChange={(value) => handleSettingChange('language', value)}
            data={[
              { value: 'en', label: 'English' },
              { value: 'es', label: 'Spanish' },
              { value: 'fr', label: 'French' },
              { value: 'de', label: 'German' }
            ]}
          />
        </Stack>
      </Paper>

      <Paper p="md" withBorder>
        <Title order={3} mb="md">Feature Toggles</Title>
        <Stack gap="md">
          <Switch
            label="Enable Notifications"
            checked={settings.enableNotifications}
            onChange={(e) => handleSettingChange('enableNotifications', e.currentTarget.checked)}
          />
          <Switch
            label="Enable Analytics"
            checked={settings.enableAnalytics}
            onChange={(e) => handleSettingChange('enableAnalytics', e.currentTarget.checked)}
          />
          <Switch
            label="Maintenance Mode"
            checked={settings.maintenanceMode}
            onChange={(e) => handleSettingChange('maintenanceMode', e.currentTarget.checked)}
          />
        </Stack>
      </Paper>

      <Paper p="md" withBorder>
        <Title order={3} mb="md">Security Settings</Title>
        <Stack gap="md">
          <TextInput
            label="Session Timeout (minutes)"
            type="number"
            defaultValue="30"
          />
          <Switch
            label="Require Two-Factor Authentication"
            defaultChecked
          />
          <Switch
            label="Enable Rate Limiting"
            defaultChecked
          />
        </Stack>
      </Paper>

      <Group justify="flex-end">
        <Button variant="outline">Reset to Defaults</Button>
        <Button onClick={handleSave}>Save Settings</Button>
      </Group>
    </Stack>
  );
} 