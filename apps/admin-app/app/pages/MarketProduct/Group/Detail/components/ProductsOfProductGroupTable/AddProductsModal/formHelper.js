import { get } from 'lodash';
import { Select, Tooltip } from 'antd';

import { getLangKey } from '@shared/i18n';
import { productOfProductGroupFilters } from '@shared/shared/constantValues';

const { Option } = Select;

export const getMarketProductOptions = (marketProducts = []) => {
  return marketProducts.map(marketProduct => {
    const name = get(marketProduct, ['fullName', getLangKey()], '') || get(marketProduct, ['name', getLangKey()], '');

    return (
      <Option key={marketProduct?._id} value={marketProduct?._id}>
        <Tooltip placement="right">
          {name}
        </Tooltip>
      </Option>
    );
  });
};

export const productOfProductGroupFilterOptions = Object.entries(productOfProductGroupFilters).map(([key, value]) => {
  return (
    <Option key={key} value={key}>
      {value[getLangKey()]}
    </Option>
  );
});
