// library imports
import { Row, Col } from 'antd';
import { get } from 'lodash';

// shared imports
import { getSelectedCountry } from '@shared/redux/selectors/countrySelection';

// local import
import { businessConfigUpdateTypes } from '@app/pages/Market/BusinessConfig/constants';
import QueueAndTimeConfigDisplayEdit from './queueAndTimeConfigDisplayEdit';

const QueueAndTimeSettingForm = ({
  isEditEligible = false,
  configUnit = '',
}) => {
  const selectedCountry = getSelectedCountry();
  const selectedCountryCode = get(selectedCountry, 'code.alpha2', '');

  return (
    <Row>
      <Col span={24}>
        <Row>
          {Object.keys(businessConfigUpdateTypes).map(businessConfigUpdateType => {
            const formId = `${configUnit}-${businessConfigUpdateType}`;
            return (
              <Col style={{ padding: '8px' }} key={formId} span={12}>
                <QueueAndTimeConfigDisplayEdit
                  businessConfigUpdateType={businessConfigUpdateType}
                  isEditEligible={isEditEligible}
                  formId={formId}
                  configUnit={configUnit}
                  languages={(businessConfigUpdateType === businessConfigUpdateTypes.GLOBAL) ? [] : [selectedCountryCode]}
                />
              </Col>
            );
          })}
        </Row>
      </Col>
    </Row>
  );
};

export default QueueAndTimeSettingForm;
