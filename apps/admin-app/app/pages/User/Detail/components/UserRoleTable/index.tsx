import { useCallback, useEffect, useMemo } from 'react';
import { Button, Skeleton } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import AntTableV2 from '@shared/components/UI/AntTableV2';
import { usePermission } from '@shared/hooks';
import AntCard from '@shared/components/UI/AntCard';
import { getUserOwnedRolesSelector, getUserRolesSelector } from '@shared/redux/selectors/common';
import { Creators as CommonCreators } from '@shared/redux/actions/common';
import permKey from '@shared/shared/permKey.json';
import { getUser } from '@shared/redux/selectors/auth';

import { AddRolesModal } from './components/AddRolesModal';
import { addRolesToUserSelector, getUserByIdSelector, deleteRoleMembershipSelector, updateRoleMemberTypeSelector } from '../../redux/selectors';
import { Creators } from '../../redux/actions';
import { HandleUpdateRoleMembershipProps, getColumns } from './config';
import useStyles from './styles';
import TableEmpty from '@shared/shared/components/TableEmpty';

export default function UserRoleTable() {
  const { canAccess } = usePermission();
  const dispatch = useDispatch();
  const sessionUserId = getUser()._id;
  const { t } = useTranslation('userPage');
  const classes = useStyles();
  const canAccessAddRoles = canAccess(permKey.PAGE_USER_DETAIL_EDIT_ROLE_MEMBERSHIP);

  useEffect(() => {
    // no need to fetch user's owned roles if he is permitted to add any role
    if (canAccessAddRoles) return;
    dispatch(CommonCreators.getUserOwnedRolesRequest({ userId: sessionUserId }));
  }, [dispatch, sessionUserId, canAccessAddRoles]);

  const sessionUserOwnedRoles = useSelector(getUserOwnedRolesSelector.getData);
  const sessionUserOwnedRolesPending = useSelector(getUserOwnedRolesSelector.getIsPending);

  const detailUser = useSelector(getUserByIdSelector.getData);
  const detailUserId = detailUser?._id;
  const userNotFound = !detailUserId;
  const detailUserRolesIds = detailUser?.roles || [];

  const detailUserRoles = useSelector(getUserRolesSelector.getData);
  const detailUserRolesPending = useSelector(getUserRolesSelector.getIsPending);
  const detailUserRolesRequested = useSelector(getUserRolesSelector.getIsRequested);
  const isAddRolesLoading = useSelector(addRolesToUserSelector.getIsPending);
  const isUpdateRoleMembershipPending = useSelector(updateRoleMemberTypeSelector.getIsPending);

  const isDeletePending = useSelector(deleteRoleMembershipSelector.getIsPending);

  const onSubmit = ({ selectedRoles, afterSuccess }: { selectedRoles: RoleType[], afterSuccess: () => void }) => {
    dispatch(Creators.addRolesToUserRequest({ userId: detailUserId, roleIds: selectedRoles, afterSuccess }));
  };

  const handleDeleteMembership = useCallback(roleId => {
    dispatch(Creators.deleteRoleMembershipRequest({ userId: detailUserId, roleId }));
  }, [detailUserId, dispatch]);

  const columns = useMemo(
    () => getColumns({
      t,
      userId: detailUserId,
      canAccessActions: canAccessAddRoles,
      handleUpdateRoleMembership: (values: HandleUpdateRoleMembershipProps) => dispatch(Creators.updateRoleMemberTypeRequest(values)),
      isUpdatePending: isUpdateRoleMembershipPending,
      handleDeleteMembership,
      isDeletePending,
    }),
    [t,
      dispatch,
      detailUserId,
      isUpdateRoleMembershipPending,
      canAccessAddRoles,
      handleDeleteMembership,
      isDeletePending],
  );

  const roleListButton = (
    <Button
      type="primary"
      loading={detailUserRolesPending}
      disabled={userNotFound}
      onClick={() => {
        if (detailUserId) {
          dispatch(CommonCreators.getUserRolesRequest({ userId: detailUserId }));
        }
      }}
    >{t('BRING_ROLES')}
    </Button>
  );

  const locale = {
    emptyText: (
      <TableEmpty caption={t('CLICK_TO_LOAD_ROLES')}>
        {roleListButton}
      </TableEmpty>
    ),
  };

  return (
    <AntCard title={getTitle()}>
      <AntTableV2
        locale={detailUserRolesRequested ? null : locale}
        data={detailUserRoles}
        loading={detailUserRolesPending}
        columns={columns}
        className={classes.table}
        data-testid="user-role-table"
        scroll={{ y: 500 }}
      />
    </AntCard>
  );

  function getTitle() {
    return (
      <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
        <div>{t('ROLE_INFO')}</div>
        {getTableHeaderButtons()}
      </div>
    );
  }

  function getTableHeaderButtons() {
    const canAccessAddRolesButton = sessionUserOwnedRoles?.length > 0 || canAccessAddRoles;

    const selectableRoles = canAccessAddRoles ? null : sessionUserOwnedRoles;

    return (
      <div style={{ display: 'flex', gap: '4px' }}>
        {canAccessAddRolesButton && (
          <Skeleton loading={sessionUserOwnedRolesPending} active>
            <AddRolesModal
              selectableRoles={selectableRoles}
              excludedRoleIds={detailUserRolesIds}
              onSubmit={onSubmit}
              isLoading={isAddRolesLoading}
              disabled={userNotFound}
            />
          </Skeleton>
        )}
        {roleListButton}
      </div>
    );
  }
}
