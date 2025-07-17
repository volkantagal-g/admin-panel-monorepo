import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Row, Col } from 'antd';

import CollapsePanel from '../../common/CollapsePanel';
import { clientListSections } from '../../../constants';
import ActiveParamButtons from '../../common/ActiveParamButtons';
import { getClientListData } from '../../../redux/selectors';
import SingleSelect from '../../common/SingleSelect';
import MinMaxInput from '../../common/MinMaxInput';

const subSectionName = 'baseUserClient';
const activeKey = `${clientListSections.getirGeneralDetail}.${subSectionName}`;

const BaseUserScore = () => {
  const { t } = useTranslation('clientTargetingPage');
  const clientListData = useSelector(getClientListData(activeKey));

  const { activeIndex } = clientListData;
  const data = clientListData.params[activeIndex];

  const baseUserClientScoreTypes = [
    { key: 'minMaxValue', value: t("MIN_MAX_VALUE") },
    { key: 'possibility', value: t("POSSIBILITY") },
  ];

  return (
    <CollapsePanel header={t("BASE_USER_CLIENT_DETAIL")} activeKey={activeKey}>
      <ActiveParamButtons 
        activeKey={activeKey}
        activeParamIndex={clientListData.activeIndex}
        paramsLength={clientListData.params.length}
      />
      <Row align="middle">
        <Col span={11}>
          <SingleSelect 
            activeKey={activeKey} 
            label={t("TYPE")}
            clientListKey="scoreType"
            value={data.scoreType}
            selectable={baseUserClientScoreTypes}
          />
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

export default BaseUserScore;
