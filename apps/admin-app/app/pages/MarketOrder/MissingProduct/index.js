import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

import { useInjectReducer } from '@shared/utils/injectReducer';
import saga from './redux/saga';
import { Creators } from './redux/actions';
import reducer from './redux/reducer';
import { useInjectSaga } from '@shared/utils/injectSaga';
import { Creators as CommonCreators } from '@shared/redux/actions/common';
import { Filter, MissingProductsTable } from './components';
import { REDUX_KEY } from '@shared/shared/constants';
import { filtersSelector } from './redux/selectors';
import { usePageViewAnalytics } from '@shared/hooks';
import { ROUTE } from '@app/routes';
import { getLimitAndOffset } from '@shared/utils/common';

const reduxKey = REDUX_KEY.MARKET_ORDER.MISSING_PRODUCTS;

function MissingProductsOrders() {
  usePageViewAnalytics({
    name: ROUTE.MISSING_PRODUCT_ORDERS.name,
    squad: ROUTE.MISSING_PRODUCT_ORDERS.squad,
  });
  const dispatch = useDispatch();
  const { city, domainType, pagination: { currentPage, rowsPerPage } = {} } = useSelector(filtersSelector.getData) ?? {};
  useEffect(() => {
    dispatch(CommonCreators.getCitiesRequest());
  }, [dispatch]);

  useEffect(() => {
    if (domainType) {
      const { offset, limit } = { ...getLimitAndOffset({ currentPage, rowsPerPage }) };
      dispatch(Creators.getMissingProductOrdersRequest({ domainType, city, offset, limit }));
    }
  }, [dispatch, domainType, city, currentPage, rowsPerPage]);

  useInjectReducer({ key: reduxKey, reducer });
  useInjectSaga({ key: reduxKey, saga });

  return (
    <div data-testid="missing-products">
      <Filter />
      <MissingProductsTable />
    </div>
  );
}
export default MissingProductsOrders;
