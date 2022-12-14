import { Badge, Button, Modal, Paper, Text, ThemeIcon, useMantineTheme } from '@mantine/core';
import { IconFileDollar } from '@tabler/icons';
import React from 'react';
import { Link } from 'react-router-dom';
import { invoiceStyles } from '../../styles/invoiceStyles';

const InvoiceModal = ({ openedModal, setOpenedModal, invoice, formatter }) => {
  const theme = useMantineTheme();
  const { classes } = invoiceStyles();
  return (
    <>
      <Modal
        zIndex={9999}
        opened={openedModal}
        onClose={() => setOpenedModal(false)}
        centered
        overlayColor={theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2]}
        overlayOpacity={0.55}
        overlayBlur={3}
      >
        <Paper radius='md' withBorder className={classes.card} mt={60 / 3}>
          <ThemeIcon className={classes.icon} size={60} radius={60}>
            <IconFileDollar size={34} stroke={1.5} />
          </ThemeIcon>

          <Text align='center' weight={700} className={classes.title}>
            INVOICE
          </Text>
          <Text color='dimmed' align='center' size='sm'>
            Order ID: #{invoice?.order?.order_number}
          </Text>

          <div className={classes.invoices_wrapper}>
            <div className={classes.status}>
              <Badge variant='gradient' gradient={{ from: 'indigo', to: 'cyan' }}>
                {invoice?.payment_status}
              </Badge>
            </div>
            <div className={classes.addresses_wrap}>
              <Paper withBorder className={classes.addresses} style={{ minHeight: '175px' }}>
                <div className={classes.addresses_text1}>
                  <Badge>FROM: BSTORE</Badge>
                </div>
                <div className={classes.addresses_text2}>
                  <Text fz='xs'>
                    Jl. Pengadegan Timur I No.30, RT.6/RW.1, Pengadegan, Kec. Pancoran, Kota Jakarta
                    Selatan, Daerah Khusus Ibukota Jakarta 12770
                  </Text>
                </div>
              </Paper>
              <Paper withBorder className={classes.addresses} style={{ minHeight: '175px' }}>
                <div className={classes.addresses_text1}>
                  <Badge>TO: {invoice?.delivery_address?.nama}</Badge>
                </div>
                <div className={classes.addresses_text2}>
                  <Text fz='xs'>
                    {`${invoice?.delivery_address?.detail}, 
                ${invoice?.delivery_address?.kota}, ${invoice?.delivery_address?.provinsi}`}
                  </Text>
                </div>
              </Paper>
            </div>
            <div className={classes.bill_wrap}>
              <div className={classes.bill}>
                <div className={classes.bill1}>
                  <Badge>Total Pembayaran</Badge>
                </div>
                <div className={classes.bill2}>
                  <Text fz='xl' fw={700} align='center'>
                    {formatter.format(invoice?.total)}
                  </Text>
                </div>
              </div>
              <div className={classes.bill} style={{ marginLeft: '3.9rem' }}>
                <div className={classes.bill1}>
                  <Badge>Transfer</Badge>
                </div>
                <div className={classes.bill2}>
                  <Text fz='xs'>
                    Anggiat Benget <br /> anggiatbenget@gmail.com <br />
                    BCA 1929-0202-2020-1233
                  </Text>
                </div>
              </div>
            </div>
          </div>
        </Paper>
      </Modal>
    </>
  );
};

export default InvoiceModal;
