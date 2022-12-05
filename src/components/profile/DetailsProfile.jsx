import { ActionIcon, Avatar, Button, Center, Group, Paper, Text } from '@mantine/core';
import { IconBrandInstagram, IconBrandTwitter, IconBrandYoutube } from '@tabler/icons';
import React from 'react';
import { useSelector } from 'react-redux';

const DetailsProfile = () => {
  const { user } = useSelector((user) => ({ ...user }));
  return (
    <Paper
      radius='none'
      p='lg'
      sx={(theme) => ({
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
        height: '32vh',
        margin: '4rem 0.8rem 0 0',
        width: '100vw',
      })}
    >
      <Avatar radius={120} mx='auto' size='xl' />
      <Text align='center' size='lg' weight={500} mt='md'>
        {user.user.full_name}
      </Text>
      <Text align='center' color='dimmed' size='sm'>
        {user.user.email}
      </Text>

      <Center>
        <Group mt={20}>
          <ActionIcon size='lg'>
            <IconBrandTwitter size={18} stroke={1.5} />
          </ActionIcon>
          <ActionIcon size='lg'>
            <IconBrandYoutube size={18} stroke={1.5} />
          </ActionIcon>
          <ActionIcon size='lg'>
            <IconBrandInstagram size={18} stroke={1.5} />
          </ActionIcon>
        </Group>
      </Center>
    </Paper>
  );
};

export default DetailsProfile;
