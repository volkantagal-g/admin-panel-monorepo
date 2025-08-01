import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Row, Col } from 'antd';

import CollapsePanel from '../../common/CollapsePanel';
import { clientListSections } from '../../../constants';
import ActiveParamButtons from '../../common/ActiveParamButtons';
import { getClientListData } from '../../../redux/selectors';
import SelectDateOrXDaysBeforeToday from '../../common/SelectDateOrXDaysBeforeToday';
import MinMaxInput from '../../common/MinMaxInput';
import ShopsSelect from '../../common/ShopsSelect';

const subSectionName = 'loyaltyOrder';
const activeKey = `${clientListSections.getirLocalsServiceDetail}.${subSectionName}`;

const LoyaltyOrderDetails = () => {
  const { t } = useTranslation('clientTargetingPage');
  const clientListData = useSelector(getClientListData(activeKey));

  const { activeIndex } = clientListData;
  const data = clientListData.params[activeIndex];

  const minCountKey = 'minOrderCount';
  const maxCountKey = 'maxOrderCount';
  return (
    <CollapsePanel header={t('GETIR_LOCALS_LOYALTY_ORDER_DETAIL')} activeKey={activeKey}>
      <ActiveParamButtons
        activeKey={activeKey}
        activeParamIndex={clientListData.activeIndex}
        paramsLength={clientListData.params.length}
      />
      <Row justify="space-between">
        <Col span={11}>
          <ShopsSelect
            activeKey={activeKey}
            value={data.shops}
            label={t('STORES')}
            clientListKey="shops"
            selectable={data.getShops.data}
            isLoading={data.getShops.isPending}
            showCSVImporter
          />
        </Col>
        <Col span={11}>
          <SelectDateOrXDaysBeforeToday
            activeKey={activeKey}
            label={t('LOYALTY.ORDER_DATE')}
            startDate={data.startDate}
            startDateType={data.startDateType}
            startDayBeforeToday={data.startDayBeforeToday}
            endDate={data.endDate}
            endDateType={data.endDateType}
            endDayBeforeToday={data.endDayBeforeToday}
          />
          <MinMaxInput
            activeKey={activeKey}
            minCount={data[minCountKey]}
            maxCount={data[maxCountKey]}
            minCountKey={minCountKey}
            maxCountKey={maxCountKey}
            label={t('LOYALTY.ORDER_COUNT')}
          />
        </Col>
      </Row>
    </CollapsePanel>
  );
};

export default LoyaltyOrderDetails;
