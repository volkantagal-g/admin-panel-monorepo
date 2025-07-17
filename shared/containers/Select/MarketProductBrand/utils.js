import { Select, Button, Row, Col } from 'antd';
import { LinkOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

import { ROUTE } from '@app/routes';

const { Option } = Select;

export const getBrandOptions = (brands = []) => {
  return brands.map(brand => {
    const path = ROUTE.BRAND_DETAIL.path.replace(':id', brand?._id);
    return (
      <Option key={brand?._id} value={brand?._id}>
        <Row>
          <Col className="pr-3">
            {brand?.name}
          </Col>
          <Col>
            <Link to={path}>
              <Button icon={<LinkOutlined />} size="small" />
            </Link>
          </Col>
        </Row>
      </Option>
    );
  });
};
