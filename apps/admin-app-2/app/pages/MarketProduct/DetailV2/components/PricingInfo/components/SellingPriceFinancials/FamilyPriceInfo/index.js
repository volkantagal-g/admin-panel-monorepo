import { memo } from 'react';

import { useTranslation } from 'react-i18next';

import { Col, Row } from 'antd';

import { NumberInput } from '@shared/components/GUI';

export const FamilyPriceInfo = memo(function FamilyPriceInfo({ familyPrice }) {
  const { t } = useTranslation('marketProductPageV2');
  return (
    <Row>
      <Col xs={24} md={8}>
        <NumberInput
          data-testid="familyPrice"
          name="familyPrice"
          label={t('FAMILY_PRICE')}
          disabled
          value={familyPrice}
        />
      </Col>
    </Row>
  );
});
