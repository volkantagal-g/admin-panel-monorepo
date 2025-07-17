import { memo } from 'react';
import { Row, Card, Col } from 'antd';

import { useTranslation } from 'react-i18next';

import ProductCategorySelect from '@shared/containers/Marketing/Select/ProductCategorySelect';

const GetirMarketSubCategoryControl = ({ parentFieldName, disabled }) => {
  const { t } = useTranslation('marketing');
  return (
    <Card size="small" title={t('GETIR_10_SUB_CATEGORY_CONTROL')}>
      <Row gutter={24}>
        <Col xs={24} sm={12} lg={24}>
          <ProductCategorySelect
            rules={[{ required: true, message: t('error:REQUIRED') }]}
            onlySubCategories
            mode="multiple"
            fieldName={[parentFieldName, 'marketCategoryIds']}
            disabled={disabled}
          />
        </Col>
      </Row>
    </Card>
  );
};

export default memo(GetirMarketSubCategoryControl);
