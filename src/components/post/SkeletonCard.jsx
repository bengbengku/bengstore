import { Avatar, Card, Group, Skeleton, Text } from '@mantine/core';
import React from 'react';
import { postStyles } from '../../styles/postStyles';

const SkeletonCard = ({ i }) => {
  const { classes } = postStyles();
  return (
    <Card withBorder p='lg' radius='md' className={classes.card} key={i._id}>
      <Card.Section mb='sm'>
        <Skeleton height={200} width={400} />
      </Card.Section>

      <div style={{ display: 'flex', width: '100%', flexDirection: 'row', gap: '8px' }}>
        {i.tag.map((t) => (
          // <Badge key={t._id} size='xs' mr={3}>
          <Skeleton key={t._id} height={15} width={60} radius='xl' />
          // </Badge>
        ))}
      </div>

      <Text weight={700} className={classes.title} mt='xs'>
        <Skeleton height={10} width={100} />
      </Text>

      <Group mt='lg'>
        <Avatar>
          <Skeleton height={50} />
        </Avatar>
        <div>
          <Text weight={500}>
            <Skeleton height={10} width={70} />
          </Text>
          <Text size='xs' color='dimmed' mt={4}>
            <Skeleton height={10} width={70} />
          </Text>
        </div>
      </Group>

      <Card.Section className={classes.footer}>
        <Group position='apart'>
          <Text size='md' color='dimmed'>
            <Skeleton height={30} width={80} />
          </Text>
          <Group spacing={0}>
            <Skeleton height={30} width={200} />
          </Group>
        </Group>
      </Card.Section>
    </Card>
  );
};

export default SkeletonCard;
