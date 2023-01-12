import React, { useState } from 'react';
import HeaderLayout from '../../components/header';
import { Navbar, Group, Code, Flex } from '@mantine/core';
import { IconLogout } from '@tabler/icons';
import { data } from '../../dataDummy/dataProfile';
import { profileStyles } from '../../styles/profileStyles';
import DetailsProfile from '../../components/profile/DetailsProfile';
import OrderStatus from '../../components/profile/OrderStatus';
import Address from '../../components/profile/Address';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { showNotification } from '@mantine/notifications';

const Profile = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { classes, cx } = profileStyles();
  const [active, setActive] = useState('Profile');

  const links = data.map((item) => (
    <a
      className={cx(classes.link, { [classes.linkActive]: item.label === active })}
      href={item.link}
      key={item.label}
      onClick={(event) => {
        event.preventDefault();
        setActive(item.label);
      }}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </a>
  ));

  const logout = async () => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/auth/logout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      Cookies.set('user', '');
      dispatch({
        type: 'LOGOUT',
      });
      showNotification({
        title: 'Wooo..',
        message: `${data.message}`,
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
      navigate('/');
    } catch (err) {
      console.log(err.response.data.message);
    }
  };

  return (
    <>
      <HeaderLayout />
      <Flex gap='md' direction='row'>
        <Navbar width={{ sm: 300 }} p='md' style={{ height: '100vh' }}>
          <Navbar.Section grow>
            <Group className={classes.header} position='apart'>
              <img src='../../../logo.png' alt='Bengstore' className={classes.img_wrap} />
              <Code sx={{ fontWeight: 700 }}>v1.0.0</Code>
            </Group>
            {links}
          </Navbar.Section>

          <Navbar.Section className={classes.footer}>
            <div className={classes.link} onClick={() => logout()}>
              <IconLogout className={classes.linkIcon} stroke={1.5} />
              <span>Logout</span>
            </div>
          </Navbar.Section>
        </Navbar>
        {active === 'Profile' && <DetailsProfile />}
        {active === 'Pemesanan' && <OrderStatus />}
        {active === 'Alamat' && <Address />}
      </Flex>
    </>
  );
};

export default Profile;
