import { Badge, Center, Image, Table, Text } from '@mantine/core';
import React from 'react';
import './style.css';

const Checkout = ({ cart, count, setCount }) => {
  const incrementCount = (product_id) => {
    cart.forEach((item) => {
      if (product_id === item._id) {
        setCount((prevCount) => prevCount + 1);
      }
    });
  };

  const decrementCount = () => {
    if (count <= 1) return;
    setCount((prevCount) => prevCount - 1);
  };
  const rows = cart.map((item, i) => (
    <tr key={i}>
      <td>
        <Center>
          <Image radius='md' src={item.image_url} alt={item.name} style={{ width: '100px' }} />
        </Center>
      </td>
      <td>{item.name}</td>
      <td>{item.price}</td>
      <td>
        <Center>
          <div className='counter_wrap'>
            <Badge
              color='blue'
              variant='light'
              style={{ cursor: 'pointer' }}
              onClick={() => decrementCount(item._id)}
            >
              -
            </Badge>
            <Text>{count}</Text>
            <Badge
              color='blue'
              variant='light'
              style={{ cursor: 'pointer' }}
              onClick={() => incrementCount(item._id)}
            >
              +
            </Badge>
          </div>
        </Center>
      </td>
    </tr>
  ));
  return (
    <Table horizontalSpacing='xl' style={{ marginTop: '2rem' }}>
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
  );
};

export default Checkout;
