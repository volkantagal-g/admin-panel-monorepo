import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Row, Col } from 'antd';

import CollapsePanel from '../../common/CollapsePanel';
import {
  clientListSections,
  getOrderPriceDetailTopXOrderTypeOptions,
  getOrderCalculationTypes,
} from '../../../constants';
import ActiveParamButtons from '../../common/ActiveParamButtons';
import { getClientListData } from '../../../redux/selectors';
import SingleSelect from '../../common/SingleSelect';
import MinMaxInput from '../../common/MinMaxInput';
import SelectDateOrXDaysBeforeToday from '../../common/SelectDateOrXDaysBeforeToday';
import MinMaxDecimalInput from '../../common/MinMaxDecimalInput';
import WarehouseBundleFilter from '../../common/WarehouseBundleFilter';
import { getirMarketDomainTypesList } from '@app/pages/ClientTargeting/utils';

const subSectionName = 'dayDifferenceBetweenOrders';
const activeKey = `${clientListSections.getirGeneralDetail}.${subSectionName}`;

const DayDifferenceBetweenOrders = () => {
  const { t } = useTranslation('clientTargetingPage');
  const clientListData = useSelector(getClientListData(activeKey));

  const { activeIndex } = clientListData;
  const data = clientListData.params[activeIndex];

  const minCountKey = 'minDayValue';
  const maxCountKey = 'maxDayValue';

  const minOrderKey = 'minOrderCount';
  const maxOrderKey = 'maxOrderCount';

  const topXOrderTypeOptions = getOrderPriceDetailTopXOrderTypeOptions(t);
  const orderCalculationOptions = getOrderCalculationTypes(t);

  return (
    <CollapsePanel header={t('DAY_DIFFERENCE_BETWEEN_ORDERS')} activeKey={activeKey}>
      <ActiveParamButtons activeKey={activeKey} activeParamIndex={clientListData.activeIndex} paramsLength={clientListData.params.length} />
      <Row justify="space-between">
        <Col span={11}>
          <WarehouseBundleFilter
            activeKey={activeKey}
            isDomainSelectShown
            selectableDomainTypes={getirMarketDomainTypesList}
          />
        </Col>
        <Col span={11}>
          <SelectDateOrXDaysBeforeToday
            activeKey={activeKey}
            label={t('DATE_RANGE')}
            startDate={data.startDate}
            startDateType={data.startDateType}
            startDayBeforeToday={data.startDayBeforeToday}
            endDate={data.endDate}
            endDateType={data.endDateType}
            endDayBeforeToday={data.endDayBeforeToday}
          />
          <SingleSelect
            activeKey={activeKey}
            label={t('TOP_X_ORDER_TYPE')}
            placeholder={t('TOP_X_ORDER_TYPE')}
            value={data.topXOrderType}
            selectable={topXOrderTypeOptions}
            clientListKey="topXOrderType"
            tagValue="label"
            tagKey="value"
            allowClear
          />
          <SingleSelect
            activeKey={activeKey}
            label={t('CALCULATION_DETAIL')}
            placeholder={t('CALCULATION_DETAIL')}
            value={data.calculationType}
            selectable={orderCalculationOptions}
            clientListKey="calculationType"
            tagValue="label"
            tagKey="value"
            allowClear
          />
          <MinMaxInput
            activeKey={activeKey}
            minCount={data[minOrderKey]}
            maxCount={data[maxOrderKey]}
            minCountKey={minOrderKey}
            maxCountKey={maxOrderKey}
            label={`${t('ORDER_COUNT')} (X)`}
          />
          <MinMaxDecimalInput
            activeKey={activeKey}
            minCount={data[minCountKey]}
            maxCount={data[maxCountKey]}
            minCountKey={minCountKey}
            maxCountKey={maxCountKey}
            label={t('DAY_INTERVAL')}
            precision={2}
            min={0.00}
          />
        </Col>
      </Row>
    </CollapsePanel>
  );
};

export default DayDifferenceBetweenOrders;
