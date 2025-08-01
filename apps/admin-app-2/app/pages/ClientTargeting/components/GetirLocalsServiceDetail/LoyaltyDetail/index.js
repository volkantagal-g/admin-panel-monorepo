import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Row, Col } from 'antd';

import CollapsePanel from '../../common/CollapsePanel';
import { clientListSections } from '../../../constants';
import ActiveParamButtons from '../../common/ActiveParamButtons';
import { getClientListData } from '../../../redux/selectors';
import MinMaxInput from '../../common/MinMaxInput';

const subSectionName = 'loyalty';
const activeKey = `${clientListSections.getirLocalsServiceDetail}.${subSectionName}`;

const LoyaltyDetail = () => {
  const { t } = useTranslation('clientTargetingPage');
  const clientListData = useSelector(getClientListData(activeKey));

  const { activeIndex } = clientListData;
  const data = clientListData.params[activeIndex];

  const [minStampOrderCountKey, maxStampOrderCountKey] = ['minStampOrderCount', 'maxStampOrderCount'];
  const [minFreeOrderCountKey, maxFreeOrderCountKey] = ['minFreeOrderCount', 'maxFreeOrderCount'];
  const [minLastOrderDayDiffKey, maxLastOrderDayDiffKey] = ['minLastOrderDayDiff', 'maxLastOrderDayDiff'];

  return (
    <CollapsePanel header={t('GETIR_LOCALS_LOYALTY_DETAIL')} activeKey={activeKey}>
      <ActiveParamButtons
        activeKey={activeKey}
        activeParamIndex={activeIndex}
        paramsLength={clientListData.params.length}
      />
      <Row justify="space-between">
        <Col span={11}>
          <MinMaxInput
            activeKey={activeKey}
            minCount={data[minStampOrderCountKey]}
            maxCount={data[maxStampOrderCountKey]}
            minCountKey={minStampOrderCountKey}
            maxCountKey={maxStampOrderCountKey}
            label={t('STAMP_COUNT')}
          />
          <MinMaxInput
            activeKey={activeKey}
            minCount={data[minLastOrderDayDiffKey]}
            maxCount={data[maxLastOrderDayDiffKey]}
            minCountKey={minLastOrderDayDiffKey}
            maxCountKey={maxLastOrderDayDiffKey}
            label={t('DAY_DIFFERENCE_SINCE_LAST_ORDER')}
          />
        </Col>
        <Col span={11}>
          <MinMaxInput
            activeKey={activeKey}
            minCount={data[minFreeOrderCountKey]}
            maxCount={data[maxFreeOrderCountKey]}
            minCountKey={minFreeOrderCountKey}
            maxCountKey={maxFreeOrderCountKey}
            label={t('FREE_ORDER_COUNT')}
          />
        </Col>
      </Row>
    </CollapsePanel>
  );
};

export default LoyaltyDetail;
