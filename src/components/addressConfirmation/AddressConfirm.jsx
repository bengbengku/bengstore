import { Checkbox, Table } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getAddresses } from '../../app/api/addresses';

const AddressConfirm = ({ setIdAddress }) => {
  const { user } = useSelector((user) => ({ ...user }));
  const [dataAddress, setDataAddress] = useState([]);
  const [value, setValue] = useState('');

  useEffect(() => {
    getDataAddresses();
  }, []);

  useEffect(() => {
    setIdAddress(value);
  }, [value]);

  const getDataAddresses = async () => {
    try {
      const { data } = await getAddresses(user.token);
      setDataAddress(data);
    } catch (err) {
      return err.response.data.message;
    }
  };

  const handleChange = (e) => {
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

  return (
    <>
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
    </>
  );
};

export default AddressConfirm;
