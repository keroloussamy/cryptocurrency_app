import React, { Fragment, useState } from 'react'
import millify from 'millify';
import HTMLReactParser from 'html-react-parser';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChartBar, faHashtag, faDollarSign, faBolt, faTrophy, faSackDollar, faCircleExclamation, faCheck, faBan } from '@fortawesome/free-solid-svg-icons'

import { useGetCryptoDetailsQuery, useGetCryptoHistoryQuery } from '../services/cryptoApi';
import Loader from './Loader';
import LineChart from './LineChart';


const CryptoDetails = () => {
  const { coinId } = useParams();
  const [timeperiod, setTimeperiod] = useState('1y');
  const { data, isFetching } = useGetCryptoDetailsQuery(coinId);
  const { data: coinHistory } = useGetCryptoHistoryQuery({ coinId, timeperiod });
  const cryptoDetails = data?.data?.coin;

  if (isFetching) return <Loader />;
  
  const time = ['3h', '24h', '7d', '30d', '1y', '3m', '3y', '5y'];

  const stats = [
    { id: 1, title: 'Price to USD', value: `$ ${cryptoDetails?.price && millify(cryptoDetails?.price)}`, icon: <FontAwesomeIcon icon={faDollarSign} /> },
    { id: 2, title: 'Rank', value: cryptoDetails?.rank, icon: <FontAwesomeIcon icon={faHashtag} /> },
    { id: 3, title: '24h Volume', value: `$ ${cryptoDetails?.volume && millify(cryptoDetails?.volume)}`, icon: <FontAwesomeIcon icon={faBolt} /> },
    { id: 4, title: 'Market Cap', value: `$ ${cryptoDetails?.marketCap && millify(cryptoDetails?.marketCap)}`, icon: <FontAwesomeIcon icon={faDollarSign} /> },
    { id: 5, title: 'All-time-high(daily avg.)', value: `$ ${cryptoDetails?.allTimeHigh?.price && millify(cryptoDetails?.allTimeHigh?.price)}`, icon: <FontAwesomeIcon icon={faTrophy} /> },
  ];

  const genericStats = [
    { id: 1, title: 'Number Of Markets', value: cryptoDetails?.numberOfMarkets, icon: <FontAwesomeIcon icon={faChartBar} /> },
    { id: 2, title: 'Number Of Exchanges', value: cryptoDetails?.numberOfExchanges, icon: <FontAwesomeIcon icon={faSackDollar} /> },
    { id: 3, title: 'Aprroved Supply', value: cryptoDetails?.supply?.confirmed ? <FontAwesomeIcon icon={faCheck} /> : <FontAwesomeIcon icon={faBan} />, icon: <FontAwesomeIcon icon={faCircleExclamation} /> },
    { id: 4, title: 'Total Supply', value: `$ ${cryptoDetails?.supply?.total && millify(cryptoDetails?.supply?.total)}`, icon: <FontAwesomeIcon icon={faCircleExclamation} /> },
    { id: 5, title: 'Circulating Supply', value: `$ ${cryptoDetails?.supply?.circulating && millify(cryptoDetails?.supply?.circulating)}`, icon: <FontAwesomeIcon icon={faCircleExclamation} /> },
  ];

  return (
    <Fragment>
      <div className="text-center py-5">
        <h1>{data?.data?.coin.name} ({data?.data?.coin.symbol}) Price</h1>
        <p>{cryptoDetails.name} live price in US Dollar (USD). View value statistics, market cap and supply.</p>
      </div>
      <hr />

      <div className="d-flex justify-content-between">
        <h3>{data?.data?.coin.name} Price Chart</h3>
        <select
          className="p-2 px-5 d-block ms-auto"
          defaultValue="1y"
          placeholder="Select Time"
          onChange={(e) => {console.log(e.target.value); setTimeperiod(e.target.value)}}>
          {time.map((date) => <option key={date}>{date}</option>)}
        </select>
      </div>
      
      <LineChart coinHistory={coinHistory} />

      <div className="row">
        <div className="col-md-6 col-12">
          <h3 className="text-primary">{cryptoDetails.name} Value Statistics</h3>
          <p>An overview showing the statistics of {cryptoDetails.name}, such as the base and quote currency, the rank, and trading volume.</p>
          {stats.map(({ id, icon, title, value }) => (
            <div className="me-5" key={id}>
              <div className="d-flex justify-content-between">
                <div className="d-flex gap-3">
                  <p className="text-center">{icon}</p>
                  <p>{title}</p>
                </div>
                <p className="fw-bold">{value}</p>
              </div>
              <hr className="mt-0"/>
            </div>
          ))}
        </div>
        <div className="col-md-6 col-12">
          <h3 className="text-primary">Other Stats Info</h3>
          <p>An overview showing the statistics of {cryptoDetails.name}, such as the base and quote currency, the rank, and trading volume.</p>
          {genericStats.map(({ id, icon, title, value }) => (
            <div className="me-5" key={id}>
            <div className="d-flex justify-content-between">
              <div className="d-flex gap-3">
                <p className="text-center">{icon}</p>
                <p>{title}</p>
              </div>
              <p className="fw-bold">{value}</p>
            </div>
            <hr className="mt-0"/>
            </div>
          ))}
        </div>
      </div>
      <div className="row mt-5">
        <div className="col-md-6 col-12">
          <h3 className="text-primary">What is {cryptoDetails.name}?</h3>
          {HTMLReactParser(cryptoDetails.description)}
        </div>
        <div className="col-md-6 col-12">
          <h3 className="text-primary pb-3">{cryptoDetails.name} Links</h3>
            {cryptoDetails.links?.map((link, id) => (
              <div key={link.name+id}>
              <div className="d-flex justify-content-between ms-1 me-3">
                <h5>{link.type}</h5>
                <a href={link.url} target="_blank" rel="noreferrer">{link.name}</a>
              </div>
              <hr />
              </div>
            ))}
        </div>
      </div>
    </Fragment>
  )
}

export default CryptoDetails