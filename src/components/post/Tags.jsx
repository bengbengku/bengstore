import { Chip, Skeleton, Text } from '@mantine/core';
import React from 'react';

const Tags = ({ tags, selectedTags, setSelectedTags, setPage }) => {
  return (
    <div
      style={{
        margin: '5rem 2rem 0 2rem',
      }}
    >
      <Chip.Group position='left' value={selectedTags} onChange={setSelectedTags} multiple mt={15}>
        <Text fz={22} fw='bold'>
          Tags:{' '}
        </Text>
        {tags.length > 0
          ? tags?.map((tag) => (
              <Chip
                key={tag._id}
                value={tag.name}
                variant='filled'
                size='xs'
                onClick={() => setPage(1)}
              >
                {tag.name}
              </Chip>
            ))
          : Array.from(new Array(10), (val, i) => i + 1).map((id, i) => (
              <Skeleton height={22} radius='xl' width='70px' />
            ))}
      </Chip.Group>
    </div>
  );
};

export default Tags;
