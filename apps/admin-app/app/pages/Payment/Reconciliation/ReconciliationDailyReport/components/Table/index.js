import { Col, Row } from 'antd';
import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { v4 as uuidv4 } from 'uuid';

import Footer from '@shared/components/UI/AntTable/components/Footer';
import defaultOptions from '@shared/components/UI/AntTable/defaultOptions';

import { columns } from './config';
import AntTableV2 from '@shared/components/UI/AntTableV2';
import { Creators } from '../../redux/actions';
import { dailyReportSelector } from '../../redux/selectors';

function Table({ filters, pagination, setPagination }) {
  const { t } = useTranslation(['bankReconciliationReportPage', 'global']);
  const dispatch = useDispatch();
  const dailyReportSelectorData = useSelector(dailyReportSelector.getData);
  const dailyReportSelectorIsPending = useSelector(dailyReportSelector.getIsPending);
  const dailyReportSelectorTotalCount = useSelector(dailyReportSelector.getTotalCount);

  const handlePaginationChange = ({ currentPage, rowsPerPage }) => {
    setPagination({ currentPage, rowsPerPage });
  };

  const { currentPage, rowsPerPage } = pagination;
  const getReconciliationsRequest = useCallback(() => {
    const params = {
      ...filters,
      page: currentPage,
      pageSize: rowsPerPage,
    };
    dispatch(
      Creators.getDailyReportRequest({ ...params }),
    );
  }, [dispatch, filters, currentPage, rowsPerPage]);

  useEffect(() => {
    getReconciliationsRequest();
  }, [getReconciliationsRequest]);

  return (
    <Row>
      <Col span={24}>
        <AntTableV2
          title={t('REPORTS')}
          data={dailyReportSelectorData}
          columns={columns(t)}
          loading={dailyReportSelectorIsPending}
          rowKey={() => uuidv4()}
          bordered
          footer={(
            <Footer
              total={dailyReportSelectorTotalCount}
              currentPage={currentPage}
              rowsPerPage={rowsPerPage}
              pageSizeOptions={defaultOptions.pageSizeOptions}
              onPaginationChange={handlePaginationChange}
            />
          )}
        />
      </Col>
    </Row>
  );
}

export default Table;
