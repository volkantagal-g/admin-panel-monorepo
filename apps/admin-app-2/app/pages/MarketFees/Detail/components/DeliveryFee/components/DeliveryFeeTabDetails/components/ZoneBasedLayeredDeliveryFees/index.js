import { Col, Row } from 'antd';
import { useTranslation } from 'react-i18next';
import { get } from 'lodash';

import FeesTable from '../../../../../shared/FeesTable';

const ZoneBasedLayeredDeliveryFee = ({
  values = {},
  domainType,
  setFieldValue,
  isFormEditable,
  errors,
}) => {
  const { t } = useTranslation('feeDetailsPage');
  const zoneLabel = `${t('DELIVERY_FEE.ZONE_BASED_LAYERED_DELIVERY_FEE')} - ${t(
    'DELIVERY_FEE.ZONE.LABEL',
  )}`;
  return (
    <Row gutter={[4, 4]} data-testid="zone-based-layered-delivery-fee">
      <Col xs={24} md={12}>
        <FeesTable
          disabled={!isFormEditable}
          value={get(values, 'zoneBasedLayeredDeliveryFee.levelOne')}
          setFieldValue={setFieldValue}
          domainType={domainType}
          title={`${zoneLabel} 1`}
          orderFeeType="zoneBasedLayeredDeliveryFee"
          feeType="levelOne"
          errors={errors}
        />
      </Col>
      <Col xs={24} md={12}>
        <FeesTable
          disabled={!isFormEditable}
          value={get(values, 'zoneBasedLayeredDeliveryFee.levelTwo')}
          setFieldValue={setFieldValue}
          domainType={domainType}
          title={`${zoneLabel} 2`}
          orderFeeType="zoneBasedLayeredDeliveryFee"
          feeType="levelTwo"
          errors={errors}
        />
      </Col>
      <Col xs={24} md={12}>
        <FeesTable
          disabled={!isFormEditable}
          value={get(values, 'zoneBasedLayeredDeliveryFee.levelThree')}
          setFieldValue={setFieldValue}
          domainType={domainType}
          title={`${zoneLabel} 3`}
          orderFeeType="zoneBasedLayeredDeliveryFee"
          feeType="levelThree"
          errors={errors}
        />
      </Col>
    </Row>
  );
};

export default ZoneBasedLayeredDeliveryFee;
