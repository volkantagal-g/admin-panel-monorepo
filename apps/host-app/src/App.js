import React, { Suspense, useCallback, useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

import { PANEL_EVENTS } from '@shared/shared/analyticsConstants';
import { isMobile } from '@shared/utils/common';
import AnalyticsService from '@shared/services/analytics';
import Providers from '@shared/containers/App/Providers';

import Sidebar from './AppLayout/Sidebar';
import { SIDEBAR_WIDTH_COLLAPSED, SIDEBAR_WIDTH_OPEN } from './AppLayout/constants';

import './app.css';
import { Layout } from 'antd';

const UserApp = React.lazy(() => import('user_app/UserApp'));
const ProductApp = React.lazy(() => import('product_app/ProductApp'));
const AdminApp = React.lazy(() => import('admin_app/AdminApp'));

const App = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(isMobile());
  const sidebarWidth = isSidebarCollapsed ? SIDEBAR_WIDTH_COLLAPSED : SIDEBAR_WIDTH_OPEN;

  const handleSidebarChange = useCallback((isCollapsed) => {

    if (isCollapsed === isSidebarCollapsed) return;

    AnalyticsService.track(PANEL_EVENTS.SIDEBAR_MENU_COLLAPSED.EVENT_NAME, { isCollapsed });
    setTimeout(
      () => {
        window.dispatchEvent(new Event('resize'));
      },
      500,
    );
    setIsSidebarCollapsed(isCollapsed);
  }, [isSidebarCollapsed]);

  return (
    <Providers store={store} history={history}>
      <BrowserRouter>
        <Layout hasSider>
          <div style={{ display: 'flex', height: '100vh' }}>
            <Sidebar
              sidebarWidth={sidebarWidth}
              isSidebarCollapsed={isSidebarCollapsed}
              setIsSidebarCollapsed={handleSidebarChange}
            />
            <Layout style={{ flex: 1, padding: 32 }}>
              <Suspense fallback={<div>Yükleniyor...</div>}>
                <Routes>
                  <Route path="/user" element={<UserApp />} />
                  <Route path="/product/*" element={<ProductApp />} />
                  <Route path="/admin" element={<AdminApp />} />
                  <Route path="/" element={<><h1>Hoşgeldiniz!</h1><h1>Bir uygulama seçin.</h1></>} />
                </Routes>
              </Suspense>
            </Layout>
          </div>
        </Layout>
      </BrowserRouter>
    </Providers>
  )
};

export default App; 

