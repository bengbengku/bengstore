import { Button, Container, Group, Stepper } from '@mantine/core';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { cartItem } from '../../app/api/cartItem';
import { orderUser } from '../../app/api/orderUser';
import AddressConfirm from '../../components/addressConfirmation/AddressConfirm';
import Checkout from '../../components/checkout';
import Payment from '../../components/checkout/Payment';
import HeaderLayout from '../../components/header';
import EmptyCart from './EmptyCart';
import './style.css';

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cart, user, order } = useSelector((item) => item);
  const [active, setActive] = useState(0);
  const [subtotal, setSubtotal] = useState(0);
  const [idAddress, setIdAddress] = useState('');

  const nextStep = () => setActive((current) => (current < 3 ? current + 1 : current));
  const prevStep = () => {
    setActive((current) => (current > 0 ? current - 1 : current));
  };

  const addCartItem = async () => {
    try {
      const { data } = await cartItem(user.token, cart);
      return data;
    } catch (err) {
      return err.response.data.message;
    }
  };

  const addOrderUser = async () => {
    try {
      const res = await orderUser(
        user.token,
        order.ongkir,
        order.idAddress,
        order.subtotal,
        order.total
      );
      dispatch({ type: 'UPDATE_ORDER', payload: res });
      navigate('/invoice');
      // setActive(4);
    } catch (err) {
      return err.response.data.message;
    }
  };

  useEffect(() => {
    if (active === 1) {
      addCartItem();
    }
    if (active === 3) {
      addOrderUser();
    }
  }, [active]);

  return (
    <>
      <HeaderLayout />
      <Container mt='8rem'>
        {cart && cart.length === 0 ? (
          <EmptyCart />
        ) : (
          <div className='cart_wrapper'>
            <>
              <Stepper active={active} onStepClick={setActive} breakpoint='sm'>
                <Stepper.Step
                  label='First step'
                  description='Konfirmasi Orderan'
                  allowStepSelect={active > 0}
                >
                  <Checkout cart={cart} setSubtotal={setSubtotal} />
                </Stepper.Step>
                <Stepper.Step
                  label='Second step'
                  description='Konfirmasi Alamat'
                  allowStepSelect={active > 1}
                >
                  <AddressConfirm setIdAddress={setIdAddress} />
                </Stepper.Step>
                <Stepper.Step
                  label='Final step'
                  description='Konfirmasi Pembayaran'
                  allowStepSelect={active > 2}
                >
                  <Payment subtotal={subtotal} idAddress={idAddress} active={active} />
                </Stepper.Step>
              </Stepper>

              <Group position='center' mt='xl' mb='xl'>
                <Button variant='default' onClick={prevStep}>
                  Kembali
                </Button>
                <Button onClick={nextStep}>Selanjutnya</Button>
              </Group>
            </>
          </div>
        )}
      </Container>
    </>
  );
};

export default Cart;
