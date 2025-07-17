import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Row, Col, Typography, Space } from 'antd';

import CollapsePanel from '../../common/CollapsePanel';
import { clientListSections } from '../../../constants';
import ActiveParamButtons from '../../common/ActiveParamButtons';
import { getClientListData } from '../../../redux/selectors';
import SelectDateOrXDaysBeforeToday from '../../common/SelectDateOrXDaysBeforeToday';
import RestaurantsSelect from '../../common/RestaurantsSelect';
import ChainRestaurantsSelect from '../../common/ChainRestaurantsSelect';
import MultipleSelect from '../../common/MultipleSelect';
import FoodCheckboxSelect from '../../common/FoodCheckboxSelect';
import LastOrderCalculationTypeSelect from '../../common/LastOrderCalculationTypeSelect';
import CheckboxSelect from '../../common/CheckboxSelect';
import useStyles from './styles';

const { Text } = Typography;
const subSectionName = 'lastOrder';
const activeKey = `${clientListSections.getirFoodServiceDetail}.${subSectionName}`;

const LastOrderDetail = () => {
  const classes = useStyles();
  const { t } = useTranslation('clientTargetingPage');
  const clientListData = useSelector(getClientListData(activeKey));

  const { activeIndex } = clientListData;
  const data = clientListData.params[activeIndex];

  return (
    <CollapsePanel header={t('GF_LAST_ORDER_DETAIL')} activeKey={activeKey}>
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
          {
            data.isChainSelected ? (
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
              )
          }
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
            label={t('LAST_ORDER_DATE_RANGE')}
            startDate={data.startDate}
            startDateType={data.startDateType}
            startDayBeforeToday={data.startDayBeforeToday}
            endDate={data.endDate}
            endDateType={data.endDateType}
            endDayBeforeToday={data.endDayBeforeToday}
          />
          <LastOrderCalculationTypeSelect
            activeKey={activeKey}
            label={t('CALCULATION_DETAIL')}
            placeholder={t('CALCULATION_DETAIL')}
            value={data.calculationType}
          />
        </Col>
      </Row>
    </CollapsePanel>
  );
};

export default LastOrderDetail;
