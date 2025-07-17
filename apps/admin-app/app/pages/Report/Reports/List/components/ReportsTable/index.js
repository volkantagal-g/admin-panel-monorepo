import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';

import AntTableV2 from '@shared/components/UI/AntTableV2';
import { Creators } from '../../redux/actions';
import { getFiltersSelector, getMyReports } from '../../redux/selectors';
import { getColumns } from './config';
import useStyles from './styles';
import { INITIAL_CURSOR, ROWS_PER_PAGE, getFormattedRequestData } from '../../utils';

const TOTAL_RECORDS = 10_000;
const INIT_PAGINATION_CONFIG = { currentPage: 1, rowsPerPage: ROWS_PER_PAGE };

export default function ReportsTable() {
  const dispatch = useDispatch();
  const { t } = useTranslation('reportsPage');
  const classes = useStyles();
  const myReports = useSelector(getMyReports.getData);
  const myReportsPending = useSelector(getMyReports.getIsPending);
  const filters = useSelector(getFiltersSelector);
  const pagination = useSelector(getMyReports.getPagination);
  const [tablePagination, setTablePagination] = useState(INIT_PAGINATION_CONFIG);
  const columns = useMemo(() => getColumns(t, tablePagination), [t, tablePagination]);

  const onPaginationChange = ({ currentPage, rowsPerPage }) => {
    // determine if forward or backward pagination
    if (currentPage > tablePagination.currentPage) {
      const data = getFormattedRequestData(filters.dateRange, filters.isOnlyMyReports, pagination.next, rowsPerPage);
      dispatch(Creators.getMyReportsRequest({ data }));
    }
    else if (currentPage < tablePagination.currentPage) {
      const data = getFormattedRequestData(filters.dateRange, filters.isOnlyMyReports, pagination.prev, rowsPerPage);
      dispatch(Creators.getMyReportsRequest({ data }));
    }
    else {
      // same page, limit/rowsPerPage changed, reset the page number as well
      const data = getFormattedRequestData(filters.dateRange, filters.isOnlyMyReports, INITIAL_CURSOR, rowsPerPage);
      dispatch(Creators.getMyReportsRequest({ data }));
    }

    setTablePagination({ currentPage, rowsPerPage });
  };

  const total = pagination.next ? TOTAL_RECORDS : (tablePagination.currentPage - 1) * tablePagination.rowsPerPage + myReports.length;

  return (
    <div>
      <AntTableV2
        columns={columns}
        data={myReports}
        loading={myReportsPending}
        pagination={tablePagination}
        total={total}
        onPaginationChange={onPaginationChange}
        className={classes.antTable}
      />
    </div>
  );
}
