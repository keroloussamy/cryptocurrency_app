import React from 'react'
import millify from 'millify';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChartBar, faHashtag, faDollarSign, faBolt, faTrophy, faSackDollar, faCircleExclamation, faCheck, faBan } from '@fortawesome/free-solid-svg-icons'

import { useGetCryptoDetailsQuery } from '../services/cryptoApi';


const CryptoDetails = () => {
  const { coinId } = useParams();
  const { data, isFetching } = useGetCryptoDetailsQuery(coinId);
  const cryptoDetails = data?.data?.coin;

  if (isFetching) return 'Loading ...';
  
  const time = ['3h', '24h', '7d', '30d', '1y', '3m', '3y', '5y'];

  const stats = [
    { title: 'Price to USD', value: `$ ${cryptoDetails?.price && millify(cryptoDetails?.price)}`, icon: <FontAwesomeIcon icon={faDollarSign} /> },
    { title: 'Rank', value: cryptoDetails?.rank, icon: <FontAwesomeIcon icon={faHashtag} /> },
    { title: '24h Volume', value: `$ ${cryptoDetails?.volume && millify(cryptoDetails?.volume)}`, icon: <FontAwesomeIcon icon={faBolt} /> },
    { title: 'Market Cap', value: `$ ${cryptoDetails?.marketCap && millify(cryptoDetails?.marketCap)}`, icon: <FontAwesomeIcon icon={faDollarSign} /> },
    { title: 'All-time-high(daily avg.)', value: `$ ${cryptoDetails?.allTimeHigh?.price && millify(cryptoDetails?.allTimeHigh?.price)}`, icon: <FontAwesomeIcon icon={faTrophy} /> },
  ];

  const genericStats = [
    { title: 'Number Of Markets', value: cryptoDetails?.numberOfMarkets, icon: <FontAwesomeIcon icon={faChartBar} /> },
    { title: 'Number Of Exchanges', value: cryptoDetails?.numberOfExchanges, icon: <FontAwesomeIcon icon={faSackDollar} /> },
    { title: 'Aprroved Supply', value: cryptoDetails?.supply?.confirmed ? <FontAwesomeIcon icon={faCheck} /> : <FontAwesomeIcon icon={faBan} />, icon: <FontAwesomeIcon icon={faCircleExclamation} /> },
    { title: 'Total Supply', value: `$ ${cryptoDetails?.supply?.total && millify(cryptoDetails?.supply?.total)}`, icon: <FontAwesomeIcon icon={faCircleExclamation} /> },
    { title: 'Circulating Supply', value: `$ ${cryptoDetails?.supply?.circulating && millify(cryptoDetails?.supply?.circulating)}`, icon: <FontAwesomeIcon icon={faCircleExclamation} /> },
  ];

  return (
    <div>sssssssssss <FontAwesomeIcon icon={faCircleExclamation} /> </div>
  )
}

export default CryptoDetails