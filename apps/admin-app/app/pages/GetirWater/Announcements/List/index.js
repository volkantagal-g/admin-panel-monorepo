import { useEffect } from 'react';
import { compose } from 'redux';
import { useDispatch } from 'react-redux';

import { Header, DataTable, FilterArea } from './components';
import { REDUX_KEY } from '@shared/shared/constants';
import injectSaga from '@shared/utils/injectSaga';
import injectReducer from '@shared/utils/injectReducer';
import { ROUTE } from '@app/routes';
import { usePageViewAnalytics } from '@shared/hooks';

import saga from './redux/saga';
import reducer from './redux/reducer';
import { Creators } from './redux/actions';

const AnnouncementsListPage = () => {
  const dispatch = useDispatch();
  usePageViewAnalytics({ name: ROUTE.GETIR_WATER_ANNOUNCEMENTS_LIST.name, squad: ROUTE.GETIR_WATER_ANNOUNCEMENTS_LIST.squad });

  useEffect(() => {
    dispatch(Creators.initPage());
    dispatch(Creators.getAnnouncementsRequest());

    return () => {
      dispatch(Creators.destroyPage());
    };
  }, [dispatch]);

  return (
    <>
      <Header />
      <FilterArea />
      <DataTable />
    </>
  );
};

const reduxKey = REDUX_KEY.GETIR_WATER.ANNOUNCEMENTS;
const withSaga = injectSaga({ key: reduxKey, saga });
const withReducer = injectReducer({ key: reduxKey, reducer });

export default compose(withReducer, withSaga)(AnnouncementsListPage);
