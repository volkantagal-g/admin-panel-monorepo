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
import { Header, Detail } from './components';

const reduxKey = REDUX_KEY.MERCHANTS.DETAIL;

const DetailPage = () => {
  const { t } = useTranslation(['global']);
  const dispatch = useDispatch();
  usePageViewAnalytics({ name: ROUTE.PAYMENT_MERCHANT_DETAIL.name, squad: ROUTE.PAYMENT_MERCHANT_DETAIL.squad });

  useInjectReducer({ key: reduxKey, reducer });
  useInjectSaga({ key: reduxKey, saga });
  useInitAndDestroyPage({ dispatch, Creators });

  return (
    <>
      <PageTitleHeader title={t('global:PAGE_TITLE.MERCHANT.DETAIL')} />
      <Header />
      <Detail />
    </>
  );
};

export default DetailPage;
