import { Fragment, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Tooltip } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';

import { Creators } from '@app/pages/ClientTargeting/redux/actions';

import {
  clientListSections,
  getDeliveryDurationTopXOrderTypeOptions,
  selectableETAs,
} from '../../../constants';
import { getClientListData } from '../../../redux/selectors';
import CollapsePanel from '../../common/CollapsePanel';
import GeoJsonUploader from '../../common/GeoJsonUploader';
import SelectDateOrXDaysBeforeToday from '../../common/SelectDateOrXDaysBeforeToday';
import ActiveParamButtons from '../../common/ActiveParamButtons';
import SingleSelect from '../../common/SingleSelect';
import CheckboxSelect from '../../common/CheckboxSelect';
import MinMaxInput from '../../common/MinMaxInput';
import WarehouseBundleFilter from '../../common/WarehouseBundleFilter';
import { marketOrderCETAReleaseDate } from '@app/pages/ClientTargeting/redux/initialState';
import { getirProblematicOrdersDomainType } from '@app/pages/ClientTargeting/utils';

const subSectionName = 'lateDeliveryDurationETA';
const activeKey = `${clientListSections.getirGeneralDetail}.${subSectionName}`;

const DeliveryDurationCETADetail = () => {
  const { t } = useTranslation('clientTargetingPage');
  const clientListData = useSelector(getClientListData(activeKey));
  const dispatch = useDispatch();

  const { activeIndex } = clientListData;
  const data = clientListData.params[activeIndex];

  const topXOrderTypeOptions = getDeliveryDurationTopXOrderTypeOptions(t);

  useEffect(() => {
    dispatch(Creators.setInput({ activeKey, clientListKey: 'cancelReasons', value: [] }));
  }, [dispatch, data.domainType, data.orderStatusGroup]);

  const minCountKey = 'minOrderCount';
  const maxCountKey = 'maxOrderCount';
  const minReachDurationKey = 'minReachDurationTime';
  const maxReachDurationKey = 'maxReachDurationTime';
  const minLateDurationKey = 'minLateDurationTime';
  const maxLateDurationKey = 'maxLateDurationTime';

  return (
    <CollapsePanel header={t('LATE_DELIVERY_BY_ETA_SECTION_NAME')} activeKey={activeKey}>
      <ActiveParamButtons
        activeKey={activeKey}
        activeParamIndex={clientListData.activeIndex}
        paramsLength={clientListData.params.length}
      />
      <Row justify="space-between">
        <Col span={11}>
          <SingleSelect
            activeKey={activeKey}
            label={`ETA ${t('TYPE')}`}
            clientListKey="etaType"
            value={data.etaType}
            selectable={selectableETAs}
            disabled
          />
          <SingleSelect
            activeKey={activeKey}
            label={t('DOMAIN_TYPE')}
            clientListKey="domainType"
            value={data.domainType}
            selectable={getirProblematicOrdersDomainType}
            tagValue="name"
            tagKey="_id"
          />
          {!data.geoJson ? (
            <Fragment key="WAREHOUSE_SELECT_CONTAINER">
              <WarehouseBundleFilter
                activeKey={activeKey}
                isSelectAllCountriesVisible={false}
              />
            </Fragment>
          ) : null}
          <GeoJsonUploader activeKey={activeKey} value={data.geoJson} key={activeIndex} />
          <SelectDateOrXDaysBeforeToday
            activeKey={activeKey}
            label={t('CHECKOUT_DATE_RANGE')}
            startDate={data.startDate}
            startDateType={data.startDateType}
            disableBeforeXDate={marketOrderCETAReleaseDate}
            startDayBeforeToday={data.startDayBeforeToday}
            endDate={data.endDate}
            endDateType={data.endDateType}
            endDayBeforeToday={data.endDayBeforeToday}
          />
        </Col>
        <Col span={11}>
          <CheckboxSelect
            activeKey={activeKey}
            label={t('EXCLUDE_SCHEDULED_ORDERS')}
            value={data.excludeScheduledOrders}
            clientListKey="excludeScheduledOrders"
          />
          <CheckboxSelect
            activeKey={activeKey}
            label={t('EXCLUDE_QUEUE_ORDERS')}
            value={data.excludeQueueUsers}
            clientListKey="excludeQueueUsers"
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
            minCount={data[minLateDurationKey]}
            maxCount={data[maxLateDurationKey]}
            minCountKey={minLateDurationKey}
            maxCountKey={maxLateDurationKey}
            label={(
              <>
                {t('EXCEEDANCE_LIMIT_AS_MINUTE')}
                <Tooltip title={t('EXCEEDANCE_LIMIT_AS_MINUTE_TOOLTIP')}>
                  <InfoCircleOutlined />
                </Tooltip>
              </>
            )}
          />
          <MinMaxInput
            activeKey={activeKey}
            minCount={data[minReachDurationKey]}
            maxCount={data[maxReachDurationKey]}
            minCountKey={minReachDurationKey}
            maxCountKey={maxReachDurationKey}
            label={t('ORDER_REACH_INTERVAL')}
          />
        </Col>
      </Row>
    </CollapsePanel>
  );
};

export default DeliveryDurationCETADetail;
