import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Row, Col } from 'antd';

import CollapsePanel from '../../common/CollapsePanel';
import { clientListSections } from '../../../constants';
import ActiveParamButtons from '../../common/ActiveParamButtons';
import { getClientListData } from '../../../redux/selectors';
import SelectDateOrXDaysBeforeToday from '../../common/SelectDateOrXDaysBeforeToday';
import MinMaxInput from '../../common/MinMaxInput';
import FoodCheckboxSelect from '../../common/FoodCheckboxSelect';
import RestaurantsSelect from '../../common/RestaurantsSelect';
import ChainRestaurantsSelect from '../../common/ChainRestaurantsSelect';
import MultipleSelect from '../../common/MultipleSelect';

const subSectionName = 'loyaltyOrder';
const activeKey = `${clientListSections.getirFoodServiceDetail}.${subSectionName}`;

const LoyaltyOrderDetails = () => {
  const { t } = useTranslation('clientTargetingPage');
  const clientListData = useSelector(getClientListData(activeKey));

  const { activeIndex } = clientListData;
  const data = clientListData.params[activeIndex];

  const minCountKey = 'minOrderCount';
  const maxCountKey = 'maxOrderCount';
  return (
    <CollapsePanel header={t('GF_LOYALTY_ORDER_DETAIL')} activeKey={activeKey}>
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
            <div> <ChainRestaurantsSelect
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
        </Col>
        <Col span={11}>
          <SelectDateOrXDaysBeforeToday
            activeKey={activeKey}
            label={t('LOYALTY.ORDER_DATE')}
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
            label={t('LOYALTY.ORDER_COUNT')}
          />
        </Col>
      </Row>
    </CollapsePanel>
  );
};

export default LoyaltyOrderDetails;
