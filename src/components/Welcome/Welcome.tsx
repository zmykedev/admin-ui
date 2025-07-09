import { Anchor, Text, Title } from '@mantine/core';
import classes from './Welcome.module.css';

export function Welcome() {
  return (
    <>
      <Title className={classes.title} ta="center" mt={50}>
        Welcome to{' '}
        <Text inherit variant="gradient" component="span" gradient={{ from: 'pink', to: 'yellow' }}>
          Admin-UI
        </Text>
      </Title>
      <Text c="dimmed" ta="center" size="lg" maw={580} mx="auto" mt="xl">
        Admin-UI is constructed with <Anchor href="https://mantine.dev/" target="_blank" size="lg">Mantine</Anchor> to provide a modern, flexible, and enjoyable development experience. 
       
      </Text>
    </>
  );
}
