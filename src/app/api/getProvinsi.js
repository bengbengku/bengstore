import axios from 'axios';

export const getProvinsi = async () => {
  try {
    let { data } = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/province`);
    const dataProvinsi = data.map((res) => {
      return { value: res.province_id, label: res.province };
    });
    return dataProvinsi;
  } catch (err) {
    return err.response.data.message;
  }
};
