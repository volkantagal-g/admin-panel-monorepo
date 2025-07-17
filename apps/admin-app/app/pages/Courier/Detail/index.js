import { compose } from 'redux';

import { REDUX_KEY } from '@shared/shared/constants';
import injectSaga from '@shared/utils/injectSaga';
import injectReducer from '@shared/utils/injectReducer';
import { usePageViewAnalytics } from '@shared/hooks';
import { ROUTE } from '@app/routes';
import { PageWrapper } from './components';
import sagas from './redux/sagas';
import reducer from './redux/reducer';

const CourierDetailPage = () => {
  usePageViewAnalytics({
    name: ROUTE.COURIER_DETAIL.name,
    squad: ROUTE.COURIER_DETAIL.squad,
  });

  return <PageWrapper />;
};

const reduxKey = REDUX_KEY.COURIER.DETAIL;
const withSaga = injectSaga({ key: reduxKey, saga: sagas });
const withReducer = injectReducer({ key: reduxKey, reducer });

export default compose(withReducer, withSaga)(CourierDetailPage);
