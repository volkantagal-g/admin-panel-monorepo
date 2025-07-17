import { useDispatch } from 'react-redux';
import { compose } from 'redux';

import {
  Header,
  PageList,
} from './components';
import { REDUX_KEY } from '@shared/shared/constants';
import injectSaga from '@shared/utils/injectSaga';
import injectReducer from '@shared/utils/injectReducer';
import { useInitAndDestroyPage, usePageViewAnalytics } from '@shared/hooks';
import saga from './redux/saga';
import reducer from './redux/reducer';
import { Creators } from './redux/actions';
import { ROUTE } from '@app/routes';

const PageListPage = () => {
  usePageViewAnalytics({ name: ROUTE.PAGE_LIST.name, squad: ROUTE.PAGE_LIST.squad });
  const dispatch = useDispatch();
  useInitAndDestroyPage({ dispatch, Creators });

  return (
    <>
      <Header />
      <PageList />
    </>
  );
};

const reduxKey = REDUX_KEY.PAGE.LIST;
const withSaga = injectSaga({ key: reduxKey, saga });
const withReducer = injectReducer({ key: reduxKey, reducer });

export default compose(withReducer, withSaga)(PageListPage);
