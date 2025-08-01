import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';

import moment from 'moment-timezone';

import { useInitAndDestroyPage } from '@shared/hooks';
import { useInjectReducer } from '@shared/utils/injectReducer';
import { useInjectSaga } from '@shared/utils/injectSaga';
import { REDUX_KEY } from '@shared/shared/constants';
import { ROUTE } from '@app/routes';
import usePageViewAnalytics from '@shared/hooks/usePageViewAnalytics';
import PageTitleHeader from '@shared/components/UI/PageTitleHeader';
import { Creators, defaultCurrentPage, defaultDomainType, defaultDates, defaultRowsPerPage } from './redux/actions';
import saga from './redux/saga';
import reducer from './redux/reducer';
import { Header, BasketFilter, BasketsTable } from './components';
import { Creators as CommonCreators } from '@shared/redux/actions/common';

const reduxKey = REDUX_KEY.MARKET_BASKET.LIST;

const MarketBasketList = () => {
  const { t } = useTranslation('marketBasketListPage');
  const dispatch = useDispatch();
  const { startDate, endDate } = defaultDates;
  const startDateTime = moment(startDate).startOf('day').toISOString();
  const endDateTime = moment(endDate).endOf('day').toISOString();
  usePageViewAnalytics({
    name: ROUTE.MARKET_BASKET_LIST.name,
    squad: ROUTE.MARKET_BASKET_LIST.squad,
  });

  useEffect(() => {
    dispatch(CommonCreators.getCitiesRequest());
    dispatch(Creators.getMarketBasketsRequest({
      domainType: defaultDomainType,
      startDateTime,
      endDateTime,
      limit: defaultRowsPerPage,
      page: defaultCurrentPage,
    }));
  }, [dispatch, endDateTime, startDateTime]);

  useInjectReducer({ key: reduxKey, reducer });
  useInjectSaga({ key: reduxKey, saga });
  useInitAndDestroyPage({ dispatch, Creators });

  return (
    <div className="mx-2">
      <PageTitleHeader title={t('PAGE_TITLE')} />
      <Header />
      <BasketFilter />
      <BasketsTable />
    </div>
  );
};

export default MarketBasketList;
