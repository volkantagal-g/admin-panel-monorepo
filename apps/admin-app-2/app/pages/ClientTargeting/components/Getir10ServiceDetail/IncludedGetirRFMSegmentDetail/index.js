import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Row, Col } from 'antd';

import CollapsePanel from '../../common/CollapsePanel';
import { clientListSections } from '../../../constants';
import ActiveParamButtons from '../../common/ActiveParamButtons';
import { getClientListData } from '../../../redux/selectors';
import MinMaxInput from '../../common/MinMaxInput';
import SegmentListSelect from '../../common/SegmentListSelect';

const subSectionName = 'includedRFTMSegment';
const activeKey = `${clientListSections.getir10ServiceDetail}.${subSectionName}`;

const IncludedGetirRFMSegmentDetail = () => {
  const { t } = useTranslation('clientTargetingPage');
  const clientListData = useSelector(getClientListData(activeKey));

  const { activeIndex } = clientListData;
  const data = clientListData.params[activeIndex];

  return (
    <CollapsePanel header={t("INCLUDED_G10_RFM_SEGMENT_DETAIL")} activeKey={activeKey}>
      <ActiveParamButtons 
        activeKey={activeKey}
        activeParamIndex={clientListData.activeIndex}
        paramsLength={clientListData.params.length}
      />
      <Row justify="space-between">
        <Col span={11}>
          <MinMaxInput 
            activeKey={activeKey}
            minCount={data.minRValue}
            maxCount={data.maxRValue}
            minCountKey="minRValue"
            maxCountKey="maxRValue"
            label={t("R_VALUE")}
            description={t("R_VALUE_DESCRIPTION")}
          />
          <MinMaxInput 
            activeKey={activeKey}
            minCount={data.minFValue}
            maxCount={data.maxFValue}
            minCountKey="minFValue"
            maxCountKey="maxFValue"
            label={t("F_VALUE")}
            description={t("F_VALUE_DESCRIPTION")}
          />
          <MinMaxInput 
            activeKey={activeKey}
            minCount={data.minTValue}
            maxCount={data.maxTValue}
            minCountKey="minTValue"
            maxCountKey="maxTValue"
            label={t("T_VALUE")}
            description={t("T_VALUE_DESCRIPTION")}
          />
          <MinMaxInput 
            activeKey={activeKey}
            minCount={data.minMValue}
            maxCount={data.maxMValue}
            minCountKey="minMValue"
            maxCountKey="maxMValue"
            label={t("M_VALUE")}
            description={t("M_VALUE_DESCRIPTION")}
          />
          <MinMaxInput 
            activeKey={activeKey}
            minCount={data.minHValue}
            maxCount={data.maxHValue}
            minCountKey="minHValue"
            maxCountKey="maxHValue"
            label={t("H_VALUE")}
            description={t("H_VALUE_DESCRIPTION")}
          />
        </Col>
      </Row>
      <SegmentListSelect 
        activeKey={activeKey} 
        value={data.segments}
        label={t("INCLUDED_RFM_SEGMENTS")}
        description={t("INCLUDED_RFM_SEGMENTS_DESCRIPTION")}
      />
    </CollapsePanel>
  );
};

export default IncludedGetirRFMSegmentDetail;
