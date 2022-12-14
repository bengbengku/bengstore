import axios from 'axios';

export const getInvoice = async (orderId, token) => {
  try {
    let { data } = await axios.get(`http://localhost:3001/api/invoices/${orderId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data;
  } catch (err) {
    return err.response.data.message;
  }
};
