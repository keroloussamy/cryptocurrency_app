import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const cryptoNewsHeaders = {
  'X-BingApis-SDK': 'true',
  'X-RapidAPI-Host': 'bing-news-search1.p.rapidapi.com',
  'X-RapidAPI-Key': 'd341e72327msh339a644d59475f1p169d40jsn57a0f32f2cc2'
};

const createRequest = (url) => ({ url, headers: cryptoNewsHeaders });


export const cryptoNewsApi = createApi({
  reducerPath: 'cryptoNewsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://bing-news-search1.p.rapidapi.com' }),
  endpoints: (builder) => ({
    getCryptoNews: builder.query({
      query: ({ newsCategory, count }) => createRequest(`/news/search?q=${newsCategory}&safeSearch=Off&textFormat=Raw&freshness=Day&count=${count}`),
    })
  })
})

export const {
  useGetCryptoNewsQuery,
} = cryptoNewsApi;