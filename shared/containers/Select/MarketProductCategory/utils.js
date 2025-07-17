import { Select, Button, Row, Col } from 'antd';
import { LinkOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

import { ROUTE } from '@app/routes';
import { getLangKey } from '@shared/i18n';

const { Option } = Select;

export const getMarketProductCategoryOptions = (categories = []) => {
  return categories.map(marketProductCategory => {
    const path = ROUTE.MARKET_PRODUCT_CATEGORY_DETAIL.path.replace(':id', marketProductCategory?._id);
    return (
      <Option key={marketProductCategory?._id} value={marketProductCategory?._id}>
        <Row>
          <Col className="pr-3">
            {marketProductCategory?.name?.[getLangKey()]}
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
