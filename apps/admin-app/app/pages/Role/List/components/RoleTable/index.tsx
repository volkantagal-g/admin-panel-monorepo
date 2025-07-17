import { useEffect, useState, useCallback, useMemo, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Modal, Button } from 'antd';
import { get, isEmpty, isEqual } from 'lodash';

import { createSortObject } from '@shared/utils/table';
import { tableColumns } from './config';
import AntTableV2 from '@shared/components/UI/AntTableV2';
import { getLimitAndOffset } from '@shared/utils/common';
import { Creators as CommonCreators } from '@shared/redux/actions/common';
import AnalyticsService from '@shared/services/analytics';
import { Creators } from '../../redux/actions';
import { userRoleRequestsSelector } from '../../redux/selectors';
import { getUser } from '@shared/redux/selectors/auth';
import { getRolesSelector } from '@shared/redux/selectors/common';
import { getLangKey } from '@shared/i18n';
import { DEFAULT_DEBOUNCE_MS, ROLE_LIST_TAB_PANE_KEY } from '@shared/shared/constants';
import { PANEL_EVENTS } from '@shared/shared/analyticsConstants';
import { usePermission } from '@shared/hooks';
import permKey from '@shared/shared/permKey.json';
import useDebouncedCallback from '@shared/hooks/useDebouncedCallback';
import useStyles from './styles';
import UserRoleRequestModalContent from '../../../components/UserRoleRequestModalContent';

const EMPTY_ARRAY = [] as const;

type RoleListTableProps = {
  searchText: string | undefined;
  // one of ROLE_LIST_TAB_PANE_KEY
  tabKey: typeof ROLE_LIST_TAB_PANE_KEY[keyof typeof ROLE_LIST_TAB_PANE_KEY]
};

const RoleListTable = ({ searchText, tabKey }: RoleListTableProps) => {
  const { t } = useTranslation('rolePage');
  const { canAccess } = usePermission();
  const dispatch = useDispatch();
  const classes = useStyles();
  const roles = useSelector<any, Array<RoleType>>(getRolesSelector.getData);
  const rolesArePending = useSelector(getRolesSelector.getIsPending);

  const roleRequests = useSelector(userRoleRequestsSelector.getData);
  const roleRequestsArePending = useSelector(userRoleRequestsSelector.getIsPending);

  const [showRoleRequestModal, setShowRoleRequestModal] = useState(false);
  const [requestedRoleId, setRequestedRoleId] = useState('');
  const openRoleRequestModal = useCallback(roleId => () => {
    setShowRoleRequestModal(true);
    AnalyticsService.track(PANEL_EVENTS.ROLE_LIST.EVENT_NAME.BUTTON, { method: PANEL_EVENTS.ROLE_LIST.BUTTON.ALL_ROLES_JOIN_ROLE });
    setRequestedRoleId(roleId);
  }, []);
  const requestedRoleName = (!rolesArePending && requestedRoleId) ? roles.find(r => r._id === requestedRoleId)?.name : '';

  const [pagination, setPagination] = useState({ currentPage: 1, rowsPerPage: 10 });
  const [sortOptions, setSortOptions] = useState({});
  const hasAccessToRoleDetailPage = canAccess(permKey.PAGE_ROLE_DETAIL);
  const user = getUser();
  const userId = get(user, '_id');

  const prevUserRoles = useRef(user.roles);

  // reading user from localstorage creates new object everytime, we should avoid that
  const [roleIdsToFetch, userRoleIds] = useMemo(() => {
    const userRolesChanged = !isEqual(prevUserRoles.current, user.roles);
    if (userRolesChanged) {
      prevUserRoles.current = user.roles;
    }
    if (tabKey === ROLE_LIST_TAB_PANE_KEY.MY_ROLES) {
      return [prevUserRoles.current, prevUserRoles.current];
    }
    // if we are listing all roles, we should fetch all roles, so empty array for that
    // and keep reference same by using same empty array
    // All of this due to bad getUser usage
    return [EMPTY_ARRAY, prevUserRoles.current];
  }, [tabKey, user.roles]);

  const getRoles = useCallback((_pagination, _searchText, roleIds) => {
    const params = {
      ...getLimitAndOffset(_pagination),
      queryText: _searchText,
      roleIds,
      isActive: _searchText ? undefined : true,
      sortOptions: !isEmpty(sortOptions) ? sortOptions : undefined,
    };

    dispatch(CommonCreators.getRolesRequest(params));
  }, [dispatch, sortOptions]);

  const handleSearch = useCallback(searchTextLocal => {
    setPagination({ currentPage: 1, rowsPerPage: 10 });
    getRoles({ currentPage: 1, rowsPerPage: 10 }, searchTextLocal, roleIdsToFetch);
  }, [getRoles, roleIdsToFetch]);

  const { debouncedCallback: handleDebouncedSearch } = useDebouncedCallback({ callback: handleSearch, delay: DEFAULT_DEBOUNCE_MS });

  useEffect(() => {
    handleDebouncedSearch(searchText);
  }, [handleDebouncedSearch, searchText, tabKey, roleIdsToFetch]);

  useEffect(() => {
    if (tabKey !== ROLE_LIST_TAB_PANE_KEY.ALL_ROLES) return;
    dispatch(Creators.getUserRoleRequestsRequest());
  }, [dispatch, tabKey]);

  const handlePaginationChange = ({ currentPage, rowsPerPage }: { currentPage: number; rowsPerPage: number }) => {
    setPagination({ currentPage, rowsPerPage });
    getRoles({ currentPage, rowsPerPage }, searchText, roleIdsToFetch);
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

  const columns = useMemo(() => {
    return tableColumns(getLangKey(), {
      hasAccessToRoleDetailPage,
      userId,
      userRoleIds,
      openRoleRequestModal,
      roleRequests,
    });
  }, [hasAccessToRoleDetailPage, userId, userRoleIds, openRoleRequestModal, roleRequests]);

  const handleOnTableChange = (_p: any, _f: any, sorter: { order: string; field: string; columnKey: string; }) => {
    const { order, field, columnKey } = sorter;
    const { sortKey, sortDirection } = createSortObject(field || columnKey, order);

    if (!sortDirection) {
      return setSortOptions({});
    }

    return setSortOptions({ [sortKey]: sortDirection });
  };

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

export default RoleListTable;
