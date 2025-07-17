import { Row, Col } from 'antd';

import AntTableV2 from '@shared/components/UI/AntTableV2';
import { getTableColumns } from './config';

function SummaryTable({ products, onDelete }) {
  return (
    <div>
      <Row>
        <Col span={24}>
          <AntTableV2
            data={products}
            columns={getTableColumns({ onDelete })}
            pagination={false}
          />
        </Col>
      </Row>
    </div>
  );
}

export default SummaryTable;
