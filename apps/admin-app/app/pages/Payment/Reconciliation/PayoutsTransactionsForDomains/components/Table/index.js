import { useDispatch, useSelector } from 'react-redux';

import { Col, Row } from 'antd';

import { useTranslation } from 'react-i18next';

import AntTableV2 from '@shared/components/UI/AntTableV2';

import {
  paginationSelector,
  payoutDetailedReportsSelector,
} from '../../redux/selectors';
import { columns } from './config';

import { Creators } from '../../redux/actions';
import ExportCSVButton from './components/ExportCSVButton';

const Table = () => {
  const { t } = useTranslation(['payoutTransactionsForDomains', 'global']);
  const dispatch = useDispatch();

  const payoutDetailedReportsData = useSelector(
    payoutDetailedReportsSelector.getData,
  );

  const payoutDetailedReportsSelectorIsPending = useSelector(
    payoutDetailedReportsSelector.getIsPending,
  );
  const payoutDetailedReportsSelectorTotalCount = useSelector(
    payoutDetailedReportsSelector.getTotalCount,
  );

  const pagination = useSelector(paginationSelector.getPagination);

  const handlePaginationChange = ({ currentPage, rowsPerPage }) => {
    dispatch(
      Creators.setPagination({ pageNumber: currentPage, pageSize: rowsPerPage }),
    );
  };

  return (
    <Row className="mt-4">
      <Col span={24}>
        <AntTableV2
          title={t('global:REPORTS')}
          total={payoutDetailedReportsSelectorTotalCount}
          data={payoutDetailedReportsData}
          loading={payoutDetailedReportsSelectorIsPending}
          pagination={{
            currentPage: pagination?.pageNumber,
            rowsPerPage: pagination?.pageSize,
          }}
          onPaginationChange={handlePaginationChange}
          showTotal
          columns={columns(t)}
          rightElement={(
            <ExportCSVButton />
          )}
        />
      </Col>
    </Row>
  );
};

export default Table;
