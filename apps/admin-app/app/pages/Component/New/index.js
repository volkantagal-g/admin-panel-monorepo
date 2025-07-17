import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { compose } from 'redux';

import {
  Header,
  ComponentNewForm,
} from './components';
import { REDUX_KEY } from '@shared/shared/constants';
import injectSaga from '@shared/utils/injectSaga';
import injectReducer from '@shared/utils/injectReducer';
import { usePageViewAnalytics } from '@shared/hooks';
import { ROUTE } from '@app/routes';
import saga from './redux/saga';
import reducer from './redux/reducer';
import { Creators } from './redux/actions';
import { Creators as CommonCreators } from '@shared/redux/actions/common';

const ComponentNewPage = () => {
  usePageViewAnalytics({ name: ROUTE.COMPONENT_NEW.name, squad: ROUTE.COMPONENT_NEW.squad });
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(Creators.initPage());
    dispatch(CommonCreators.getOperationalCountriesRequest());
    return () => {
      dispatch(Creators.destroyPage());
    };
  }, [dispatch]);

  return (
    <>
      <Header />
      <ComponentNewForm />
    </>
  );
};

const reduxKey = REDUX_KEY.COMPONENT.NEW;
const withSaga = injectSaga({ key: reduxKey, saga });
const withReducer = injectReducer({ key: reduxKey, reducer });

export default compose(withReducer, withSaga)(ComponentNewPage);
