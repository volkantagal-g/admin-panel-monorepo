import { useState, useMemo, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Button } from 'antd';
import { UserAddOutlined, ExportOutlined, DeleteOutlined } from '@ant-design/icons';

import confirm from 'antd/lib/modal/confirm';

import AntCard from '@shared/components/UI/AntCard';
import AntTableV2 from '@shared/components/UI/AntTableV2';
import { countriesSelector, getRoleUsersSelector } from '@shared/redux/selectors/common';
import { getUser } from '@shared/redux/selectors/auth';
import { Creators as CommonCreators } from '@shared/redux/actions/common';
import { Creators } from '../../redux/actions';
import { createMap } from '@shared/utils/common';
import { usePermission } from '@shared/hooks';
import permKey from '@shared/shared/permKey.json';
import { getRoleByIdSelector, removeUsersFromRoleSelector, updateRoleMemberTypeSelector } from '../../redux/selectors';
import AddUserModal from '../AddUserModal';
import { getTableColumns } from './config';
import useStyles from './styles';
import AnalyticsService from '@shared/services/analytics';
import { PANEL_EVENTS } from '@shared/shared/analyticsConstants';
import TableEmpty from '@shared/shared/components/TableEmpty';

const UserList = ({
  onRemoveRoleFromUserByRoleOwner,
  onAddRoleToUsersByRoleOwner,
}: {
  onRemoveRoleFromUserByRoleOwner: ({ user }: { user: UserType }) => void,
  onAddRoleToUsersByRoleOwner: ({ users, expiryDate }: { users: MongoIDType[], expiryDate: Date }) => void,
}) => {
  const { t } = useTranslation('rolePage');
  const { id: roleId } = useParams() as { id: MongoIDType };
  const { canAccess } = usePermission();
  const classes = useStyles();
  const dispatch = useDispatch();

  const role = useSelector(getRoleByIdSelector.getData);
  const roleUsers = useSelector(getRoleUsersSelector.getData);
  const isRoleUsersPending = useSelector(getRoleUsersSelector.getIsPending);
  const isRoleUsersRequested = useSelector(getRoleUsersSelector.getIsRequested);
  const isDeleteMultiplePending = useSelector(removeUsersFromRoleSelector.getIsPending);

  const isUpdateRoleMembershipPending = useSelector(updateRoleMemberTypeSelector.getIsPending);
  const countries = useSelector(countriesSelector.getData);

  const [addUsersModalVisibility, setAddUsersModalVisibility] = useState(false);
  const hasPermissionToEditUsers = canAccess(permKey.PAGE_ROLE_DETAIL_EDIT_USERS);

  const isActiveUserIsRoleOwner = useMemo(() => {
    const { _id: userId } = getUser();
    const isRoleOwner = role?.roleOwners?.some(roleOwner => (roleOwner as RoleOwner)._id === userId);
    return isRoleOwner;
  }, [role]) as boolean;

  const memoizedHandleRemoveRoleFromUserByRoleOwner = useCallback(({ user }) => {
    onRemoveRoleFromUserByRoleOwner({ user });
    AnalyticsService.track(PANEL_EVENTS.ROLE_DETAIL.EVENT_NAME, { button: PANEL_EVENTS.ROLE_DETAIL.BUTTON.USERS_INFO_REMOVE });
  }, [onRemoveRoleFromUserByRoleOwner]);

  const handleAddRoleToUsersByRoleOwner = ({ users, expiryDate }: { users: MongoIDType[], expiryDate: Date }) => {
    onAddRoleToUsersByRoleOwner({ users, expiryDate });
  };

  const tableColumns = useMemo(
    () => {
      const countriesMap = createMap(countries) as Record<string, ICountry>;
      const tempTableColumns = getTableColumns({
        roleId,
        countriesMap,
        hasPermissionToEditUsers,
        handleRemoveRoleFromUserByRoleOwner: memoizedHandleRemoveRoleFromUserByRoleOwner,
        isActiveUserIsRoleOwner,
        handleUpdateRoleMembership: (...args) => dispatch(Creators.updateRoleMemberTypeRequest(...args)),
        isUpdatePending: isUpdateRoleMembershipPending,
        classes,
        tPage: t,
      });
      return tempTableColumns;
    },
    [
      dispatch,
      roleId,
      countries,
      memoizedHandleRemoveRoleFromUserByRoleOwner,
      isActiveUserIsRoleOwner,
      hasPermissionToEditUsers,
      isUpdateRoleMembershipPending,
      classes,
      t,
    ],
  );

  const handleBringRoleUserExportClick = () => {
    dispatch(Creators.getRoleUsersForExcelTableRequest({ roleId, isActive: true, countries }));
    AnalyticsService.track(PANEL_EVENTS.ROLE_DETAIL.EVENT_NAME, { button: PANEL_EVENTS.ROLE_DETAIL.BUTTON.USERS_INFO_EXPORT });
  };

  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);

  const handleRowSelectionChange = (selectedRowKeys2: string[]) => {
    setSelectedRowKeys(selectedRowKeys2);
  };

  const handleDeleteMultipleUsers = () => {
    const selectedUsers = selectedRowKeys.map(userId => {
      const user = roleUsers.find(user1 => user1._id === userId);
      return user;
    });

    confirm({
      okText: t('OK'),
      cancelText: t('CANCEL'),
      title: t('rolePage:REMOVE_SELECTED_USERS_CONFIRM_TITLE'),
      content: (
        <ol>
          {selectedUsers.map(user => {
            return (<li key={user._id}>{user.name}</li>);
          })}
        </ol>),
      onOk() {
        const afterSuccess = () => {
          setSelectedRowKeys([]);
        };

        dispatch(Creators.removeUsersFromRoleRequest({ userIds: selectedRowKeys, roleId, afterSuccess }));
      },
    });
  };

  const handleBringRoleUsersClick = () => {
    dispatch(CommonCreators.getRoleUsersRequest({ roleId, isActive: true, populateEmployeeInfo: true }));
  };
  const userListButton = (
    <Button loading={isRoleUsersPending} type="primary" onClick={handleBringRoleUsersClick}>
      {t('BRING_ROLE_USERS')}
    </Button>
  );

  const getTitle = () => {
    return (
      <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', flexWrap: 'wrap', gap: '4px' }}>
        <div>
          {t('ROLE_USERS_INFO')}
        </div>
        <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>

          {
            (hasPermissionToEditUsers || isActiveUserIsRoleOwner) && (
              <>
                {!!selectedRowKeys.length && (
                  <Button
                    danger
                    icon={<DeleteOutlined />}
                    loading={isRoleUsersPending}
                    onClick={handleDeleteMultipleUsers}
                  >
                    {t('rolePage:REMOVE_SELECTED_USERS')}
                  </Button>
                )}
                <Button
                  icon={<UserAddOutlined />}
                  loading={isRoleUsersPending}
                  onClick={() => {
                    setAddUsersModalVisibility(true);
                    AnalyticsService.track(PANEL_EVENTS.ROLE_DETAIL.EVENT_NAME, { button: PANEL_EVENTS.ROLE_DETAIL.BUTTON.USERS_INFO_ADD });
                  }}
                >
                  {t('rolePage:ADD_USER')}
                </Button>
              </>
            )
          }
          {userListButton}
          <Button icon={<ExportOutlined />} onClick={handleBringRoleUserExportClick}>
            {t('rolePage:ROLE_USER_EXPORT')}
          </Button>
        </div>
      </div>
    );
  };

  const locale = {
    emptyText: (
      <TableEmpty caption={t('rolePage:CLICK_TO_LOAD_USERS')}>
        {userListButton}
      </TableEmpty>
    ),
  };

  const canDelete = isActiveUserIsRoleOwner || hasPermissionToEditUsers;

  return (
    <>
      <AddUserModal
        modalVisibility={addUsersModalVisibility}
        onChangeVisibility={(newIsVisible: boolean) => {
          setAddUsersModalVisibility(newIsVisible);
        }}
        onConfirm={handleAddRoleToUsersByRoleOwner}
      />
      <AntCard
        title={getTitle()}
        className={classes.card}
      >
        <AntTableV2
          bordered
          locale={isRoleUsersRequested ? null : locale}
          rowSelection={canDelete ? {
            selectedRowKeys,
            onChange: handleRowSelectionChange,
          } : undefined}
          data={roleUsers}
          columns={tableColumns}
          loading={isRoleUsersPending || isDeleteMultiplePending}
          className={classes.table}
          scroll={{ y: 500 }}
        />
      </AntCard>
    </>
  );
};

export default UserList;
