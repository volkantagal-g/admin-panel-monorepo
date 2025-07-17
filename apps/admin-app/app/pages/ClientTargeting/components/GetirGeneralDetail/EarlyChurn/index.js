import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Row, Col } from 'antd';

import CollapsePanel from '../../common/CollapsePanel';
import { clientListSections } from '../../../constants';
import ActiveParamButtons from '../../common/ActiveParamButtons';
import { getClientListData } from '../../../redux/selectors';
import MinMaxInput from '../../common/MinMaxInput';

const subSectionName = 'earlyChurn';
const activeKey = `${clientListSections.getirGeneralDetail}.${subSectionName}`;

const EarlyChurn = () => {
  const { t } = useTranslation('clientTargetingPage');
  const clientListData = useSelector(getClientListData(activeKey));

  const { activeIndex } = clientListData;
  const data = clientListData.params[activeIndex];
  return (
    <CollapsePanel header={t("EARLY_CHURN")} activeKey={activeKey}>
      <ActiveParamButtons 
        activeKey={activeKey}
        activeParamIndex={clientListData.activeIndex}
        paramsLength={clientListData.params.length}
      />
      <Row justify="space-between">
        <Col span={11}>
          <MinMaxInput 
            activeKey={activeKey}
            minCount={data.minValue}
            maxCount={data.maxValue}
            minCountKey="minValue"
            maxCountKey="maxValue"
            label={t("MIN_MAX_VALUE")}
            minLabel={t("MIN_VALUE")}
            maxLabel={t("MAX_VALUE")}
          />
        </Col>
      </Row>
    </CollapsePanel>
  );
};

export default EarlyChurn;
