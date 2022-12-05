import { ActionIcon, Avatar, Badge, Button, Group, Table, Text } from '@mantine/core';
import { IconChevronDown, IconChevronRight } from '@tabler/icons';
import React from 'react';
import { useState } from 'react';

const OrderStatus = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div style={{ marginTop: '5rem' }} captionside='bottom'>
      <Table verticalSpacing='xs' fontSize='md' style={{ width: '77vw' }}>
        <caption>Status Pesanan Anda</caption>
        <thead>
          <tr>
            <td></td>
            <th>Order ID</th>
            <th>Total</th>
            <th>Status</th>
            <th>Invoice</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <ActionIcon variant='transparent' onClick={() => setIsOpen((o) => !o)}>
                {isOpen ? <IconChevronDown size={26} /> : <IconChevronRight size={26} />}
              </ActionIcon>
            </td>
            <td>#001</td>
            <td>Rp. 24.000</td>
            <td>waiting_payment</td>
            <td>
              <Button>Invoices</Button>
            </td>
          </tr>
          {isOpen && (
            <>
              <tr>
                <td></td>
                <td>
                  <Badge color='blue' variant='light'>
                    Barang
                  </Badge>
                </td>
                <td>
                  <Badge color='blue' variant='light'>
                    Jumlah
                  </Badge>
                </td>
                <td>
                  <Badge color='blue' variant='light'>
                    Total Harga
                  </Badge>
                </td>
                <td></td>
              </tr>
              <tr>
                <td></td>
                <td>
                  <Group spacing='sm'>
                    <Avatar size={30} />
                    <Text size='sm' weight={500}>
                      Burger
                    </Text>
                  </Group>
                </td>
                <td>4</td>
                <td>Rp. 24.000</td>
                <td></td>
              </tr>
            </>
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default OrderStatus;
