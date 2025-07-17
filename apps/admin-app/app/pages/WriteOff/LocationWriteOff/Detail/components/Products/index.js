import { Row, Col } from 'antd';

import Summary from '../Summary';
import AntTable from '@shared/components/UI/AntTable';
import { getTableColumns } from './config';

function Products({ products }) {
  return (
    <Row gutter={[8, 8]}>
      <Col span={24}>
        <AntTable
          data={products}
          bordered
          columns={getTableColumns()}
          summary={pageData => Summary({ pageData })}
        />
      </Col>
    </Row>
  );
}

export default Products;
