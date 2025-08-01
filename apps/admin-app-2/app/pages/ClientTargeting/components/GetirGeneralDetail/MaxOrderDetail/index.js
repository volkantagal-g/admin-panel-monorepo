import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Row, Col } from 'antd';

import { getirMarketDomainTypesWihoutVoyager } from '@app/pages/ClientTargeting/utils';
import CollapsePanel from '../../common/CollapsePanel';
import { clientListSections, getOrderCalculationTypes, getOrderPriceDetailTopXOrderTypeOptions } from '../../../constants';
import ActiveParamButtons from '../../common/ActiveParamButtons';
import { getClientListData } from '../../../redux/selectors';
import SelectDateOrXDaysBeforeToday from '../../common/SelectDateOrXDaysBeforeToday';
import WarehouseBundleFilter from '../../common/WarehouseBundleFilter';
import SingleSelect from '../../common/SingleSelect';
import MinMaxInput from '../../common/MinMaxInput';

const subSectionName = 'maxOrder';
const activeKey = `${clientListSections.getirGeneralDetail}.${subSectionName}`;

const MaxOrderDetail = () => {
  const { t } = useTranslation('clientTargetingPage');
  const clientListData = useSelector(getClientListData(activeKey));

  const { activeIndex } = clientListData;
  const data = clientListData.params[activeIndex];

  const minOrderKey = 'minOrderCount';
  const maxOrderKey = 'maxOrderCount';

  const topXOrderTypeOptions = getOrderPriceDetailTopXOrderTypeOptions(t);
  const orderCalculationOptions = getOrderCalculationTypes(t);

  return (
    <CollapsePanel header={t('MAX_ORDER_DETAIL')} activeKey={activeKey}>
      <ActiveParamButtons activeKey={activeKey} activeParamIndex={clientListData.activeIndex} paramsLength={clientListData.params.length} />
      <Row justify="space-between">
        <Col span={11}>
          <WarehouseBundleFilter
            activeKey={activeKey}
            isDomainSelectShown
            selectableDomainTypes={getirMarketDomainTypesWihoutVoyager}
          />
        </Col>
        <Col span={11}>
          <SelectDateOrXDaysBeforeToday
            activeKey={activeKey}
            label={t('MAX_ORDER_DATE_RANGE')}
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
        </Col>
      </Row>
    </CollapsePanel>
  );
};

export default MaxOrderDetail;
