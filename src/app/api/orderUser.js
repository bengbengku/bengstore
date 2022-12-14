import axios from 'axios';

export const orderUser = async (token, delivery_fee, delivery_address, subtotal, total) => {
  try {
    let { data } = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/api/orders`,
      { delivery_fee, delivery_address, subtotal, total },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return data;
  } catch (err) {
    return err.response.data.message;
  }
};

export const getOrderUser = async (token) => {
  try {
    const { data } = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/orders`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (err) {
    return err.response.data.message;
  }
};
