import { Col, Row } from 'antd';
import { useTranslation } from 'react-i18next';
import { get } from 'lodash';

import FeesTable from '../../../../../shared/FeesTable';

const LayeredDeliveryFee = ({
  values = {},
  domainType,
  setFieldValue,
  isFormEditable,
  errors,
}) => {
  const { t } = useTranslation('feeDetailsPage');

  return (
    <Row gutter={[4, 4]} data-testid="layered-delivery-fee">
      <Col xs={24} md={12}>
        <FeesTable
          disabled={!isFormEditable}
          value={get(values, 'layeredDeliveryFee.regular')}
          setFieldValue={setFieldValue}
          domainType={domainType}
          title={t('DELIVERY_FEE.CONFIG.LAYERED_SERVICE_FEE_REGULAR')}
          orderFeeType="layeredDeliveryFee"
          feeType="regular"
          errors={errors}
        />
      </Col>
      <Col xs={24} md={12}>
        <FeesTable
          disabled={!isFormEditable}
          value={get(values, 'layeredDeliveryFee.peak')}
          setFieldValue={setFieldValue}
          domainType={domainType}
          title={t('DELIVERY_FEE.CONFIG.LAYERED_SERVICE_FEE_PEAK')}
          orderFeeType="layeredDeliveryFee"
          feeType="peak"
          errors={errors}
        />
      </Col>
    </Row>
  );
};

export default LayeredDeliveryFee;
