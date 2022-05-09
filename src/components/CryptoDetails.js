import React from 'react'
import { useParams } from 'react-router-dom';

import { useGetCryptoDetailsQuery } from '../services/cryptoApi';

const CryptoDetails = () => {
  const { coinId } = useParams();
  const { data, isFetching } = useGetCryptoDetailsQuery(coinId);

  console.log(data);
  return (
    <div>CryptoDetails</div>
  )
}

export default CryptoDetails