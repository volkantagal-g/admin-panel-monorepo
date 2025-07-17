import { useSelector } from 'react-redux';
import { Col, Row } from 'antd';
import { useTranslation } from 'react-i18next';
import { useMemo } from 'react';

import AntTableV2 from '@shared/components/UI/AntTableV2';
import {
  timesheetLogsSelector,
  warehouseSelector,
} from '../../redux/selectors';
import { getTableColumns } from './config';

const Table = ({ pagination, handlePaginationChange, onHandleDetails }) => {
  const { t } = useTranslation('timesheetLogs');

  const isPending = useSelector(timesheetLogsSelector.getIsPending);
  const data = useSelector(timesheetLogsSelector.getData);
  const totalCount = useSelector(timesheetLogsSelector.getTotalCount);
  const warehouseData = useSelector(warehouseSelector.getData);

  const warehouses = useMemo(
    () => (warehouseData || []).reduce((acc, warehouse) => {
      acc[warehouse._id] = warehouse.name;
      return acc;
    }, {}),
    [warehouseData],
  );

  return (
    <Row>
      <Col span={24}>
        <AntTableV2
          data={data || []}
          columns={getTableColumns({
            t,
            warehouses,
            onHandleDetails: rowData => onHandleDetails(rowData),
          })}
          loading={isPending}
          pagination={pagination}
          onPaginationChange={handlePaginationChange}
          total={totalCount || 0}
        />
      </Col>
    </Row>
  );
};

export default Table;
