import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { compose } from 'redux';

import { Header, CategorySort } from './components';
import { REDUX_KEY } from '@shared/shared/constants';
import injectSaga from '@shared/utils/injectSaga';
import injectReducer from '@shared/utils/injectReducer';
import { usePageViewAnalytics } from '@shared/hooks';
import saga from './redux/saga';
import reducer from './redux/reducer';
import { Creators } from './redux/actions';
import { ROUTE } from '@app/routes';
import SelectDomainType from '@shared/containers/Select/DomainType';
import {
  toggleCategoryActivenessSwitchSelector,
  toggleCategoryListablesSwitchSelector,
} from '@app/pages/MarketProduct/Category/Sort/redux/selectors';

const MarketProductCategorySortPage = () => {
  usePageViewAnalytics({ name: ROUTE.MARKET_PRODUCT_CATEGORY_SORT.name, squad: ROUTE.MARKET_PRODUCT_CATEGORY_SORT.squad });
  const dispatch = useDispatch();
  const showInactives = useSelector(toggleCategoryActivenessSwitchSelector.getData);
  const isListable = useSelector(toggleCategoryListablesSwitchSelector.getData);
  const [selectedDomainType, setSelectedDomainType] = useState(1);
  const domainTypes = {
    1: { en: 'Getir10', tr: 'Getir10' },
    3: { en: 'GetirMore', tr: 'GetirBüyük' },
  };

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
    dispatch(Creators.getCategoryOrdersRequest({
      domainType: selectedDomainType,
      showInactives,
      isListable,
    }));
  }, [dispatch, selectedDomainType, showInactives, isListable]);

  return (
    <>
      <Header />
      <SelectDomainType value={selectedDomainType} onChange={handleDomainType} domainTypes={domainTypes} />
      <CategorySort domainType={selectedDomainType} />
    </>
  );
};

const reduxKey = REDUX_KEY.MARKET_PRODUCT.CATEGORY.SORT;
const withSaga = injectSaga({ key: reduxKey, saga });
const withReducer = injectReducer({ key: reduxKey, reducer });

export default compose(withReducer, withSaga)(MarketProductCategorySortPage);
