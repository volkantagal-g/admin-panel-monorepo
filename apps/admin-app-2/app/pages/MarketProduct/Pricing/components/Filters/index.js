import {
  Row,
  Col,
  Form,
} from 'antd';
import { useTranslation } from 'react-i18next';

import { useTheme } from 'react-jss';

import { useMemo } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import {
  getModifiedFormValues,
  hasInvalidProductId,
  getPriceOptions,
} from '@app/pages/MarketProduct/Pricing/components/Filters/formHelper';

import { getActiveMarketProductsListSelector } from '@app/pages/MarketProduct/Pricing/redux/selector';
import { Creators } from '@app/pages/MarketProduct/Pricing/redux/actions';
import { getWarehouseOptions } from '@shared/utils/formHelper';
import { getCountryRestrictedDomainTypeOptions } from '@app/pages/MarketProduct/utils';
import { getSelectedCountryV2 } from '@shared/redux/selectors/countrySelection';
import { getSelectFilterOption, setNullToEmptyStringDeep } from '@shared/utils/common';
import { getLocalDateTimeFormat } from '@shared/utils/localization';
import { getWarehousesSelector } from '@shared/redux/selectors/common';
import useStyles from './styles';
import { getPriceTypeOptions, selectFormatter } from '@app/pages/MarketProduct/Pricing/utils';
import { DEFAULT_DEBOUNCE_MS } from '@shared/shared/constants';
import useDebouncedCallback from '@shared/hooks/useDebouncedCallback';
import { Button, Select, Space } from '@shared/components/GUI';
import { RangePicker } from '@shared/components/GUI/RangePicker';
import { PRICE_OPTION } from '@app/pages/MarketProduct/Pricing/constants';

const Filters = ({ setFormValues }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const theme = useTheme();

  const { t } = useTranslation('marketProductPricingPage');
  const countryCode = useSelector(getSelectedCountryV2).code.alpha2;
  const [form] = Form.useForm();

  const warehouses = useSelector(getWarehousesSelector.getData);
  const isWarehousesPending = useSelector(getWarehousesSelector.getIsPending);
  const filteredProductNames = useSelector(getActiveMarketProductsListSelector.getData);
  const filteredProductNamesIsPending = useSelector(getActiveMarketProductsListSelector.getIsPending);
  const filteredProductNameOptions = useMemo(() => (selectFormatter(filteredProductNames)), [filteredProductNames]);

  const handleFilter = () => {
    const formValues = form.getFieldsValue();
    const [startDate, endDate] = formValues?.dateRanges ?? [];
    const modifiedFormValues = getModifiedFormValues(formValues);

    setNullToEmptyStringDeep({ ...modifiedFormValues });
    setFormValues({ ...modifiedFormValues, startDate, endDate });

    const isInvalidId = hasInvalidProductId(modifiedFormValues?.productIds, t);

    if (!isInvalidId) {
      dispatch(Creators.getMarketProductsPriceListRequest({ ...modifiedFormValues, startDate, endDate, callbackForProducts: true }));
    }
    else {
      dispatch(isInvalidId);
    }
  };

  const handleSearchProductName = searchValue => {
    if (searchValue !== '') {
      dispatch(Creators.getActiveMarketProductsRequest({ queryText: searchValue }));
    }
  };
  const { debouncedCallback: handleDebouncedSearch } = useDebouncedCallback({ callback: handleSearchProductName, delay: DEFAULT_DEBOUNCE_MS });

  const handleFormValues = (target, value) => {
    form.setFieldsValue({ [target]: value });
  };
  const handleClean = () => {
    setFormValues({});
    form.resetFields();
    dispatch(Creators.getMarketProductsPriceListRequest({ callbackForProducts: true }));
  };

  return (
    <Space>
      <Form
        layout="vertical"
        form={form}
      >
        <Row gutter={[theme.spacing(3), theme.spacing(3)]} className={classes.row}>
          <Col xs={24} sm={12} lg={8}>
            <Select
              name="names"
              label={t('SEARCH_BY_NAME')}
              allowClear
              mode="multiple"
              onSearch={e => handleDebouncedSearch(e)}
              loading={filteredProductNamesIsPending}
              optionsData={filteredProductNameOptions}
              showSearch
              onChange={value => handleFormValues('names', value)}
            />
          </Col>
          <Col xs={24} sm={12} lg={8}>
            <Select
              name="productIds"
              label={t('SEARCH_BY_PRODUCT_IDS')}
              allowClear
              mode="tags"
              onChange={value => handleFormValues('productIds', value)}
            />
          </Col>
          <Col xs={24} sm={12} lg={8}>
            <Select
              label={t('DOMAIN_TYPE')}
              optionsData={getCountryRestrictedDomainTypeOptions(countryCode)}
              name="domainTypes"
              onChange={value => handleFormValues('domainTypes', value)}
              mode="multiple"
              allowClear
            />
          </Col>
          <Col xs={24} sm={12} lg={8}>
            <RangePicker
              showTime={{ format: getLocalDateTimeFormat() }}
              format={getLocalDateTimeFormat()}
              placeholder={[t('global:START_DATE'), t('global:END_DATE')]}
              name="dateRanges"
              onChange={value => handleFormValues('dateRanges', value)}
            />
          </Col>
          <Col xs={24} sm={12} lg={8}>
            <Select
              name="warehouseIds"
              label={t('global:WAREHOUSE')}
              optionsData={getWarehouseOptions(warehouses)}
              loading={isWarehousesPending}
              disabled={!warehouses.length}
              allowClear
              showSearch
              filterOption={getSelectFilterOption}
              mode="multiple"
              onChange={value => handleFormValues('warehouseIds', value)}
            />
          </Col>
          <Col xs={24} sm={12} lg={8}>
            <Select
              label={t('PRICING_TYPE')}
              name="pricingTypes"
              optionsData={getPriceTypeOptions()}
              allowClear
              showSearch
              filterOption={getSelectFilterOption}
              mode="multiple"
              onChange={value => handleFormValues('pricingTypes', value)}
            />
          </Col>
          <Col xs={24} sm={12} lg={8}>
            <Select
              defaultValue={PRICE_OPTION.DISCOUNTED_AND_PRICE}
              label={t('PRICE_OPTIONS.TITLE')}
              optionsData={getPriceOptions(t)}
              name="priceOption"
              onChange={value => handleFormValues('priceOption', value)}
            />
          </Col>
        </Row>
        <Row justify="end" gutter={[8, 8]}>
          <Col>
            <Button color="default" onClick={handleClean}>{t('CLEAN_FORM')}</Button>
          </Col>
          <Col>
            <Button onClick={handleFilter}>{t('global:APPLY')}</Button>
          </Col>
        </Row>
      </Form>
    </Space>
  );
};

export default Filters;
