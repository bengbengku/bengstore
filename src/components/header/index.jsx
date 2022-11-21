import React from 'react';
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
} from '@mantine/core';
import {
  IconAward,
  IconCookie,
  IconCake,
  IconCoffee,
  IconChevronDown,
  IconSearch,
} from '@tabler/icons';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { headerStyles } from '../../styles/headerStyles';

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
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <Kbd>Ctrl</Kbd>
      <span style={{ margin: '0 5px' }}>+</span>
      <Kbd>K</Kbd>
    </div>
  );

  return (
    <Box>
      <Header height={60} px={largeScreen ? 100 : 'md'}>
        <Group position='apart' sx={{ height: '100%' }}>
          <img src='../../../logo.png' alt='Bengstore' className={classes.img_wrap} />

          <Group sx={{ height: '100%' }} spacing={0} className={classes.hiddenMobile}>
            <a href='#' className={classes.link}>
              Beranda
            </a>
            <HoverCard width={600} position='bottom' radius='md' shadow='md' withinPortal>
              <HoverCard.Target>
                <a href='#' className={classes.link}>
                  <Center inline>
                    <Box component='span' mr={5}>
                      Kategori
                    </Box>
                    <IconChevronDown size={16} color={theme.fn.primaryColor()} />
                  </Center>
                </a>
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
            <Button variant='default'>Log in</Button>
            <Button>Sign up</Button>
          </Group>

          <Burger opened={drawerOpened} onClick={toggleDrawer} className={classes.hiddenDesktop} />
        </Group>
      </Header>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size='100%'
        padding='md'
        title='bStore'
        className={classes.hiddenDesktop}
        zIndex={1000000}
      >
        <ScrollArea sx={{ height: 'calc(100vh - 60px)' }} mx='-md'>
          <Divider my='sm' color={theme.colorScheme === 'dark' ? 'dark.5' : 'gray.1'} />

          <a href='#' className={classes.link}>
            Home
          </a>
          <UnstyledButton className={classes.link} onClick={toggleLinks}>
            <Center inline>
              <Box component='span' mr={5}>
                Features
              </Box>
              <IconChevronDown size={16} color={theme.fn.primaryColor()} />
            </Center>
          </UnstyledButton>
          <Collapse in={linksOpened}>{links}</Collapse>
          <a href='#' className={classes.link}>
            Learn
          </a>
          <a href='#' className={classes.link}>
            Academy
          </a>

          <Divider my='sm' color={theme.colorScheme === 'dark' ? 'dark.5' : 'gray.1'} />

          <Group position='center' grow pb='xl' px='md'>
            <Button variant='default'>Log in</Button>
            <Button>Sign up</Button>
          </Group>
        </ScrollArea>
      </Drawer>
    </Box>
  );
};

export default HeaderLayout;
