import React, { Fragment, useEffect, useState } from 'react'
import millify from 'millify';
import { Link } from 'react-router-dom';

import { useGetCryptosQuery } from '../services/cryptoApi';
import Loader from './Loader';


const Cryptocurrencies = ({ simplified }) => {
  const count = simplified ? 10 : 100;
  const { data: cryptosList, isFetching } = useGetCryptosQuery(count); //Get something called data and you rename it to cryptosList
  const [cryptos, setCryptos] = useState();
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setCryptos(cryptosList?.data?.coins);

    const filteredData = cryptosList?.data?.coins.filter((item) => item.name.toLowerCase().includes(searchTerm));

    setCryptos(filteredData);
  }, [cryptosList, searchTerm]); //execute this function when any of arrays values get changed. And it also executed at the begining.

  if (isFetching) return <Loader />;

  return (
    <Fragment>
      {!simplified && (
        <div className="d-flex mx-2 my-4">
          <h3>Cryptocurrency Search :</h3>
          <input
            className="ms-auto w-25 ps-2"
            placeholder="Search Cryptocurrency"
            onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
          />
        </div>
      )}
      <div className="row">
      {cryptos?.map((currency) => (
        <div className="col-xl-3 col-sm-6 col-12" key={currency.uuid}>
          <Link to={`/crypto/${currency.uuid}`} className="text-decoration-none text-black">
            <div className="card p-3 m-2">
              <div className="d-flex justify-content-between">
                <h5 className="card-title">{`${currency.rank}. ${currency.name}`}</h5>
                <img className="rounded-circle" width="30" src={currency.iconUrl} alt={currency.name} />
              </div>
              <hr />
              <div className="card-body">
                <p>Price: {millify(currency.price)}</p>
                <p>Market Cap: {millify(currency.marketCap)}</p>
                <p>Daily Change: {currency.change}%</p>
              </div>
            </div>
          </Link>
        </div>
      ))}
      </div>
    </Fragment>
  )
}

export default Cryptocurrencies