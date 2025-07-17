import { useRef } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import AntTableV2 from '@shared/components/UI/AntTableV2';
import { isScreenSizeLarge } from '@shared/utils/common';
import { createSortObject } from '@shared/utils/table';

import { getTableColumns } from './tableConfigs';
import { IPagination, ISortingObject } from '../../../constants';
import useStyles from '../../../styles';
import {
  filtersSelector,
  officeAttendanceTrackingTableSelector,
} from '../../redux/selectors';

type PropsTypes = {
  onPaginationChange: (inputs: IPagination) => void;
  onTableSortChange: (inputs: ISortingObject) => void;
  pagination: IPagination;
};

const EmployeeOfficeAttendanceTrackingDashboardTable = ({ onPaginationChange, onTableSortChange, pagination }: PropsTypes) => {
  const { t } = useTranslation(['officeAttendanceTracking', 'employeePage', 'global']);
  const tableRef = useRef(null);
  const isLargeScreen = isScreenSizeLarge();
  const classes = useStyles();
  const tableHeightDiff: number = isLargeScreen ? 358 : 338;

  const { data, totalCount } = useSelector(officeAttendanceTrackingTableSelector.getFilteredAndPaginatedData);
  const isLoading = useSelector(officeAttendanceTrackingTableSelector.getIsLoading);
  const isSingleDay = useSelector(filtersSelector.getIsSingleDay);

  const handlePaginationChange = (newPagination: IPagination): void => {
    onPaginationChange(newPagination);

    // when I use isScrollableToTop parameter, the scroll lagging, so I applied a special solution.
    // @ts-ignore
    const antBody = tableRef.current?.getElementsByClassName('ant-table-body')?.[0];
    if (antBody?.scrollTop) {
      antBody.scrollTop = 0;
    }
  };

  const handleOnChange = (_paginationData: any, _filters: any, sorter: { order: string, field: string, columnKey: string }) => {
    const { order, field, columnKey } = sorter;
    const { sortKey, sortDirection } = createSortObject(field || columnKey, order);
    const sortObj: ISortingObject = {
      // @ts-ignore
      sortKey,
      sortDirection,
    };

    onTableSortChange(sortObj);
  };

  return (
    <div ref={tableRef} className="w-100">
      <AntTableV2
        data={data}
        total={totalCount}
        columns={getTableColumns({ t, classes, isLargeScreen, isSingleDay, pagination, totalCount })}
        loading={isLoading}
        onPaginationChange={handlePaginationChange}
        pagination={pagination}
        className={classes.commonTableContainer}
        onChange={handleOnChange}
        isScrollableToTop={false}
        scroll={{
          y: `calc(100vh - ${tableHeightDiff}px)`,
          x: 'max-content',
        }}
      />
    </div>
  );
};

export default EmployeeOfficeAttendanceTrackingDashboardTable;
