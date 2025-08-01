import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { compose } from 'redux';

import {
  Header,
  AvailableTimeListTable,
} from './components';
import { REDUX_KEY } from '@shared/shared/constants';
import injectSaga from '@shared/utils/injectSaga';
import injectReducer from '@shared/utils/injectReducer';
import saga from './redux/saga';
import reducer from './redux/reducer';
import { Creators } from './redux/actions';
import { Creators as CommonCreators } from '@shared/redux/actions/common';
import FilterBar from '@app/pages/MarketProduct/Category/Visibility/List/components/FilterBar';
import { usePageViewAnalytics } from '@shared/hooks';
import { ROUTE } from '@app/routes';
import { initialFilters } from '@app/pages/MarketProduct/Category/Visibility/List/components/utils';

const MarketProductCategoryVisibilityListPage = () => {
  usePageViewAnalytics({
    name: ROUTE.MARKET_PRODUCT_CATEGORY_VISIBILITY_LIST.name,
    squad: ROUTE.MARKET_PRODUCT_CATEGORY_VISIBILITY_LIST.squad,
  });
  const dispatch = useDispatch();
  const [filters, setFilters] = useState({ ...initialFilters });
  const [selectedCategoryAvailableTimeIds, setSelectedCategoryAvailableTimeIds] = useState([]);

  useEffect(() => {
    dispatch(Creators.initPage());
    dispatch(CommonCreators.getCitiesRequest());
    dispatch(CommonCreators.getMarketProductCategoriesRequest());
    return () => {
      dispatch(Creators.destroyPage());
    };
  }, [dispatch]);

  useEffect(() => {
    dispatch(Creators.getMarketProductCategoryAvailableTimesByCitiesRequest({ shouldFetchWarehouses: true }));
  }, [dispatch]);

  return (
    <>
      <Header />
      <FilterBar
        filters={filters}
        onSetFilters={setFilters}
        onSetSelectedCategoryAvailableTimeIds={setSelectedCategoryAvailableTimeIds}
      />
      <AvailableTimeListTable
        filters={filters}
        onSetFilters={setFilters}
        selectedCategoryAvailableTimeIds={selectedCategoryAvailableTimeIds}
        onSetSelectedCategoryAvailableTimeIds={setSelectedCategoryAvailableTimeIds}
      />
    </>
  );
};

const reduxKey = REDUX_KEY.MARKET_PRODUCT.CATEGORY.VISIBILITY.LIST;
const withSaga = injectSaga({ key: reduxKey, saga });
const withReducer = injectReducer({ key: reduxKey, reducer });

export default compose(withReducer, withSaga)(MarketProductCategoryVisibilityListPage);
