import { Center, Checkbox, Skeleton, Table, Text } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getAddresses } from '../../app/api/addresses';
import { Link } from 'react-router-dom';

const AddressConfirm = ({ setIdAddress, isSetActive }) => {
  const { user } = useSelector((user) => ({ ...user }));
  const [dataAddress, setDataAddress] = useState([]);
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDataAddresses();
    isSetActive(true);
  }, []);

  useEffect(() => {
    setIdAddress(value);
  }, [value]);

  const getDataAddresses = async () => {
    try {
      setLoading(true);
      const { data } = await getAddresses(user.token);
      setDataAddress(data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      return err.response.data.message;
    }
  };

  const handleChange = (e) => {
    isSetActive(e.target.checked ? false : true);
    setValue(e.target.checked ? e.target.value : '');
  };

  const rows = dataAddress.map((data, i) => (
    <tr key={i}>
      <td>
        <Checkbox value={data._id} onChange={handleChange} checked={value === data._id} />
      </td>
      <td>{data.nama}</td>
      <td>{`${data.detail}, ${data.kota}, ${data.provinsi}.`}</td>
    </tr>
  ));

  console.log(rows);
  return (
    <>
      <Skeleton visible={loading}>
        {dataAddress.length > 0 ? (
          <Table verticalSpacing='xs' style={{ marginTop: '1rem' }} withBorder>
            <thead>
              <tr>
                <th></th>
                <th>Nama</th>
                <th>Detail</th>
              </tr>
            </thead>
            <tbody>{rows}</tbody>
          </Table>
        ) : (
          <Center>
            <Text>
              Silahkan tambahkan alamat pengiriman anda pada halaman profile,
              <Link style={{ textDecoration: 'none' }} to='/profile'>
                {' '}
                klik disini.
              </Link>
            </Text>
          </Center>
        )}
      </Skeleton>
    </>
  );
};

export default AddressConfirm;
