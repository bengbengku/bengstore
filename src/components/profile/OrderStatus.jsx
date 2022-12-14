import { ActionIcon, Avatar, Badge, Button, Group, Loader, Table, Text } from '@mantine/core';
import './style.css';
import { IconChevronDown, IconChevronRight } from '@tabler/icons';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { getInvoice } from '../../app/api/getInvoice';
import { getOrderUser } from '../../app/api/orderUser';
import EmptyOrders from './EmptyOrders';
import InvoiceModal from './InvoiceModal';

let initialState = {
  status: false,
  id: '',
};

const OrderStatus = () => {
  const { user } = useSelector((user) => ({ ...user }));
  const [isOpen, setIsOpen] = useState(initialState);
  const [orders, setOrders] = useState([]);
  const [invoice, setInvoice] = useState({});
  const [openedModal, setOpenedModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadingOrders, setLoadingOrders] = useState(true);

  useEffect(() => {
    getOrder();
  }, []);

  const getOrder = async () => {
    try {
      setLoadingOrders(true);
      const resOrder = await getOrderUser(user.token);
      setOrders(resOrder.data);
      setLoadingOrders(false);
    } catch (err) {
      setLoadingOrders(false);
      console.log(err);
    }
  };

  const formatter = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  });

  const buttonOpenHandler = (id) => {
    const found = orders.find((obj) => {
      return obj._id === id;
    });

    if (found) {
      setIsOpen((prev) => ({
        ...prev,
        status: !prev.status,
        id: found._id,
      }));
    }
  };

  const openedModalHandler = async (id) => {
    try {
      setLoading(true);
      setOpenedModal(true);
      const res = await getInvoice(id, user.token);
      setInvoice(res);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  return (
    <div style={{ marginTop: '5rem' }} captionside='bottom'>
      {loadingOrders ? (
        <div className='loading_wrapper'>
          <Loader size='xl' variant='dots' />
        </div>
      ) : (
        <>
          {orders && orders.length === 0 ? (
            <EmptyOrders />
          ) : (
            <>
              {openedModal && (
                <InvoiceModal
                  loading={loading}
                  invoice={invoice}
                  formatter={formatter}
                  openedModal={openedModal}
                  setOpenedModal={setOpenedModal}
                />
              )}
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
                {orders?.map((order, i) => (
                  <tbody key={i}>
                    <tr>
                      <td>
                        <ActionIcon
                          variant='transparent'
                          onClick={() => buttonOpenHandler(order._id)}
                        >
                          {isOpen.status && isOpen.id === order._id ? (
                            <IconChevronDown size={26} />
                          ) : (
                            <IconChevronRight size={26} />
                          )}
                        </ActionIcon>
                      </td>
                      <td>#{order.order_number}</td>
                      <td>{formatter.format(order.total)}</td>
                      <td>{order.status}</td>
                      <td>
                        <Button onClick={() => openedModalHandler(order._id)}>Invoices</Button>
                      </td>
                    </tr>
                    {isOpen.status && isOpen.id === order._id && (
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
                        {order?.order_items?.map((item, i) => (
                          <tr key={i}>
                            <td></td>
                            <td>
                              <Group spacing='sm'>
                                <Avatar size={30} src={item.image_url} />
                                <Text size='sm' weight={500}>
                                  {item.name}
                                </Text>
                              </Group>
                            </td>
                            <td>{item.qty}</td>
                            <td>{formatter.format(item.price * item.qty)}</td>
                            <td></td>
                          </tr>
                        ))}
                      </>
                    )}
                  </tbody>
                ))}
              </Table>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default OrderStatus;
