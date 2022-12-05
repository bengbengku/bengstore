import { Badge, Box, Group, Text } from '@mantine/core';
import React from 'react';

const ListAddress = ({ name, detail, kota, provinsi }) => {
  return (
    <Box
      sx={(theme) => ({
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
        textAlign: 'left',
        padding: theme.spacing.xl,
        borderRadius: theme.radius.xs,
        cursor: 'pointer',
        width: '100%',

        '&:hover': {
          backgroundColor:
            theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1],
        },
      })}
    >
      <Group>
        <Badge radius='xs'>{name}</Badge>
        <Text c='dimmed'>{`${detail}, ${kota}, ${provinsi}.`} </Text>
      </Group>
    </Box>
  );
};

export default ListAddress;
