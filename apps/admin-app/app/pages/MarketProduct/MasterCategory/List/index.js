import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { compose } from 'redux';

import {
  Header,
  MasterMainCategoryTable,
  MasterCategoryTable,
  MasterClassTable,
  MasterSubClassTable,
} from './components';
import { REDUX_KEY } from '@shared/shared/constants';
import injectSaga from '@shared/utils/injectSaga';
import injectReducer from '@shared/utils/injectReducer';
import { usePageViewAnalytics } from '@shared/hooks';
import { ROUTE } from '@app/routes';
import saga from './redux/saga';
import reducer from './redux/reducer';
import { Creators } from './redux/actions';
import SearchBar from './components/SearchBar';

const MarketProductCategoryListPage = () => {
  usePageViewAnalytics({
    name: ROUTE.MARKET_PRODUCT_MASTER_CATEGORY_LIST.name,
    squad: ROUTE.MARKET_PRODUCT_MASTER_CATEGORY_LIST.squad,
  });
  const dispatch = useDispatch();
  const [queryText, setQueryText] = useState();

  const handleSearch = queryText => {
    setQueryText(queryText.trim());
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
      <SearchBar onSearch={handleSearch} />
      <MasterMainCategoryTable queryText={queryText} />
      <MasterCategoryTable queryText={queryText} />
      <MasterClassTable queryText={queryText} />
      <MasterSubClassTable queryText={queryText} />
    </>
  );
};

const reduxKey = REDUX_KEY.MARKET_PRODUCT.CATEGORY.LIST;
const withSaga = injectSaga({ key: reduxKey, saga });
const withReducer = injectReducer({ key: reduxKey, reducer });

export default compose(withReducer, withSaga)(MarketProductCategoryListPage);
