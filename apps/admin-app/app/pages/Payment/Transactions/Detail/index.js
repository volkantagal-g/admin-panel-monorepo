import { useTranslation } from 'react-i18next';

import { useDispatch } from 'react-redux';

import { useInitAndDestroyPage, usePageViewAnalytics } from '@shared/hooks';
import { ROUTE } from '@app/routes';
import { REDUX_KEY } from '@shared/shared/constants';
import { useInjectReducer } from '@shared/utils/injectReducer';
import { useInjectSaga } from '@shared/utils/injectSaga';

import { Header, Detail } from './components';
import { Creators } from './redux/actions';
import saga from './redux/saga';
import reducer from './redux/reducer';

const reduxKey = REDUX_KEY.TRANSACTIONS.DETAIL;

const Main = () => {
  const { t } = useTranslation(['global']);
  const dispatch = useDispatch();
  usePageViewAnalytics({ name: ROUTE.PAYMENT_TRANSACTION_DETAIL.name, squad: ROUTE.PAYMENT_TRANSACTION_DETAIL.squad });
  useInjectReducer({ key: reduxKey, reducer });
  useInjectSaga({ key: reduxKey, saga });
  useInitAndDestroyPage({ dispatch, Creators });
  return (
    <>
      <Header title={t('global:PAGE_TITLE.TRANSACTION.DETAIL')} />
      <Detail />
    </>
  );
};
export default Main;
