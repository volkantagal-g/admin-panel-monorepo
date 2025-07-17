import { useLayoutEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { compose } from 'redux';

import { Skeleton } from 'antd';

import { REDUX_KEY } from '@shared/shared/constants';
import injectSaga from '@shared/utils/injectSaga';
import injectReducer from '@shared/utils/injectReducer';
import { usePageViewAnalytics, usePermission } from '@shared/hooks';
import { ROUTE } from '@app/routes';
import permKey from '@shared/shared/permKey.json';

import Header from './components/Header';
import UserDetailForm from './components/UserDetailForm';
import UserRoleTable from './components/UserRoleTable';
import saga from './redux/saga';
import reducer from './redux/reducer';
import { Creators } from './redux/actions';
import { getUserByIdSelector } from './redux/selectors';
import UserPagePermissionTable from './components/UserPagePermissionTable';

const UserDetailPage = () => {
  usePageViewAnalytics({ name: ROUTE.USER_DETAIL.name, squad: ROUTE.USER_DETAIL.squad });
  const dispatch = useDispatch();
  const { id: userId } = useParams();
  const { Can } = usePermission();

  const userPending = useSelector(getUserByIdSelector.getIsPending);

  useLayoutEffect(() => {
    dispatch(Creators.initPage());
    dispatch(Creators.getUserByIdRequest({ id: userId }));
    return () => {
      dispatch(Creators.destroyPage());
    };
  }, [dispatch, userId]);

  return (
    <>
      <Header />
      <Skeleton loading={userPending} active>
        <UserDetailForm />
      </Skeleton>
      <Skeleton loading={userPending} active>
        <UserRoleTable />
      </Skeleton>
      <Can permKey={permKey.PAGE_USER_DETAIL_VIEW_TOTAL_PERMISSIONS}>
        <Skeleton loading={userPending} active>
          <UserPagePermissionTable />
        </Skeleton>
      </Can>
    </>
  );
};

const reduxKey = REDUX_KEY.USER.DETAIL;
const withSaga = injectSaga({ key: reduxKey, saga });
const withReducer = injectReducer({ key: reduxKey, reducer });

export default compose(withReducer, withSaga)(UserDetailPage);
