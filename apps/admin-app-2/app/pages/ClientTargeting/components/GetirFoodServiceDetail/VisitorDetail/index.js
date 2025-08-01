import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Row, Col } from 'antd';

import CollapsePanel from '../../common/CollapsePanel';
import { clientListSections } from '../../../constants';
import GeoJsonUploader from '../../common/GeoJsonUploader';
import SelectDateOrXDaysBeforeToday from '../../common/SelectDateOrXDaysBeforeToday';
import ActiveParamButtons from '../../common/ActiveParamButtons';
import { getClientListData } from '../../../redux/selectors';
import FoodCheckboxSelect from '../../common/FoodCheckboxSelect';
import RestaurantsSelect from '../../common/RestaurantsSelect';
import ChainRestaurantsSelect from '../../common/ChainRestaurantsSelect';
import MultipleSelect from '../../common/MultipleSelect';

const subSectionName = 'visitor';
const activeKey = `${clientListSections.getirFoodServiceDetail}.${subSectionName}`;

const VisitorDetail = () => {
  const { t } = useTranslation('clientTargetingPage');
  const clientListData = useSelector(getClientListData(activeKey));

  const { activeIndex } = clientListData;
  const data = clientListData.params[activeIndex];

  return (
    <CollapsePanel header={t("GF_TAB_OPEN_DETAIL")} activeKey={activeKey}>
      <ActiveParamButtons 
        activeKey={activeKey}
        activeParamIndex={clientListData.activeIndex}
        paramsLength={clientListData.params.length}
      />
      <Row justify="space-between">
        <Col span={11}>
          {!data.geoJson && <div><FoodCheckboxSelect 
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
          }</div>}
          <GeoJsonUploader
            activeKey={activeKey} 
            value={data.geoJson}
            key={activeIndex} />
        </Col>
        <Col span={11}>
          <SelectDateOrXDaysBeforeToday 
            activeKey={activeKey} 
            label={t('LAST_VISIT')}
            startDate={data.startDate}
            startDateType={data.startDateType}
            startDayBeforeToday={data.startDayBeforeToday}
            endDate={data.endDate}
            endDateType={data.endDateType}
            endDayBeforeToday={data.endDayBeforeToday}       
          />
        </Col>
      </Row>
    </CollapsePanel>
  );
};

export default VisitorDetail;
