import axios from 'axios';

export const getInvoice = async (orderId, token) => {
  try {
    let { data } = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/invoices/${orderId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data;
  } catch (err) {
    return err.response.data.message;
  }
};
