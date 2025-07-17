import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Row, Col } from 'antd';

import CollapsePanel from '../../common/CollapsePanel';
import { clientListSections, cancelledOrderTypes, getTopXOrderTypeOptions } from '../../../constants';
import GeoJsonUploader from '../../common/GeoJsonUploader';
import SelectDateOrXDaysBeforeToday from '../../common/SelectDateOrXDaysBeforeToday';
import ActiveParamButtons from '../../common/ActiveParamButtons';
import { getClientListData } from '../../../redux/selectors';
import SingleSelect from '../../common/SingleSelect';
import MinMaxInput from '../../common/MinMaxInput';
import WarehouseBundleFilter from '../../common/WarehouseBundleFilter';

const subSectionName = 'cancelled';
const activeKey = `${clientListSections.getirMoreServiceDetail}.${subSectionName}`;

const CancelledOrderDetail = () => {
  const { t } = useTranslation('clientTargetingPage');
  const clientListData = useSelector(getClientListData(activeKey));
  const topXOrderTypeOptions = getTopXOrderTypeOptions(t);

  const { activeIndex } = clientListData;
  const data = clientListData.params[activeIndex];

  const minOrderKey = 'minOrderCount';
  const maxOrderKey = 'maxOrderCount';

  return (
    <CollapsePanel header={t('G30_CANCELLED_ORDER_DETAIL')} activeKey={activeKey}>
      <ActiveParamButtons
        activeKey={activeKey}
        activeParamIndex={clientListData.activeIndex}
        paramsLength={clientListData.params.length}
      />
      <Row justify="space-between">
        <Col span={11}>
          {!data.geoJson && (
            <div>
              <WarehouseBundleFilter
                activeKey={activeKey}
              />
            </div>
          )}
          <GeoJsonUploader
            activeKey={activeKey}
            value={data.geoJson}
            key={activeIndex}
          />
        </Col>
        <Col span={11}>
          <SelectDateOrXDaysBeforeToday
            activeKey={activeKey}
            label={t('CANCELLED_ORDER_DATE_RANGE')}
            startDate={data.startDate}
            startDateType={data.startDateType}
            startDayBeforeToday={data.startDayBeforeToday}
            endDate={data.endDate}
            endDateType={data.endDateType}
            endDayBeforeToday={data.endDayBeforeToday}
          />
          <SingleSelect
            activeKey={activeKey}
            label={t('CANCELLATION_TYPE')}
            placeholder={t('CANCELLATION_TYPE')}
            clientListKey="cancellationType"
            value={data.cancellationType}
            selectable={cancelledOrderTypes(t)}
            tagValue="name"
            tagKey="_id"
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

export default CancelledOrderDetail;
