import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col } from 'antd';

import useDebouncedCallback from '@shared/hooks/useDebouncedCallback';
import { Creators } from '../../../redux/actions';

import CollapsePanel from '../../common/CollapsePanel';
import { clientListSections, getBasketDetailTypesOptions } from '../../../constants';
import ActiveParamButtons from '../../common/ActiveParamButtons';
import { getClientListData, getFilteredBrandsSelector } from '../../../redux/selectors';
import SelectDateOrXDaysBeforeToday from '../../common/SelectDateOrXDaysBeforeToday';
import CountInputsSelect from '../../common/CountInputsSelect';
import WarehouseBundleFilter from '../../common/WarehouseBundleFilter';
import { getirMarketDomainTypesList } from '@app/pages/ClientTargeting/utils';
import SingleSelect from '../../common/SingleSelect';
import {
  getMarketProductCategoriesSelector,
  getMarketProductSubCategoriesSelector,
  getSuppliersSelector,
} from '@shared/redux/selectors/common';
import { DEFAULT_DEBOUNCE_MS } from '@shared/shared/constants';
import { BASKET_DETAIL_TYPES } from './constants';
import MultipleSelect from '../../common/MultipleSelect';

const subSectionName = 'orderProduct';
const activeKey = `${clientListSections.getirGeneralDetail}.${subSectionName}`;

const OrderProductDetail = () => {
  const { t } = useTranslation('clientTargetingPage');
  const dispatch = useDispatch();
  const clientListData = useSelector(getClientListData(activeKey));
  const { manufacturers, suppliers } = useSelector(getSuppliersSelector.getSuppliersByTypeBreakdown);
  const suppliersIsPending = useSelector(getSuppliersSelector.getIsPending);
  const categories = useSelector(getMarketProductCategoriesSelector.getData);
  const subCategories = useSelector(getMarketProductSubCategoriesSelector.getData);
  const productSubCategoriesIsPending = useSelector(getMarketProductSubCategoriesSelector.getIsPending);
  const productCategoriesIsPending = useSelector(getMarketProductCategoriesSelector.getIsPending);
  const brands = useSelector(getFilteredBrandsSelector.getData);
  const brandsIsPending = useSelector(getFilteredBrandsSelector.getIsPending);

  const handleSearch = useCallback(searchText => {
    const params = {
      page: 1,
      size: 50,
      name: searchText,
      status: true,
      fields: ['name'],
    };
    dispatch(Creators.getFilteredBrandsRequest({ params }));
  }, [dispatch]);

  const { debouncedCallback } = useDebouncedCallback({ callback: handleSearch, delay: DEFAULT_DEBOUNCE_MS });

  const onSearch = useCallback(searchText => {
    if (searchText?.trim().length > 2) {
      debouncedCallback(searchText);
    }
    else {
      debouncedCallback.cancel();
    }
  }, [debouncedCallback]);

  const clearFilteredBrandRequest = () => {
    dispatch(Creators.resetFilteredBrandsRequest());
  };

  const { activeIndex } = clientListData;
  const data = clientListData.params[activeIndex];

  return (
    <CollapsePanel header={t('ORDER_PRODUCT_DETAIL')} activeKey={activeKey}>
      <ActiveParamButtons activeKey={activeKey} activeParamIndex={clientListData.activeIndex} paramsLength={clientListData.params.length} />
      <Row justify="space-between">
        <Col span={11}>
          <WarehouseBundleFilter
            activeKey={activeKey}
            isDomainSelectShown
            selectableDomainTypes={getirMarketDomainTypesList}
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
          <SingleSelect
            label={t('BASKET_DETAIL_TYPE')}
            activeKey={activeKey}
            selectable={getBasketDetailTypesOptions()}
            value={data.basketDetailType}
            clientListKey="basketDetailType"
            tagValue="label"
            tagKey="value"
          />
          {data.basketDetailType === BASKET_DETAIL_TYPES.MANUFACTURER && (
            <MultipleSelect
              activeKey={activeKey}
              label={t('MANUFACTURER')}
              placeholder={t('MANUFACTURER')}
              clientListKey="manufacturers"
              value={data.manufacturers}
              tagKey="_id"
              tagValue="name"
              selectable={manufacturers}
              disabled={suppliersIsPending}
              allowClear
            />
          )}
          {data.basketDetailType === BASKET_DETAIL_TYPES.SUPPLIER && (
            <MultipleSelect
              activeKey={activeKey}
              label={t('SUPPLIER')}
              placeholder={t('SUPPLIER')}
              clientListKey="suppliers"
              value={data.suppliers}
              tagValue="name"
              tagKey="_id"
              selectable={suppliers}
              disabled={suppliersIsPending}
              allowClear
            />
          )}
          {data.basketDetailType === BASKET_DETAIL_TYPES.CATEGORY && (
            <MultipleSelect
              activeKey={activeKey}
              label={t('CATEGORY')}
              placeholder={t('CATEGORY')}
              clientListKey="categories"
              value={data.categories}
              selectable={categories}
              tagValue="name"
              tagKey="_id"
              disabled={data.productCategoriesDisabled}
              allowClear
              isLoading={productCategoriesIsPending}
            />
          )}
          {data.basketDetailType === BASKET_DETAIL_TYPES.SUB_CATEGORY && (
            <MultipleSelect
              activeKey={activeKey}
              label={t('SUB_CATEGORY')}
              placeholder={t('SUB_CATEGORY')}
              clientListKey="subCategories"
              value={data.subCategories}
              selectable={subCategories}
              tagValue="name"
              tagKey="_id"
              disabled={data.productSubCategoriesDisabled}
              allowClear
              isLoading={productSubCategoriesIsPending}
            />
          )}
          {data.basketDetailType === BASKET_DETAIL_TYPES.BRAND && (
            <MultipleSelect
              activeKey={activeKey}
              label={t('BRAND')}
              placeholder={t('BRAND')}
              clientListKey="brands"
              value={data.brands}
              tagKey="_id"
              tagValue="name"
              selectable={brands}
              onSearch={onSearch}
              onBlur={clearFilteredBrandRequest}
              isLoading={brandsIsPending}
              allowClear
            />
          )}
          <CountInputsSelect
            activeKey={activeKey}
            label={t('CALCULATION_DETAIL')}
            selectedCountType={data.selectedCountType}
            selectedCountMinValue={data.selectedCountMinValue}
            selectedCountMaxValue={data.selectedCountMaxValue}
          />
        </Col>
      </Row>
    </CollapsePanel>
  );
};

export default OrderProductDetail;
