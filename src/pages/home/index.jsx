import { Center, Pagination, SimpleGrid } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import Footer from '../../components/footer';
import HeaderLayout from '../../components/header';
import Post from '../../components/post';
import Tags from '../../components/post/Tags';
import axios from 'axios';

const Home = () => {
  const [page, setPage] = useState(1);
  const [text, setText] = useState('');
  const [pages, setPages] = useState(1);
  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);

  useEffect(() => {
    getAllTag();
  }, []);

  const getAllTag = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/tags`);
      const { tag } = data;
      setTags(tag);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <HeaderLayout setText={setText} setPage={setPage} />
      <Tags
        tags={tags}
        selectedTags={selectedTags}
        setPage={setPage}
        setSelectedTags={setSelectedTags}
      />
      <Center>
        <SimpleGrid
          cols={4}
          px={{ base: '1rem', lg: '2rem' }}
          py='1rem'
          breakpoints={[
            { maxWidth: 'md', cols: 3, spacing: 'md' },
            { maxWidth: 'sm', cols: 2, spacing: 'sm' },
            { maxWidth: 'xs', cols: 1, spacing: 'sm' },
          ]}
        >
          <Post
            text={text}
            page={page}
            setPage={setPage}
            setPages={setPages}
            selectedTags={selectedTags}
          />
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
