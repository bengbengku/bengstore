import { createStyles } from '@mantine/core';

const ICON_SIZE = 60;

export const invoiceStyles = createStyles((theme) => ({
  card: {
    position: 'relative',
    overflow: 'visible',
    padding: theme.spacing.xl,
    paddingTop: theme.spacing.xl * 1.5 + ICON_SIZE / 3,
  },

  icon: {
    position: 'absolute',
    top: -ICON_SIZE / 3,
    left: `calc(50% - ${ICON_SIZE / 2}px)`,
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    lineHeight: 1,
  },
  invoices_wrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  status: {
    margin: '1rem 0',
  },
  addresses_wrap: {
    display: 'flex',
    alignItems: 'center',
    gap: '3rem',
    marginBottom: '1rem',
  },
  bill_wrap: {
    display: 'flex',
    justifyContent: 'space-evenly',
    width: '100%',
  },
  bill: {
    display: 'flex',
    flexDirection: 'column',
  },
  addresses: {
    display: 'flex',
    flexDirection: 'column',
    padding: '10px',
    maxWidth: '361px',
  },
  btn_invoice: {
    marginTop: '2rem',
  },
}));
