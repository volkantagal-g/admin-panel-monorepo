import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Divider } from 'antd';

import { Creators } from '../../redux/actions';
import {
  filtersSelector,
  officeAttendanceTrackingGetStatisticDailyStatsSummarySelector,
} from '../../redux/selectors';

import CommonFilters from '../CommonFilters';
import Stats from '../Stats';
import TableFilters from '../TableFilters/index';
import { TableFiltersType } from '../../d';
import Table from '../Table/index';
import { IPagination, initialTablePagination, ISortingObject } from '../../../constants';

const EmployeeOfficeAttendanceTrackingDashboard = () => {
  const dispatch = useDispatch();

  const isSingleDay: boolean = useSelector(filtersSelector.getIsSingleDay);
  const isToday: boolean = useSelector(filtersSelector.getIsToday);
  const tablePagination: IPagination = useSelector(filtersSelector.getTablePagination);

  const officeAttendanceTrackingGetStatisticDailyStatsSummaryData = useSelector(officeAttendanceTrackingGetStatisticDailyStatsSummarySelector.getData);

  const sendSummaryRequest = () => {
    dispatch(Creators.getOfficeAttendanceTrackingGetStatisticDailyStatsSummaryRequest());
  };

  const sendRequests = ({ isSingleDayOverride, isSendSummaryRequest = false }: {
    isSendSummaryRequest: boolean,
    isSingleDayOverride?: boolean | undefined
  }): void => {
    if (isSendSummaryRequest) {
      sendSummaryRequest();
    }

    const _isSingleDay: boolean = isSingleDayOverride === undefined ? isSingleDay : isSingleDayOverride;
    if (_isSingleDay) {
      dispatch(Creators.getOfficeAttendanceTrackingSingleDayRecordsRequest());
    }
    else {
      dispatch(Creators.getOfficeAttendanceTrackingMultipleDayRecordsRequest());
    }
  };

  const handleCommonFiltersChange = ({ newIsSingleDay, changedField }: { newIsSingleDay: boolean, changedField: string }): void => {
    // Business Unit and Department Filters are moved to frontend side.
    // No need to send request if these filters are applied.
    if (!(['businessUnit', 'department'].includes(changedField))) {
      sendRequests({ isSingleDayOverride: newIsSingleDay, isSendSummaryRequest: true });
    }
    else {
      sendSummaryRequest();
    }
  };

  const handleTableFiltersChange = (newTableFilters: TableFiltersType) => {
    dispatch(Creators.setFilters({ filters: { tableFilters: newTableFilters, tablePagination: initialTablePagination } }));
  };

  const handleTableFiltersSubmit = () => {
    dispatch(Creators.setFilters({ filters: { tablePagination: initialTablePagination } }));
  };

  const handleTablePaginationChange = (newPagination: IPagination) => {
    dispatch(Creators.setFilters({ filters: { tablePagination: newPagination } }));
  };

  const handleTableSortChange = (sortObj: ISortingObject) => {
    dispatch(Creators.setFilters({ filters: { sort: sortObj } }));
  };

  useEffect(() => {
    dispatch(Creators.setFilters({ filters: { tablePagination: initialTablePagination } }));
    dispatch(Creators.getOfficeAttendanceTrackingGetStatisticDailyStatsSummaryRequest());
    dispatch(Creators.getOfficeAttendanceTrackingSingleDayRecordsRequest());
  }, [dispatch]);

  return (
    <>
      <div className="w-100">
        <CommonFilters
          onChange={handleCommonFiltersChange}
        />
      </div>
      <Divider className="m-2" />
      <Stats
        isSingleDay={isSingleDay}
        isToday={isToday}
        data={officeAttendanceTrackingGetStatisticDailyStatsSummaryData}
      />
      <Divider className="m-2" />
      <div className="w-100">
        <TableFilters
          isSingleDay={isSingleDay}
          onSubmit={handleTableFiltersSubmit}
          onChange={handleTableFiltersChange}
        />
      </div>
      <Divider className="m-2" />
      <Table
        pagination={tablePagination}
        onPaginationChange={handleTablePaginationChange}
        onTableSortChange={handleTableSortChange}
      />
    </>
  );
};

export default EmployeeOfficeAttendanceTrackingDashboard;
