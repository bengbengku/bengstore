import axios from 'axios';

export const getKota = async (id) => {
  try {
    let { data } = await axios.get(`http://localhost:3001/api/city/${id}`);
    const dataProvinsi = data.map((res) => {
      return { value: res.city_id, label: res.city_name };
    });
    return dataProvinsi;
  } catch (err) {
    return err.response.data.message;
  }
};
