import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

import Logo from './assets/logo.svg';

import './app.css';

const UserApp = React.lazy(() => import('user_app/UserApp'));
const ProductApp = React.lazy(() => import('product_app/ProductApp'));
const AdminApp = React.lazy(() => import('admin_app/AdminApp'));
const MarketingApp = React.lazy(() => import('market_app/MarketApp'));

const App = () => (
  <BrowserRouter>
    <div style={{ display: 'flex', height: '100vh' }}>
      <nav style={{ width: 200, background: '#5d3ebc', padding: 16 }}>
        <Logo />
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <li><Link to="/user">User App</Link></li>
          <li><Link to="/product">Product App</Link></li>
          <li className='sub-item'><Link to="/product/about">Product App Hakkında</Link></li>
          <li><Link to="/admin">Order App</Link></li>
          <li><Link to="/marketingApproval/list">Marketing App</Link></li>
        </ul>
      </nav>
      <main style={{ flex: 1, padding: 32 }}>
        <Suspense fallback={<div>Yükleniyor...</div>}>
          <Routes>
            <Route path="/user" element={<UserApp />} />
            <Route path="/product/*" element={<ProductApp />} />
            <Route path="/admin" element={<AdminApp />} />
            <Route path="/marketingApproval/*" element={<MarketingApp />} />
            <Route path="/" element={<><h1>Hoşgeldiniz!</h1><h1>Bir uygulama seçin.</h1></>} />
          </Routes>
        </Suspense>
      </main>
    </div>
  </BrowserRouter>
);

export default App; 