import { Fragment, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col } from 'antd';

import { getLangKey } from '@shared/i18n';
import {
  clientListSections,
  getDeliveryDurationTopXOrderTypeOptions,
} from '../../../constants';
import { getClientListData, getOrderFeedbackReasonsSelector } from '../../../redux/selectors';
import CollapsePanel from '../../common/CollapsePanel';
import GeoJsonUploader from '../../common/GeoJsonUploader';
import SelectDateOrXDaysBeforeToday from '../../common/SelectDateOrXDaysBeforeToday';
import ActiveParamButtons from '../../common/ActiveParamButtons';
import SingleSelect from '../../common/SingleSelect';
import MinMaxInput from '../../common/MinMaxInput';
import WarehouseBundleFilter from '../../common/WarehouseBundleFilter';
import { Creators } from '../../../redux/actions';
import {
  getirProblematicOrdersDomainType,
  getSortedReasons,
  marketOrderFeedbackMainReasonOptions,
  marketOrderFeedbackSubReasonOptions,
} from '@app/pages/ClientTargeting/utils';
import MultipleSelect from '@app/pages/ClientTargeting/components/common/MultipleSelect';

const subSectionName = 'orderFeedback';
const activeKey = `${clientListSections.getirGeneralDetail}.${subSectionName}`;

const OrderFeedbackDetail = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation('clientTargetingPage');
  const clientListData = useSelector(getClientListData(activeKey));
  const langKey = getLangKey();

  const { activeIndex } = clientListData;
  const data = clientListData.params[activeIndex];

  const topXOrderTypeOptions = getDeliveryDurationTopXOrderTypeOptions(t);

  const minCountKey = 'minOrderCount';
  const maxCountKey = 'maxOrderCount';

  const feedbackReasonCategories = useSelector(getOrderFeedbackReasonsSelector.getData);
  const mainReasons = getSortedReasons(marketOrderFeedbackMainReasonOptions({
    langKey,
    mainReasons: feedbackReasonCategories?.mainReasons,
  }));
  const subReasons = getSortedReasons(marketOrderFeedbackSubReasonOptions({
    langKey,
    subReasons: feedbackReasonCategories?.subReasons,
  }));

  useEffect(() => {
    dispatch(Creators.getOrderFeedbackReasonsRequest());
  }, [dispatch]);

  return (
    <CollapsePanel header={t('ORDER_FEEDBACK_DETAIL')} activeKey={activeKey}>
      <ActiveParamButtons
        activeKey={activeKey}
        activeParamIndex={clientListData.activeIndex}
        paramsLength={clientListData.params.length}
      />
      <Row justify="space-between">
        <Col span={11}>
          {!data.geoJson ? (
            <Fragment key="WAREHOUSE_SELECT_CONTAINER">
              <WarehouseBundleFilter
                activeKey={activeKey}
                isSelectAllCountriesVisible={false}
                isDomainSelectShown
                selectableDomainTypes={getirProblematicOrdersDomainType}
              />
            </Fragment>
          ) : null}
          <GeoJsonUploader activeKey={activeKey} value={data.geoJson} key={activeIndex} />
          <SelectDateOrXDaysBeforeToday
            activeKey={activeKey}
            label={t('CHECKOUT_DATE_RANGE')}
            startDate={data.startDate}
            startDateType={data.startDateType}
            startDayBeforeToday={data.startDayBeforeToday}
            endDate={data.endDate}
            endDateType={data.endDateType}
            endDayBeforeToday={data.endDayBeforeToday}
          />
        </Col>
        <Col span={11}>
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
          <MultipleSelect
            selectable={mainReasons}
            activeKey={activeKey}
            value={data.mainReasons}
            clientListKey="mainReasons"
            placeholder={t('FEEDBACK_MAIN_REASON')}
            allowClear
            filterableData={{ subReasons }}
            showSelectAllButton
            label={t('FEEDBACK_MAIN_REASON')}
          />
          {data.mainReasons.length >= 1 && (
            <MultipleSelect
              selectable={data.selectableSubReasons}
              activeKey={activeKey}
              value={data.subReasons}
              label={t('FEEDBACK_SUB_REASON')}
              clientListKey="subReasons"
              placeholder={t('FEEDBACK_SUB_REASON')}
              allowClear
              showSelectAllButton
            />
          )}
        </Col>
      </Row>
    </CollapsePanel>
  );
};

export default OrderFeedbackDetail;
