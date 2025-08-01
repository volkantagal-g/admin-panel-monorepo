// library imports
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

// shared imports
import { useInitAndDestroyPage } from '@shared/hooks';
import { useInjectReducer } from '@shared/utils/injectReducer';
import { useInjectSaga } from '@shared/utils/injectSaga';
import { REDUX_KEY } from '@shared/shared/constants';
import { ROUTE } from '@app/routes';
import usePageViewAnalytics from '@shared/hooks/usePageViewAnalytics';
import PageTitleHeader from '@shared/components/UI/PageTitleHeader';

// local imports
import { Creators } from '@app/pages/Market/BusinessConfig/redux/actions';
import saga from '@app/pages/Market/BusinessConfig/redux/saga';
import reducer from '@app/pages/Market/BusinessConfig/redux/reducer';
import {
  Header,
  ConfigList,
} from '@app/pages/Market/BusinessConfig/components';

// constants
const PAGE_SPECS = {
  ROUTE: ROUTE.MARKET_BUSINESS_CONFIG,
  STATE: REDUX_KEY.MARKET.BUSINESS_CONFIG,
};

const BusinessConfig = () => {
  const { t } = useTranslation(['businessConfig']);
  const dispatch = useDispatch();
  const { name, squad } = PAGE_SPECS.ROUTE;
  usePageViewAnalytics({
    name,
    squad,
  });

  useInjectReducer({ key: PAGE_SPECS.STATE, reducer });
  useInjectSaga({ key: PAGE_SPECS.STATE, saga });
  useInitAndDestroyPage({ dispatch, Creators });

  return (
    <>
      <PageTitleHeader title={t('PAGE_TITLE')} />
      <Header />
      <ConfigList />
    </>
  );
};

export default BusinessConfig;
