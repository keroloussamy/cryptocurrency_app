import React, { Fragment } from 'react'
import moment from 'moment';

import { useGetCryptoNewsQuery } from '../services/cryptoNews';

const demoImage = 'https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News';

const News = ({ simplified }) => {
  const { data: cryptoNews } = useGetCryptoNewsQuery({ newsCategory: 'Cryptocurrency', count: simplified ? 6 : 12 });

  if (!cryptoNews?.value) return 'Loading ...';
  console.log(cryptoNews)
  return (
    <Fragment>
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
                <div className="d-flex">
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