import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Row, Col } from 'antd';

import CollapsePanel from '../../common/CollapsePanel';
import { clientListSections } from '../../../constants';
import ActiveParamButtons from '../../common/ActiveParamButtons';
import { getClientListData } from '../../../redux/selectors';
import MinMaxInput from '../../common/MinMaxInput';
import RestaurantsSelect from '../../common/RestaurantsSelect';
import ChainRestaurantsSelect from '../../common/ChainRestaurantsSelect';
import FoodCheckboxSelect from '../../common/FoodCheckboxSelect';
import MultipleSelect from '../../common/MultipleSelect';

const subSectionName = 'forcedTabOpen';
const activeKey = `${clientListSections.getirFoodServiceDetail}.${subSectionName}`;

const ForcedTabOpenDetail = () => {
  const { t } = useTranslation('clientTargetingPage');
  const clientListData = useSelector(getClientListData(activeKey));

  const { activeIndex } = clientListData;
  const data = clientListData.params[activeIndex];

  const minCountKey = 'minTabOpenCount';
  const maxCountKey = 'maxTabOpenCount';

  return (
    <CollapsePanel header={t("GF_FORCED_TAB_OPEN_DETAIL")} activeKey={activeKey}>
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
          <MinMaxInput
            activeKey={activeKey}
            minCount={data[minCountKey]}
            maxCount={data[maxCountKey]}
            minCountKey={minCountKey}
            maxCountKey={maxCountKey}
            label={t('TAB_OPEN_COUNT')}
          />
        </Col>
      </Row>
    </CollapsePanel>
  );
};

export default ForcedTabOpenDetail;
