import axios from 'axios';

export const getCost = async (origin, destination, weight, courier) => {
  try {
    let { data } = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/cost/`, {
      origin,
      destination,
      weight,
      courier,
    });

    return data;
  } catch (err) {
    return err.response.data.message;
  }
};
