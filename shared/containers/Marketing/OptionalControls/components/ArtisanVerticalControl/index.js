import { memo } from 'react';
import { Row, Card, Col } from 'antd';

import { useTranslation } from 'react-i18next';

import ArtisanVerticalSelect from '@shared/containers/Marketing/Select/ArtisanVerticalSelect';

const ArtisanVerticalControl = ({ parentFieldName, disabled }) => {
  const { t } = useTranslation('marketing');
  return (
    <Card size="small" title={t('GETIR_LOCALS_VERTICAL_CONTROL')}>
      <Row gutter={24}>
        <Col xs={24} sm={12} lg={24}>
          <ArtisanVerticalSelect fieldName={[parentFieldName, 'localVerticalIds']} mode="multiple" disabled={disabled} />
        </Col>
      </Row>
    </Card>
  );
};

export default memo(ArtisanVerticalControl);
