import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { compose } from 'redux';

import {
  Header,
  ArtisanOrderFilterTable,
} from '@app/pages/ArtisanOrder/Filter/components';
import { REDUX_KEY } from '@shared/shared/constants';
import injectSaga from '@shared/utils/injectSaga';
import injectReducer from '@shared/utils/injectReducer';
import saga from '@app/pages/ArtisanOrder/Filter/redux/saga';
import reducer from '@app/pages/ArtisanOrder/Filter/redux/reducer';
import { Creators } from '@app/pages/ArtisanOrder/Filter/redux/actions';
import ArtisanOrderFilter from '@app/pages/ArtisanOrder/Filter/components/Filter';
import { usePageViewAnalytics } from '@shared/hooks';
import { ROUTE } from '@app/routes';

const ArtisanOrderFilterPage = () => {
  const dispatch = useDispatch();
  usePageViewAnalytics({ name: ROUTE.ARTISAN_ORDER_FILTER.name, squad: ROUTE.ARTISAN_ORDER_FILTER.squad });

  useEffect(() => {
    dispatch(Creators.initPage());
    return () => {
      dispatch(Creators.destroyPage());
    };
  }, [dispatch]);

  return (
    <>
      <Header />
      <ArtisanOrderFilter />
      <ArtisanOrderFilterTable />
    </>
  );
};

const reduxKey = REDUX_KEY.ARTISAN_ORDER.FILTER;
const withSaga = injectSaga({ key: reduxKey, saga });
const withReducer = injectReducer({ key: reduxKey, reducer });

export default compose(withReducer, withSaga)(ArtisanOrderFilterPage);
