import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col } from 'antd';

import CollapsePanel from '../../common/CollapsePanel';
import { clientListSections } from '../../../constants';
import ActiveParamButtons from '../../common/ActiveParamButtons';
import { getClientListData } from '../../../redux/selectors';
import SelectDateOrXDaysBeforeToday from '../../common/SelectDateOrXDaysBeforeToday';
import MultipleSelect from '../../common/MultipleSelect';
import MinMaxInput from '../../common/MinMaxInput';
import Or from '../../common/Or';
import RestaurantsSelect from '../../common/RestaurantsSelect';
import ChainRestaurantsSelect from '../../common/ChainRestaurantsSelect';
import { Creators } from '../../../redux/actions';

const subSectionName = 'foodProduct';
const activeKey = `${clientListSections.getirFoodServiceDetail}.${subSectionName}`;

const IncludedFoodFilter = () => {
  const { t } = useTranslation('clientTargetingPage');
  const dispatch = useDispatch();
  const clientListData = useSelector(getClientListData(activeKey));

  const { activeIndex } = clientListData;
  const data = clientListData.params[activeIndex];

  const minCountKey = 'minOrderCount';
  const maxCountKey = 'maxOrderCount';

  const handleRestaurantSelected = selectedRestaurant => {
    if (!selectedRestaurant) return;
    const restaurantId = selectedRestaurant;

    dispatch(Creators.getRestaurantProductsRequest({ restaurantId, activeKey }));
  };

  return (
    <CollapsePanel header={t('INCLUDED_FOOD_FILTER')} activeKey={activeKey}>
      <ActiveParamButtons
        activeKey={activeKey}
        activeParamIndex={clientListData.activeIndex}
        paramsLength={clientListData.params.length}
      />
      <Row justify="space-between">
        <Col span={11}>
          <ChainRestaurantsSelect
            activeKey={activeKey}
            value={data.chainRestaurants}
            label={t('CHAIN_RESTAURANT')}
            clientListKey="chainRestaurants"
            selectable={data.getChainRestaurants.data}
            onSelected={() => { }}
          />
          <Or />
          <RestaurantsSelect
            activeKey={activeKey}
            value={data.restaurant}
            label={t('RESTAURANT')}
            clientListKey="restaurant"
            selectable={data.getRestaurantsByName.data}
            onSelected={handleRestaurantSelected}
            tagKey="id"
            tagValue="name"
            single
            allowClear
          />
          <MultipleSelect
            activeKey={activeKey}
            value={data.products}
            label={t('PRODUCTS')}
            clientListKey="products"
            selectable={data.getRestaurantProducts.data}
            tagKey="id"
            tagValue="name"
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
          <MinMaxInput
            activeKey={activeKey}
            minCount={data[minCountKey]}
            maxCount={data[maxCountKey]}
            minCountKey={minCountKey}
            maxCountKey={maxCountKey}
            label={t('ORDER_COUNT')}
          />
        </Col>
      </Row>
    </CollapsePanel>
  );
};

export default IncludedFoodFilter;
