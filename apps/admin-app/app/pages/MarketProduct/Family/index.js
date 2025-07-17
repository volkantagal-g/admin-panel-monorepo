import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { compose } from 'redux';

import { Header } from './components';
import Filters from '@app/pages/MarketProduct/Family/components/Filters';
import FamilyTable from '@app/pages/MarketProduct/Family/components/FamilyTable';
import saga from '@app/pages/MarketProduct/Family/redux/saga';
import reducer from '@app/pages/MarketProduct/Family/redux/reducer';
import { Creators } from '@app/pages/MarketProduct/Family/redux/actions';
import { ROUTE } from '@app/routes';
import { usePageViewAnalytics } from '@shared/hooks';
import { REDUX_KEY } from '@shared/shared/constants';
import injectSaga from '@shared/utils/injectSaga';
import injectReducer from '@shared/utils/injectReducer';

import useStyles from './styles';

const MarketProductFamilyListPage = () => {
  const dispatch = useDispatch();
  usePageViewAnalytics({ name: ROUTE.MARKET_PRODUCT_FAMILY_LIST.name, squad: ROUTE.MARKET_PRODUCT_FAMILY_LIST.squad });

  const classes = useStyles();

  useEffect(() => {
    dispatch(Creators.initPage());
    dispatch(Creators.getMarketProductFamilyListRequest());
    return () => {
      dispatch(Creators.destroyPage());
    };
  }, [dispatch]);

  const [formValues, setFormValues] = useState({});

  return (
    <div className={classes.row}>
      <Header />
      <Filters formValues={formValues} setFormValues={setFormValues} />
      <FamilyTable formValues={formValues} />
    </div>
  );
};

const reduxKey = REDUX_KEY.MARKET_PRODUCT.FAMILY;
const withSaga = injectSaga({ key: reduxKey, saga });
const withReducer = injectReducer({ key: reduxKey, reducer });

export default compose(withReducer, withSaga)(MarketProductFamilyListPage);
