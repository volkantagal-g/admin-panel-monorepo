import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { compose } from 'redux';

import {
  Header,
  BrandDetailForm,
} from './components';
import { REDUX_KEY } from '@shared/shared/constants';
import injectSaga from '@shared/utils/injectSaga';
import injectReducer from '@shared/utils/injectReducer';
import { usePageViewAnalytics } from '@shared/hooks';
import { ROUTE } from '@app/routes';
import saga from './redux/saga';
import reducer from './redux/reducer';
import { Creators } from './redux/actions';
import useStyles from '@app/pages/Brand/styles';

const BrandDetailPage = () => {
  usePageViewAnalytics({ name: ROUTE.BRAND_DETAIL.name, squad: ROUTE.BRAND_DETAIL.squad });
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    dispatch(Creators.initPage());
    return () => {
      dispatch(Creators.destroyPage());
    };
  }, [dispatch]);

  return (
    <div className={classes.row}>
      <Header />
      <BrandDetailForm />
    </div>
  );
};

const reduxKey = REDUX_KEY.BRAND.DETAIL;
const withSaga = injectSaga({ key: reduxKey, saga });
const withReducer = injectReducer({ key: reduxKey, reducer });

export default compose(withReducer, withSaga)(BrandDetailPage);
