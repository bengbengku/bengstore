import axios from 'axios';

export const createAddress = async (dataAddresses, token) => {
  try {
    const { data } = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/api/delivery-addresses`,
      dataAddresses,
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
  } catch (err) {
    return err.response.data.message;
  }
};

export const getAddresses = async (token) => {
  try {
    const { data } = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/api/delivery-addresses`,
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
  } catch (err) {
    return err.response.data.message;
  }
};
