import { memo } from 'react';
import { Col, Row } from 'antd';

import { useTranslation } from 'react-i18next';

import { useDispatch, useSelector } from 'react-redux';

import { useParams } from 'react-router-dom';

import moment from 'moment-timezone';

import { NumberInput, Select } from '@shared/components/GUI';

import { RangePicker } from '@shared/components/GUI/RangePicker';
import { getSelectFilterOption } from '@shared/utils/common';
import { getFilteredWarehousesSelector } from '@shared/redux/selectors/common';
import { getWarehouseOptions } from './formHelper';

import { getMarketProductAllPriceSelector } from '@app/pages/MarketProduct/DetailV2/redux/selectors';
import { StruckPriceItems } from '@app/pages/MarketProduct/DetailV2/components/PricingInfo/components/SellingPriceFinancials/StruckPriceItems';
import useStyles from './styles';
import { getLocalDateTimeFormat } from '@shared/utils/localization';
import { getDomainWarehouseDomainTypes } from '@app/pages/MarketProduct/DetailV2/components/PricingInfo/components/SellingPriceFinancials/formHelper';
import { Creators } from '@app/pages/MarketProduct/DetailV2/redux/actions';
import { getSelllingPriceFilterObject } from '@app/pages/MarketProduct/DetailV2/components/PricingInfo/util';

export const WarehouseSellingPrice = memo(function WarehouseSellingPrice({
  formik, priceType,
  isStruckPriceSelected,
  handleSelectDiscounted,
  doesHaveDomainPrice,
  supportType,
  setSupportType,
}) {
  const { t } = useTranslation('marketProductPageV2');

  const dispatch = useDispatch();
  const { id: productId } = useParams();

  const warehouses = useSelector(getFilteredWarehousesSelector.getData);
  const { availableDomainsForDiscountedPrices } = useSelector(getMarketProductAllPriceSelector.getData);
  const pricingData = useSelector(getMarketProductAllPriceSelector.getData);
  const { isBundled } = pricingData;
  const classes = useStyles();

  const handleFormValueChange = (target, value) => {
    formik?.setFieldValue(target, value);
    if (target === 'warehouseIds' || target === 'dateRanges') {
      const filteredRequestBody = getSelllingPriceFilterObject(target, value, formik?.values);
      dispatch(Creators.getSellingPriceListRequest({ ...filteredRequestBody, productIds: [productId] }));
    }
  };

  const disabledDate = current => {
    return current && current < moment().subtract(1, 'days');
  };

  return (
    <>
      <Row gutter={[16, 16]} className={classes.row}>
        <Col xs={24} md={6}>
          <Select
            errors={formik?.errors}
            optionsData={getWarehouseOptions(warehouses)}
            filterOption={getSelectFilterOption}
            showSearch
            name="warehouseIds"
            mode="multiple"
            label={t('WAREHOUSE')}
            onChange={warehouseIds => {
              handleFormValueChange('warehouseIds', warehouseIds);
            }}
            allowClear
          />
        </Col>
        <Col xs={24} md={6}>
          <Select
            errors={formik?.errors}
            optionsData={getDomainWarehouseDomainTypes(availableDomainsForDiscountedPrices)}
            filterOption={getSelectFilterOption}
            showSearch
            name="domainType"
            label={t('DOMAIN')}
            onChange={domainType => {
              handleFormValueChange('domainType', domainType);
            }}
          />
        </Col>
        {!isBundled && (
          <Col xs={24} md={6}>
            <RangePicker
              errors={formik?.errors}
              name="dateRanges"
              value={formik?.values?.dateRanges}
              showTime={{ format: getLocalDateTimeFormat() }}
              format={getLocalDateTimeFormat()}
              onChange={dates => {
                handleFormValueChange('dateRanges', dates);
              }}
              allowEmpty
              disabledDate={disabledDate}
            />
          </Col>
        )}
        <Col xs={24} md={6}>
          <NumberInput
            data-testid="warehousePrice"
            name="warehousePrice"
            label={t('PRICE')}
            errors={formik?.errors}
            onChange={price => {
              handleFormValueChange('warehousePrice', price);
            }}
            min={0}
            precision={2}
            step={0.01}
          />
        </Col>

      </Row>
      <StruckPriceItems
        formik={formik}
        title={t('STRUCK_PRICE_WAREHOUSE')}
        priceType={priceType}
        isStruckPriceSelected={isStruckPriceSelected}
        doesHaveDomainPrice={doesHaveDomainPrice}
        handleSelectDiscounted={handleSelectDiscounted}
        supportType={supportType}
        setSupportType={setSupportType}
      />
    </>

  );
});
