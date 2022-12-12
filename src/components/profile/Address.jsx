import {
  ActionIcon,
  Blockquote,
  Button,
  Flex,
  Grid,
  Text,
  Textarea,
  TextInput,
  Tooltip,
} from '@mantine/core';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useForm } from '@mantine/form';
import { getProvinsi } from '../../app/api/getProvinsi';
import { getKota } from '../../app/api/getKota';
import { createAddress, getAddresses } from '../../app/api/addresses';
import SelectAddressLayout from './SelectAddressLayout';
import { IconAddressBook, IconMapPins, IconSquareX } from '@tabler/icons';
import ListAddress from './ListAddress';

const Address = () => {
  const { user } = useSelector((user) => ({ ...user }));
  const [provinsi, setProvinsi] = useState([]);
  const [kota, setKota] = useState([]);
  const [idProv, setIdProv] = useState('');
  const [idKota, setIdKota] = useState('');
  const [loading, setLoading] = useState(false);
  const [dataAddress, setDataAddress] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const provRef = useRef(null);
  const cityRef = useRef(null);

  useEffect(() => {
    getDataProvinsi();
    getDataKota(idProv);
  }, [idProv]);

  useEffect(() => {
    getDataAddresses();
  }, [loading]);

  const getDataProvinsi = async () => {
    const res = await getProvinsi();
    setProvinsi(res);
  };

  const getDataKota = async (idProv) => {
    if (idProv) {
      const res = await getKota(idProv);
      setKota(res);
    }
  };

  const form1 = useForm({
    initialValues: {
      name: '',
      detailAddress: '',
      provinsi: '',
      kota: '',
    },
    validate: {
      name: (value) => (value.length < 3 ? 'Nama Lengkap minimal 3 Karakter.' : null),
      detailAddress: (value) => (value.length < 20 ? 'Detail Alamat minimal 20 Karakter.' : null),
      provinsi: (value) => (value.length < 1 ? 'Pilih setidaknya satu item' : null),
      kota: (value) => (value.length < 1 ? 'Pilih setidaknya satu item' : null),
    },
  });

  const getDataAddresses = async () => {
    try {
      const res = await getAddresses(user.token);
      setDataAddress(res);
    } catch (err) {
      return err.response.data.message;
    }
  };

  const handleSubmit = async (val) => {
    try {
      const data = {
        nama: val.name,
        kota: cityRef.current.defaultValue,
        provinsi: provRef.current.defaultValue,
        detail: val.detailAddress,
        code_kota: idKota,
      };
      setLoading(true);
      await createAddress(data, user.token);
      setLoading(false);
      form1.reset();
      setIsVisible(false);
    } catch (err) {
      setLoading(false);
      console.log(err.response.data.message);
    }
  };

  return (
    <>
      <Flex gap='md' justify='flex-start' align='flex-start' direction='column' w='100%'>
        <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'row', width: '93%' }}>
          <div style={{ flex: 1 }}>
            <Button
              leftIcon={<IconAddressBook />}
              variant='white'
              mt='5rem'
              ml='4.5rem'
              onClick={() => setIsVisible((o) => !o)}
              style={{ flex: 1 }}
            >
              Tambah Alamat
            </Button>
          </div>
          {isVisible && (
            <div>
              <Tooltip label='Tutup Form!' withArrow position='left-start='>
                <ActionIcon
                  mt={80}
                  size='xl'
                  style={{ transform: 'translate(12px, 45px)' }}
                  onClick={() => setIsVisible(false)}
                  variant='transparent'
                >
                  <IconSquareX size={32} />
                </ActionIcon>
              </Tooltip>
            </div>
          )}
        </div>
        {isVisible && (
          <form
            onSubmit={form1.onSubmit((val) => handleSubmit(val))}
            style={{ width: '70vw', marginLeft: '4.5rem' }}
          >
            <Grid gutter='md' style={{ marginTop: '0.4rem' }}>
              <Grid.Col span={6}>
                <TextInput
                  label='Nama Lengkap'
                  placeholder='Nama Lengkap'
                  {...form1.getInputProps('name')}
                />
                <Textarea
                  label='Detail Alamat'
                  placeholder='Jl. Nama Jalan No. 000, Detail Gang, Kel. Nama kelurahan Kec. Nama Kecamatan...'
                  {...form1.getInputProps('detailAddress')}
                  minRows={9}
                />
              </Grid.Col>
              <Grid.Col span={6}>
                <SelectAddressLayout
                  form1={form1}
                  setId={setIdProv}
                  label='Provinsi'
                  placeholder='Pilih Provinsi'
                  data={provinsi}
                  inputProp='provinsi'
                  valForm={form1.values.provinsi}
                  valField='provinsi'
                  selectRef={provRef}
                />
                <SelectAddressLayout
                  form1={form1}
                  setId={setIdKota}
                  label='Kota/Kabupaten'
                  placeholder='Pilih Kota/Kabupaten'
                  data={kota}
                  inputProp='kota'
                  valForm={form1.values.kota}
                  valField='kota'
                  selectRef={cityRef}
                />
                <Button
                  type='submit'
                  mt='sm'
                  fullWidth
                  style={{ height: '46px' }}
                  loading={loading}
                  loaderPosition='center'
                >
                  Simpan
                </Button>
              </Grid.Col>
            </Grid>
          </form>
        )}
        <Blockquote
          px={0}
          ml='4.5rem'
          color='blue'
          cite='– Alamat'
          icon={<IconMapPins size={30} />}
        >
          Alamat Penagihan/Alamat Pengiriman.
        </Blockquote>
        <Grid ml='4.5rem' w='85%'>
          {dataAddress && dataAddress.count > 0 ? (
            dataAddress.data.map((data, i) => (
              <Grid.Col span={6} key={i}>
                <ListAddress
                  name={data.nama}
                  detail={data.detail}
                  kota={data.kota}
                  provinsi={data.provinsi}
                />
              </Grid.Col>
            ))
          ) : (
            <Text c='dimmed' w='100%' align='center'>
              Silahkan Tambahkan Alamat Penagihan/Alamat Pengiriman.
            </Text>
          )}
        </Grid>
      </Flex>
    </>
  );
};

export default Address;
