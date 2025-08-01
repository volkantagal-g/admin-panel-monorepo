import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { compose } from 'redux';

import { Header, AssetDetailForm, AssetHistory, AssetRepairHistory, AssetChangeEventInfo } from './components';
import { REDUX_KEY } from '@shared/shared/constants';
import injectSaga from '@shared/utils/injectSaga';
import injectReducer from '@shared/utils/injectReducer';
import { usePageViewAnalytics } from '@shared/hooks';
import { ROUTE } from '@app/routes';
import saga from './redux/saga';
import reducer from './redux/reducer';
import { Creators } from './redux/actions';
import useStyles from './styles';

const AssetDetailPage = () => {
  usePageViewAnalytics({ name: ROUTE.EMPLOYEE_ASSET_DETAIL.name, squad: ROUTE.EMPLOYEE_ASSET_DETAIL.squad });
  const dispatch = useDispatch();
  const classes = useStyles();
  useEffect(() => {
    dispatch(Creators.initPage());
    return () => {
      dispatch(Creators.destroyPage());
    };
  }, [dispatch]);

  return (
    <div className={classes.wrapper}>
      <Header />
      <AssetDetailForm />
      <AssetHistory />
      <AssetChangeEventInfo />
      <AssetRepairHistory />
    </div>

  );
};

const reduxKey = REDUX_KEY.ASSET.DETAIL;
const withSaga = injectSaga({ key: reduxKey, saga });
const withReducer = injectReducer({ key: reduxKey, reducer });

export default compose(withReducer, withSaga)(AssetDetailPage);
