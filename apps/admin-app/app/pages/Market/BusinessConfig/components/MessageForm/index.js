// library imports
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Row, Col } from 'antd';

// shared imports
import { operationalCountriesSelector as countriesSelector } from '@shared/redux/selectors/common';
import { getSelectedCountryLanguages } from '@shared/redux/selectors/countrySelection';

// local imports
import { businessConfigUpdateTypes } from '@app/pages/Market/BusinessConfig/constants';
import MessageConfigDisplayEdit from './messageConfigDisplayEdit';

const MessageForm = ({
  isEditEligible = false,
  configUnit = '',
}) => {
  const countries = useSelector(countriesSelector.getData);

  const selectableLanguages = useMemo(() => {
    const uniqueLanguages = new Set();
    countries.forEach(country => uniqueLanguages.add(...country.languageSortOrder));
    return Array.from(uniqueLanguages);
  }, [countries]);

  const countryLanguages = getSelectedCountryLanguages();

  return (
    <Row>
      <Col span={24}>
        <Row>
          {Object.keys(businessConfigUpdateTypes).map(businessConfigUpdateType => {
            const formId = `${configUnit}-${businessConfigUpdateType}`;
            return (
              <Col style={{ padding: '8px' }} key={formId} span={12}>
                <MessageConfigDisplayEdit
                  businessConfigUpdateType={businessConfigUpdateType}
                  isEditEligible={isEditEligible}
                  formId={formId}
                  configUnit={configUnit}
                  languages={(businessConfigUpdateType === businessConfigUpdateTypes.GLOBAL) ? selectableLanguages : countryLanguages}
                />
              </Col>
            );
          })}
        </Row>
      </Col>
    </Row>
  );
};

export default MessageForm;
