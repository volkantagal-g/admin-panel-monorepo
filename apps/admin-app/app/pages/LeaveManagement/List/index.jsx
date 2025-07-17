import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { Collapse, PageHeader } from 'antd';

import { useState } from 'react';

import { useInitAndDestroyPage } from '@shared/hooks';
import { useInjectReducer } from '@shared/utils/injectReducer';
import { useInjectSaga } from '@shared/utils/injectSaga';
import { EMPLOYEE_LEAVE_STATUSES, REDUX_KEY } from '@shared/shared/constants';
import { ROUTE } from '@app/routes';
import usePageViewAnalytics from '@shared/hooks/usePageViewAnalytics';
import PageTitleHeader from '@shared/components/UI/PageTitleHeader';

import Filter from './components/Filter';
import Table from './components/Table';
import { Creators } from '../redux/actions';
import saga from '../redux/saga';
import reducer from '../redux/reducer';

const reduxKey = REDUX_KEY.WORKFORCE_EMPLOYEE_LEAVE_MANAGEMENT;

const initialFilters = {
  date: [],
  franchiseId: undefined,
};

const leaveStatuses = [
  EMPLOYEE_LEAVE_STATUSES.PENDING,
  EMPLOYEE_LEAVE_STATUSES.PENDING_DOCUMENT,
  EMPLOYEE_LEAVE_STATUSES.APPROVED,
  EMPLOYEE_LEAVE_STATUSES.DECLINED,
  EMPLOYEE_LEAVE_STATUSES.CANCELED,
];

const EmployeeLeaveRequestsPage = () => {
  const { t } = useTranslation(['global', 'leaveManagement']);
  const dispatch = useDispatch();
  const { name, squad } = ROUTE.WORKFORCE_EMPLOYEE_LEAVE_MANAGEMENT_LIST;
  usePageViewAnalytics({ name, squad });

  useInjectReducer({ key: reduxKey, reducer });
  useInjectSaga({ key: reduxKey, saga });
  useInitAndDestroyPage({ dispatch, Creators });

  const [filters, setFilters] = useState(initialFilters);
  const [isFiltersDisabled, setFiltersDisabled] = useState(false);

  return (
    <>
      <PageTitleHeader title={t('global:PAGE_TITLE.LEAVE_MANAGEMENT.LIST')} />
      <PageHeader
        className="p-0 page-title"
        title={t('global:PAGE_TITLE.LEAVE_MANAGEMENT.LIST')}
      />
      <Filter
        filters={filters}
        onSubmit={setFilters}
        isDisabled={isFiltersDisabled}
      />
      <Collapse defaultActiveKey={leaveStatuses} accordion>
        {leaveStatuses.map(st => (
          <Collapse.Panel
            header={t(`leaveManagement:LEAVE_STATUSES.${st}`)}
            key={st}
          >
            <Table
              key={st}
              status={st}
              filters={filters}
              isStatusWaitingForResponse={
                st === EMPLOYEE_LEAVE_STATUSES.PENDING
              }
              setFiltersDisabled={setFiltersDisabled}
            />
          </Collapse.Panel>
        ))}
      </Collapse>
    </>
  );
};

export default EmployeeLeaveRequestsPage;
