import { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Row, Col } from 'antd';

import CollapsePanel from '../../common/CollapsePanel';
import {
  clientListSections,
  ORDER_RATE_OPTIONS,
  getTopXOrderTypeOptions,
  getOrderCalculationTypes,
} from '../../../constants';
import ActiveParamButtons from '../../common/ActiveParamButtons';
import { getClientListData } from '../../../redux/selectors';
import MultipleSelect from '../../common/MultipleSelect';
import SingleSelect from '../../common/SingleSelect';
import { GETIR_FOOD_DOMAIN_TYPE, GETIR_LOCALS_DOMAIN_TYPE } from '@shared/shared/constants';
import ShopsSelect from '../../common/ShopsSelect';
import RestaurantsSelect from '../../common/RestaurantsSelect';
import ChainRestaurantsSelect from '../../common/ChainRestaurantsSelect';
import FoodCheckboxSelect from '../../common/FoodCheckboxSelect';
import SelectDateOrXDaysBeforeToday from '../../common/SelectDateOrXDaysBeforeToday';
import MinMaxInput from '../../common/MinMaxInput';
import WarehouseBundleFilter from '../../common/WarehouseBundleFilter';
import { getirDomainTypesList } from '@app/pages/ClientTargeting/utils';

const subSectionName = 'orderRating';
const activeKey = `${clientListSections.getirGeneralDetail}.${subSectionName}`;

const OrderRatingDetail = () => {
  const { t } = useTranslation('clientTargetingPage');
  const clientListData = useSelector(getClientListData(activeKey));

  const { activeIndex } = clientListData;
  const data = clientListData.params[activeIndex];

  const minOrderKey = 'minOrderCount';
  const maxOrderKey = 'maxOrderCount';

  const topXOrderTypeOptions = getTopXOrderTypeOptions(t);
  const orderCalculationOptions = getOrderCalculationTypes(t);

  return (
    <CollapsePanel header={t('GETIR_ORDER_RATING_DETAIL')} activeKey={activeKey}>
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
            <ShopsSelect
              activeKey={activeKey}
              value={data.shops}
              label={t('STORES')}
              clientListKey="shops"
              selectable={data.getShops.data}
              showCSVImporter
            />
          )}
          <SingleSelect
            activeKey={activeKey}
            value={data.orderRate}
            label={t('ORDER_RATING')}
            clientListKey="orderRate"
            selectable={ORDER_RATE_OPTIONS}
            tagValue="name"
            tagKey="id"
          />
        </Col>
        <Col span={11}>
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
          <SingleSelect
            activeKey={activeKey}
            label={t('CALCULATION_DETAIL')}
            placeholder={t('CALCULATION_DETAIL')}
            value={data.calculationType}
            selectable={orderCalculationOptions}
            clientListKey="calculationType"
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

export default OrderRatingDetail;
