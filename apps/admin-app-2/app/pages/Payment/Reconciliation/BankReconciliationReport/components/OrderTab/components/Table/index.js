import { Button, Col, Row, Space } from 'antd';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { usePermission } from '@shared/hooks';

import { columns } from './config';
import { getOrderPagination, reconciliationsSelector, selectedRowsSelector } from '../../../../redux/selectors';
import { Creators } from '../../../../redux/actions';
import RefundButton from './components/RefundButton';
import ExportCSVButton from './components/ExportCSVButton';
import DetailModal from './components/DetailModal';
import AntTableV2 from '@shared/components/UI/AntTableV2';
import permKey from '@shared/shared/permKey.json';
import { TABLE_PAGE_SIZE_OPTIONS } from '@app/pages/Payment/Reconciliation/BankReconciliationReport/constants';
import ManualRefundButton from './components/ManualRefundButton';

function Table() {
  const { t } = useTranslation(['bankReconciliationReportPage', 'global']);
  const dispatch = useDispatch();
  const { Can } = usePermission();

  const reconciliationsSelectorData = useSelector(reconciliationsSelector.getData);
  const reconciliationsIsPending = useSelector(reconciliationsSelector.getIsPending);
  const reconciliationsGetTotalPages = useSelector(reconciliationsSelector.getTotalPages);
  const selectedRowsData = useSelector(selectedRowsSelector.getSelectedRows);
  const page = useSelector(getOrderPagination.page);
  const pageSize = useSelector(getOrderPagination.pageSize);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const disableButton = selectedRowsData.length !== 1;
  const rowSelection = {
    selectedRowKeys: selectedRowsData.map(row => row.id), // rowSelection works only row keys
    onChange: (selectedRowKeys, selectedRows) => {
      dispatch(Creators.setSelectedRows({ selectedRows }));
    },
  };
  const handlePaginationChange = ({ currentPage, rowsPerPage }) => {
    dispatch(Creators.setOrderPagination({ page: currentPage, pageSize: rowsPerPage }));
  };

  const totalDataCount = reconciliationsGetTotalPages * pageSize;

  const showModal = () => {
    setIsModalVisible(true);
  };
  return (
    <Row>
      <Col span={24} data-testid="reconciliation-table-wrapper">
        <AntTableV2
          data-testid="reconciliation-table"
          title={t('REPORTS')}
          total={totalDataCount}
          data={reconciliationsSelectorData}
          columns={columns(t)}
          loading={reconciliationsIsPending}
          rowKey={record => record.id}
          rowSelection={{
            type: 'checkbox',
            ...rowSelection,
          }}
          pagination={{ currentPage: page, rowsPerPage: pageSize }}
          bordered
          onPaginationChange={handlePaginationChange}
          pageSizeOptions={TABLE_PAGE_SIZE_OPTIONS}
          rightElement={(
            <Space>
              <ManualRefundButton />
              <RefundButton />
              <Can permKey={permKey.PAGE_BANK_RECONCILIATION_REPORT_COMPONENT_RECONCILIATION_DETAIL_BUTTON}>
                <Button data-testid="reconciliation-report-detail-button" onClick={showModal} disabled={disableButton} variant="contained" type="default">
                  {t('global:DETAIL')}
                </Button>
              </Can>
              <ExportCSVButton />
            </Space>
          )}
        />
      </Col>
      <DetailModal isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible} />
    </Row>
  );
}

export default Table;
