import React from 'react'
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'

import { useGetCryptoDetailsQuery } from '../services/cryptoApi';

const CryptoDetails = () => {
  const { coinId } = useParams();
  const { data, isFetching } = useGetCryptoDetailsQuery(coinId);

  console.log(data);
  return (
    <div>sssssssssss <FontAwesomeIcon icon={faCoffee} /></div>
  )
}

export default CryptoDetails