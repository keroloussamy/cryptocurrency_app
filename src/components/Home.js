import React, { Fragment } from 'react'
import millify from 'millify'
import { useGetCryptosQuery } from '../services/cryptoApi'

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
    </Fragment>
  )
}

export default Home