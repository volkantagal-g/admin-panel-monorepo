import { useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { compose } from 'redux';
import { Skeleton, Tabs } from 'antd';
import { useTranslation } from 'react-i18next';

import AntCard from '@shared/components/UI/AntCard';
import { usePageViewAnalytics } from '@shared/hooks';
import { ROUTE } from '@app/routes';

import Header from './components/Header';
import RoleDetailForm from './components/RoleDetailForm';
import PageList from './components/PageList';
import UserList from './components/UserList';
import ReportTagsList from './components/ReportTagsList';
import Hierarchy from './components/Hierarchy';
import { REDUX_KEY } from '@shared/shared/constants';
import injectSaga from '@shared/utils/injectSaga';
import injectReducer from '@shared/utils/injectReducer';
import saga from './redux/saga';
import reducer from './redux/reducer';
import { Creators } from './redux/actions';
import { getRoleByIdSelector } from './redux/selectors';
import { ROLE_DETAIL_TAB_PANE_KEY } from './constants';

const { TabPane } = Tabs;

const RoleDetailPage = () => {
  usePageViewAnalytics({ name: ROUTE.ROLE_DETAIL.name, squad: ROUTE.ROLE_DETAIL.squad });
  const dispatch = useDispatch();
  const { id: roleId } = useParams();
  const isRolePending = useSelector(getRoleByIdSelector.getIsPending);
  const { t } = useTranslation('rolePage');

  useEffect(() => {
    dispatch(Creators.initPage());
    dispatch(Creators.getRoleByIdRequest({ id: roleId }));
    return () => {
      dispatch(Creators.destroyPage());
    };
  }, [dispatch, roleId]);

  const handleRemoveRoleFromUserByRoleOwner = useCallback(({ user }) => {
    dispatch(Creators.removeRoleFromUserByRoleOwnerRequest({ user, roleId }));
  }, [dispatch, roleId]);

  const handleAddRoleToUsersByRoleOwner = useCallback(({ users, expiryDate }) => {
    dispatch(Creators.addRoleToUsersByRoleOwnerRequest({
      users,
      expiryDate,
      roleId,
    }));
  }, [dispatch, roleId]);

  return (
    <>
      <Header />
      <Skeleton loading={isRolePending} active>
        <RoleDetailForm />
      </Skeleton>

      <AntCard>
        <Tabs>
          <TabPane tab={t('ROLE_USERS_INFO')} key={ROLE_DETAIL_TAB_PANE_KEY.USER_LIST}>
            <Skeleton loading={isRolePending} active>
              <UserList
                onRemoveRoleFromUserByRoleOwner={handleRemoveRoleFromUserByRoleOwner}
                onAddRoleToUsersByRoleOwner={handleAddRoleToUsersByRoleOwner}
              />
            </Skeleton>
          </TabPane>

          <TabPane tab={t('ACCESS_GRANTED_PAGES')} key={ROLE_DETAIL_TAB_PANE_KEY.PAGE_LIST}>
            <Skeleton loading={isRolePending} active>
              <PageList />
            </Skeleton>
          </TabPane>

          <TabPane tab={t('REPORT_TAGS')} key={ROLE_DETAIL_TAB_PANE_KEY.REPORT_TAGS_LIST}>
            <Skeleton loading={isRolePending} active>
              <ReportTagsList />
            </Skeleton>
          </TabPane>

          <TabPane tab={t('ROLE_HIERARCHY')} key={ROLE_DETAIL_TAB_PANE_KEY.HIERARCHY}>
            <Skeleton loading={isRolePending} active>
              <Hierarchy />
            </Skeleton>
          </TabPane>
        </Tabs>
      </AntCard>
    </>
  );
};

const reduxKey = REDUX_KEY.ROLE.DETAIL;
const withSaga = injectSaga({ key: reduxKey, saga });
const withReducer = injectReducer({ key: reduxKey, reducer });

export default compose(withReducer, withSaga)(RoleDetailPage);
