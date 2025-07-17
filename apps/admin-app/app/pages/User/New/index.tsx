import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { compose } from 'redux';

import Header from './components/Header';
import UserNewForm from './components/UserNewForm';
import { REDUX_KEY } from '@shared/shared/constants';
import injectSaga from '@shared/utils/injectSaga';
import injectReducer from '@shared/utils/injectReducer';
import { usePageViewAnalytics } from '@shared/hooks';
import { ROUTE } from '@app/routes';
import saga from './redux/saga';
import reducer from './redux/reducer';
import { Creators } from './redux/actions';

const UserNewPage = () => {
  usePageViewAnalytics({ name: ROUTE.USER_NEW.name, squad: ROUTE.USER_NEW.squad });
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(Creators.initPage());
    return () => {
      dispatch(Creators.destroyPage());
    };
  }, [dispatch]);

  return (
    <>
      <Header />
      <UserNewForm />
    </>
  );
};

const reduxKey = REDUX_KEY.USER.NEW;
const withSaga = injectSaga({ key: reduxKey, saga });
const withReducer = injectReducer({ key: reduxKey, reducer });

export default compose(withReducer, withSaga)(UserNewPage);
