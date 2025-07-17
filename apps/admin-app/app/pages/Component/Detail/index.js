import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { compose } from 'redux';

import {
  Header,
  ComponentDetailForm,
  RoleList,
} from './components';
import { REDUX_KEY } from '@shared/shared/constants';
import injectSaga from '@shared/utils/injectSaga';
import injectReducer from '@shared/utils/injectReducer';
import { usePageViewAnalytics } from '@shared/hooks';
import { ROUTE } from '@app/routes';
import { getUser } from '@shared/redux/selectors/auth';
import { Creators as CommonCreators } from '@shared/redux/actions/common';
import saga from './redux/saga';
import reducer from './redux/reducer';
import { Creators } from './redux/actions';

const ComponentDetailPage = () => {
  usePageViewAnalytics({ name: ROUTE.COMPONENT_DETAIL.name, squad: ROUTE.COMPONENT_DETAIL.squad });
  const dispatch = useDispatch();
  const { id: componentId } = useParams();
  const { _id: userId } = getUser();

  useEffect(() => {
    dispatch(Creators.initPage());
    dispatch(Creators.getComponentByIdRequest({ id: componentId }));
    dispatch(CommonCreators.getUserOwnedPagesRequest({ userId }));
    dispatch(CommonCreators.getOperationalCountriesRequest());
    return () => {
      dispatch(Creators.destroyPage());
    };
  }, [dispatch, componentId, userId]);

  return (
    <>
      <Header />
      <ComponentDetailForm />
      <RoleList />
    </>
  );
};

const reduxKey = REDUX_KEY.COMPONENT.DETAIL;
const withSaga = injectSaga({ key: reduxKey, saga });
const withReducer = injectReducer({ key: reduxKey, reducer });

export default compose(withReducer, withSaga)(ComponentDetailPage);
