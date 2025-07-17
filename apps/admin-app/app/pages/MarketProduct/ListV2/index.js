import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  Header,
  MarketProductListTable,
} from './components';
import ProductSearch from './components/ProductSearch';
import { REDUX_KEY } from '@shared/shared/constants';
import { useInjectSaga } from '@shared/utils/injectSaga';
import { useInjectReducer } from '@shared/utils/injectReducer';
import { usePageViewAnalytics } from '@shared/hooks';
import { ROUTE } from '@app/routes';
import saga from './redux/saga';
import reducer from './redux/reducer';
import { Creators } from './redux/actions';
import { filtersSelector } from './redux/selectors';
import { Content } from '@shared/components/GUI';

const reduxKey = REDUX_KEY.MARKET_PRODUCT.LIST;

const MarketProductListPage = () => {
  usePageViewAnalytics({ name: ROUTE.MARKET_PRODUCT_LIST.name, squad: ROUTE.MARKET_PRODUCT_LIST.squad });
  const dispatch = useDispatch();
  const ids = useSelector(filtersSelector.getEnteredIds) || [];

  useInjectReducer({ key: reduxKey, reducer });
  useInjectSaga({ key: reduxKey, saga });

  const [queryText, setQueryText] = useState('');

  const handleSearch = name => {
    setQueryText(name);
  };

  useEffect(() => {
    dispatch(Creators.initPage());
    return () => {
      dispatch(Creators.destroyPage());
    };
  }, [dispatch]);

  return (
    <Content>
      <Header />
      <ProductSearch onSearch={handleSearch} />
      <MarketProductListTable queryText={queryText} ids={ids} />
    </Content>
  );
};

export default MarketProductListPage;
