import { memo } from 'react';
import { Col, Row } from 'antd';

import { useTranslation } from 'react-i18next';

import { useSelector } from 'react-redux';

import { NumberInput, PercentageInput, Select, TextInput } from '@shared/components/GUI';

import { Column } from './Column';

import { InfoIcon } from '@shared/components/GUI/InfoIcon';
import { priceFormatter } from '@app/pages/MarketProduct/utils';
import { NUMBER_INPUT_STEPS, PRECISON_VALUES } from '@app/pages/MarketProduct/DetailV2/components/PricingInfo/constants';
import { getMarketProductAllPriceSelector, getMarketProductByIdSelector } from '@app/pages/MarketProduct/DetailV2/redux/selectors';
import { getVatOptions } from '@app/pages/MarketProduct/DetailV2/components/PricingInfo/util';

export const FormItems = memo(function FormItems({ errors, handleCalculationFieldsChange, handleFormValueChange, values }) {
  const { t } = useTranslation('marketProductPageV2');
  const { cogs, netCogs } = useSelector(getMarketProductAllPriceSelector.getData);

  const { isFresh } = useSelector(getMarketProductByIdSelector.getData);

  return (
    <Row gutter={[16, 16]}>
      <Col xs={24} md={12} lg={6} xl={4}>
        <Column title={t('VATS')}>
          <Select
            name="wholesaleVat"
            label={t('BUYING')}
            errors={errors}
            onChange={value => {
              handleFormValueChange('wholesaleVat', value);
              handleCalculationFieldsChange();
            }}
            value={values?.wholesaleVat}
            optionsData={getVatOptions()}
          />
        </Column>
      </Col>
      <Col xs={24} md={12} lg={6} xl={3}>
        <Column title={isFresh ? <>{t('LIST_PRICE_PER_KG')}<InfoIcon title={t('LIST_PRICE_FRESH_INFO')} /></> : t('LIST_PRICE')}>
          <NumberInput
            name="listPrice"
            label={t('WITHOUT_VAT')}
            errors={errors}
            onChange={value => {
              handleFormValueChange('listPrice', value);
              handleCalculationFieldsChange();
            }}
            value={values?.listPrice}
            precision={PRECISON_VALUES.TWO_DIGIT}
            step={NUMBER_INPUT_STEPS.TWO_STEP}
          />
          <TextInput name="wholesalePrice" label={t('WITH_VAT')} disabled errors={errors} value={priceFormatter(values?.wholesalePrice)} />
        </Column>
      </Col>
      <Col xs={24} md={12} lg={6} xl={4}>
        <Column title={t('PRICE_REDUCTION')}>
          <PercentageInput
            name="totalPriceReduction"
            label={t('PERCENT')}
            errors={errors}
            onChange={value => {
              handleFormValueChange('totalPriceReduction', value || 0);
              handleCalculationFieldsChange();
            }}
            value={values?.totalPriceReduction || 0}
          />
        </Column>
      </Col>
      <Col xs={24} md={12} lg={6} xl={3}>
        <Column title={t('NET_INVOICE_PRICE')}>
          <TextInput
            name="netInvoicePriceWithoutVat"
            data-testid="netInvoicePriceWithoutVat"
            label={t('WITHOUT_VAT')}
            disabled
            errors={errors}
            value={priceFormatter(values?.netInvoicePriceWithoutVat)}
          />
          <TextInput
            name="netInvoicePriceWithVat"
            data-testid="netInvoicePriceWithVat"
            label={t('WITH_VAT')}
            disabled
            errors={errors}
            value={priceFormatter(values?.netInvoicePriceWithVat)}
          />
        </Column>
      </Col>
      <Col xs={24} md={12} lg={6} xl={3}>
        <Column title={t('NET_BUYING_PRICE')}>
          <TextInput
            name="netNetBuyingPriceWithoutVat"
            data-testid="netNetBuyingPriceWithoutVat"
            label={t('WITHOUT_VAT')}
            disabled
            errors={errors}
            value={priceFormatter(values?.netNetBuyingPriceWithoutVat)}
          />
          <TextInput
            name="netNetBuyingPriceWithVat"
            data-testid="netNetBuyingPriceWithVat"
            label={t('WITH_VAT')}
            disabled
            errors={errors}
            value={priceFormatter(values?.netNetBuyingPriceWithVat)}
          />
        </Column>
      </Col>
      <Col xs={24} md={12} lg={6} xl={3}>
        <Column title={<>{t('COGS')}<InfoIcon title={t('COGS_INFO')} /></>}>
          <TextInput disabled errors={errors} data-testid="cogs" label={t('COGS')} value={cogs} />
          <TextInput disabled errors={errors} data-testid="netCogs" label={t('NET_COGS')} value={netCogs} />
        </Column>
      </Col>
      <Col xs={24} md={12} lg={6} xl={4}>
        <Column title={t('PAYMENT_DUE_DAY')}>
          <NumberInput
            name="paymentDueDay"
            errors={errors}
            onChange={value => handleFormValueChange('paymentDueDay', value)}
            value={values?.paymentDueDay}
            step={1}
          />
        </Column>
      </Col>
    </Row>
  );
});
