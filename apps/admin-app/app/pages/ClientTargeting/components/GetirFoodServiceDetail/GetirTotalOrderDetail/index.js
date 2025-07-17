import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Row, Col, Typography, Space } from 'antd';

import CollapsePanel from '../../common/CollapsePanel';
import { clientListSections } from '../../../constants';
import ActiveParamButtons from '../../common/ActiveParamButtons';
import { getClientListData } from '../../../redux/selectors';
import MinMaxInput from '../../common/MinMaxInput';
import MultipleSelect from '../../common/MultipleSelect';
import RestaurantsSelect from '../../common/RestaurantsSelect';
import ChainRestaurantsSelect from '../../common/ChainRestaurantsSelect';
import FoodCheckboxSelect from '../../common/FoodCheckboxSelect';
import CheckboxSelect from '../../common/CheckboxSelect';
import useStyles from './styles';
import SelectDateOrXDaysBeforeToday from '../../common/SelectDateOrXDaysBeforeToday';

const { Text } = Typography;
const subSectionName = 'totalOrder';
const activeKey = `${clientListSections.getirFoodServiceDetail}.${subSectionName}`;

const GetirTotalOrderDetail = () => {
  const classes = useStyles();
  const { t } = useTranslation('clientTargetingPage');
  const clientListData = useSelector(getClientListData(activeKey));
  const cuisines = useSelector(getClientListData('getCuisines'));

  const { activeIndex } = clientListData;
  const data = clientListData.params[activeIndex];

  const minCountKey = 'minOrderCount';
  const maxCountKey = 'maxOrderCount';

  return (
    <CollapsePanel header={t('GF_ORDER_DETAIL')} activeKey={activeKey}>
      <ActiveParamButtons
        activeKey={activeKey}
        activeParamIndex={clientListData.activeIndex}
        paramsLength={clientListData.params.length}
      />
      <Row justify="space-between">
        <Col span={11}>
          <FoodCheckboxSelect
            activeKey={activeKey}
            value={data.isChainSelected}
            label={t('CHAIN')}
            clientListKey="isChainSelected"
          />
          {data.isChainSelected ? (
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
          ) : (
            <RestaurantsSelect
              activeKey={activeKey}
              value={data.restaurants}
              label={t('RESTAURANTS')}
              clientListKey="restaurants"
              selectable={data.getRestaurantsByName.data}
              showCSVImporter
            />
          )}
          <MultipleSelect
            activeKey={activeKey}
            value={data.cuisines}
            label={t('CUISINES')}
            clientListKey="cuisines"
            selectable={cuisines.data}
            showCSVImporter
            tagKey="id"
            tagValue="name"
          />
          <Space className={classes.textWrapper}>
            <Text>{t('DELIVERY_TYPE')}</Text>
          </Space>
          <div
            className={classes.checkboxesContainer}
          >
            <CheckboxSelect
              activeKey={activeKey}
              label={t('GETIR_DELIVERY')}
              value={data.getirDelivery}
              clientListKey="getirDelivery"
              disabled={data.restaurantDelivery}
            />
            <CheckboxSelect
              activeKey={activeKey}
              label={t('RESTAURANT_DELIVERY')}
              value={data.restaurantDelivery}
              clientListKey="restaurantDelivery"
              disabled={data.getirDelivery}
            />
          </div>
        </Col>
        <Col span={11}>
          <SelectDateOrXDaysBeforeToday
            activeKey={activeKey}
            label={t('ORDER_DATE_RANGE')}
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
            descriptionV2={t('ORDER_COUNT_MIN_MAX_DESC')}
            canBeRemoveMax
          />
        </Col>
      </Row>
    </CollapsePanel>
  );
};

export default GetirTotalOrderDetail;
