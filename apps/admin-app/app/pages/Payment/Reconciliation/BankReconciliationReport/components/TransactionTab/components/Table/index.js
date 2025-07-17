import { Col, Row } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { columns } from './config';
import { getTransactionPagination, transactionReconciliationsSelector } from '../../../../redux/selectors';
import { Creators } from '../../../../redux/actions';
import AntTableV2 from '@shared/components/UI/AntTableV2';
import ExportCSVButton from './components/ExportCSVButton';

function Table() {
  const { t } = useTranslation(['bankReconciliationReportPage', 'global']);
  const dispatch = useDispatch();

  const transactionReconciliationsData = useSelector(transactionReconciliationsSelector.getData);
  const transactionReconciliationsIsPending = useSelector(transactionReconciliationsSelector.getIsPending);
  const transactionReconciliationsGetTotalPages = useSelector(transactionReconciliationsSelector.getTotalPages);
  const page = useSelector(getTransactionPagination.page);
  const pageSize = useSelector(getTransactionPagination.pageSize);
  const handlePaginationChange = ({ currentPage, rowsPerPage }) => {
    dispatch(Creators.setTransactionPagination({ page: currentPage, pageSize: rowsPerPage }));
  };

  const totalDataCount = transactionReconciliationsGetTotalPages * pageSize;

  return (
    <Row>
      <Col span={24}>
        <AntTableV2
          title={t('REPORTS')}
          total={totalDataCount}
          data-testid="transaction-reconciliation-table"
          data={transactionReconciliationsData}
          columns={columns(t)}
          loading={transactionReconciliationsIsPending}
          rowKey={record => record.generatedTransactionId}
          onPaginationChange={handlePaginationChange}
          pagination={{ currentPage: page, rowsPerPage: pageSize }}
          rightElement={(
            <ExportCSVButton />
          )}
        />
      </Col>
    </Row>
  );
}

export default Table;
