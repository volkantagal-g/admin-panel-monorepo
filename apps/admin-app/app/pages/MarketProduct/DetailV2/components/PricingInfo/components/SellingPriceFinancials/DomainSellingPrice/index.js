import { memo } from 'react';
import { useSelector } from 'react-redux';
import { Col, Row } from 'antd';

import { useTranslation } from 'react-i18next';

import { NumberInput, Select } from '@shared/components/GUI';
import { getCountryRestrictedDomainTypeOptions } from '@app/pages/MarketProduct/utils';
import { getSelectFilterOption } from '@shared/utils/common';
import { StruckPriceItems } from '@app/pages/MarketProduct/DetailV2/components/PricingInfo/components/SellingPriceFinancials/StruckPriceItems';
import useStyles from '@app/pages/MarketProduct/DetailV2/components/PricingInfo/components/SellingPriceFinancials/commonStyles';
import { getSelectedCountryV2 } from '@shared/redux/selectors/countrySelection';

export const DomainSellingPrice = memo(function DomainSellingPrice({
  formik, priceType,
  isStruckPriceSelected,
  doesHaveDomainPrice,
  handleSelectDiscounted,
  supportType,
  setSupportType,
}) {
  const { t } = useTranslation('marketProductPageV2');
  const classes = useStyles();
  const countryCode = useSelector(getSelectedCountryV2).code.alpha2;

  const handleSelectDomainType = value => {
    formik?.setFieldValue('domainType', value);
  };

  const handleChangeDomainPrice = value => {
    formik?.setFieldValue('domainPrice', value);
  };

  return (
    <>
      <Row gutter={[16, 16]} className={classes.row}>
        <Col xs={24} md={6}>
          <Select
            errors={formik.errors}
            optionsData={getCountryRestrictedDomainTypeOptions(countryCode)}
            filterOption={getSelectFilterOption}
            showSearch
            name="domainType"
            label={t('DOMAIN')}
            onChange={handleSelectDomainType}
          />
        </Col>
        <Col xs={24} md={6}>
          <NumberInput
            data-testid="domain-price"
            name="domainPrice"
            label={t('PRICE')}
            errors={formik.errors}
            onChange={handleChangeDomainPrice}
            min={0}
            precision={2}
            step={0.01}
          />
        </Col>
      </Row>
      <StruckPriceItems
        formik={formik}
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
