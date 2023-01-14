import React from 'react';
import { emptyOrdersStyles } from '../../styles/emptyOrdersStyles';
import { Link } from 'react-router-dom';
import { Button, Container, Image, SimpleGrid, Text, Title } from '@mantine/core';

const EmptyOrders = () => {
  const { classes } = emptyOrdersStyles();
  return (
    <Container className={classes.root}>
      <SimpleGrid spacing={80} cols={2} breakpoints={[{ maxWidth: 'sm', cols: 1, spacing: 40 }]}>
        <Image src='../../../char_img/404_img.svg' className={classes.mobileImage} />
        <div>
          <Title className={classes.title}>Belum ada pemesanan..</Title>
          <Text color='dimmed' size='lg' align='justify'>
            Silahkan pergi ke halaman Beranda untuk melanjutkan orderan anda. Pilih beberapa produk
            dan kembali ke keranjang belanja anda.
          </Text>
          <Link to='/'>
            <Button variant='outline' size='md' mt='xl' className={classes.control}>
              Belanja Sekarang
            </Button>
          </Link>
        </div>
        <Image src='../../../char_img/404_img.svg' className={classes.desktopImage} />
      </SimpleGrid>
    </Container>
  );
};

export default EmptyOrders;
