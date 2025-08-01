import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Row, Col } from 'antd';

import CollapsePanel from '../../common/CollapsePanel';
import { clientListSections } from '../../../constants';
import ActiveParamButtons from '../../common/ActiveParamButtons';
import { getClientListData } from '../../../redux/selectors';
import MinMaxInput from '../../common/MinMaxInput';

const subSectionName = 'buildNumber';
const activeKey = `${clientListSections.getirGeneralDetail}.${subSectionName}`;

const BuildNumberDetail = () => {
  const { t } = useTranslation('clientTargetingPage');
  const clientListData = useSelector(getClientListData(activeKey));
  
  const { activeIndex } = clientListData;
  const data = clientListData.params[activeIndex];
  return (
    <CollapsePanel header={t("BUILD_NUMBER_DETAIL")} activeKey={activeKey}>
      <ActiveParamButtons 
        activeKey={activeKey}
        activeParamIndex={clientListData.activeIndex}
        paramsLength={clientListData.params.length}
      />
      <Row justify="space-between">
        <Col span={11}>
          <MinMaxInput 
            activeKey={activeKey}
            minCount={data.minIOSBuildNumber}
            maxCount={data.maxIOSBuildNumber}
            minCountKey="minIOSBuildNumber"
            maxCountKey="maxIOSBuildNumber"
            label={t("iOS")}
            minLabel={t("MIN_BUILD_NUMBER")}
            maxLabel={t("MAX_BUILD_NUMBER")}
          />
        </Col>
        <Col span={11}>
          <MinMaxInput 
            activeKey={activeKey}
            minCount={data.minAndroidBuildNumber}
            maxCount={data.maxAndroidBuildNumber}
            minCountKey="minAndroidBuildNumber"
            maxCountKey="maxAndroidBuildNumber"
            label={t("Android")}
            minLabel={t("MIN_BUILD_NUMBER")}
            maxLabel={t("MAX_BUILD_NUMBER")}
          />
        </Col>
      </Row>
    </CollapsePanel>
  );
};

export default BuildNumberDetail;
