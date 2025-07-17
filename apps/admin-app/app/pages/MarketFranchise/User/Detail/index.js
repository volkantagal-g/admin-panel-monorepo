import { useDispatch } from 'react-redux';

import { useInitAndDestroyPage, usePageViewAnalytics } from '@shared/hooks';
import { useInjectReducer } from '@shared/utils/injectReducer';
import { useInjectSaga } from '@shared/utils/injectSaga';
import { ROUTE } from '@app/routes';
import { REDUX_KEY } from '@shared/shared/constants';
import saga from './redux/sagas';
import reducer from './redux/reducer';
import { Creators } from './redux/actions';
import { PageWrapper } from './components';

const reduxKey = REDUX_KEY.MARKET_FRANCHISE.USER.DETAIL;

const FranchiseUserDetailPage = () => {
  const dispatch = useDispatch();

  useInjectReducer({ key: reduxKey, reducer });
  useInjectSaga({ key: reduxKey, saga });
  useInitAndDestroyPage({ dispatch, Creators });
  usePageViewAnalytics({
    name: ROUTE.MARKET_FRANCHISE_USER_DETAIL.name,
    squad: ROUTE.MARKET_FRANCHISE_USER_DETAIL.squad,
  });

  return <PageWrapper />;
};

export default FranchiseUserDetailPage;
