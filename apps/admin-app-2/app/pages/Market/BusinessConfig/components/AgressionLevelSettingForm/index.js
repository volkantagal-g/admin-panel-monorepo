// library imports
import { Row, Col } from 'antd';

// local import
import { businessConfigUpdateTypes } from '@app/pages/Market/BusinessConfig/constants';
import AggressionLevelConfigDisplayEdit from './aggressionLevelConfigDisplayEdit';

const AgressionLevelSettingForm = ({
  isEditEligible = false,
  configUnit = '',
}) => {
  return (
    <Row>
      <Col span={24}>
        <Row>
          {Object.keys(businessConfigUpdateTypes).map(businessConfigUpdateType => {
            const formId = `${configUnit}-${businessConfigUpdateType}`;
            return (
              <Col style={{ padding: '8px' }} key={formId} span={12}>
                <AggressionLevelConfigDisplayEdit
                  businessConfigUpdateType={businessConfigUpdateType}
                  isEditEligible={isEditEligible}
                  formId={formId}
                  configUnit={configUnit}
                />
              </Col>
            );
          })}
        </Row>
      </Col>
    </Row>
  );
};

export default AgressionLevelSettingForm;
