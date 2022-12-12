import { Badge, Center, Image, Table, Text } from '@mantine/core';
import React from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import './style.css';

const Checkout = ({ cart, setSubtotal }) => {
  const dispatch = useDispatch();

  const incrementCount = (item) => {
    dispatch({ type: 'INC_CART', payload: item });
  };

  const decrementCount = (item) => {
    dispatch({ type: 'DEC_CART', payload: item });
  };

  const formatter = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  });

  const subtotal = cart.reduce((total, obj) => {
    return total + obj.qty * obj.price;
  }, 0);

  useEffect(() => {
    setSubtotal(subtotal);
  }, [subtotal]);

  const rows = cart.map((item, i) => (
    <tr key={i}>
      <td>
        <Center>
          <Image radius='md' src={item.image_url} alt={item.name} style={{ width: '100px' }} />
        </Center>
      </td>
      <td>{item.name}</td>
      <td>{formatter.format(item.price * item.qty)}</td>
      <td>
        <Center>
          <div className='counter_wrap'>
            <Badge
              color='blue'
              variant='light'
              style={{ cursor: 'pointer' }}
              onClick={() => decrementCount(item)}
            >
              -
            </Badge>
            <Text>{item.qty}</Text>
            <Badge
              color='blue'
              variant='light'
              style={{ cursor: 'pointer' }}
              onClick={() => incrementCount(item)}
            >
              +
            </Badge>
          </div>
        </Center>
      </td>
    </tr>
  ));

  return (
    <>
      <Text fw={700} c='dimmed' fz='26px'>
        Subtotal: {formatter.format(subtotal)}
      </Text>
      <Table horizontalSpacing='xl' style={{ marginTop: '1rem' }} withBorder>
        <thead>
          <tr>
            <th>Gambar</th>
            <th>Barang</th>
            <th>Harga</th>
            <th>Qty</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </>
  );
};

export default Checkout;
