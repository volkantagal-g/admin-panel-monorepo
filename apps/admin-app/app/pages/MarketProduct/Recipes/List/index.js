import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import useQuery from '@shared/shared/hooks/useQuery';

import {
  Header,
  RecipesTable,
} from './components';
import RecipesFilters from './components/RecipesFilters';
import { REDUX_KEY } from '@shared/shared/constants';
import { useInjectSaga } from '@shared/utils/injectSaga';
import { useInjectReducer } from '@shared/utils/injectReducer';
import { usePageViewAnalytics } from '@shared/hooks';
import { ROUTE } from '@app/routes';
import saga from './redux/saga';
import reducer from './redux/reducer';
import { Creators } from './redux/actions';
import { Content } from '@shared/components/GUI';

const reduxKey = REDUX_KEY.MARKET_PRODUCT.RECIPES.LIST;

const MarketProductRecipes = () => {
  usePageViewAnalytics({ name: ROUTE.MARKET_PRODUCT_RECIPES.name, squad: ROUTE.MARKET_PRODUCT_RECIPES.squad });
  const dispatch = useDispatch();

  const query = useQuery();
  const country = query.get('country');

  useInjectReducer({ key: reduxKey, reducer });
  useInjectSaga({ key: reduxKey, saga });

  useEffect(() => {
    dispatch(Creators.initPage());
    dispatch(Creators.setCountryCode({ countryCode: country?.toUpperCase() }));
    return () => {
      dispatch(Creators.destroyPage());
    };
  }, [dispatch, country]);

  return (
    <Content>
      <Header />
      <RecipesFilters />
      <RecipesTable />
    </Content>
  );
};

export default MarketProductRecipes;
