import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Row, Col } from 'antd';

import CollapsePanel from '../../common/CollapsePanel';
import { clientListSections, getTopXOrderTypeOptions } from '../../../constants';
import MinMaxInput from '../../common/MinMaxInput';
import SelectDateOrXDaysBeforeToday from '../../common/SelectDateOrXDaysBeforeToday';
import ActiveParamButtons from '../../common/ActiveParamButtons';
import { getClientListData } from '../../../redux/selectors';
import FoodCheckboxSelect from '../../common/FoodCheckboxSelect';
import RestaurantsSelect from '../../common/RestaurantsSelect';
import ChainRestaurantsSelect from '../../common/ChainRestaurantsSelect';
import MultipleSelect from '../../common/MultipleSelect';
import SingleSelect from '../../common/SingleSelect';

const subSectionName = 'cancelled';
const activeKey = `${clientListSections.getirFoodServiceDetail}.${subSectionName}`;

const CancelledOrderDetail = () => {
  const { t } = useTranslation('clientTargetingPage');
  const clientListData = useSelector(getClientListData(activeKey));
  const topXOrderTypeOptions = getTopXOrderTypeOptions(t);

  const { activeIndex } = clientListData;
  const data = clientListData.params[activeIndex];

  const minOrderKey = 'minOrderCount';
  const maxOrderKey = 'maxOrderCount';

  return (
    <CollapsePanel header={t('GF_CANCELLED_ORDER_DETAIL')} activeKey={activeKey}>
      <ActiveParamButtons
        activeKey={activeKey}
        activeParamIndex={clientListData.activeIndex}
        paramsLength={clientListData.params.length}
      />
      <Row justify="space-between">
        <Col span={11}>
          {!data.geoJson &&
            (
              <div>
                <FoodCheckboxSelect
                  activeKey={activeKey}
                  value={data.isChainSelected}
                  label={t('CHAIN')}
                  clientListKey="isChainSelected"
                />
                {data.isChainSelected ?
                  (
                    <div>
                      <ChainRestaurantsSelect
                        activeKey={activeKey}
                        value={data.chainRestaurants}
                        label={t('CHAIN_RESTAURANT')}
                        clientListKey="chainRestaurants"
                        selectable={data.getChainRestaurants.data}
                      />
                      <MultipleSelect
                        activeKey={activeKey}
                        value={data.restaurants}
                        label={t('BRANCH_RESTAURANTS')}
                        clientListKey="restaurants"
                        selectable={data.getChainRestaurantBranches.data}
                        tagKey="id"
                        showSelectAllButton
                      />
                    </div>
                  ) :
                  (
                    <RestaurantsSelect
                      activeKey={activeKey}
                      value={data.restaurants}
                      label={t('RESTAURANTS')}
                      clientListKey="restaurants"
                      selectable={data.getRestaurantsByName.data}
                      showCSVImporter
                    />
                  )}
              </div>
            )}
          <MinMaxInput
            activeKey={activeKey}
            minCount={data.minValue}
            maxCount={data.maxValue}
            minCountKey="minValue"
            maxCountKey="maxValue"
            label={t('NUMBER_OF_CANCEL')}
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
