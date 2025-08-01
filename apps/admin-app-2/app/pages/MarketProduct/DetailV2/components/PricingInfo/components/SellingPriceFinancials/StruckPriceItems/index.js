import { Col, Radio as RadioAntd, Row } from 'antd';

import { memo, useMemo } from 'react';

import { useTranslation } from 'react-i18next';

import moment from 'moment-timezone';

import { useSelector } from 'react-redux';

import { Checkbox, InfoIcon, NumberInput, PercentageInput, Radio, Select } from '@shared/components/GUI';
import { getStruckPriceSupporterOptions } from '@app/pages/MarketProduct/commonFormHelper';
import useStyles from './styles';
import { RangePicker } from '@shared/components/GUI/RangePicker';
import { getLocalDateTimeFormat } from '@shared/utils/localization';
import { SELLING_PRICE_TYPES } from '@app/pages/MarketProduct/DetailV2/components/PricingInfo/constants';
import { STRUCK_PRICE_SUPPORTER_TYPE, MARKET_PRODUCT_SUPPORT_TYPE } from '@shared/shared/constants';
import { getSelectFilterOption } from '@shared/utils/common';
import { getSuppliersSelector } from '@shared/redux/selectors/common';
import { extractSupplierAndManufacturer, getSupplierAndManufacturerOptions } from '@app/pages/MarketProduct/DetailV2/components/PricingInfo/util';
import { getMarketProductAllPriceSelector } from '@app/pages/MarketProduct/DetailV2/redux/selectors';

export const StruckPriceItems = memo(function StruckPriceItems({
  formik, doesHaveDomainPrice, priceType,
  isStruckPriceSelected,
  handleSelectDiscounted,
  supportType,
  setSupportType,
}) {
  const { t } = useTranslation('marketProductPageV2');
  const classes = useStyles();
  const SM_SIZE = 6;
  const supportRateDisabled = !(formik?.values?.providerType === STRUCK_PRICE_SUPPORTER_TYPE.SUPPLIER.toString() ||
    formik?.values?.providerType === STRUCK_PRICE_SUPPORTER_TYPE.THIRD_PARTY.toString());

  const suppliers = useSelector(getSuppliersSelector.getData);
  const isSupplierPending = useSelector(getSuppliersSelector.getIsPending);
  const data = useSelector(getMarketProductAllPriceSelector.getData);
  const productsSuppliersIds = useMemo(() => data?.supplierBuyingFinancials?.map(({ supplierId }) => supplierId), [data?.supplierBuyingFinancials]);
  const { supplier } = useMemo(
    () => extractSupplierAndManufacturer(suppliers),
    [suppliers],
  );
  const productsSuppliers = useMemo(() => supplier.filter(({ _id }) => productsSuppliersIds?.includes(_id)), [productsSuppliersIds, supplier]);
  const thirdParties = useMemo(() => supplier.filter(({ _id }) => !productsSuppliersIds?.includes(_id)), [productsSuppliersIds, supplier]);
  const supplierOptionCandidate = useMemo(() => {
    if (formik?.values?.providerType === STRUCK_PRICE_SUPPORTER_TYPE.SUPPLIER.toString()) return productsSuppliers;
    if (formik?.values?.providerType === STRUCK_PRICE_SUPPORTER_TYPE.THIRD_PARTY.toString()) return thirdParties;
    return [];
  }, [formik?.values?.providerType, productsSuppliers, thirdParties]);
  const supplierOptions = useMemo(() => getSupplierAndManufacturerOptions(supplierOptionCandidate), [supplierOptionCandidate]);

  const handleOptionChange = ({ target: { value } }) => {
    setSupportType(value);
    if (value === MARKET_PRODUCT_SUPPORT_TYPE.PERCENT) {
      formik?.setFieldValue('showAsAmount', false);
    }
    else {
      formik?.setFieldValue('showAsAmount', true);
    }
  };

  const handleFormValueChange = (target, value) => {
    formik?.setFieldValue(target, value);
  };
  const disabledDate = current => {
    return current && current < moment().subtract(1, 'days');
  };

  return (
    <Row gutter={[16, 16]} className={classes.row}>
      <Col xs={24} lg={6} className={classes.checkboxItem}>
        <Checkbox
          name="isStruckPriceActivated"
          disabled={!doesHaveDomainPrice}
          onChange={event => handleSelectDiscounted(event.target.checked)}
          checked={isStruckPriceSelected}
        >{t('DISCOUNTED')} {doesHaveDomainPrice ? null : <InfoIcon title={t('SELLING_PRICE_INFO_MESSAGES.VALID_DOMAIN_PRICE_STATUS_DISCOUNTED')} />}
        </Checkbox>
      </Col>
      {priceType === SELLING_PRICE_TYPES.DOMAIN ? (
        <Col xs={24} md={12} lg={SM_SIZE}>
          <RangePicker
            errors={formik?.errors}
            name="discountedDateRanges"
            value={formik?.values?.discountedDateRanges}
            showTime={{ format: getLocalDateTimeFormat() }}
            format={getLocalDateTimeFormat()}
            disabled={!isStruckPriceSelected}
            onChange={dates => {
              handleFormValueChange('discountedDateRanges', dates);
            }}
            allowEmpty
            disabledDate={disabledDate}
          />
        </Col>
      ) : null}
      <Col xs={24} md={12} lg={SM_SIZE}>
        <Select
          errors={formik?.errors}
          label={t('SUPPORT_TYPE')}
          name="providerType"
          value={formik?.values?.providerType}
          optionsData={getStruckPriceSupporterOptions()}
          onChange={providerType => {
            handleFormValueChange('providerType', providerType);
          }}
          disabled={!isStruckPriceSelected}
        />
      </Col>
      <Col xs={24} md={12} lg={SM_SIZE}>
        <Select
          dataTestId="supplier"
          name="supplierId"
          label={t('SUPPLIER')}
          showSearch
          filterOption={getSelectFilterOption}
          optionsData={supplierOptions}
          onChange={supplierId => {
            handleFormValueChange('supplierId', supplierId);
          }}
          loading={isSupplierPending}
          disabled={!isStruckPriceSelected || supportRateDisabled}
          allowClear
          errors={formik?.errors}
          value={formik?.values?.supplierId}
        />
      </Col>
      <Col xs={24} md={6} className={classes.checkboxItem}>
        <RadioAntd.Group
          value={supportType}
          onChange={handleOptionChange}
          disabled={!isStruckPriceSelected || (formik?.values?.providerType && supportRateDisabled)}
        >
          <Radio value={MARKET_PRODUCT_SUPPORT_TYPE.AMOUNT}>{t('AMOUNT')}</Radio>
          <Radio value={MARKET_PRODUCT_SUPPORT_TYPE.PERCENT}>{t('PERCENT')}</Radio>
        </RadioAntd.Group>
      </Col>
      <Col xs={24} md={12} lg={SM_SIZE}>
        {supportType === MARKET_PRODUCT_SUPPORT_TYPE.AMOUNT ? (
          <NumberInput
            disabled={!isStruckPriceSelected || (formik?.values?.providerType && supportRateDisabled)}
            name="supportAmount"
            value={formik?.values?.supportRate}
            onChange={value => handleFormValueChange('supportAmount', value)}
            label={t('SUPPORT_AMOUNT')}
            errors={formik?.errors}
          />
        )
          : (
            <PercentageInput
              errors={formik?.errors}
              name="supportRate"
              value={formik?.values?.supportRate}
              label={t('SUPPORT_RATE')}
              onChange={supportRate => {
                handleFormValueChange('supportRate', supportRate);
              }}
              disabled={!isStruckPriceSelected || (formik?.values?.providerType && supportRateDisabled)}
            />
          )}
      </Col>
      <Col xs={24} md={4} className={classes.checkboxItem}>
        <Checkbox
          name="specialOffers"
          checked={formik?.values?.specialOffers}
          disabled={!isStruckPriceSelected}
          onChange={event => {
            handleFormValueChange('specialOffers', event.target.checked);
          }}
        >{t('SPECIAL_OFFERS')}
        </Checkbox>
      </Col>
    </Row>
  );
});
