import React, { useEffect } from 'react';
import { Routes, Route, Link, useLocation, useNavigate, useInRouterContext, MemoryRouter } from 'react-router-dom';

const Home = () => (
  <div>
    <h2>Product App</h2>
    <p>Ürün uygulamasına hoşgeldiniz!</p>
  </div>
);

const About = () => (
  <div>
    <h2>Hakkında</h2>
    <p>Bu, Product App'in hakkında sayfasıdır.</p>
  </div>
);

const InnerApp = () => (
  <div>
    <nav>
      <Link to="">Ana Sayfa</Link> | <Link to="about">Hakkında</Link>
    </nav>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="about" element={<About />} />
    </Routes>
  </div>
);

const App = () => {
  const inRouter = typeof useInRouterContext === 'function' ? useInRouterContext() : false;

  console.log('inRouter', inRouter);
  if (!inRouter) {
    return (
      <MemoryRouter>
        <InnerApp />
      </MemoryRouter>
    );
  }
  return <InnerApp />;
};

export default App; 