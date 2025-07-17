import { useEffect } from 'react';
import { compose } from 'redux';
import { useDispatch } from 'react-redux';

import { Header, Form } from './components';
import { REDUX_KEY } from '@shared/shared/constants';
import injectSaga from '@shared/utils/injectSaga';
import injectReducer from '@shared/utils/injectReducer';
import { ROUTE } from '@app/routes';
import { usePageViewAnalytics } from '@shared/hooks';
import { Creators as CommonCreators } from '@shared/redux/actions/common';

import saga from './redux/sagas';
import reducer from './redux/reducers';
import { Creators } from './redux/actions';

const AnnouncementNewPage = () => {
  const dispatch = useDispatch();
  usePageViewAnalytics({ name: ROUTE.GETIR_WATER_ANNOUNCEMENT_NEW.name, squad: ROUTE.GETIR_WATER_ANNOUNCEMENT_NEW.squad });

  useEffect(() => {
    dispatch(Creators.initPage());
    dispatch(Creators.getBrandsRequest());
    dispatch(CommonCreators.getCitiesRequest());
    return () => {
      dispatch(Creators.destroyPage());
    };
  }, [dispatch]);

  return (
    <>
      <Header />
      <Form />
    </>
  );
};

const reduxKey = REDUX_KEY.GETIR_WATER.ANNOUNCEMENTS;
const withSaga = injectSaga({ key: reduxKey, saga });
const withReducer = injectReducer({ key: reduxKey, reducer });

export default compose(withReducer, withSaga)(AnnouncementNewPage);
