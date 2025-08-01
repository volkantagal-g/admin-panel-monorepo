import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import CollapsePanel from '../../common/CollapsePanel';
import { clientListSections } from '../../../constants';
import ActiveParamButtons from '../../common/ActiveParamButtons';
import { getClientListData } from '../../../redux/selectors';
import SegmentListSelect from '../../common/SegmentListSelect';

const subSectionName = 'includedClientSegment';
const activeKey = `${clientListSections.getirFoodServiceDetail}.${subSectionName}`;

const Segmentation = () => {
  const { t } = useTranslation('clientTargetingPage');
  const clientListData = useSelector(getClientListData(activeKey));
  
  const { activeIndex } = clientListData;
  const data = clientListData.params[activeIndex];
  return (
    <CollapsePanel header={t("GF_SEGMENTATION")} activeKey={activeKey}>
      <ActiveParamButtons 
        activeKey={activeKey}
        activeParamIndex={clientListData.activeIndex}
        paramsLength={clientListData.params.length}
      />
      <SegmentListSelect 
        description={t("INCLUDED_SEGMENTS_DESCRIPTION")}
        activeKey={activeKey} 
        value={data.segments}
      />
    </CollapsePanel>
  );
};

export default Segmentation;
