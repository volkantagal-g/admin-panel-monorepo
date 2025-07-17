import { Checkbox, Col, Row, Radio as RadioAntd } from 'antd';

import { useTranslation } from 'react-i18next';

import { useSelector } from 'react-redux';

import moment from 'moment';

import { getLocalDateTimeFormat } from '@shared/utils/localization';
import { NumberInput, PercentageInput, Select, Radio } from '@shared/components/GUI';
import { RangePicker } from '@shared/components/GUI/RangePicker';
import { getWarehouseOptions } from '@shared/utils/formHelper';
import { getSelectedCountryV2 } from '@shared/redux/selectors/countrySelection';
import { getCountryRestrictedDomainTypeOptions } from '@app/pages/MarketProduct/utils';
import { getWarehousesSelector } from '@shared/redux/selectors/common';
import { getStruckPriceSupporterOptions } from '@app/pages/MarketProduct/commonFormHelper';
import { NUMBER_INPUT_STEPS, PRECISON_VALUES } from '@app/pages/MarketProduct/DetailV2/components/PricingInfo/constants';
import { MARKET_PRODUCT_SUPPORT_TYPE } from '@shared/shared/constants';

const ProductWastePrice = ({ formik, handleFormValueChange, isFormEditable, className, supportRateDisabled, handleOptionChange, supportType }) => {
  const { t } = useTranslation('marketProductPricingPage');
  const countryCode = useSelector(getSelectedCountryV2).code.alpha2;
  const warehouses = useSelector(getWarehousesSelector.getData);
  const isWarehousesPending = useSelector(getWarehousesSelector.getIsPending);

  const disabledDate = current => {
    return current && current < moment().subtract(1, 'days');
  };

  return (
    <>
      <Row gutter={[16, 16]} className={className}>
        <Col xs={24} md={12} lg={5}>
          <Select
            value={formik?.values?.warehouseId}
            name="warehouseId"
            label={t('WAREHOUSE')}
            optionsData={getWarehouseOptions(warehouses)}
            loading={isWarehousesPending}
            disabled
          />
        </Col>
        <Col xs={24} md={12} lg={5}>
          <Select
            value={formik?.values?.domainType}
            optionsData={getCountryRestrictedDomainTypeOptions(countryCode)}
            name="domainType"
            label={t('global:DOMAIN_TYPE')}
            disabled
          />
        </Col>
        <Col xs={24} md={12} lg={5}>
          <RangePicker
            showTime={{ format: getLocalDateTimeFormat() }}
            format={getLocalDateTimeFormat()}
            placeholder={[t('global:START_DATE'), t('global:END_DATE')]}
            name="dateRangesWaste"
            label={`${t('global:START_DATE')} - ${t('global:END_DATE')}`}
            disabled={isFormEditable}
            onChange={value => handleFormValueChange('dateRangesWaste', value)}
            disabledDate={disabledDate}
            errors={formik?.errors}
          />
        </Col>
        <Col xs={24} md={12} lg={5}>
          <NumberInput
            value={formik?.values?.wastePrice}
            onChange={value => handleFormValueChange('wastePrice', value)}
            name="wastePrice"
            label={t('PRICE')}
            disabled={isFormEditable}
            errors={formik?.errors}
            precision={PRECISON_VALUES.TWO_DIGIT}
            step={NUMBER_INPUT_STEPS.TWO_STEP}
          />
        </Col>
        { formik?.values?.isDiscounted && (
        <Col xs={24} md={12} lg={4}>
          <NumberInput
            value={formik?.values?.limit}
            onChange={value => handleFormValueChange('limit', value)}
            name="limit"
            label={t('LIMIT')}
            disabled={isFormEditable}
            errors={formik?.errors}
          />
        </Col>
        )}
      </Row>
      <Row gutter={[16, 16]} className={className}>
        <Col span={24}>
          <Checkbox
            name="isDisounted"
            checked={formik?.values?.isDiscounted}
            disabled
          >{t('DISCOUNTED')}
          </Checkbox>
        </Col>
      </Row>
      <Row gutter={[16, 16]} className={className}>
        {
          formik?.values?.isDiscounted && (
            <>
              <Col xs={24} md={8} lg={6}>
                <Select
                  value={formik?.values?.discountedProvider.toString()}
                  optionsData={getStruckPriceSupporterOptions()}
                  name="discountedProvider"
                  label={t('DISCOUNTED_PROVIDER')}
                  disabled={isFormEditable}
                  onChange={value => handleFormValueChange('discountedProvider', value)}
                />
              </Col>
              <Col xs={24} md={3} className={className}>
                <RadioAntd.Group
                  value={supportType}
                  onChange={handleOptionChange}
                  disabled={isFormEditable || (formik?.values?.discountedProvider && supportRateDisabled)}
                >
                  <Radio value={MARKET_PRODUCT_SUPPORT_TYPE.AMOUNT}>{t('AMOUNT')}</Radio>
                  <Radio value={MARKET_PRODUCT_SUPPORT_TYPE.PERCENT}>{t('PERCENT')}</Radio>
                </RadioAntd.Group>
              </Col>
              <Col xs={24} md={8} lg={5}>
                {supportType === MARKET_PRODUCT_SUPPORT_TYPE.AMOUNT ? (
                  <NumberInput
                    disabled={isFormEditable || (formik?.values?.discountedProvider && supportRateDisabled)}
                    name="supportAmount"
                    value={formik?.values?.supportAmount}
                    onChange={value => handleFormValueChange('supportAmount', value)}
                    label={t('SUPPORT_AMOUNT')}
                    min={0}
                    precision={4}
                  />
                )
                  : (
                    <PercentageInput
                      errors={formik?.errors}
                      value={formik?.values.supportRate}
                      onChange={value => handleFormValueChange('supportRate', value)}
                      autoComplete="off"
                      name="supportRate"
                      label={t('SUPPORT_RATE')}
                      disabled={isFormEditable || (formik?.values?.discountedProvider && supportRateDisabled)}
                    />
                  )}
              </Col>
              <Col xs={24} md={8} lg={6}>
                <Checkbox
                  name="specialOffers"
                  checked={formik?.values?.specialOffers}
                  onChange={event => handleFormValueChange('specialOffers', event.target.checked)}
                  disabled={isFormEditable}
                >
                  {t('SPECIAL_OFFERS')}
                </Checkbox>
              </Col>
            </>
          )
        }
      </Row>
    </>
  );
};

export default ProductWastePrice;
