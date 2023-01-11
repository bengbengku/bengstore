import { Chip, Text } from '@mantine/core';
import React from 'react';

const Tags = ({ tags, selectedTags, setSelectedTags }) => {
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
        {tags?.map((tag) => (
          <Chip key={tag._id} value={tag.name} variant='filled' size='xs'>
            {tag.name}
          </Chip>
        ))}
      </Chip.Group>
    </div>
  );
};

export default Tags;
