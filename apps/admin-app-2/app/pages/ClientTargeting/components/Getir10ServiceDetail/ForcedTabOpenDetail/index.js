import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Row, Col } from 'antd';

import CollapsePanel from '../../common/CollapsePanel';
import { clientListSections } from '../../../constants';
import ActiveParamButtons from '../../common/ActiveParamButtons';
import { getClientListData } from '../../../redux/selectors';
import MinMaxInput from '../../common/MinMaxInput';
import WarehouseBundleFilter from '../../common/WarehouseBundleFilter';

const subSectionName = 'forcedTabOpen';
const activeKey = `${clientListSections.getir10ServiceDetail}.${subSectionName}`;

const ForcedTabOpenDetail = () => {
  const { t } = useTranslation('clientTargetingPage');
  const clientListData = useSelector(getClientListData(activeKey));

  const { activeIndex } = clientListData;
  const data = clientListData.params[activeIndex];

  const minCountKey = 'minTabOpenCount';
  const maxCountKey = 'maxTabOpenCount';

  return (
    <CollapsePanel header={t('G10_FORCED_TAB_OPEN_DETAIL')} activeKey={activeKey}>
      <ActiveParamButtons activeKey={activeKey} activeParamIndex={clientListData.activeIndex} paramsLength={clientListData.params.length} />
      <Row justify="space-between">
        <Col span={11}>
          <WarehouseBundleFilter
            activeKey={activeKey}
          />
        </Col>
        <Col span={11}>
          <MinMaxInput
            activeKey={activeKey}
            minCount={data[minCountKey]}
            maxCount={data[maxCountKey]}
            minCountKey={minCountKey}
            maxCountKey={maxCountKey}
            label={t('TAB_OPEN_COUNT')}
          />
        </Col>
      </Row>
    </CollapsePanel>
  );
};

export default ForcedTabOpenDetail;
