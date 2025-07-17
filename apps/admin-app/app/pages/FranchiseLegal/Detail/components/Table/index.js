import { Col, Row } from 'antd';

import AntTableV2 from '@shared/components/UI/AntTableV2';
import { tableColumns } from './config';

const FranchiseLegalTable = ({ tableData, totalTableData, isPending, pagination, handlePaginationChange }) => {
  return (
    <Row>
      <Col span={24}>
        <AntTableV2
          data={tableData}
          columns={tableColumns()}
          loading={isPending}
          pagination={pagination}
          onPaginationChange={handlePaginationChange}
          total={totalTableData}
        />
      </Col>
    </Row>
  );
};

export default FranchiseLegalTable;
