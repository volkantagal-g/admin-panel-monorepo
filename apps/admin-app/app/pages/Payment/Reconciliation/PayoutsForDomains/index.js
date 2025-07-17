import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { useInitAndDestroyPage } from '@shared/hooks';
import { useInjectReducer } from '@shared/utils/injectReducer';
import { useInjectSaga } from '@shared/utils/injectSaga';
import { REDUX_KEY } from '@shared/shared/constants';
import { ROUTE } from '@app/routes';
import usePageViewAnalytics from '@shared/hooks/usePageViewAnalytics';
import PageTitleHeader from '@shared/components/UI/PageTitleHeader';

import PayoutsForDomainList from './components/PayoutsForDomainList';
import { Creators } from './redux/actions';
import saga from './redux/saga';
import reducer from './redux/reducer';
import Header from './components/Header';
import Filter from './components/Filter';
import DomainTabs from './components/DomainTabs';

const reduxKey = REDUX_KEY.PAYOUTS_FOR_DOMAINS;

const PayoutsForDomainsPage = () => {
  const { t } = useTranslation(['global']);
  const dispatch = useDispatch();
  usePageViewAnalytics({ name: ROUTE.PAYOUTS_FOR_DOMAINS.name, squad: ROUTE.PAYOUTS_FOR_DOMAINS.squad });

  useInjectReducer({ key: reduxKey, reducer });
  useInjectSaga({ key: reduxKey, saga });
  useInitAndDestroyPage({ dispatch, Creators });

  return (
    <>
      <Header />
      <PageTitleHeader title={t('global:PAGE_TITLE.PAYOUTS_FOR_DOMAINS')} />
      <DomainTabs />
      <Filter />
      <PayoutsForDomainList />
    </>
  );
};

export default PayoutsForDomainsPage;
