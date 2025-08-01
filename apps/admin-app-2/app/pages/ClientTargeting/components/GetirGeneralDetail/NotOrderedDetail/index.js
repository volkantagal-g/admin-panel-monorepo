import { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Row, Col } from 'antd';

import CollapsePanel from '../../common/CollapsePanel';
import { clientListSections } from '../../../constants';
import ActiveParamButtons from '../../common/ActiveParamButtons';
import { getClientListData } from '../../../redux/selectors';
import SelectDateOrXDaysBeforeToday from '../../common/SelectDateOrXDaysBeforeToday';
import MultipleSelect from '../../common/MultipleSelect';
import { GETIR_FOOD_DOMAIN_TYPE, GETIR_LOCALS_DOMAIN_TYPE } from '@shared/shared/constants';
import ShopsSelect from '../../common/ShopsSelect';
import RestaurantsSelect from '../../common/RestaurantsSelect';
import ChainRestaurantsSelect from '../../common/ChainRestaurantsSelect';
import FoodCheckboxSelect from '../../common/FoodCheckboxSelect';
import ArtisanTypesSelect from '../../common/ArtisanTypesSelect';
import ArtisanChainShopsSelect from '../../common/ArtisanChainShopsSelect';
import WarehouseBundleFilter from '../../common/WarehouseBundleFilter';
import { getirDomainTypesList } from '@app/pages/ClientTargeting/utils';

const subSectionName = 'notOrdered';
const activeKey = `${clientListSections.getirGeneralDetail}.${subSectionName}`;

const NotOrderedDetail = () => {
  const { t } = useTranslation('clientTargetingPage');
  const clientListData = useSelector(getClientListData(activeKey));

  const { activeIndex } = clientListData;
  const data = clientListData.params[activeIndex];

  return (
    <CollapsePanel header={t('NOT_ORDERED_DETAIL')} activeKey={activeKey}>
      <ActiveParamButtons activeKey={activeKey} activeParamIndex={clientListData.activeIndex} paramsLength={clientListData.params.length} />
      <Row justify="space-between">
        <Col span={11}>
          <WarehouseBundleFilter
            activeKey={activeKey}
            isDomainSelectShown
            selectableDomainTypes={getirDomainTypesList}
          />

          {data.domainTypes.includes(GETIR_FOOD_DOMAIN_TYPE) && (
            <Fragment key="1">
              <FoodCheckboxSelect activeKey={activeKey} value={data.isChainSelected} label={t('CHAIN')} clientListKey="isChainSelected" />
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
            </Fragment>
          )}
          {data.domainTypes.includes(GETIR_LOCALS_DOMAIN_TYPE) && (
            <div>
              <ArtisanTypesSelect
                activeKey={activeKey}
                label={t('ARTISAN_TYPE')}
                placeholder={t('ARTISAN_TYPE')}
                clientListKey="artisanType"
                value={data.artisanType}
              />
              <ArtisanChainShopsSelect
                activeKey={activeKey}
                label={t('ARTISAN_CHAIN_SHOPS')}
                placeholder={t('ARTISAN_CHAIN_SHOPS')}
                clientListKey="chainId"
                value={data.chainId}
              />
              <ShopsSelect
                activeKey={activeKey}
                value={data.shops}
                label={t('STORES')}
                clientListKey="shops"
                selectable={data.getShops.data}
                showCSVImporter
                selectedArtisanType={data.artisanType}
                selectedChainId={data.chainId}
              />
            </div>
          )}
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
        </Col>
      </Row>
    </CollapsePanel>
  );
};

export default NotOrderedDetail;
