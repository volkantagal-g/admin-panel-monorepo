import { get } from 'lodash';
import { Select, Tooltip, Button } from 'antd';
import { LinkOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

import { getLangKey, t } from '@shared/i18n';
import { ROUTE } from '@app/routes';

const { Option } = Select;

export const getMarketProductOptions = (marketProducts = []) => {
  return marketProducts.map(marketProduct => {
    const name = get(marketProduct, ['fullName', getLangKey()], '') || get(marketProduct, ['name', getLangKey()], '');
    const supplierNames = marketProduct?.suppliers?.map(supplier => supplier?.name || '')
      .join(' / ') || t('NO_SUPPLIER');
    const path = ROUTE.MARKET_PRODUCT_DETAIL.path.replace(':id', marketProduct?._id);
    return (
      <Option key={marketProduct?._id} value={marketProduct?._id}>
        <Tooltip title={supplierNames} placement="left" className="pr-3">
          {name}
        </Tooltip>
        <Link to={path} target="blank">
          <Button icon={<LinkOutlined />} size="small" />
        </Link>
      </Option>
    );
  });
};
