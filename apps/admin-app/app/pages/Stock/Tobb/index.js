import { useDispatch } from 'react-redux';
import { Card } from 'antd';

import { REDUX_KEY } from '@shared/shared/constants';
import { useInjectReducer } from '@shared/utils/injectReducer';
import { useInjectSaga } from '@shared/utils/injectSaga';
import { useInitAndDestroyPage, usePageViewAnalytics } from '@shared/hooks';
import { ROUTE } from '@app/routes';
import saga from './redux/saga';
import reducer from './redux/reducers';
import { Creators } from './redux/actions';
import { Header, Form, Status, DataTable } from './components';

const reduxKey = REDUX_KEY.STOCK.TOBB;

const TobbGibRequest = () => {
  usePageViewAnalytics({ name: ROUTE.TOBB_GIB_REQUEST.name, squad: ROUTE.TOBB_GIB_REQUEST.squad });

  useInjectReducer({ key: reduxKey, reducer });
  useInjectSaga({ key: reduxKey, saga });

  const dispatch = useDispatch();
  useInitAndDestroyPage({ dispatch, Creators });

  return (
    <div className="py-2">
      <Header />
      <Form />
      <Card bodyStyle={{ padding: 0 }}>
        <Status />
        <DataTable />
      </Card>
    </div>
  );
};

export default TobbGibRequest;
