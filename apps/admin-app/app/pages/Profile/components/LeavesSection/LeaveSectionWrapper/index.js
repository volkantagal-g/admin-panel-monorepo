import { useCallback, useEffect, useRef, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Card, Tooltip } from 'antd';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { InfoCircleTwoTone } from '@ant-design/icons';

import { isMobile } from '@shared/utils/common';
import theme from '@shared/jssTheme';
import { getUser } from '@shared/redux/selectors/auth';
import PermitMyTeamTable from '../PermitMyTeamTable';
import { Creators } from '../../../redux/actions';
import {
  actionButtonSelector,
  employeesForManagerSelector,
  getPermitHistorySelector,
  permitRequestsForSupervisorSelector,
  getUsedAndVestedPermitCountsSelector,
  getPermitInfoOfManagersTeamSelector,
} from '../../../redux/selectors';
import ManagerTable from '../ManagerTable';
import { EMPLOYEE_HOME_PAGE_LEAVE_SECTION_TABS } from '../constants';
import MyLeaveTable from '../MyLeaveTable';

const LeaveSectionWrapper = ({ onPermitDetailClick }) => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const view = searchParams.get('view') ?? EMPLOYEE_HOME_PAGE_LEAVE_SECTION_TABS.MY_LEAVES_TAB;
  const status = searchParams.get('status') || undefined;
  const { t } = useTranslation(['employeePage', 'global']);
  const permitRequestsData = useSelector(permitRequestsForSupervisorSelector.getData);
  const permitHistoryData = useSelector(getPermitHistorySelector.getData);
  const employeesForManager = useSelector(employeesForManagerSelector.getData);
  const permitInfoOfManagersTeam = useSelector(getPermitInfoOfManagersTeamSelector.getData);
  const permitRequestsForSupervisorFilters = useSelector(permitRequestsForSupervisorSelector.getFilters);
  const permitHistoryFilters = useSelector(getPermitHistorySelector.getFilters);
  const paginationData = useSelector(permitRequestsForSupervisorSelector.getPaginationData);
  const historyPaginationData = useSelector(getPermitHistorySelector.getPaginationData);
  const usedAndVestedPermitCounts = useSelector(getUsedAndVestedPermitCountsSelector.getData);
  const isUsedAndVestedPermitCountsPending = useSelector(getUsedAndVestedPermitCountsSelector.getIsPending);
  const employeeId = getUser()?.employee?._id;
  const isFirst = useRef(true);
  const isActionResultPending = useSelector(actionButtonSelector.getIsPending);

  const handleTabChange = currentTab => {
    searchParams.set('view', currentTab);
    const filters = currentTab === EMPLOYEE_HOME_PAGE_LEAVE_SECTION_TABS.MANAGER_VIEW_TAB ? permitRequestsForSupervisorFilters : permitHistoryFilters;
    if (filters?.status) {
      searchParams.set('status', filters.status.join(','));
    }
    else {
      searchParams.delete('status');
    }

    if (currentTab === EMPLOYEE_HOME_PAGE_LEAVE_SECTION_TABS.MANAGER_VIEW_TAB) {
      dispatch(Creators.setFiltersForPermitRequestsForSupervisor({ filters }));
      dispatch(Creators.getPermitRequestsForSupervisorRequest({ filters, limit: paginationData?.limit }));
    }
    else if (currentTab === EMPLOYEE_HOME_PAGE_LEAVE_SECTION_TABS.MY_TEAM_TAB) {
      dispatch(Creators.getPermitInfoOfManagersTeamRequest());
    }
    else {
      dispatch(Creators.setFiltersForPermitHistory({ filters }));
      dispatch(Creators.getPermitHistoryRequest({ filters, limit: historyPaginationData?.limit }));
    }
    setSearchParams(searchParams);
  };

  const memoizedHandleApproveBtnClick = useCallback(permitId => {
    dispatch(Creators.approvePermitRequest({ permitId }));
    dispatch(Creators.resetActionButton());
  }, [dispatch]);

  const memoizedHandleRejectBtnClick = useCallback(permitId => {
    dispatch(Creators.rejectPermitRequest({ permitId }));
    dispatch(Creators.resetActionButton());
  }, [dispatch]);

  const tabList = [
    {
      key: EMPLOYEE_HOME_PAGE_LEAVE_SECTION_TABS.MY_LEAVES_TAB,
      tab: t('MY_LEAVES'),
    },
  ];

  if (employeesForManager?.length) {
    tabList.push(
      {
        key: EMPLOYEE_HOME_PAGE_LEAVE_SECTION_TABS.MANAGER_VIEW_TAB,
        tab: t('MANAGER_VIEW'),
      },
    );
  }

  if (permitInfoOfManagersTeam?.length) {
    tabList.push({
      key: EMPLOYEE_HOME_PAGE_LEAVE_SECTION_TABS.MY_TEAM_TAB,
      tab: t('MY_TEAM'),
    });
  }

  const contentMap = {
    [EMPLOYEE_HOME_PAGE_LEAVE_SECTION_TABS.MY_LEAVES_TAB]: <MyLeaveTable onPermitDetailClick={onPermitDetailClick} />,
    [EMPLOYEE_HOME_PAGE_LEAVE_SECTION_TABS.MY_TEAM_TAB]: <PermitMyTeamTable />,
    [EMPLOYEE_HOME_PAGE_LEAVE_SECTION_TABS.MANAGER_VIEW_TAB]: <ManagerTable
      onPermitDetailClick={onPermitDetailClick}
      onApproveBtnClick={memoizedHandleApproveBtnClick}
      onRejectBtnClick={memoizedHandleRejectBtnClick}
      isActionResultPending={isActionResultPending}
    />,
  };

  useEffect(() => {
    if (isFirst.current) {
      if (!permitHistoryData?.length) {
        dispatch(Creators.getUsedAndVestedPermitCountsRequest({}));
        dispatch(Creators.getPermitHistoryRequest({}));
      }

      if (!permitRequestsData?.length) {
        dispatch(Creators.getPermitRequestsForSupervisorRequest({}));
        dispatch(Creators.getEmployeesOfManagerRequest({ employeeId }));
      }
      if (!permitInfoOfManagersTeam?.length) {
        dispatch(Creators.getPermitInfoOfManagersTeamRequest());
      }
      const filtersData = view === EMPLOYEE_HOME_PAGE_LEAVE_SECTION_TABS.MANAGER_VIEW_TAB ? permitRequestsForSupervisorFilters : permitHistoryFilters;
      if (status && status?.toString() !== filtersData?.status?.toString()) {
        const filters = { ...filtersData, status: status.split(',') };
        if (view === EMPLOYEE_HOME_PAGE_LEAVE_SECTION_TABS.MANAGER_VIEW_TAB) {
          dispatch(Creators.setFiltersForPermitRequestsForSupervisor({ filters }));
          dispatch(Creators.getPermitRequestsForSupervisorRequest({ filters, limit: paginationData?.limit }));
        }
        else {
          dispatch(Creators.setFiltersForPermitHistory({ filters }));
          dispatch(Creators.getPermitHistoryRequest({ filters, limit: historyPaginationData?.limit }));
        }
      }
    }
    return () => {
      isFirst.current = false;
    };
  }, [
    dispatch,
    permitHistoryData,
    permitRequestsData,
    view,
    status,
    permitRequestsForSupervisorFilters,
    permitHistoryFilters,
    paginationData,
    historyPaginationData,
    employeeId,
    permitInfoOfManagersTeam,
  ]);

  const tabBarExtraContent = useMemo(() => {
    return (
      <div className={`${isMobile() ? 'd-block' : 'd-flex'} align-items-center`}>
        <div>
          {!isUsedAndVestedPermitCountsPending && usedAndVestedPermitCounts && view === EMPLOYEE_HOME_PAGE_LEAVE_SECTION_TABS.MY_LEAVES_TAB && (
            <>
              {
                usedAndVestedPermitCounts.shouldShowVestedDays && (
                  <span className="pr-1">{t('employeePage:VESTED_PERMIT_DAYS')}: {usedAndVestedPermitCounts.vested || 0} </span>
                )
              }
              <span className="pr-1">{t('employeePage:USED_PERMIT_DAYS')}: {usedAndVestedPermitCounts.used || 0} </span>
              {
                usedAndVestedPermitCounts.shouldShowVestedDays && (
                  <>
                    <span className="pr-2">
                      {`${t('employeePage:REMAINING_PERMIT_DAYS')}`}: {(usedAndVestedPermitCounts.vested || 0) - (usedAndVestedPermitCounts.used || 0)}
                    </span>
                    <Tooltip title={t('employeePage:VESTED_PERMIT_DAYS_WARNING_TOOLTIP')}>
                      <InfoCircleTwoTone twoToneColor={theme.color.status.warning} className="pr-2" />
                    </Tooltip>
                  </>
                )
              }
            </>
          )}
        </div>
      </div>
    );
  }, [isUsedAndVestedPermitCountsPending, usedAndVestedPermitCounts, view, t]);

  return (
    <Card
      tabList={tabList}
      activeTabKey={view}
      tabBarExtraContent={tabBarExtraContent}
      onTabChange={key => {
        handleTabChange(key);
      }}
      headStyle={{ paddingRight: 10, paddingLeft: 10 }}
      bodyStyle={{ padding: 10 }}
    >
      {contentMap[view]}
    </Card>
  );
};

export default LeaveSectionWrapper;
