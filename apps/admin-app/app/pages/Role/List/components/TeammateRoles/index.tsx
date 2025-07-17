import { useEffect, useState, useCallback, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Modal, Button } from 'antd';
import { get, isEmpty } from 'lodash';

import { createSortObject } from '@shared/utils/table';
import { QueryUser, Role, tableColumns } from './config';
import AntTableV2 from '@shared/components/UI/AntTableV2';
import { getLimitAndOffset } from '@shared/utils/common';
import AnalyticsService from '@shared/services/analytics';
import { Creators } from '../../redux/actions';
import { teammateRolesSelector, userRoleRequestsSelector } from '../../redux/selectors';
import { getUser } from '@shared/redux/selectors/auth';
import { getLangKey } from '@shared/i18n';
import { DEFAULT_DEBOUNCE_MS } from '@shared/shared/constants';
import { PANEL_EVENTS } from '@shared/shared/analyticsConstants';
import { usePermission } from '@shared/hooks';
import permKey from '@shared/shared/permKey.json';
import useDebouncedCallback from '@shared/hooks/useDebouncedCallback';
import useStyles from './styles';
import UserRoleRequestModalContent from '../../../components/UserRoleRequestModalContent';

type RoleListTableProps = {
  searchText: string | undefined;
};

type Pagination = {
  currentPage: number;
  rowsPerPage: number;
}

const TeammateRoles = ({ searchText }: RoleListTableProps) => {
  const { t } = useTranslation('rolePage');
  const { canAccess } = usePermission();
  const dispatch = useDispatch();
  const classes = useStyles();
  const roles = useSelector(teammateRolesSelector.getData);
  const rolesArePending = useSelector(teammateRolesSelector.getIsPending);

  const roleRequests = useSelector(userRoleRequestsSelector.getData);
  const roleRequestsArePending = useSelector(userRoleRequestsSelector.getIsPending);

  const [showRoleRequestModal, setShowRoleRequestModal] = useState(false);
  const [requestedRoleId, setRequestedRoleId] = useState('');
  const openRoleRequestModal = useCallback(roleId => {
    setShowRoleRequestModal(true);
    AnalyticsService.track(PANEL_EVENTS.ROLE_LIST.EVENT_NAME.BUTTON, { method: PANEL_EVENTS.ROLE_LIST.BUTTON.TEAMMATES_ROLES_JOIN_ROLE });
    setRequestedRoleId(roleId);
  }, []);
  const requestedRoleName = (!rolesArePending && requestedRoleId) ? roles.find(r => r._id === requestedRoleId)?.name : '';

  const [showTeammatesRole, setShowTeammatesRole] = useState<Role | null>(null);

  const [pagination, setPagination] = useState({ currentPage: 1, rowsPerPage: 10 });
  const [sortOptions, setSortOptions] = useState({});
  const hasAccessToRoleDetailPage = canAccess(permKey.PAGE_ROLE_DETAIL);
  const user = getUser();
  const userId = get(user, '_id');

  const getRoles = useCallback((_pagination: Pagination, _searchText?: string): void => {
    const params = {
      ...getLimitAndOffset(_pagination),
      queryText: _searchText || undefined,
      isActive: _searchText ? undefined : true,
      sortOptions: !isEmpty(sortOptions) ? sortOptions : undefined,
    };

    dispatch(Creators.getRolesOfTeammatesRequest(params));
  }, [dispatch, sortOptions]);

  const handleSearch = useCallback(searchTextLocal => {
    setPagination({ currentPage: 1, rowsPerPage: 10 });
    getRoles({ currentPage: 1, rowsPerPage: 10 }, searchTextLocal);
  }, [getRoles]);

  const { debouncedCallback: handleDebouncedSearch } = useDebouncedCallback({ callback: handleSearch, delay: DEFAULT_DEBOUNCE_MS });

  useEffect(() => {
    handleDebouncedSearch(searchText);
  }, [handleDebouncedSearch, searchText]);

  const handlePaginationChange = ({ currentPage, rowsPerPage }: { currentPage: number; rowsPerPage: number }) => {
    setPagination({ currentPage, rowsPerPage });
    getRoles({ currentPage, rowsPerPage }, searchText);
  };

  const handleOnTableChange = (_p: any, _f: any, sorter: { order: string; field: string; columnKey: string; }) => {
    const { order, field, columnKey } = sorter;
    const { sortKey, sortDirection } = createSortObject(field || columnKey, order);

    if (!sortDirection) {
      return setSortOptions({});
    }

    return setSortOptions({ [sortKey]: sortDirection });
  };

  const handleRequestUserRoleRequest = ({
    roleId,
    requestReason,
    timeLimit,
    durationType,
    durationDays,
    endDate,
  }: { roleId: MongoIDType } & Partial<Omit<RoleRequestType, '_id'>>) => {
    if (roleId && requestReason) {
      dispatch(Creators.requestRoleRequest({
        roleId,
        requestReason,
        timeLimit,
        durationType,
        durationDays,
        endDate,
      }));
      AnalyticsService.track(PANEL_EVENTS.ROLE_LIST.EVENT_NAME.BUTTON, { method: PANEL_EVENTS.ROLE_LIST.BUTTON.SEND_REQUEST });
      setShowRoleRequestModal(false);
    }
  };

  const openTeammatesModal = (role: Role | null) => {
    setShowTeammatesRole(role);
    AnalyticsService.track(PANEL_EVENTS.ROLE_LIST.EVENT_NAME.BUTTON, { method: PANEL_EVENTS.ROLE_LIST.BUTTON.DISPLAY_TEAMMATE });
  };

  const columns = useMemo(() => {
    return tableColumns(getLangKey(), {
      hasAccessToRoleDetailPage,
      userId,
      userRoleIds: user.roles,
      openRoleRequestModal,
      openTeammatesModal,
      roleRequests,
    });
  }, [hasAccessToRoleDetailPage, userId, user.roles, openRoleRequestModal, roleRequests]);

  return (
    <>
      <Modal
        key="UserRoleRequestModal"
        title={requestedRoleName}
        visible={showRoleRequestModal}
        onCancel={() => {
          setShowRoleRequestModal(false);
        }}
        okText={t('SEND_REQUEST')}
        footer={(
          <>
            <Button
              onClick={() => setShowRoleRequestModal(false)}
            >{t('CANCEL')}
            </Button>
            <Button key="userRoleSendRequest" type="primary" form="user-role-request" htmlType="submit">{t('SEND_REQUEST')}</Button>
          </>
        )}
        destroyOnClose
      >
        <UserRoleRequestModalContent onRequestUserRoleRequest={handleRequestUserRoleRequest} role={{ _id: requestedRoleId }} />
      </Modal>
      <Modal
        key="RoleTeammatesModal"
        title={showTeammatesRole?.name}
        visible={showTeammatesRole != null}
        onCancel={() => {
          setShowTeammatesRole(null);
        }}
        bodyStyle={{ padding: 0 }}
        footer={false}
        destroyOnClose
      >
        <AntTableV2
          bordered
          data={showTeammatesRole?.queryUsers}
          columns={[{
            title: t('global:EMAIL'),
            dataIndex: 'email',
            key: 'email',
          },
          {
            title: t('global:NAME'),
            dataIndex: 'name',
            key: 'name',
            sorter: (a: QueryUser, b: QueryUser) => a.name.localeCompare(b.name),
            defaultSortOrder: 'ascend',
          }]}
          loading={showTeammatesRole == null}
        />
      </Modal>
      <AntTableV2
        bordered
        data={roles}
        columns={columns}
        loading={rolesArePending || roleRequestsArePending}
        pagination={pagination}
        onPaginationChange={handlePaginationChange}
        className={classes.table}
        onChange={handleOnTableChange}
      />
    </>
  );
};

export default TeammateRoles;
