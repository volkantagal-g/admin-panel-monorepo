import { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Row, Col } from 'antd';

import CollapsePanel from '../../common/CollapsePanel';
import { clientListSections } from '../../../constants';
import ActiveParamButtons from '../../common/ActiveParamButtons';
import { getClientListData } from '../../../redux/selectors';
import MultipleSelect from '../../common/MultipleSelect';
import MinMaxInput from '../../common/MinMaxInput';
import SelectDateOrXDaysBeforeToday from '../../common/SelectDateOrXDaysBeforeToday';
import FoodCheckboxSelect from '../../common/FoodCheckboxSelect';
import ChainRestaurantsSelect from '../../common/ChainRestaurantsSelect';
import ShopsSelect from '../../common/ShopsSelect';
import RestaurantsSelect from '../../common/RestaurantsSelect';
import { GETIR_FOOD_DOMAIN_TYPE, GETIR_LOCALS_DOMAIN_TYPE } from '@shared/shared/constants';
import ArtisanTypesSelect from '../../common/ArtisanTypesSelect';
import ArtisanChainShopsSelect from '../../common/ArtisanChainShopsSelect';
import WarehouseBundleFilter from '../../common/WarehouseBundleFilter';
import { getirDomainTypesList } from '@app/pages/ClientTargeting/utils';

const subSectionName = 'purchaseFrequency';
const activeKey = `${clientListSections.getirGeneralDetail}.${subSectionName}`;

const PurchaseFrequencyDetail = () => {
  const { t } = useTranslation('clientTargetingPage');
  const clientListData = useSelector(getClientListData(activeKey));

  const { activeIndex, params } = clientListData;
  const data = params[activeIndex];

  const minCountKey = 'minOrderCount';
  const maxCountKey = 'maxOrderCount';

  return (
    <CollapsePanel header={t('PURCHASE_FREQUENCY_DETAIL')} activeKey={activeKey}>
      <ActiveParamButtons activeKey={activeKey} activeParamIndex={activeIndex} paramsLength={params.length} />
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
          <MinMaxInput
            activeKey={activeKey}
            minCount={data[minCountKey]}
            maxCount={data[maxCountKey]}
            minCountKey={minCountKey}
            maxCountKey={maxCountKey}
            label={t('ORDER_COUNT')}
          />
          <SelectDateOrXDaysBeforeToday
            activeKey={activeKey}
            label={t('ORDER_DATE')}
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

export default PurchaseFrequencyDetail;
