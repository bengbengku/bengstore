import { Avatar, Badge, Button, Card, Group, Image, Text } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { IconShoppingCartPlus } from '@tabler/icons';
import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postStyles } from '../../styles/postStyles';

const Post = () => {
  const items = useSelector((item) => item);
  const { cart } = items;
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const { classes } = postStyles();

  useEffect(() => {
    getAllProduct();
  }, []);
  const getAllProduct = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/products`);
      setData(data.data);
    } catch (err) {
      console.error(err);
    }
  };
  const formatter = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  });

  const addCartHandler = (item) => {
    const findCart = cart.find((obj) => {
      return obj._id === item._id;
    });

    if (findCart) {
      showNotification({
        title: 'Oops...',
        message: 'Produk ini sudah ditambahkan! 🤥',
        styles: (theme) => ({
          root: {
            backgroundColor: theme.colors.red[6],
            borderColor: theme.colors.red[6],

            '&::before': { backgroundColor: theme.white },
          },

          title: { color: theme.white },
          description: { color: theme.white },
          closeButton: {
            color: theme.white,
            '&:hover': { backgroundColor: theme.colors.red[7] },
          },
        }),
      });
    } else {
      Cookies.set('cart', JSON.stringify([...cart, { ...item, qty: 1 }]));
      dispatch({ type: 'ADD_CART', payload: { ...item, qty: 1 } });
    }
  };

  return (
    <>
      {data?.map((i) => (
        <Card withBorder p='lg' radius='md' className={classes.card} key={i._id}>
          <Card.Section mb='sm'>
            <Image src={i.image_url} alt={i.name} height={180} />
          </Card.Section>

          {i.tag.map((t) => (
            <Badge key={t._id} size='xs' mr={3}>
              {t.name}
            </Badge>
          ))}

          <Text weight={700} className={classes.title} mt='xs'>
            {i.description.length > 30 ? `${i.description.substring(0, 70)}...` : i.description}
          </Text>

          <Group mt='lg'>
            <Avatar src={i.image_url} radius='sm' />
            <div>
              <Text weight={500}>{i.name}</Text>
              <Text size='xs' color='dimmed'>
                {i.category.name}
              </Text>
            </div>
          </Group>

          <Card.Section className={classes.footer}>
            <Group position='apart'>
              <Text size='md' color='dimmed'>
                {formatter.format(i.price)}
              </Text>
              <Group spacing={0}>
                <Button
                  leftIcon={<IconShoppingCartPlus />}
                  variant='gradient'
                  gradient={{ from: 'indigo', to: 'cyan' }}
                  size='xs'
                  onClick={() => addCartHandler(i)}
                >
                  Masukan Keranjang
                </Button>
              </Group>
            </Group>
          </Card.Section>
        </Card>
      ))}
    </>
  );
};

export default Post;
