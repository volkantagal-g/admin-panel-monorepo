import { useDispatch } from 'react-redux';

import { useInitAndDestroyPage } from '@shared/hooks';
import { useInjectReducer } from '@shared/utils/injectReducer';
import { useInjectSaga } from '@shared/utils/injectSaga';
import { REDUX_KEY } from '@shared/shared/constants';
import { ROUTE } from '@app/routes';
import usePageViewAnalytics from '@shared/hooks/usePageViewAnalytics';

import { Detail, Header } from './components';
import { Creators } from './redux/actions';
import saga from './redux/saga';
import reducer from './redux/reducer';

const reduxKey = REDUX_KEY.PAYMENT_EVENT.DETAIL;

const Main = () => {
  const dispatch = useDispatch();
  usePageViewAnalytics({ name: ROUTE.PAYMENT_EVENT_DETAIL.name, squad: ROUTE.PAYMENT_EVENT_DETAIL.squad });

  useInjectReducer({ key: reduxKey, reducer });
  useInjectSaga({ key: reduxKey, saga });
  useInitAndDestroyPage({ dispatch, Creators });

  return (
    <>
      <Header />
      <Detail />

    </>
  );
};

export default Main;
