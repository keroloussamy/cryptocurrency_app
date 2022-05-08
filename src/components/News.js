import React, { Fragment, useState } from 'react'
import moment from 'moment';

import { useGetCryptoNewsQuery } from '../services/cryptoNews';
import { useGetCryptosQuery } from '../services/cryptoApi';

const demoImage = 'https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News';

const News = ({ simplified }) => {
  const [newsCategory, setNewsCategory] = useState('Cryptocurrency');
  const { data } = useGetCryptosQuery(100);
  const { data: cryptoNews } = useGetCryptoNewsQuery({ newsCategory, count: simplified ? 6 : 12 });

  if (!cryptoNews?.value) return 'Loading ...';

  return (
    <Fragment>
     {!simplified && (
        <div className="d-flex mx-2 my-4">
          <h3>Select by Category :</h3>
          <select 
            className="p-2 ms-auto"
            placeholder="Select a Crypto"
            onChange={(e) => setNewsCategory(e.target.value)}>
            <option value="Cryptocurrency">Cryptocurrency</option>
            {data?.data?.coins?.map((currency, i) => <option value={currency.name} key={i}>{currency.name}</option>)}
          </select>
        </div>
      )}
      <div className="row">
      {cryptoNews.value.map((news, i) => (
        <div className="col-xl-4 col-sm-6 col-12" key={i}>
          <a href={news.url} className="text-decoration-none text-black">
            <div className="card p-3 m-2">
              <div className="d-flex justify-content-between">
                <h5 className="card-title">{news.name}</h5>
                <img width="80" src={news?.image?.thumbnail?.contentUrl || demoImage} alt={news.name} />
              </div>
              <br />
              <div className="card-body">
                <p>{news.description.length > 100 ? `${news.description.substring(0, 100)}...` : news.description}</p>
              </div>
              <div className="d-flex justify-content-between">
                <div className="d-flex gap-1">
                  <img className="rounded-circle" width="30" src={news.provider[0]?.image?.thumbnail?.contentUrl || demoImage} alt="" />
                  <p className="my-auto">{news.provider[0]?.name}</p>
                </div>
                <p className="my-auto">{moment(news.datePublished).startOf('ss').fromNow()}</p>
              </div>
            </div>
          </a>
        </div>
      ))}
      </div>
    </Fragment>
  )
}

export default News