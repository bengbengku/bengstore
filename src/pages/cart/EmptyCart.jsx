import { Button, Container, Group, Text, Title } from '@mantine/core';
import React from 'react';
import { Link } from 'react-router-dom';
import { emptyCartStyles } from '../../styles/emptyCartStyles';

const EmptyCart = () => {
  const { classes } = emptyCartStyles();
  return (
    <Container className={classes.root}>
      <div className={classes.label}>404</div>
      <Title className={classes.title}>Oops.. Keranjang Belanja Anda Kosong!</Title>
      <Text color='dimmed' size='lg' align='center' className={classes.description}>
        Silahkan pergi ke halaman Beranda untuk melanjutkan orderan anda. Pilih beberapa produk dan
        kembali ke keranjang belanja anda.
      </Text>
      <Group position='center'>
        <Link to='/'>
          <Button variant='subtle' size='md'>
            Belanja Sekarang
          </Button>
        </Link>
      </Group>
    </Container>
  );
};

export default EmptyCart;
