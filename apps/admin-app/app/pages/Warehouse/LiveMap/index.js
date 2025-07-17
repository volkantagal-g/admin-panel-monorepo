import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { Button } from 'antd';

import { useInitAndDestroyPage } from '@shared/hooks';
import { useInjectReducer } from '@shared/utils/injectReducer';
import { useInjectSaga } from '@shared/utils/injectSaga';
import { REDUX_KEY } from '@shared/shared/constants';
import { ROUTE } from '@app/routes';
import usePageViewAnalytics from '@shared/hooks/usePageViewAnalytics';
import PageTitleHeader from '@shared/components/UI/PageTitleHeader';
import { isMobile } from '@shared/utils/common';

import { warehouseSelector } from './redux/selectors';
import Map from './components/Map';
import CouriersTable from './components/CouriersTable';
import PickersTable from './components/PickersTable';
import CourierFilterButtons from './components/CourierFilterButtons';
import EventPanel from './components/EventPanel';
import Filters from './components/Filters';
import { Creators } from './redux/actions';
import saga from './redux/saga';
import reducer from './redux/reducer';
import useStyle from './styles';
import { TEST_ID } from '@app/pages/Warehouse/LiveMap/constants';

const reduxKey = REDUX_KEY.WAREHOUSE.LIVE_MAP;

const WarehouseLiveMapPage = () => {
  const { id } = useParams();
  const { t } = useTranslation(['global']);
  const dispatch = useDispatch();
  const classes = useStyle();
  const isDeviceMobile = isMobile();

  usePageViewAnalytics({ name: ROUTE.WAREHOUSE_LIVE_MAP.name, squad: ROUTE.WAREHOUSE_LIVE_MAP.squad });
  useInjectReducer({ key: reduxKey, reducer });
  useInjectSaga({ key: reduxKey, saga });
  useInitAndDestroyPage({ dispatch, Creators });

  const [isTopRightPanelCollapsed, setIsTopRightPanelCollapsed] = useState(false);

  useEffect(() => {
    dispatch(Creators.getWarehouseRequest({ id }));
    dispatch(Creators.getPolygonsRequest({ id }));
    dispatch(Creators.setFilterParams({ filterParams: { warehouseId: id } }));
    dispatch(Creators.startCouriersRefreshLogic());
    return () => {
      dispatch(Creators.stopCouriersRefreshLogic());
    };
  }, [dispatch, id]);

  const warehouse = useSelector(warehouseSelector.getData);

  return (
    <div className={classes.pageContainer}>
      <PageTitleHeader title={`${warehouse?.name || ''} - ${t('global:PAGE_TITLE.WAREHOUSE.LIVE_MAP')}`} />
      {isDeviceMobile && (
        <Helmet>
          <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
        </Helmet>
      )}
      <Map />
      <div className={classes.topRightCornerContainer}>
        <Button
          icon={isTopRightPanelCollapsed ? <LeftOutlined /> : <RightOutlined />}
          className={classes.collapseButton}
          onClick={() => setIsTopRightPanelCollapsed(!isTopRightPanelCollapsed)}
          data-testid={TEST_ID.TOP_RIGHT_PANEL.COLLAPSE_BUTTON}
        />
        {
          !isTopRightPanelCollapsed && (
            <>
              <Filters />
              <CouriersTable />
              <PickersTable />
              <CourierFilterButtons />
            </>
          )
        }
        <EventPanel />
      </div>
    </div>
  );
};

export default WarehouseLiveMapPage;
