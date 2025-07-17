import { Select, Button, Row, Col } from 'antd';
import { LinkOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

import { ROUTE } from '@app/routes';
import { getParentNameOfMasterCategory } from '@app/pages/MarketProduct/utils';

const { Option } = Select;

export const getMarketProductMasterCategoryOptions = (marketProductMasterCategories = []) => {
  return marketProductMasterCategories.map(masterCategory => {
    const path = ROUTE.MARKET_PRODUCT_MASTER_CATEGORY_DETAIL.path.replace(':id', masterCategory?._id);
    const parentName = getParentNameOfMasterCategory(masterCategory, true);
    const value = masterCategory?._id || '';
    return (
      <Option key={value} value={value}>
        <Row>
          <Col className="pr-3">
            {parentName}
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
