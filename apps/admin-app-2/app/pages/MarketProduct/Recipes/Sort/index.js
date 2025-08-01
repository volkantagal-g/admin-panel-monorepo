import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { compose } from 'redux';

import { Header, RecipeSort } from './components';
import { REDUX_KEY } from '@shared/shared/constants';
import injectSaga from '@shared/utils/injectSaga';
import injectReducer from '@shared/utils/injectReducer';
import { usePageViewAnalytics } from '@shared/hooks';
import saga from './redux/saga';
import reducer from './redux/reducer';
import { Creators } from './redux/actions';
import { ROUTE } from '@app/routes';
import SelectDomainType from '@shared/containers/Select/DomainType';
import { toggleRecipeActivenessSwitchSelector } from '@app/pages/MarketProduct/Recipes/Sort/redux/selectors';
import useQuery from '@shared/shared/hooks/useQuery';
import { domainTypes } from '../constants';

const RecipesSortingPage = () => {
  usePageViewAnalytics({ name: ROUTE.MARKET_PRODUCT_RECIPES_SORT.name, squad: ROUTE.MARKET_PRODUCT_RECIPES_SORT.squad });
  const dispatch = useDispatch();

  const query = useQuery();
  const countryCode = query.get('country');

  const showInactives = useSelector(toggleRecipeActivenessSwitchSelector.getData);
  const [selectedDomainType, setSelectedDomainType] = useState(1);

  const handleDomainType = val => {
    setSelectedDomainType(val);
  };

  useEffect(() => {
    dispatch(Creators.initPage());
    return () => {
      dispatch(Creators.destroyPage());
    };
  }, [dispatch]);

  useEffect(() => {
    dispatch(Creators.getRecipeOrdersRequest({
      domainType: selectedDomainType,
      showInactives,
      countryCode: countryCode ? countryCode.toUpperCase() : undefined,
    }));
  }, [dispatch, selectedDomainType, showInactives, countryCode]);

  return (
    <>
      <Header />
      <SelectDomainType value={selectedDomainType} onChange={handleDomainType} domainTypes={domainTypes} />
      <RecipeSort domainType={selectedDomainType} />
    </>
  );
};

const reduxKey = REDUX_KEY.MARKET_PRODUCT.RECIPES.SORT;
const withSaga = injectSaga({ key: reduxKey, saga });
const withReducer = injectReducer({ key: reduxKey, reducer });

export default compose(withReducer, withSaga)(RecipesSortingPage);
