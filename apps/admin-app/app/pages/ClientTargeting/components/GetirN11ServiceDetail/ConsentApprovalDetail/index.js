import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Row, Col } from 'antd';

import CollapsePanel from '../../common/CollapsePanel';
import ActiveParamButtons from '../../common/ActiveParamButtons';
import CheckboxSelect from '../../common/CheckboxSelect';
import { clientListSections } from '../../../constants';
import { getClientListData } from '../../../redux/selectors';

const subSectionName = 'consentApproval';
const activeKey = `${clientListSections.getirN11ServiceDetail}.${subSectionName}`;

const ConsentApprovalDetail = () => {
  const { t } = useTranslation('clientTargetingPage');
  const clientListData = useSelector(getClientListData(activeKey));

  const { activeIndex } = clientListData;
  const data = clientListData.params[activeIndex];

  return (
    <CollapsePanel header={t('GETIR_N11_CONSENT_APPROVAL_DETAIL')} activeKey={activeKey}>
      <ActiveParamButtons
        activeKey={activeKey}
        activeParamIndex={clientListData.activeIndex}
        paramsLength={clientListData.params.length}
      />
      <Row justify="space-between">
        <Col span={11}>
          <CheckboxSelect
            activeKey={activeKey}
            label={t('global:YES')}
            value={data.isApproved}
            clientListKey="isApproved"
          />
        </Col>
      </Row>
    </CollapsePanel>
  );
};

export default ConsentApprovalDetail;
