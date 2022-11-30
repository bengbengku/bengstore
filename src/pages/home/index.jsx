import { Center, Container, SimpleGrid } from '@mantine/core';
import React from 'react';
import Footer from '../../components/footer';
import HeaderLayout from '../../components/header';
import Post from '../../components/post';

const Home = () => {
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
          <Post />
        </SimpleGrid>
      </Center>
      <Footer />
    </div>
  );
};

export default Home;
