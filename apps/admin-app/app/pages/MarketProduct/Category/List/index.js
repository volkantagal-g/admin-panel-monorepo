import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { compose } from 'redux';

import {
  Header,
  MarketProductCategoryListTable,
  MarketProductSubCategoryListTable,
} from './components';
import { REDUX_KEY } from '@shared/shared/constants';
import injectSaga from '@shared/utils/injectSaga';
import injectReducer from '@shared/utils/injectReducer';
import { usePageViewAnalytics } from '@shared/hooks';
import saga from './redux/saga';
import reducer from './redux/reducer';
import { Creators } from './redux/actions';
import ProductCategorySearch from './components/CategorySearch';
import { ROUTE } from '@app/routes';

const MarketProductCategoryListPage = () => {
  usePageViewAnalytics({ name: ROUTE.MARKET_PRODUCT_CATEGORY_LIST.name, squad: ROUTE.MARKET_PRODUCT_CATEGORY_LIST.squad });
  const dispatch = useDispatch();

  const [queryText, setQueryText] = useState('');
  const [status, setStatus] = useState();
  const [selectedDomainType, setSelectedDomainType] = useState(1);

  const handleSearch = queryText => {
    setQueryText(queryText.trim());
  };
  const handleStatusChange = status => {
    setStatus(status);
  };

  const handleDomainChange = domainType => {
    setSelectedDomainType(domainType);
  };

  useEffect(() => {
    dispatch(Creators.initPage());
    return () => {
      dispatch(Creators.destroyPage());
    };
  }, []);

  return (
    <>
      <Header />
      <ProductCategorySearch
        onSearch={handleSearch}
        onStatusChange={handleStatusChange}
        onDomainChange={handleDomainChange}
        domainType={selectedDomainType}
      />
      <MarketProductCategoryListTable domainType={selectedDomainType} queryText={queryText} status={status} />
      <MarketProductSubCategoryListTable queryText={queryText} status={status} />
    </>
  );
};

const reduxKey = REDUX_KEY.MARKET_PRODUCT.CATEGORY.LIST;
const withSaga = injectSaga({ key: reduxKey, saga });
const withReducer = injectReducer({ key: reduxKey, reducer });

export default compose(withReducer, withSaga)(MarketProductCategoryListPage);
