import { Badge, Skeleton, Text } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAddresses } from '../../app/api/addresses';
import { getCost } from '../../app/api/getCost';

const Payment = ({ subtotal, idAddress, active }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((user) => ({ ...user }));
  const [dataAddress, setDataAddress] = useState([]);
  const [ongkir, setOngkir] = useState(0);
  const [total, setTotal] = useState(0);
  const [estimasi, setEstimasi] = useState('');
  const [courier, setCourier] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDataAddresses();
  }, []);

  const getDataAddresses = async () => {
    try {
      setLoading(true);
      const { data } = await getAddresses(user.token);
      const isFind = await data.find((obj) => obj._id === idAddress);
      setDataAddress(isFind);
      const { rajaongkir } = await getCost('153', isFind.code_kota, 1000, 'jne');

      const tmpResults = rajaongkir.results[0];
      setCourier(tmpResults.name);

      const resultsKey = Object.keys(tmpResults);
      const resTmp = resultsKey.map((itemKey) => {
        return itemKey;
      });
      const resCostTmp = tmpResults[resTmp[2]].map((order) => {
        return order;
      });

      const tmpCost = resCostTmp[1];
      const tmpCostKey = Object.keys(tmpCost);
      const tmpDataCost = tmpCostKey.map((item) => {
        return item;
      });
      const resDataCost = tmpCost[tmpDataCost[2]].map((order) => {
        return order;
      });

      const tmpData = resDataCost[0];
      const tmpDataKey = Object.keys(tmpData);
      const tmpResData = tmpDataKey.map((item) => {
        return item;
      });
      const dataValueOngkir = tmpData[tmpResData[0]];
      const dataValueEstimasi = tmpData[tmpResData[1]];

      const hitungTotal = dataValueOngkir + subtotal;

      setOngkir(dataValueOngkir);
      setEstimasi(dataValueEstimasi);
      setTotal(hitungTotal);
      dispatch({
        type: 'ADD_ORDER',
        payload: { idAddress: isFind._id, ongkir: dataValueOngkir, subtotal, total: hitungTotal },
      });
      setLoading(false);
    } catch (err) {
      setLoading(false);
      return err.response.data.message;
    }
  };

  const formatter = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  });

  return (
    <Skeleton visible={loading}>
      <div className='confirm_wrapper'>
        <div className='confirm_wrap'>
          <Text className='confirm_text'>Alamat Penerima</Text>
          <Text className='confirm_text'>
            {`${dataAddress.detail}, ${dataAddress.kota}, ${dataAddress.provinsi}`}.
          </Text>
        </div>
        <div className='confirm_wrap'>
          <Text className='confirm_text'>Alamat Pengirim</Text>
          <Text className='confirm_text'>
            Jl. Pengadegan Timur I No.30, RT.6/RW.1, Pengadegan, Kec. Pancoran, Kota Jakarta
            Selatan, Daerah Khusus Ibukota Jakarta 12770
          </Text>
        </div>
        <div className='confirm_wrap'>
          <Text className='confirm_text'>Subtotal</Text>
          <Text className='confirm_text'>{formatter.format(subtotal)}</Text>
        </div>
        <div className='confirm_wrap'>
          <Text className='confirm_text'>Ongkir</Text>
          <Text className='confirm_text'>{`${formatter.format(
            ongkir
          )} (Est: ${estimasi} Hari)`}</Text>
        </div>
        <div className='confirm_wrap'>
          <Text className='confirm_text'>Jasa Pengiriman</Text>
          <Text className='confirm_text'>{courier}</Text>
        </div>
        <div className='confirm_wrap'>
          <Text className='confirm_text'>Total</Text>
          <Text className='confirm_text'>
            <Badge
              style={{ width: '100px' }}
              variant='gradient'
              gradient={{ from: 'orange', to: 'red' }}
              size='lg'
            >
              {formatter.format(total)}
            </Badge>
          </Text>
        </div>
      </div>
    </Skeleton>
  );
};

export default Payment;
