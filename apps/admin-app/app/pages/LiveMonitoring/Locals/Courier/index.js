import { compose } from 'redux';

import { usePageViewAnalytics } from '@shared/hooks';
import { ROUTE } from '@app/routes';
import injectSaga from '@shared/utils/injectSaga';
import injectReducer from '@shared/utils/injectReducer';
import { REDUX_KEY } from '@shared/shared/constants';

import { Filters, Header, Table } from './components';
import { useFetchData, useInitPage } from './hooks';
import saga from './redux/saga';
import reducer from './redux/reducer';

const LocalsLiveMonitoringPage = () => {
  usePageViewAnalytics({ name: ROUTE.LOCALS_LIVE_MONITORING_COURIER.name, squad: ROUTE.LOCALS_LIVE_MONITORING_COURIER.squad });
  useInitPage();
  useFetchData();

  return (
    <>
      <Header />
      <Filters />
      <Table />
    </>
  );
};

const reduxKey = REDUX_KEY.LIVE_MONITORING.LOCALS.COURIER;
const withSaga = injectSaga({ key: reduxKey, saga });
const withReducer = injectReducer({ key: reduxKey, reducer });

export default compose(withReducer, withSaga)(LocalsLiveMonitoringPage);
