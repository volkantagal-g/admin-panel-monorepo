import { useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Col, Row } from 'antd';

import { useInitAndDestroyPage } from '@shared/hooks';
import { useInjectReducer } from '@shared/utils/injectReducer';
import { useInjectSaga } from '@shared/utils/injectSaga';
import { REDUX_KEY } from '@shared/shared/constants';
import { ROUTE } from '@app/routes';
import { removeNullOrUndefinedDeep, getLimitAndOffset, isMobile } from '@shared/utils/common';
import usePageViewAnalytics from '@shared/hooks/usePageViewAnalytics';
import PageTitleHeader from '@shared/components/UI/PageTitleHeader';

import { Creators } from './redux/actions';
import saga from './redux/saga';
import reducer from './redux/reducer';
import { officeAttendanceTrackingEmployeeAttendanceSelector } from './redux/selectors';

import Filters from './components/Filters';
import EmployeeInfoTable from './components/EmployeeInfoTable';
import EmployeeAttendanceTable from './components/EmployeeAttendanceTable';
import EmployeeStatistics from './components/EmployeeStatistics';
import useStyles from './styles';
import { DEFAULT_PAGE, DEFAULT_ROWS_PER_PAGE } from '@app/pages/Employee/OfficeAttendanceTracking/EmployeeTransactions/constants';

const reduxKey = REDUX_KEY.EMPLOYEE.OFFICE_ATTENDANCE_TRACKING.EMPLOYEE_TRANSACTIONS;

const EmployeeTransactionsPage = () => {
  const { t } = useTranslation(['global']);
  const className = useStyles();
  const { employeeId } = useParams();
  const dispatch = useDispatch();
  const isDeviceMobile = isMobile();

  usePageViewAnalytics({
    name: ROUTE.EMPLOYEE_OFFICE_ATTENDANCE_TRACKING_EMPLOYEE_TRANSACTIONS.name,
    squad: ROUTE.EMPLOYEE_OFFICE_ATTENDANCE_TRACKING_EMPLOYEE_TRANSACTIONS.squad,
  });

  useInjectReducer({ key: reduxKey, reducer });
  useInjectSaga({ key: reduxKey, saga });
  useInitAndDestroyPage({ dispatch, Creators });

  const filters = useSelector(officeAttendanceTrackingEmployeeAttendanceSelector.getFilters);
  const pagination = useSelector(officeAttendanceTrackingEmployeeAttendanceSelector.getPagination);

  const sendRequest = useCallback(({ isSendSummaryRequest = false, currentPagination }) => {
    if (isSendSummaryRequest) {
      dispatch(Creators.getOfficeAttendanceTrackingEmployeeSummaryRequest({
        body: {
          ...removeNullOrUndefinedDeep({
            employeeId,
            ...filters,
          }),
        },
      }));
    }

    dispatch(Creators.getOfficeAttendanceTrackingEmployeeDailyStatsRequest({
      body: {
        ...removeNullOrUndefinedDeep({
          employeeId,
          ...filters,
          ...getLimitAndOffset(currentPagination),
        }),
      },
    }));
    dispatch(Creators.getOfficeAttendanceTrackingEmployeeTransactionsRequest({
      body: {
        ...removeNullOrUndefinedDeep({
          employeeId,
          ...filters,
        }),
      },
    }));
  }, [dispatch, employeeId, filters]);

  // Did this to prevent useEffect firing after pagination change, we already handle that handleOnPaginationChange
  // TODO: Similarly, fix the below useEffect, send the requests when filters change on their handlers
  const rowsPerPageRef = useRef(pagination?.rowsPerPage);
  rowsPerPageRef.current = pagination?.rowsPerPage;

  useEffect(() => {
    if (employeeId && filters) {
      const currentPagination = {
        currentPage: DEFAULT_PAGE,
        rowsPerPage: rowsPerPageRef.current || DEFAULT_ROWS_PER_PAGE,
      };

      dispatch(Creators.setPagination(currentPagination));
      sendRequest({ isSendSummaryRequest: true, currentPagination });
    }
  }, [dispatch, filters, employeeId, sendRequest]);

  return (
    <div className={className.wrapper}>
      <PageTitleHeader title={t('global:PAGE_TITLE.EMPLOYEE.OFFICE_ATTENDANCE_TRACKING.EMPLOYEE_TRANSACTIONS')} />
      {isDeviceMobile && (
        <Helmet>
          <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
        </Helmet>
      )}
      <Filters />
      <Row gutter={[8, 8]}>
        <Col xs={24} sm={21}>
          <EmployeeInfoTable />
        </Col>
        <Col xs={24} sm={3}>
          <EmployeeStatistics />
        </Col>
      </Row>
      <EmployeeAttendanceTable
        pagination={pagination}
        onPaginationChange={handleOnPaginationChange}
        onTableSortChange={handleTableSortOnChange}
      />
    </div>
  );

  function handleOnPaginationChange({ currentPage, rowsPerPage }) {
    const currentPagination = { currentPage, rowsPerPage };

    dispatch(Creators.setPagination(currentPagination));
    sendRequest({ isSendSummaryRequest: false, currentPagination });
  }

  function handleTableSortOnChange(sortObj) {
    dispatch(Creators.setSorter({ sort: sortObj }));
  }
};

export default EmployeeTransactionsPage;
