import axios from 'axios';

export const cartItem = async (token, dataCart) => {
  try {
    let { data } = await axios.put(
      `${process.env.REACT_APP_BACKEND_URL}/api/carts`,
      { cart: dataCart },
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
