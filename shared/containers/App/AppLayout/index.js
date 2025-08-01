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
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(isMobile());
  const sidebarWidth = isSidebarCollapsed ? SIDEBAR_WIDTH_COLLAPSED : SIDEBAR_WIDTH_OPEN;

  return (
    <Content sidebarWidth={sidebarWidth} routeComponentsMap={routeComponentsMap} />
  );
};

export default AppLayout;
