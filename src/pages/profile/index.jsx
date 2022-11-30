import React, { useState } from 'react';
import HeaderLayout from '../../components/header';
import { Navbar, Group, Code } from '@mantine/core';
import { IconLogout } from '@tabler/icons';
import { data } from '../../dataDummy/dataProfile';
import { profileStyles } from '../../styles/profileStyles';

const Profile = () => {
  const { classes, cx } = profileStyles();
  const [active, setActive] = useState('Billing');

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

  return (
    <>
      <HeaderLayout />
      <Navbar width={{ sm: 300 }} p='md' style={{ height: '100vh' }}>
        <Navbar.Section grow>
          <Group className={classes.header} position='apart'>
            <img src='../../../logo.png' alt='Bengstore' className={classes.img_wrap} />
            <Code sx={{ fontWeight: 700 }}>v1.0.0</Code>
          </Group>
          {links}
        </Navbar.Section>

        <Navbar.Section className={classes.footer}>
          <a href='#' className={classes.link} onClick={(event) => event.preventDefault()}>
            <IconLogout className={classes.linkIcon} stroke={1.5} />
            <span>Logout</span>
          </a>
        </Navbar.Section>
      </Navbar>
    </>
  );
};

export default Profile;
