import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import { Navbar, Home, Exchanges, Cryptocurrencies, CryptoDetails, News } from './components'

function App() {
  return (
    <div className="full-container">
      <div className='row m-0'>
        <div className='col-xl-2 col-4 p-0'>
          <Navbar />
        </div>
        <div className='col-xl-10 col-8'>
          <Routes>
            <Route exact path="/" element={<Home />} />      
            <Route exact path="/exchanges" element={<Exchanges />} />      
            <Route exact path="/cryptocurrencies" element={<Cryptocurrencies />} />      
            <Route exact path="/crypto/:coinId" element={<CryptoDetails />} />      
            <Route exact path="/news" element={<News />} />      
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
