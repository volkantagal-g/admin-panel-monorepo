import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Select, Row, Col } from 'antd';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'react-jss';

import AntCard from '@shared/components/UI/AntCard';
import {
  getCityOptions,
  getWarehouseOptions,
  getDomainTypeOptions,
} from '@shared/utils/formHelper';
import { createMap, getSelectFilterOption } from '@shared/utils/common';
import {
  getCitiesSelector,
  getFilteredWarehousesSelector,
  getMarketProductCategoriesSelector,
} from '@shared/redux/selectors/common';
import {
  deleteMarketProductCategoryAvailableTimesSelector,
  getMarketProductCategoryAvailableTimesSelector,
} from '../../redux/selectors';
import { Creators } from '../../redux/actions';
import { getColoredCategoryOptions, getColoredSubCategoryOptionGroups } from '@app/pages/MarketProduct/utils';
import useStyles from './styles';

const MAX_TAG_COUNT_ON_SELECT_INPUT = 10;

const FilterBar = ({ filters, onSetFilters, onSetSelectedCategoryAvailableTimeIds }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation('marketProductCategoryVisibilityPage');
  const cities = useSelector(getCitiesSelector.getData);
  const isCitiesPending = useSelector(getCitiesSelector.getIsPending);
  const warehouses = useSelector(getFilteredWarehousesSelector.getData);
  const isCategoryAvailableTimesPending = useSelector(getMarketProductCategoryAvailableTimesSelector.getIsPending);
  const isWarehousesPending = useSelector(getFilteredWarehousesSelector.getIsPending);
  const isDeleteBulkPending = useSelector(deleteMarketProductCategoryAvailableTimesSelector.getIsPending);
  const marketProductCategories = useSelector(getMarketProductCategoriesSelector.getData);
  const isCategoriesPending = useSelector(getMarketProductCategoriesSelector.getIsPending);
  const theme = useTheme();
  const classes = useStyles();
  const cityOptions = useMemo(() => getCityOptions(cities), [cities]);
  const warehouseOptions = useMemo(() => getWarehouseOptions(warehouses), [warehouses]);
  const domainTypeOptions = useMemo(() => getDomainTypeOptions(), []);
  const categoriesMap = useMemo(() => createMap(marketProductCategories), [marketProductCategories]);

  const categoryOptions = useMemo(
    () => {
      const categories = marketProductCategories.filter(cat => !cat.isSubCategory);
      return getColoredCategoryOptions({ categories, classes, t });
    },
    [marketProductCategories, classes, t],
  );

  const subCategoryOptions = useMemo(
    () => {
      const categories = marketProductCategories.filter(cat => !cat.isSubCategory);
      let subCategories = marketProductCategories.filter(cat => cat.isSubCategory);
      if (filters.categories) {
        const selectedCategories = filters?.categories?.map(categoryId => categoriesMap?.[categoryId]);
        const selectedCategoriesMap = createMap(selectedCategories);
        subCategories = subCategories.filter(subCategory => selectedCategoriesMap?.[subCategory.parent]);
      }
      return getColoredSubCategoryOptionGroups({
        marketProductCategories: categories,
        selectedCategoryIds: filters.categories,
        marketProductSubCategories: subCategories,
        classes,
        t,
      });
    },
    [marketProductCategories, filters.categories, classes, t, categoriesMap],
  );

  const handleCityFilterChange = (fieldKey, value) => {
    const newFilters = { ...filters, warehouses: undefined, [fieldKey]: value };
    dispatch(Creators.getMarketProductCategoryAvailableTimesByCitiesRequest({
      ...newFilters,
      cities: value?.length ? value : undefined,
      shouldFetchWarehouses: true,
    }));
    onSetFilters({ ...newFilters });
    onSetSelectedCategoryAvailableTimeIds([]);
  };

  const handleGetAvailableTimes = params => {
    if (params.warehouses?.length) {
      dispatch(Creators.getMarketProductCategoryAvailableTimesRequest({
        warehouses: params.warehouses,
        domainTypes: params.domainTypes,
        categories: params.categories,
        subCategories: params.subCategories,
      }));
    }
    else {
      dispatch(Creators.getMarketProductCategoryAvailableTimesByCitiesRequest({
        ...params,
        cities: filters.cities?.length ? filters.cities : undefined,
        shouldFetchWarehouses: false,
      }));
    }
    onSetFilters({ ...params });
    onSetSelectedCategoryAvailableTimeIds([]);
  };

  const handleFilterChange = (fieldKey, value) => {
    const newFilters = { ...filters, [fieldKey]: value };
    handleGetAvailableTimes(newFilters);
  };

  const handleWarehouseFilterChange = (fieldKey, value) => {
    const newFilters = { ...filters, [fieldKey]: value };
    if (value?.length) {
      handleGetAvailableTimes(newFilters);
    }
    else {
      dispatch(Creators.getMarketProductCategoryAvailableTimesByCitiesRequest({ ...newFilters, shouldFetchWarehouses: true }));
      onSetFilters({ ...newFilters });
      onSetSelectedCategoryAvailableTimeIds([]);
    }
  };

  const handleCategoryFilterChange = (fieldKey, value) => {
    const newFilters = { ...filters, [fieldKey]: value, subCategories: undefined };
    handleGetAvailableTimes(newFilters);
  };

  const isAnyPending = isWarehousesPending || isCitiesPending || isCategoryAvailableTimesPending || isDeleteBulkPending || isCategoriesPending;

  return (
    <AntCard>
      <Row type="flex" gutter={theme.spacing(3)}>
        <Col xs={24} sm={24} md={8} lg={4} xl={4} className="mb-2">
          <Select
            placeholder={t('global:CITY')}
            className="w-100"
            name="city"
            value={filters.cities}
            mode="multiple"
            options={cityOptions}
            onChange={value => handleCityFilterChange('cities', value)}
            autoComplete="off"
            loading={isAnyPending}
            disabled={isAnyPending}
            allowClear
            showSearch
            filterOption={getSelectFilterOption}
            maxTagCount={MAX_TAG_COUNT_ON_SELECT_INPUT}
            getPopupContainer={trigger => trigger?.parentNode}
          />
        </Col>
        <Col xs={24} sm={24} md={8} lg={4} xl={4} className="mb-2">
          <Select
            placeholder={t('global:WAREHOUSE')}
            className="w-100"
            value={filters.warehouses}
            mode="multiple"
            options={warehouseOptions}
            onChange={value => handleWarehouseFilterChange('warehouses', value)}
            autoComplete="off"
            loading={isAnyPending}
            disabled={!warehouses.length || isAnyPending}
            allowClear
            showSearch
            filterOption={getSelectFilterOption}
            maxTagCount={MAX_TAG_COUNT_ON_SELECT_INPUT}
            getPopupContainer={trigger => trigger?.parentNode}
          />
        </Col>
        <Col xs={24} sm={24} md={8} lg={4} xl={4} className="mb-2">
          <Select
            placeholder={t('global:CATEGORY')}
            className="w-100"
            value={filters.categories}
            mode="multiple"
            onChange={value => handleCategoryFilterChange('categories', value)}
            autoComplete="off"
            loading={isAnyPending}
            disabled={isAnyPending}
            allowClear
            showSearch
            filterOption={getSelectFilterOption}
            maxTagCount={MAX_TAG_COUNT_ON_SELECT_INPUT}
            getPopupContainer={trigger => trigger?.parentNode}
          >
            {categoryOptions}
          </Select>
        </Col>
        <Col xs={24} sm={24} md={8} lg={4} xl={4} className="mb-2">
          <Select
            placeholder={t('global:SUB_CATEGORY')}
            className="w-100"
            value={filters.subCategories}
            mode="multiple"
            onChange={value => handleFilterChange('subCategories', value)}
            autoComplete="off"
            loading={isAnyPending}
            disabled={isAnyPending}
            allowClear
            showSearch
            filterOption={getSelectFilterOption}
            maxTagCount={MAX_TAG_COUNT_ON_SELECT_INPUT}
            getPopupContainer={trigger => trigger?.parentNode}
          >
            {subCategoryOptions}
          </Select>
        </Col>
        <Col xs={24} sm={24} md={8} lg={4} xl={4} className="mb-2">
          <Select
            placeholder={t('global:DOMAIN_TYPE')}
            className="w-100"
            value={filters.domainTypes}
            mode="multiple"
            options={domainTypeOptions}
            onChange={value => handleFilterChange('domainTypes', value)}
            autoComplete="off"
            disabled={isAnyPending}
            allowClear
            showSearch
            filterOption={getSelectFilterOption}
            maxTagCount={MAX_TAG_COUNT_ON_SELECT_INPUT}
            getPopupContainer={trigger => trigger?.parentNode}
          />
        </Col>
      </Row>
    </AntCard>
  );
};

export default FilterBar;
