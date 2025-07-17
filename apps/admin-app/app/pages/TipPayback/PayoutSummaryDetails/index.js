import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { useInitAndDestroyPage } from '@shared/hooks';
import { useInjectReducer } from '@shared/utils/injectReducer';
import { useInjectSaga } from '@shared/utils/injectSaga';
import { REDUX_KEY } from '@shared/shared/constants';
import { ROUTE } from '@app/routes';
import usePageViewAnalytics from '@shared/hooks/usePageViewAnalytics';
import PageTitleHeader from '@shared/components/UI/PageTitleHeader';

import { Creators } from './redux/actions';
import saga from './redux/saga';
import reducer from './redux/reducer';
import { Header, Main } from './components';

const reduxKey = REDUX_KEY.TIP_PAYBACK.SUMMARY_DETAILS;

const PayoutSummaryDetailsPage = () => {
  const { t } = useTranslation(['global']);
  const dispatch = useDispatch();
  usePageViewAnalytics({ name: ROUTE.TIP_PAYBACK_PAYOUT_SUMMARY_DETAILS.name, squad: ROUTE.TIP_PAYBACK_PAYOUT_SUMMARY_DETAILS.squad });

  useInjectReducer({ key: reduxKey, reducer });
  useInjectSaga({ key: reduxKey, saga });
  useInitAndDestroyPage({ dispatch, Creators });

  return (
    <>
      <PageTitleHeader title={t('global:PAGE_TITLE.TIP_PAYBACK.PAYOUT_SUMMARY_DETAIL')} />
      <Header />
      <Main />
    </>
  );
};

export default PayoutSummaryDetailsPage;
