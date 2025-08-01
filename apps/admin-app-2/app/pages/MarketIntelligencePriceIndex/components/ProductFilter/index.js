import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Select } from 'antd';

import SelectTitle from '@app/pages/MarketIntelligencePriceIndex/components/SelectTitle';
import { listSelector } from '@app/pages/MarketIntelligencePriceIndex/redux/selectors';
import useStyles from '@app/pages/MarketIntelligencePriceIndex/styles';
import { Creators } from '@app/pages/MarketIntelligencePriceIndex/redux/actions';
import { FILTER_KEY } from '@app/pages/MarketIntelligencePriceIndex/constants';

const { Option } = Select;

const ProductFilter = ({ tableData, setFilters, filters, isLoading }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { t } = useTranslation('marketIntelligencePriceIndex');

  const productList = useSelector(listSelector.productList);

  const handleChange = value => {
    if (value) {
      setFilters({ ...filters, [FILTER_KEY.PRODUCT]: value || '' });
      Object.values(tableData).map(element => (element.getir_product_name === value &&
        dispatch(Creators.setSelectedProduct({ selectedProduct: element }))));
    }
    else dispatch(Creators.setSelectedProduct());
  };

  return (
    <>
      <SelectTitle description={t('PRODUCTS')} src="products" />
      <Select
        allowClear
        showSearch
        mode="multiple"
        className={classes.selectWidth}
        disabled={isLoading}
        onChange={handleChange}
        placeholder={t('SELECT_PRODUCT')}
        value={filters ? filters[FILTER_KEY.PRODUCT] : []}
      >
        {productList?.map(value => (
          <Option key={value} value={value} label={value}>{value}</Option>
        ))}
      </Select>
    </>
  );
};

export default ProductFilter;
