import { Col, Row } from 'antd';
import { useTranslation } from 'react-i18next';
import { get } from 'lodash';

import FeesTable from '../../../../../shared/FeesTable';

const DynamicDeliveryFee = ({ domainType, values, setFieldValue, isFormEditable, errors }) => {
  const { t } = useTranslation('feeDetailsPage');
  return (
    <Row gutter={[4, 4]} data-testid="dynamic-delivery-fee">
      <Col xs={24} md={12}>
        <FeesTable
          disabled={!isFormEditable}
          value={get(values, 'dynamicDeliveryFee.levelOne')}
          setFieldValue={setFieldValue}
          domainType={domainType}
          title={`${t('DELIVERY_FEE.DYNAMIC_LEVEL')} 1`}
          orderFeeType="dynamicDeliveryFee"
          feeType="levelOne"
          errors={errors}
        />
      </Col>
      <Col xs={24} md={12}>
        <FeesTable
          disabled={!isFormEditable}
          value={get(values, 'dynamicDeliveryFee.levelTwo')}
          setFieldValue={setFieldValue}
          domainType={domainType}
          title={`${t('DELIVERY_FEE.DYNAMIC_LEVEL')} 2`}
          orderFeeType="dynamicDeliveryFee"
          feeType="levelTwo"
          errors={errors}
        />
      </Col>
      <Col xs={24} md={12}>
        <FeesTable
          disabled={!isFormEditable}
          value={get(values, 'dynamicDeliveryFee.levelThree')}
          setFieldValue={setFieldValue}
          domainType={domainType}
          title={`${t('DELIVERY_FEE.DYNAMIC_LEVEL')} 3`}
          orderFeeType="dynamicDeliveryFee"
          feeType="levelThree"
          errors={errors}
        />
      </Col>
      <Col xs={24} md={12}>
        <FeesTable
          disabled={!isFormEditable}
          value={get(values, 'dynamicDeliveryFee.levelFour')}
          setFieldValue={setFieldValue}
          domainType={domainType}
          title={`${t('DELIVERY_FEE.DYNAMIC_LEVEL')} 4`}
          orderFeeType="dynamicDeliveryFee"
          feeType="levelFour"
          errors={errors}
        />
      </Col>
      <Col xs={24} md={12}>
        <FeesTable
          disabled={!isFormEditable}
          value={get(values, 'dynamicDeliveryFee.levelFive')}
          setFieldValue={setFieldValue}
          domainType={domainType}
          title={`${t('DELIVERY_FEE.DYNAMIC_LEVEL')} 5`}
          orderFeeType="dynamicDeliveryFee"
          feeType="levelFive"
          errors={errors}
        />
      </Col>
    </Row>
  );
};

export default DynamicDeliveryFee;
