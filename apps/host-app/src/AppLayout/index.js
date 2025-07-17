import React from 'react';
import { useState, useEffect, useCallback } from 'react';
import { Layout } from 'antd';
import { useLocation } from 'react-router-dom';

import { PANEL_EVENTS } from '@shared/shared/analyticsConstants';
import AnalyticsService from '@shared/services/analytics';
import { isMobile } from '@shared/utils/common';
import { useModalBackdrop, usePrevious } from '@shared/hooks';
import { MEDIA_TYPES } from '@shared/hooks/useModalBackdrop';
import Sidebar from './Sidebar';
import Header from './Header';
import Content from './Content';
import { SIDEBAR_WIDTH_COLLAPSED, SIDEBAR_WIDTH_OPEN } from './constants';
import { SIDEBAR_Z_INDEX } from '@shared/constants/styling';

const AppLayout = ({ routeComponentsMap }) => {
  const location = useLocation();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(isMobile());
  const sidebarWidth = isSidebarCollapsed ? SIDEBAR_WIDTH_COLLAPSED : SIDEBAR_WIDTH_OPEN;

  const previousLocation = usePrevious(location);

  const { BackdropComponent } = useModalBackdrop({ isShown: !isSidebarCollapsed, zIndex: SIDEBAR_Z_INDEX - 1, media: MEDIA_TYPES.MOBILE });

  useEffect(() => {
    if (isMobile() && previousLocation?.pathname !== location?.pathname) {
      setIsSidebarCollapsed(true);
    }
  }, [location?.pathname, previousLocation?.pathname]);

  const handleSidebarChange = useCallback(isCollapsed => {
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

  const toggleSidebar = useCallback(() => {
    handleSidebarChange(!isSidebarCollapsed);
  }, [isSidebarCollapsed, handleSidebarChange]);

  return (
    <Layout hasSider>
      <Sidebar
        sidebarWidth={sidebarWidth}
        isSidebarCollapsed={isSidebarCollapsed}
        setIsSidebarCollapsed={handleSidebarChange}
      />
      <Layout>
        <Header sidebarWidth={sidebarWidth} isSidebarCollapsed={isSidebarCollapsed} toggleSidebar={toggleSidebar} />
        <Content sidebarWidth={sidebarWidth} routeComponentsMap={routeComponentsMap} />
      </Layout>
      <BackdropComponent />
    </Layout>

  );
};

export default AppLayout;
