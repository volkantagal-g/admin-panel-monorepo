import { useState, useEffect, useCallback } from 'react';
import { Col, Row } from 'antd';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { Table, Filter } from './components';
import { useInitAndDestroyPage } from '@shared/hooks';
import { Creators } from '@app/pages/MarketFranchise/Detail/redux/actions';
import {
  getCrisisLogExcelRequestParams,
  getCrisisLogsRequestParams,
} from '@app/pages/MarketFranchise/Detail/components/CrisesManagement/utils';
import { crisisLogsSelector } from '@app/pages/MarketFranchise/Detail/redux/selectors';

const LogsTable = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  useInitAndDestroyPage(({ dispatch, Creators }));

  const [filters, setFilters] = useState({ cardNumber: '' });
  const { cardNumber } = filters;

  const handlePaginationChange = ({ currentPage, rowsPerPage }) => {
    dispatch(Creators.changeCrisisLogsPagination({ currentPage, rowsPerPage }));
  };

  const data = useSelector(crisisLogsSelector.getData);
  const isPending = useSelector(crisisLogsSelector.getIsPending);
  const count = useSelector(crisisLogsSelector.getCount);
  const pagination = useSelector(crisisLogsSelector.getPagination);

  const handleSubmit = filter => {
    setFilters(filter);
  };

  const handleExport = () => {
    const requestParams = getCrisisLogExcelRequestParams({ franchiseId: id, cardNumber });
    dispatch(Creators.exportCrisisLogsRequest(requestParams));
  };

  const cardLogsRequest = useCallback(() => {
    const requestParams = getCrisisLogsRequestParams({ pagination, franchiseId: id, cardNumber });
    dispatch(Creators.getCrisisLogsRequest(requestParams));
  }, [dispatch, id, pagination, cardNumber]);

  useEffect(() => {
    cardLogsRequest();
  }, [cardLogsRequest]);

  return (
    <>
      <Row>
        <Col span={24}>
          <Filter
            handleSubmit={handleSubmit}
            filters={filters}
            isPending={isPending}
          />
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Table
            data={data}
            isPending={isPending}
            count={count}
            pagination={pagination}
            handleExport={handleExport}
            handlePaginationChange={handlePaginationChange}
          />
        </Col>
      </Row>
    </>
  );
};

export default LogsTable;
