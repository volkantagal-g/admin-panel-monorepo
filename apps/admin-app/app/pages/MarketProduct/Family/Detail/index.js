import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { compose } from 'redux';

import { useParams } from 'react-router-dom';

import ProductFilter from '@app/pages/MarketProduct/Family/Detail/components/ProductFilter';
import ProductTable from '@app/pages/MarketProduct/Family/Detail/components/ProductTable';

import { REDUX_KEY } from '@shared/shared/constants';
import injectSaga from '@shared/utils/injectSaga';
import injectReducer from '@shared/utils/injectReducer';
import { usePageViewAnalytics } from '@shared/hooks';
import saga from '@app/pages/MarketProduct/Family/redux/saga';
import reducer from '@app/pages/MarketProduct/Family/redux/reducer';
import { Creators } from '@app/pages/MarketProduct/Family/redux/actions';
import { ROUTE } from '@app/routes';
import Header from '@app/pages/MarketProduct/Family/Detail/components/Header';
import useStyles from '@app/pages/MarketProduct/Family/Detail/styles';
import { getMarketProductFamilyDetailSelector } from '@app/pages/MarketProduct/Family/redux/selectors';
import { transformFamilyDetailData, filteredData } from './util';

const MarketProductFamilyDetailPage = () => {
  usePageViewAnalytics({
    name: ROUTE.MARKET_PRODUCT_FAMILY_DETAIL.name,
    squad: ROUTE.MARKET_PRODUCT_FAMILY_DETAIL.squad,
  });
  const dispatch = useDispatch();
  const { id } = useParams();
  const classes = useStyles();
  const [filter, setFilter] = useState({});

  useEffect(() => {
    dispatch(Creators.initPage());
    dispatch(Creators.getMarketProductFamilyDetailRequest({ id }));
    return () => {
      dispatch(Creators.destroyPage());
    };
  }, [dispatch, id]);

  const marketProductFamily = useSelector(
    getMarketProductFamilyDetailSelector.getData,
  );

  const data = transformFamilyDetailData(marketProductFamily);

  return (
    <div className={classes.row}>
      <Header data={marketProductFamily} />
      <ProductFilter setFormValues={values => {
        setFilter(values);
      }}
      />
      <ProductTable data={filteredData(data, filter)} />
    </div>
  );
};

const reduxKey = REDUX_KEY.MARKET_PRODUCT.FAMILY;
const withSaga = injectSaga({ key: reduxKey, saga });
const withReducer = injectReducer({ key: reduxKey, reducer });

export default compose(withReducer, withSaga)(MarketProductFamilyDetailPage);
