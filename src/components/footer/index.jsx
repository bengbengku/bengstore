import { ActionIcon, Container, Group, Text } from '@mantine/core';
import { IconBrandInstagram, IconBrandTwitter, IconBrandYoutube } from '@tabler/icons';
import React from 'react';
import { Link } from 'react-router-dom';
import { footerStyles } from '../../styles/footerStyles';
import { data } from '../../dataDummy/dataFooter';

const Footer = () => {
  const { classes } = footerStyles();
  const groups = data.map((group) => {
    const links = group.links.map((link, index) => (
      <Link
        key={index}
        className={classes.link}
        to={link.link}
        onClick={(event) => event.preventDefault()}
      >
        {link.label}
      </Link>
    ));

    return (
      <div className={classes.wrapper} key={group.title}>
        <Text className={classes.title}>{group.title}</Text>
        {links}
      </div>
    );
  });
  return (
    <footer className={classes.footer}>
      <Container className={classes.inner}>
        <div className={classes.logo}>
          <img src='../../../logo.png' alt='Bengstore' className={classes.logo} />
          <Text size='xs' color='dimmed' className={classes.description}>
            BStore melayani dengan sepenuh hati, mencari yang murah dan berkualitas ya di bstore
            aja.
          </Text>
        </div>
        <div className={classes.groups}>{groups}</div>
      </Container>
      <Container className={classes.afterFooter}>
        <Text color='dimmed' size='sm'>
          © 2022 bstore. All rights reserved.
        </Text>

        <Group spacing={0} className={classes.social} position='right' noWrap>
          <ActionIcon size='lg'>
            <IconBrandTwitter size={18} stroke={1.5} />
          </ActionIcon>
          <ActionIcon size='lg'>
            <IconBrandYoutube size={18} stroke={1.5} />
          </ActionIcon>
          <ActionIcon size='lg'>
            <IconBrandInstagram size={18} stroke={1.5} />
          </ActionIcon>
        </Group>
      </Container>
    </footer>
  );
};

export default Footer;
