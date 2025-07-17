import { Col, Row } from 'antd';
import { useTranslation } from 'react-i18next';
import { get } from 'lodash';

import FeesTable from '../../../../../shared/FeesTable';

const DynamicDeliveryFee = ({ domainType, setFieldValue, values, isFormEditable, validateField, errors }) => {
  const { t } = useTranslation('feeDetailsPage');

  return (
    <Row gutter={[4, 4]} data-testid="dynamic-service-fee">
      <Col xs={24} md={12}>
        <FeesTable
          disabled={!isFormEditable}
          value={get(values, 'dynamicServiceFee.levelOne')}
          setFieldValue={setFieldValue}
          domainType={domainType}
          title={`${t('SERVICE_FEE.DYNAMIC_LEVEL')} 1`}
          orderFeeType="dynamicServiceFee"
          feeType="levelOne"
          validateField={validateField}
          errors={errors}
        />
      </Col>
      <Col xs={24} md={12}>
        <FeesTable
          disabled={!isFormEditable}
          value={get(values, 'dynamicServiceFee.levelTwo')}
          setFieldValue={setFieldValue}
          domainType={domainType}
          title={`${t('SERVICE_FEE.DYNAMIC_LEVEL')} 2`}
          orderFeeType="dynamicServiceFee"
          feeType="levelTwo"
          validateField={validateField}
          errors={errors}
        />
      </Col>
      <Col xs={24} md={12}>
        <FeesTable
          disabled={!isFormEditable}
          value={get(values, 'dynamicServiceFee.levelThree')}
          setFieldValue={setFieldValue}
          domainType={domainType}
          title={`${t('SERVICE_FEE.DYNAMIC_LEVEL')} 3`}
          orderFeeType="dynamicServiceFee"
          feeType="levelThree"
          validateField={validateField}
          errors={errors}
        />
      </Col>
      <Col xs={24} md={12}>
        <FeesTable
          disabled={!isFormEditable}
          value={get(values, 'dynamicServiceFee.levelFour')}
          setFieldValue={setFieldValue}
          domainType={domainType}
          title={`${t('SERVICE_FEE.DYNAMIC_LEVEL')} 4`}
          orderFeeType="dynamicServiceFee"
          feeType="levelFour"
          validateField={validateField}
          errors={errors}
        />
      </Col>
      <Col xs={24} md={12}>
        <FeesTable
          disabled={!isFormEditable}
          value={get(values, 'dynamicServiceFee.levelFive')}
          setFieldValue={setFieldValue}
          domainType={domainType}
          title={`${t('SERVICE_FEE.DYNAMIC_LEVEL')} 5`}
          orderFeeType="dynamicServiceFee"
          feeType="levelFive"
          validateField={validateField}
          errors={errors}
        />
      </Col>
    </Row>
  );
};

export default DynamicDeliveryFee;
