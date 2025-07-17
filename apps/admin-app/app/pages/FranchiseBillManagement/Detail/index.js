import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import { useInitAndDestroyPage, usePageViewAnalytics } from '@shared/hooks';
import { useInjectReducer } from '@shared/utils/injectReducer';
import { useInjectSaga } from '@shared/utils/injectSaga';
import { ROUTE } from '@app/routes';
import saga from './redux/saga';
import reducer from './redux/reducer';
import { Creators } from './redux/actions';
import { reducerKey as reduxKey } from './redux/key';
import { PageHeader as Header, PageContent as Content } from './components';

const FranchiseBillManagementDetailPage = () => {
  const dispatch = useDispatch();
  const { billId } = useParams();

  useInjectReducer({ key: reduxKey, reducer });
  useInjectSaga({ key: reduxKey, saga });
  useInitAndDestroyPage({ dispatch, Creators });
  usePageViewAnalytics({
    name: ROUTE.MARKET_FRANCHISE_USER_DETAIL.name,
    squad: ROUTE.MARKET_FRANCHISE_USER_DETAIL.squad,
  });

  return (
    <>
      <Header />
      <Content billId={billId} />
    </>
  );
};

export default FranchiseBillManagementDetailPage;
