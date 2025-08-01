import { memo, useMemo } from 'react';

import { useSelector } from 'react-redux';

import { Col, Row } from 'antd';

import { useTranslation } from 'react-i18next';

import { Select } from '@shared/components/GUI';
import { getMarketProductByIdSelector } from '@app/pages/MarketProduct/DetailV2/redux/selectors';
import { getCountryRestrictedDomainTypeOptions } from '@app/pages/MarketProduct/utils';
import { getSelectedCountryV2 } from '@shared/redux/selectors/countrySelection';
import { getSelectFilterOption } from '@shared/utils/common';

export const BaseBundlePrice = memo(function BaseBundlePrice({ defaultValue, onDomainChange }) {
  const { t } = useTranslation('marketProductPageV2');
  const countryCode = useSelector(getSelectedCountryV2).code.alpha2;
  const marketProduct = useSelector(getMarketProductByIdSelector.getData);

  const optionsDomain = useMemo(() => {
    return getCountryRestrictedDomainTypeOptions(countryCode).map(opt => {
      if (!marketProduct?.domainTypes?.includes(+opt.value)) {
        // eslint-disable-next-line no-param-reassign
        opt.disabled = true;
        // eslint-disable-next-line no-param-reassign
        opt.title = t('MAKE_THIS_OPTION_AVAILABLE_ON_GENERAL_INFO');
      }
      return opt;
    });
  }, [marketProduct, countryCode, t]);

  return (
    <Row gutter={[16, 16]}>
      <Col xs={24} md={6}>
        <Select
          optionsData={optionsDomain}
          filterOption={getSelectFilterOption}
          showSearch
          name="domainType"
          label={t('DOMAIN')}
          defaultValue={defaultValue?.toString()}
          onChange={onDomainChange}
        />
      </Col>
    </Row>
  );
});
