import { Col, Row } from 'antd';

import AntTableV2 from '@shared/components/UI/AntTableV2';
import { getTableColumns } from '@app/pages/FranchiseEquipment/Detail/components/Logs/config';

const FranchiseEquipmentLogsTable = ({ pagination, onPaginationChange, franchiseEquipmentLogs }) => {
  const tableColumns = getTableColumns();

  return (
    <Row>
      <Col span={24}>
        <AntTableV2
          data={franchiseEquipmentLogs.data}
          total={franchiseEquipmentLogs.total}
          loading={franchiseEquipmentLogs.isPending}
          pagination={pagination}
          columns={tableColumns}
          onPaginationChange={onPaginationChange}
        />
      </Col>
    </Row>
  );
};

export default FranchiseEquipmentLogsTable;
