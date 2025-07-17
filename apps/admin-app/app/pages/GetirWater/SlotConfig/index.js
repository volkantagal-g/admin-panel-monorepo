import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { compose } from 'redux';
import { Collapse } from 'antd';
import { useTranslation } from 'react-i18next';

import {
  Header,
  DataTable,
  Filter,
  BulkFilter,
  BulkTable,
} from './components';
import { REDUX_KEY } from '@shared/shared/constants';
import injectSaga from '@shared/utils/injectSaga';
import injectReducer from '@shared/utils/injectReducer';
import { usePageViewAnalytics } from '@shared/hooks';
import { Creators as CommonCreators } from '@shared/redux/actions/common';
import { ROUTE } from '@app/routes';
import saga from './redux/saga';
import reducer from './redux/reducer';
import { Creators } from './redux/actions';

const { Panel } = Collapse;

const GetirWaterSlotConfig = () => {
  usePageViewAnalytics({ name: ROUTE.GETIR_WATER_SLOT_CONFIG.name, squad: ROUTE.GETIR_WATER_SLOT_CONFIG.squad });
  const dispatch = useDispatch();
  const { t } = useTranslation(['getirWaterSlotConfigPage']);

  useEffect(() => {
    dispatch(Creators.initPage());
    dispatch(CommonCreators.getCitiesRequest());
    dispatch(CommonCreators.getWarehousesRequest());
    return () => {
      dispatch(Creators.destroyPage());
    };
  }, [dispatch]);

  return (
    <>
      <Header />
      <Collapse accordion defaultActiveKey={['2']}>
        <Panel header={t('SINGLE_WAREHOUSE_SLOT_UPDATE')} key="1">
          <Filter />
          <DataTable />
        </Panel>
        <Panel header={t('MULTI_WAREHOUSE_SLOT_UPDATE')} key="2">
          <BulkFilter />
          <BulkTable />
        </Panel>
      </Collapse>
    </>
  );
};

const reduxKey = REDUX_KEY.GETIR_WATER.SLOT_CONFIG;
const withSaga = injectSaga({ key: reduxKey, saga });
const withReducer = injectReducer({ key: reduxKey, reducer });

export default compose(withReducer, withSaga)(GetirWaterSlotConfig);
