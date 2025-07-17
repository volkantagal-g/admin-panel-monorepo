import { useDispatch } from 'react-redux';

import { LegalAgreementTable, Header } from './components';
import { REDUX_KEY } from '@shared/shared/constants';
import { useInjectReducer } from '@shared/utils/injectReducer';
import { useInjectSaga } from '@shared/utils/injectSaga';
import { useInitAndDestroyPage, usePageViewAnalytics } from '@shared/hooks';
import reducer from './redux/reducer';
import saga from './redux/saga';
import { Creators } from './redux/actions';
import { ROUTE } from '@app/routes';

const reduxKey = REDUX_KEY.FRANCHISE_LEGAL.LIST;

const ListFranchiseLegal = () => {
  const dispatch = useDispatch();
  useInjectReducer({ key: reduxKey, reducer });
  useInjectSaga({ key: reduxKey, saga });
  useInitAndDestroyPage({ dispatch, Creators });
  usePageViewAnalytics({ name: ROUTE.FRANCHISE_LEGAL_LIST.name, squad: ROUTE.FRANCHISE_LEGAL_LIST.squad });

  return (
    <>
      <Header />
      <LegalAgreementTable />
    </>
  );
};

export default ListFranchiseLegal;
