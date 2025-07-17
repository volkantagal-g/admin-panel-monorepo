import { memo, useMemo } from 'react';

import { useTranslation } from 'react-i18next';

import { Col, Row } from 'antd';

import { useSelector } from 'react-redux';

import { getInitialValues } from './formHelper';

import { getMarketProductAllPriceSelector } from '@app/pages/MarketProduct/DetailV2/redux/selectors';
import { Select } from '@shared/components/GUI';

export const Barcode = memo(function Barcode() {
  const marketProductAllPrice = useSelector(getMarketProductAllPriceSelector.getData);
  const { t } = useTranslation('marketProductPageV2');

  const initialValues = useMemo(
    () => getInitialValues(marketProductAllPrice),
    [marketProductAllPrice],
  );

  return (
    <Row>
      <Col xs={24} lg={8}>
        <Select
          data-testid="barcodes-test"
          name="barcodes"
          mode="tags"
          label={t('BARCODE.TITLE')}
          value={initialValues.barcodes}
          disabled
        />
      </Col>
    </Row>
  );
});
