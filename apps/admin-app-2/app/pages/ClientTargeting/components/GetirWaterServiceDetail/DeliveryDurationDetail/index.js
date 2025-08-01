import { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Row, Col } from 'antd';

import { clientListSections, getDeliveryDurationTopXOrderTypeOptions } from '../../../constants';
import { getClientListData } from '../../../redux/selectors';
import CollapsePanel from '../../common/CollapsePanel';
import GeoJsonUploader from '../../common/GeoJsonUploader';
import SelectDateOrXDaysBeforeToday from '../../common/SelectDateOrXDaysBeforeToday';
import ActiveParamButtons from '../../common/ActiveParamButtons';
import SingleSelect from '../../common/SingleSelect';
import CheckboxSelect from '../../common/CheckboxSelect';
import MinMaxInput from '../../common/MinMaxInput';
import WarehouseBundleFilter from '../../common/WarehouseBundleFilter';

const subSectionName = 'deliveryDuration';
const activeKey = `${clientListSections.getirWaterServiceDetail}.${subSectionName}`;

const GetirWaterDeliveryDurationDetail = () => {
  const { t } = useTranslation('clientTargetingPage');
  const clientListData = useSelector(getClientListData(activeKey));

  const { activeIndex } = clientListData;
  const data = clientListData.params[activeIndex];

  const topXOrderTypeOptions = getDeliveryDurationTopXOrderTypeOptions(t);

  const minCountKey = 'minOrderCount';
  const maxCountKey = 'maxOrderCount';
  const minDurationKey = 'minDurationTime';
  const maxDurationKey = 'maxDurationTime';

  return (
    <CollapsePanel header={t('GW_DELIVERY_DURATION_DETAIL')} activeKey={activeKey}>
      <ActiveParamButtons activeKey={activeKey} activeParamIndex={clientListData.activeIndex} paramsLength={clientListData.params.length} />
      <Row justify="space-between">
        <Col span={11}>
          {!data.geoJson ? (
            <Fragment key="WAREHOUSE_SELECT_CONTAINER">
              <WarehouseBundleFilter
                activeKey={activeKey}
              />
            </Fragment>
          ) : null}
          <GeoJsonUploader activeKey={activeKey} value={data.geoJson} key={activeIndex} />
          <SelectDateOrXDaysBeforeToday
            activeKey={activeKey}
            label={t('DELIVERY_DATE_RANGE')}
            startDate={data.startDate}
            startDateType={data.startDateType}
            startDayBeforeToday={data.startDayBeforeToday}
            endDate={data.endDate}
            endDateType={data.endDateType}
            endDayBeforeToday={data.endDayBeforeToday}
          />
        </Col>
        <Col span={11}>
          <CheckboxSelect
            activeKey={activeKey}
            label={t('EXCLUDE_QUEUE_ORDERS')}
            value={data.excludeQueueUsers}
            clientListKey="excludeQueueUsers"
          />
          <CheckboxSelect activeKey={activeKey} label={t('ETA_EXCEEDED')} value={data.isETAExceeded} clientListKey="isETAExceeded" />
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
          <MinMaxInput
            activeKey={activeKey}
            minCount={data[minCountKey]}
            maxCount={data[maxCountKey]}
            minCountKey={minCountKey}
            maxCountKey={maxCountKey}
            label={`${t('ORDER_COUNT')} (X)`}
          />
          <MinMaxInput
            activeKey={activeKey}
            minCount={data[minDurationKey]}
            maxCount={data[maxDurationKey]}
            minCountKey={minDurationKey}
            maxCountKey={maxDurationKey}
            label={t('ORDER_REACH_INTERVAL')}
          />
        </Col>
      </Row>
    </CollapsePanel>
  );
};

export default GetirWaterDeliveryDurationDetail;
