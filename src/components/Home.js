import React, { Fragment } from 'react'
import millify from 'millify'
import { Link } from 'react-router-dom';

import { useGetCryptosQuery } from '../services/cryptoApi'
import Cryptocurrencies from './Cryptocurrencies';
import News from './News';

const Home = () => {
  const { data, isFetching } = useGetCryptosQuery();
  const globalStats = data?.data?.stats;

  if (isFetching) return 'Loading.....';

  return (
    <Fragment>
      <h1 className="mb-3">Global Crypto Stats</h1>
      <div className="row bg-light">
        <div className="col-6">
          <h4>Total Cryptocurrencies</h4>
          <p>{globalStats.total}</p>
        </div>
        <div className="col-6">
          <h4>Total Exchanges</h4>
          <p>{millify(globalStats.totalExchanges)}</p>
        </div>
        <div className="col-6">
          <h4>Total Market Cap:</h4>
          <p>{`$${millify(globalStats.totalMarketCap)}`}</p>
        </div>
        <div className="col-6">
          <h4>Total 24h Volume</h4>
          <p>{`$${millify(globalStats.total24hVolume)}`}</p>
        </div>
        <div className="col-6">
          <h4>Total Cryptocurrencies</h4>
          <p>{globalStats.total}</p>
        </div>
        <div className="col-6">
          <h4>Total Markets</h4>
          <p>{millify(globalStats.totalMarkets)}</p>
        </div>
      </div>

      <div className="d-flex justify-content-between align-items-baseline">
        <h4>Top 10 Cryptos In The World</h4>
        <Link to="/cryptocurrencies">Show more</Link>
      </div>
      <Cryptocurrencies simplified />

      <div className="d-flex justify-content-between align-items-baseline">
        <h4>Latest Crypto News</h4>
        <Link to="/cryptocurrencies">Show more</Link>
      </div>
      <News simplified />

    </Fragment>
  )
}

export default Home