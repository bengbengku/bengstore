import { Image, Text, Title } from '@mantine/core';
import React from 'react';
import { registerLandingStyles } from '../../styles/registerLandingStyles';
import HeaderLayout from '../header';

const RegisterLanding = () => {
  const { classes } = registerLandingStyles();
  return (
    <>
      <HeaderLayout />
      <div className={classes.wrapper}>
        <div className={classes.body}>
          <Title className={classes.title}>Yeaaay...</Title>
          <Text weight={500} size='lg' mb={5}>
            Akun anda berhasil terdaftar!
          </Text>
          <Text size='sm' color='dimmed'>
            Silahkan akses akun anda dengan melakukan login kembali.
          </Text>
        </div>
        <Image src='../../../char_img/Fly_Char.png' className={classes.image} />
      </div>
    </>
  );
};

export default RegisterLanding;
