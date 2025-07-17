import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Row } from 'antd';

import FeedbackAnalysis from '../Analysis';
import Header from '../Header';
import Filter from '../Filter';
import FeedbackTable from '../Table';
import { Creators } from '../../redux/actions';
import { getLangKey } from '@shared/i18n';
import { courierFeedbackChartDataSelector, courierFeedbackSelector } from '../../redux/selectors';
import { formatFilterValues } from '../utils';

const PageWrapper = () => {
  const dispatch = useDispatch();
  const language = getLangKey();

  const chartData = useSelector(courierFeedbackChartDataSelector.getData);
  const tableData = useSelector(courierFeedbackSelector.getData);
  const isTableDataPending = useSelector(courierFeedbackSelector.getIsPending);

  const [filters, setFilters] = useState({
    warehouse: null,
    courierName: null,
    dateRange: null,
    feedbackOption: null,
    domainType: [],
  });

  const [pagination, setPagination] = useState({
    currentPage: 1,
    rowsPerPage: 10,
  });

  const handleTablePagination = ({ currentPage, rowsPerPage }) => {
    setPagination({ currentPage, rowsPerPage });
    dispatch(Creators.filterCourierFeedbackRequest(
      { filterOptions: formatFilterValues(filters), language, limit: rowsPerPage, pageNumber: currentPage },
    ));
  };

  const handleFilterClick = filterValues => {
    setPagination(oldPaginationValues => ({ ...oldPaginationValues, currentPage: 1 }));
    dispatch(Creators.getFeedbackChartDataRequest({ filterOptions: filterValues, language }));
    dispatch(Creators.filterCourierFeedbackRequest(
      { filterOptions: filterValues, language, limit: pagination.rowsPerPage, pageNumber: 1 },
    ));
  };

  useEffect(() => {
    dispatch(Creators.getFeedbackChartDataRequest({ filterOptions: {}, language }));
    dispatch(Creators.filterCourierFeedbackRequest(
      { filterOptions: {}, language, limit: 10, pageNumber: 1 },
    ));
  }, [dispatch, language]);

  return (
    <>
      <Header />
      <Filter filters={filters} onFilterChange={setFilters} onBringClick={handleFilterClick} />
      <Row className="mt-2" gutter={6}>
        <Col xs={24} md={24} lg={6}>
          <FeedbackAnalysis data={chartData} />
        </Col>
        <Col xs={24} md={24} lg={18}>
          <FeedbackTable
            data={tableData}
            pagination={pagination}
            onPaginationChange={handleTablePagination}
            isLoading={isTableDataPending}
          />
        </Col>
      </Row>
    </>
  );
};

export default PageWrapper;
