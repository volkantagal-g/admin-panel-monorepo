import { Col, Row } from 'antd';
import { useTranslation } from 'react-i18next';
import { get } from 'lodash';

import FeesTable from '../../../../../shared/FeesTable';

const LayeredServiceFee = ({
  domainType,
  isFormEditable,
  setFieldValue,
  values,
  errors,
}) => {
  const { t } = useTranslation('feeDetailsPage');

  return (
    <Row gutter={[4, 4]} data-testid="layered-service-fee">
      <Col xs={24} md={12}>
        <FeesTable
          disabled={!isFormEditable}
          value={get(values, 'layeredServiceFee.regular')}
          setFieldValue={setFieldValue}
          domainType={domainType}
          title={t('SERVICE_FEE.CONFIG.LAYERED_SERVICE_FEE_REGULAR')}
          orderFeeType="layeredServiceFee"
          feeType="regular"
          errors={errors}
        />
      </Col>
      <Col xs={24} md={12}>
        <FeesTable
          disabled={!isFormEditable}
          value={get(values, 'layeredServiceFee.peak')}
          setFieldValue={setFieldValue}
          domainType={domainType}
          title={t('SERVICE_FEE.CONFIG.LAYERED_SERVICE_FEE_PEAK')}
          orderFeeType="layeredServiceFee"
          feeType="peak"
          errors={errors}
        />
      </Col>
    </Row>
  );
};

export default LayeredServiceFee;
