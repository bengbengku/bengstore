import { Center, Pagination, SimpleGrid } from '@mantine/core';
import React, { useState } from 'react';
import Footer from '../../components/footer';
import HeaderLayout from '../../components/header';
import Post from '../../components/post';

const Home = () => {
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  return (
    <div>
      <HeaderLayout />
      <Center>
        <SimpleGrid
          cols={4}
          px={{ base: '1rem', lg: '2rem' }}
          py='1rem'
          style={{ marginTop: '4rem' }}
          breakpoints={[
            { maxWidth: 'md', cols: 3, spacing: 'md' },
            { maxWidth: 'sm', cols: 2, spacing: 'sm' },
            { maxWidth: 'xs', cols: 1, spacing: 'sm' },
          ]}
        >
          {/* <Text mt='4rem'>Tags</Text> */}
          <Post page={page} setPages={setPages} />
        </SimpleGrid>
      </Center>
      <Center mt='1rem'>
        <Pagination
          page={page}
          onChange={setPage}
          total={pages}
          styles={(theme) => ({
            item: {
              '&[data-active]': {
                backgroundImage: theme.fn.gradient({ from: 'indigo', to: 'cyan' }),
              },
            },
          })}
        />
      </Center>
      <Footer />
    </div>
  );
};

export default Home;
