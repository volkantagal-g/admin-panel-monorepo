import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import moment from 'moment';

import usePageViewAnalytics from '@shared/hooks/usePageViewAnalytics';
import { ROUTE } from '@app/routes';
import Header from './components/Header';
import Filter from './components/Filter';
import { useInjectReducer } from '@shared/utils/injectReducer';
import { useInjectSaga } from '@shared/utils/injectSaga';
import reducer from './redux/reducer';
import saga from './redux/saga';
import { Creators } from './redux/actions';
import { REDUX_KEY } from '@shared/shared/constants';
import { useInitAndDestroyPage } from '@shared/hooks';
import TimesheetDetails from '@app/pages/TimesheetLogs/components/Details';
import Table from './components/Table';

const reduxKey = REDUX_KEY.TIMESHEET_LOGS;

const TimesheetLogsPage = () => {
  usePageViewAnalytics({
    name: ROUTE.WORKFORCE_EMPLOYEE_TIMESHEET_LOGS.name,
    squad: ROUTE.WORKFORCE_EMPLOYEE_TIMESHEET_LOGS.squad,
  });

  const { t } = useTranslation('timesheetLogs');

  const dispatch = useDispatch();
  useInjectReducer({ key: reduxKey, reducer });
  useInjectSaga({ key: reduxKey, saga });
  useInitAndDestroyPage({ dispatch, Creators });

  const [filters, setFilters] = useState({
    dateRange: [moment().startOf('week'), moment().endOf('week')],
    personId: null,
  });
  const [pagination, setPagination] = useState({
    currentPage: 1,
    rowsPerPage: 10,
  });
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedTimesheetLog, setSelectedTimesheetLog] = useState(null);

  const handleSubmit = () => {
    const startDate = moment(filters.dateRange[0]).startOf('day').toISOString();
    const endDate = moment(filters.dateRange[1]).endOf('day').toISOString();
    dispatch(Creators.getTimesheetLogsRequest({ ...filters, ...pagination, startDate, endDate }));
  };

  const handlePaginationChange = ({ currentPage, rowsPerPage }) => {
    setPagination({ currentPage, rowsPerPage });
    if (filters.personId) {
      const startDate = moment(filters.dateRange[0]).startOf('day').toISOString();
      const endDate = moment(filters.dateRange[1]).endOf('day').toISOString();
      dispatch(Creators.getTimesheetLogsRequest({ ...filters, currentPage, rowsPerPage, startDate, endDate }));
    }
  };

  const onHandleDetails = rowData => {
    const { oldData, newData, date } = rowData.data;
    setIsModalVisible(true);
    setSelectedTimesheetLog({
      oldData: { ...oldData, date, compareData: newData, isOld: true },
      newData: { ...newData, date, compareData: oldData, isOld: false },
    });
  };

  useEffect(() => {
    dispatch(Creators.getWarehousesRequest());
    dispatch(Creators.getLeaveTypesRequest());
  }, [dispatch]);

  return (
    <div>
      <Header />
      <Filter filters={filters} setFilters={setFilters} handleSubmit={handleSubmit} />
      <Table pagination={pagination} handlePaginationChange={handlePaginationChange} onHandleDetails={onHandleDetails} />
      <TimesheetDetails
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        selectedTimesheetLog={selectedTimesheetLog}
        t={t}
      />
    </div>
  );
};

export default TimesheetLogsPage;
