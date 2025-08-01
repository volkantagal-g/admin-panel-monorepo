import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Row, Col } from 'antd';

import CollapsePanel from '../../common/CollapsePanel';
import { clientListSections, getGSMCountryCodes } from '../../../constants';
import { getClientListData, getCollapseTriggeredKey } from '../../../redux/selectors';
import ActiveParamButtons from '../../common/ActiveParamButtons';
import CheckboxSelect from '../../common/CheckboxSelect';
import MultipleSelect from '../../common/MultipleSelect';

const subSectionName = 'gsmCountryCodeDetail';
const activeKey = `${clientListSections.getirGeneralDetail}.${subSectionName}`;

const GSMCountryCodeDetail = () => {
  const { t } = useTranslation('clientTargetingPage');
  const clientListData = useSelector(getClientListData(activeKey));
  const collapseTriggered = useSelector(getCollapseTriggeredKey(activeKey));

  const { activeIndex } = clientListData;
  const data = clientListData.params[activeIndex];

  const GSMCountryCodes = getGSMCountryCodes();

  return (
    <CollapsePanel header={t('GSM_COUNTRY_CODE_DETAIL')} activeKey={activeKey} triggerCollapseAction={collapseTriggered}>
      <ActiveParamButtons
        activeKey={activeKey}
        activeParamIndex={clientListData.activeIndex}
        paramsLength={clientListData.params.length}
      />
      <Row>
        <Col span={11}>
          <MultipleSelect
            activeKey={activeKey}
            value={data.gsmCountryCode}
            label={t('clientTargetingPage:GSM_COUNTRY_CODE')}
            clientListKey="gsmCountryCode"
            selectable={GSMCountryCodes}
            tagValue="label"
            tagKey="value"
            placeholder={t('clientTargetingPage:GSM_COUNTRY_CODE')}
            showCSVImporter
            allowClear
          />
          <CheckboxSelect
            activeKey={activeKey}
            label={t('clientTargetingPage:INCLUDE_CLIENTS')}
            value={data.includeClients}
            clientListKey="includeClients"
            description={t('clientTargetingPage:INCLUDE_CLIENTS_INFO')}
          />
        </Col>
      </Row>
    </CollapsePanel>
  );
};

export default GSMCountryCodeDetail;
