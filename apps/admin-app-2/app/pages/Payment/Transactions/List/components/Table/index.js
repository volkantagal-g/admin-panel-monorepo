import { Col, Row, Space } from 'antd';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { allColumns } from './config';
import AntTableV2 from '@shared/components/UI/AntTableV2';
import ColumnsButton from './components/ColumnsButton';
import { getActiveColumns } from '../../utils';
import { Creators } from '../../redux/actions';
import { getPagination, transactionsSelector } from '../../redux/selectors';

function Table() {
  const { t } = useTranslation(['paymentTransactionPage', 'global']);
  const [visibleColumns, setVisibleColumns] = useState(() => getActiveColumns(allColumns(t)));
  const dispatch = useDispatch();

  const transactionsSelectorData = useSelector(transactionsSelector.getData);
  const transactionsSelectorIsPending = useSelector(transactionsSelector.getIsPending);
  const transactionsSelectorTotalDataCount = useSelector(transactionsSelector.getTotalDataCount);
  const pagination = useSelector(getPagination);

  const handlePaginationChange = ({ currentPage, rowsPerPage }) => {
    dispatch(Creators.setPagination({ currentPage, rowsPerPage }));
  };

  const handleChange = (_pagination, _filters, sorter) => {
    dispatch(Creators.setSortOptions({ sortOptions: { field: sorter.columnKey, orderBy: sorter.order === 'ascend' ? 'asc' : 'desc' } }));
  };

  return (
    <Row gutter={[8, 8]}>
      <Col span={24}>
        <AntTableV2
          title={t('TRANSACTIONS')}
          total={transactionsSelectorTotalDataCount}
          data={transactionsSelectorData}
          columns={visibleColumns}
          onChange={handleChange}
          loading={transactionsSelectorIsPending}
          pagination={pagination}
          onPaginationChange={handlePaginationChange}
          rightElement={(
            <Space>
              <ColumnsButton allColumns={allColumns(t)} setVisibleColumns={setVisibleColumns} />
            </Space>
          )}
          showTotal
        />
      </Col>
    </Row>
  );
}

export default Table;
