import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { compose } from 'redux';
import _ from 'lodash';

import {
  Header,
  BadgeListTable,
  MarketProductBadgeListTable,
} from './components';
import { REDUX_KEY } from '@shared/shared/constants';
import injectSaga from '@shared/utils/injectSaga';
import injectReducer from '@shared/utils/injectReducer';
import { selectedBadgeSelector } from '@app/pages/MarketProduct/Badge/List/redux/selectors';
import { usePageViewAnalytics } from '@shared/hooks';
import saga from './redux/saga';
import reducer from './redux/reducer';
import { Creators } from './redux/actions';
import { ROUTE } from '@app/routes';

const MarketProductBadgeListPage = () => {
  usePageViewAnalytics({ name: ROUTE.MARKET_PRODUCT_BADGE_LIST.name, squad: ROUTE.MARKET_PRODUCT_BADGE_LIST.squad });
  const dispatch = useDispatch();
  const selectedBadge = useSelector(selectedBadgeSelector.getData);

  useEffect(() => {
    dispatch(Creators.initPage());
    return () => {
      dispatch(Creators.destroyPage());
    };
  }, [dispatch]);

  return (
    <>
      <Header />
      <BadgeListTable />
      {!_.isEmpty(selectedBadge) && <MarketProductBadgeListTable />}
    </>
  );
};

const reduxKey = REDUX_KEY.MARKET_PRODUCT.BADGE.LIST;
const withSaga = injectSaga({ key: reduxKey, saga });
const withReducer = injectReducer({ key: reduxKey, reducer });

export default compose(withReducer, withSaga)(MarketProductBadgeListPage);
