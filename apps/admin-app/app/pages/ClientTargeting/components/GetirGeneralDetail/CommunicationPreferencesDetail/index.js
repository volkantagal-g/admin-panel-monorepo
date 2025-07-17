import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Row, Col } from 'antd';

import CollapsePanel from '../../common/CollapsePanel';
import { clientListSections, getCommunicationPreferencesOptions } from '../../../constants';
import { getClientListData, getCollapseTriggeredKey } from '../../../redux/selectors';
import ActiveParamButtons from '../../common/ActiveParamButtons';
import MultipleSelect from '../../common/MultipleSelect';

const subSectionName = 'communicationPreferencesDetail';
const activeKey = `${clientListSections.getirGeneralDetail}.${subSectionName}`;

const CommunicationPreferencesDetail = () => {
  const { t } = useTranslation('clientTargetingPage');
  const clientListData = useSelector(getClientListData(activeKey));
  const collapseTriggered = useSelector(getCollapseTriggeredKey(activeKey));

  const { activeIndex } = clientListData;
  const data = clientListData.params[activeIndex];

  const communicationPreferencesOptions = getCommunicationPreferencesOptions();

  return (
    <CollapsePanel header={t('COMMUNICATION_PREFERENCES_DETAIL')} activeKey={activeKey} triggerCollapseAction={collapseTriggered}>
      <ActiveParamButtons
        activeKey={activeKey}
        activeParamIndex={clientListData.activeIndex}
        paramsLength={clientListData.params.length}
      />
      <Row>
        <Col span={11}>
          <MultipleSelect
            activeKey={activeKey}
            value={data.allowedCommunicationType}
            label={t('clientTargetingPage:ALLOWED_COMMUNICATION_TYPE.TITLE')}
            clientListKey="allowedCommunicationType"
            selectable={communicationPreferencesOptions}
            tagValue="label"
            tagKey="value"
            placeholder={t('clientTargetingPage:ALLOWED_COMMUNICATION_TYPE.TITLE')}
            description={`${t('clientTargetingPage:AND_FILTER_INFO')} ${t('clientTargetingPage:ALLOWED_COMMUNICATION_TYPE.INFO')}`}
          />
        </Col>
        <Col span={11}>
          <MultipleSelect
            activeKey={activeKey}
            value={data.notAllowedCommunicationType}
            label={t('clientTargetingPage:NOT_ALLOWED_COMMUNICATION_TYPE.TITLE')}
            clientListKey="notAllowedCommunicationType"
            selectable={communicationPreferencesOptions}
            tagValue="label"
            tagKey="value"
            placeholder={t('clientTargetingPage:NOT_ALLOWED_COMMUNICATION_TYPE.TITLE')}
            description={`${t('clientTargetingPage:AND_FILTER_INFO')} ${t('clientTargetingPage:NOT_ALLOWED_COMMUNICATION_TYPE.INFO')}`}
          />
        </Col>
      </Row>
    </CollapsePanel>
  );
};

export default CommunicationPreferencesDetail;
