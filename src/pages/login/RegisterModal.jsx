import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { Button, Modal, PasswordInput, TextInput, useMantineTheme } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useNavigate } from 'react-router-dom';

const RegisterModal = ({ isRegister, setIsRegister }) => {
  const navigate = useNavigate();
  const [opened, setOpened] = useState(isRegister);
  const [loading, setLoading] = useState(false);
  const theme = useMantineTheme();

  const form = useForm({
    initialValues: { full_name: '', email: '', password: '' },

    // functions will be used to validate values at corresponding key
    validate: {
      full_name: (value) => (value.length < 3 ? 'Nama Lengkap minimal 3 karakter.' : null),
      email: (value) =>
        // eslint-disable-next-line no-useless-escape
        /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,12})(\.[a-z]{2,12})?$/.test(value)
          ? null
          : 'Email tidak valid.',
      password: (value) => (value.length < 6 ? 'Password minimal 6 karakter.' : null),
    },
  });

  const handleSubmit = async (val) => {
    try {
      setLoading(true);
      const { data } = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/auth/register`, {
        full_name: val.full_name,
        email: val.email,
        password: val.password,
      });
      setLoading(false);
      setTimeout(() => {
        navigate('/landing');
      }, 1000);
    } catch (err) {
      setLoading(false);
      console.log(err.response.data.message);
    }
  };
  return (
    <>
      <Modal
        centered
        opened={opened}
        onClose={() => setOpened(setIsRegister(false))}
        title='Register Form'
        overlayColor={theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2]}
        overlayOpacity={0.55}
        overlayBlur={3}
        transition='fade'
        transitionDuration={600}
        transitionTimingFunction='ease'
        style={{ body: { paddingRight: 0 } }}
      >
        <form onSubmit={form.onSubmit((val) => handleSubmit(val))}>
          <TextInput
            label='Nama Lengkap'
            placeholder='Nama Lengkap'
            {...form.getInputProps('full_name')}
          />
          <TextInput mt='sm' label='Email' placeholder='Email' {...form.getInputProps('email')} />
          <PasswordInput
            label='Password'
            placeholder='Password'
            {...form.getInputProps('password')}
          />
          <Button type='submit' mt='sm' loading={loading}>
            Register
          </Button>
        </form>
      </Modal>
    </>
  );
};

export default RegisterModal;
