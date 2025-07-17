// Bottom left panel
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Button } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { ErrorBoundary } from 'react-error-boundary';

import { liveMapDataSelector } from '../../redux/selectors';

import OrderStatsTable from '../OrderStatsTable';
import ErrorFallback from '@shared/components/UI/ErrorFallback';
import AnalyticsService from '@shared/services/analytics';
import { LIVE_MAP_EVENTS } from '@app/pages/GetirMarket/LiveMap/mixPanelEvents';
import { isMobile } from '@shared/utils/common';

import useStyles from './styles';

export default function OrderStatsPanel() {
  const isDeviceMobile = isMobile();
  const [collapsed, setCollapsed] = useState(false);

  const classes = useStyles({ isDeviceMobile });

  const data = useSelector(liveMapDataSelector.getData);

  const handleClick = () => {
    setCollapsed(prev => !prev);
    AnalyticsService.track(LIVE_MAP_EVENTS.BUTTON_CLICK, {
      button: LIVE_MAP_EVENTS.ORDER_STATS_PANEL.COLLAPSE,
      tableName: LIVE_MAP_EVENTS.ORDER_STATS_PANEL.NAME,
    });
  };

  return (
    <div className={`${classes.orderStatsContainer} ${collapsed && classes.collapsed} liveMapOrderStats`}>
      <Button
        key="2"
        size="small"
        className={`${classes.collapseButton}`}
        onClick={() => handleClick()}
      >
        {collapsed ? <RightOutlined /> : <LeftOutlined />}
      </Button>

      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <OrderStatsTable
          orderStats={data}
        />
      </ErrorBoundary>
    </div>
  );
}
