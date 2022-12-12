import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Header,
  HoverCard,
  Group,
  Button,
  UnstyledButton,
  Text,
  SimpleGrid,
  ThemeIcon,
  Anchor,
  Divider,
  Center,
  Box,
  Burger,
  Drawer,
  Collapse,
  ScrollArea,
  TextInput,
  Kbd,
  Avatar,
  ActionIcon,
  Indicator,
} from '@mantine/core';
import {
  IconAward,
  IconCookie,
  IconCake,
  IconCoffee,
  IconChevronDown,
  IconSearch,
  IconShoppingBag,
} from '@tabler/icons';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { headerStyles } from '../../styles/headerStyles';
import RegisterModal from '../../pages/login/RegisterModal';
import LoginModal from '../../pages/login/LoginModal';
import { useSelector } from 'react-redux';

const mockdata = [
  {
    icon: IconAward,
    title: 'Utama',
    description: 'Berbagai macam menu utama di bstore.',
  },
  {
    icon: IconCoffee,
    title: 'Minuman',
    description: 'Berbagai macam menu minuman di bstore.',
  },
  {
    icon: IconCookie,
    title: 'Snack',
    description: 'Berbagai macam menu snack di bstore.',
  },
  {
    icon: IconCake,
    title: 'Pastry',
    description: 'Berbagai macam menu pastry di bstore.',
  },
];

const HeaderLayout = () => {
  const { user } = useSelector((user) => ({ ...user }));
  const { cart } = useSelector((cart) => cart);
  const [isRegister, setIsRegister] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
  const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);
  const { classes, theme } = headerStyles();
  const largeScreen = useMediaQuery('(min-width: 1040px)');

  const links = mockdata.map((item) => (
    <UnstyledButton className={classes.subLink} key={item.title}>
      <Group noWrap align='flex-start'>
        <ThemeIcon size={34} variant='default' radius='md'>
          <item.icon size={22} color={theme.fn.primaryColor()} />
        </ThemeIcon>
        <div>
          <Text size='sm' weight={500}>
            {item.title}
          </Text>
          <Text size='xs' color='dimmed'>
            {item.description}
          </Text>
        </div>
      </Group>
    </UnstyledButton>
  ));

  const rightSection = (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Kbd>Ctrl</Kbd>
      <span style={{ margin: '0 5px' }}>+</span>
      <Kbd>K</Kbd>
    </div>
  );

  return (
    <>
      <Box>
        <Header
          height={60}
          px={largeScreen ? 100 : 'md'}
          style={{
            position: 'fixed',
            top: 0,
            zIndex: 999,
          }}
        >
          <Group position='apart' sx={{ height: '100%' }}>
            <img src='../../../logo.png' alt='Bengstore' className={classes.img_wrap} />

            <Group sx={{ height: '100%' }} spacing={0} className={classes.hiddenMobile}>
              <Link to='/' className={classes.link}>
                Beranda
              </Link>
              <HoverCard width={600} position='bottom' radius='md' shadow='md' withinPortal>
                <HoverCard.Target>
                  <Link to='/' className={classes.link}>
                    <Center inline>
                      <Box component='span' mr={5}>
                        Kategori
                      </Box>
                      <IconChevronDown size={16} color={theme.fn.primaryColor()} />
                    </Center>
                  </Link>
                </HoverCard.Target>

                <HoverCard.Dropdown sx={{ overflow: 'hidden' }}>
                  <Group position='apart' px='md'>
                    <Text weight={500}>List Kategori</Text>
                    <Anchor href='#' size='xs'>
                      View all
                    </Anchor>
                  </Group>

                  <Divider
                    my='sm'
                    mx='-md'
                    color={theme.colorScheme === 'dark' ? 'dark.5' : 'gray.1'}
                  />

                  <SimpleGrid cols={2} spacing={0}>
                    {links}
                  </SimpleGrid>

                  <div className={classes.dropdownFooter}>
                    <Group position='apart'>
                      <div>
                        <Text weight={500} size='sm'>
                          Get started
                        </Text>
                        <Text size='xs' color='dimmed'>
                          Their food sources have decreased, and their numbers
                        </Text>
                      </div>
                      <Button variant='default'>Get started</Button>
                    </Group>
                  </div>
                </HoverCard.Dropdown>
              </HoverCard>
              <TextInput
                placeholder='Search'
                icon={<IconSearch size={16} />}
                rightSectionWidth={90}
                rightSection={rightSection}
                styles={{ rightSection: { pointerEvents: 'none' } }}
                ml={8}
              />
            </Group>

            <Group className={classes.hiddenMobile}>
              {user?.user ? (
                <>
                  {' '}
                  <Link to='/cart'>
                    <Indicator
                      label={cart?.length}
                      showZero={false}
                      dot={false}
                      overflowCount={999}
                      inline
                      size={18}
                    >
                      <ActionIcon variant='transparent'>
                        <IconShoppingBag size={25} />
                      </ActionIcon>
                    </Indicator>
                  </Link>
                  <Link to='/profile'>
                    <UnstyledButton>
                      <Group>
                        <Avatar size={35} color='blue'></Avatar>
                        <div>
                          <Text>{user.user.full_name.split(' ')[0]}</Text>
                          <Text size='xs' color='dimmed'>
                            see more details
                          </Text>
                        </div>
                      </Group>
                    </UnstyledButton>
                  </Link>
                </>
              ) : (
                <>
                  <Button variant='default' onClick={() => setIsLogin(true)}>
                    Log in
                  </Button>
                  <Button onClick={() => setIsRegister(true)}>Sign up</Button>
                </>
              )}
            </Group>

            <Burger
              opened={drawerOpened}
              onClick={toggleDrawer}
              className={classes.hiddenDesktop}
            />
          </Group>
        </Header>

        <Drawer
          opened={drawerOpened}
          onClose={closeDrawer}
          size='100%'
          padding='md'
          title='bStore'
          className={classes.hiddenDesktop}
          zIndex={99}
        >
          <ScrollArea sx={{ height: 'calc(100vh - 60px)' }} mx='-md'>
            <Divider my='sm' color={theme.colorScheme === 'dark' ? 'dark.5' : 'gray.1'} />

            <Link to='/' className={classes.link}>
              Beranda
            </Link>
            <UnstyledButton className={classes.link} onClick={toggleLinks}>
              <Center inline>
                <Box component='span' mr={5}>
                  Features
                </Box>
                <IconChevronDown size={16} color={theme.fn.primaryColor()} />
              </Center>
            </UnstyledButton>
            <Collapse in={linksOpened}>{links}</Collapse>

            <Divider my='sm' color={theme.colorScheme === 'dark' ? 'dark.5' : 'gray.1'} />

            <Group position='center' grow pb='xl' px='md'>
              <Button variant='default' onClick={() => setIsLogin(true)}>
                Log in
              </Button>
              <Button onClick={() => setIsRegister(true)}>Sign up</Button>
            </Group>
          </ScrollArea>
        </Drawer>
      </Box>
      {isRegister && <RegisterModal isRegister={isRegister} setIsRegister={setIsRegister} />}
      {isLogin && <LoginModal isLogin={isLogin} setIsLogin={setIsLogin} />}
    </>
  );
};

export default HeaderLayout;
