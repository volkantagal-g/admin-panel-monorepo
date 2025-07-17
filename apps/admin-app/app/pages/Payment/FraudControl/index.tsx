import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { useInitAndDestroyPage } from '@shared/hooks';
import { useInjectReducer } from '@shared/utils/injectReducer';
import { useInjectSaga } from '@shared/utils/injectSaga';
import { REDUX_KEY } from '@shared/shared/constants';
import { ROUTE } from '@app/routes';
import usePageViewAnalytics from '@shared/hooks/usePageViewAnalytics';
import PageTitleHeader from '@shared/components/UI/PageTitleHeader';

import FraudControl from './components/FraudControl';
import { Creators } from './redux/actions';
import saga from './redux/saga';
import Header from './components/Header';
import reducer from './redux/reducer';
import Filter from './components/Filter';

const reduxKey = REDUX_KEY.PAYMENT_FRAUD_CONTROL_LIST;

const FraudControlListPage = () => {
  const { t } = useTranslation(['global']);
  const dispatch = useDispatch();
  usePageViewAnalytics({
    name: ROUTE.PAYMENT_FRAUD_CONTROL_LIST.name,
    squad: ROUTE.PAYMENT_FRAUD_CONTROL_LIST.squad,
  });

  useInjectReducer({ key: reduxKey, reducer });
  useInjectSaga({ key: reduxKey, saga });
  useInitAndDestroyPage({ dispatch, Creators });

  return (
    <>
      <Header />
      <PageTitleHeader title={t('global:PAGE_TITLE.FRAUD_CONTROL.LIST')} />
      <Filter />
      <FraudControl />
    </>
  );
};

export default FraudControlListPage;
