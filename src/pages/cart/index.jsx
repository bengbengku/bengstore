import { Button, Center, Container, Group, Stepper } from '@mantine/core';
import React, { useState } from 'react';
import HeaderLayout from '../../components/header';
import './style.css';

const Cart = () => {
  const [active, setActive] = useState(1);
  const nextStep = () => setActive((current) => (current < 3 ? current + 1 : current));
  const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));
  return (
    <>
      <HeaderLayout />
      <Container mt='8rem'>
        <div className='cart_wrapper'>
          <Stepper active={active} onStepClick={setActive} breakpoint='sm'>
            <Stepper.Step
              label='First step'
              description='Konfirmasi Orderan'
              allowStepSelect={active > 0}
            >
              <Center>Step 1 content: Create an account</Center>
            </Stepper.Step>
            <Stepper.Step
              label='Second step'
              description='Konfirmasi Alamat'
              allowStepSelect={active > 1}
            >
              Step 2 content: Verify email
            </Stepper.Step>
            <Stepper.Step
              label='Final step'
              description='Konfirmasi Pembayaran'
              allowStepSelect={active > 2}
            >
              Step 3 content: Get full access
            </Stepper.Step>
            <Stepper.Completed>
              Completed, click back button to get to previous step
            </Stepper.Completed>
          </Stepper>

          <Group position='center' mt='xl'>
            <Button variant='default' onClick={prevStep}>
              Back
            </Button>
            <Button onClick={nextStep}>Next step</Button>
          </Group>
        </div>
      </Container>
    </>
  );
};

export default Cart;
