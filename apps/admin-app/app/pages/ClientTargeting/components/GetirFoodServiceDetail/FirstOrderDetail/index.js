import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Row, Col } from 'antd';

import CollapsePanel from '../../common/CollapsePanel';
import { clientListSections } from '../../../constants';
import ActiveParamButtons from '../../common/ActiveParamButtons';
import { getClientListData } from '../../../redux/selectors';
import SelectDateOrXDaysBeforeToday from '../../common/SelectDateOrXDaysBeforeToday';
import RestaurantsSelect from '../../common/RestaurantsSelect';
import ChainRestaurantsSelect from '../../common/ChainRestaurantsSelect';
import MultipleSelect from '../../common/MultipleSelect';
import FoodCheckboxSelect from '../../common/FoodCheckboxSelect';
import FirstOrderCalculationTypeSelect from '../../common/FirstOrderCalculationTypeSelect';

const subSectionName = 'firstOrder';
const activeKey = `${clientListSections.getirFoodServiceDetail}.${subSectionName}`;

const FirstOrderDetail = () => {
  const { t } = useTranslation('clientTargetingPage');
  const clientListData = useSelector(getClientListData(activeKey));
  
  const { activeIndex } = clientListData;
  const data = clientListData.params[activeIndex];

  return (
    <CollapsePanel header={t("GF_FIRST_ORDER_DETAIL")} activeKey={activeKey}>
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
            label={t("CHAIN")}
            clientListKey="isChainSelected"
          />
          {data.isChainSelected ?<div> <ChainRestaurantsSelect 
            activeKey={activeKey}
            value={data.chainRestaurants}
            label={t("CHAIN_RESTAURANT")}
            clientListKey="chainRestaurants"
            selectable={data.getChainRestaurants.data}
          />
          <MultipleSelect 
            activeKey={activeKey}
            value={data.restaurants}
            label={t("BRANCH_RESTAURANTS")}
            clientListKey="restaurants"
            selectable={data.getChainRestaurantBranches.data}
            tagKey="id"
            showSelectAllButton
          /></div>:
            <RestaurantsSelect 
              activeKey={activeKey}
              value={data.restaurants}
              label={t("RESTAURANTS")}
              clientListKey="restaurants"
              selectable={data.getRestaurantsByName.data}
              showCSVImporter
            />
          }
        </Col>
        <Col span={11}>
          <SelectDateOrXDaysBeforeToday 
            activeKey={activeKey} 
            label={t('FIRST_ORDER_DATE_RANGE')}
            startDate={data.startDate}
            startDateType={data.startDateType}
            startDayBeforeToday={data.startDayBeforeToday}
            endDate={data.endDate}
            endDateType={data.endDateType}
            endDayBeforeToday={data.endDayBeforeToday}       
          />
          <FirstOrderCalculationTypeSelect
            activeKey={activeKey}
            label={t("CALCULATION_DETAIL")}
            placeholder={t("CALCULATION_DETAIL")}
            value={data.calculationType}
          />
        </Col>
      </Row>
    </CollapsePanel>
  );
};

export default FirstOrderDetail;
