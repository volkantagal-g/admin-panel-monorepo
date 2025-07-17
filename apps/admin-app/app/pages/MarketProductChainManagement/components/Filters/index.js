import { Col, Form, Row, Switch } from 'antd';
import React, { useCallback, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { getLangKey } from '@shared/i18n';
import { DARKSTORE_TABS, getirMarketDomainTypes, PAGE_TYPES, PRODUCT_TABS, WAREHOUSE_TABS } from '@app/pages/MarketProductChainManagement/constants';
import { productSegments } from '@shared/shared/constantValues';

import FilterSelect from '@app/pages/MarketProductChainManagement/components/FilterSelect';
import SearchInput from '@app/pages/MarketProductChainManagement/components/SearchInput';
import TableControl from '@app/pages/MarketProductChainManagement/components/TableControl';
import { useFilterForm } from './hooks/useFilterForm';
import useStyles from './styles';

const DEFAULT_COL_SPANS = {
  xs: 24,
  sm: 12,
  md: 6,
  lg: 4,
};

const SEARCH_COL_SPANS = {
  xs: 24,
  sm: 24,
  md: 12,
  lg: 8,
};

const Filters = React.memo(({
  activeTab,
  pageType,
  isDetailPage,
  setFormValues,
  setOpenFreezeColumnsModal,
  setOpenManageColumnsModal,
  cities,
  citiesLoading,
  onCitySearch,
  regions,
  regionsLoading,
  onRegionSearch,
  demographies,
  demographiesLoading,
  sizes,
  sizesLoading,
  domainTypes,
  domainTypesLoading,
  categories,
  categoriesLoading,
}) => {
  const classes = useStyles();
  const { t } = useTranslation('marketProductChainManagement');
  const { form, handleFilter } = useFilterForm(setFormValues, activeTab, pageType);

  // Değişkenleri en üstte tanımlayalım
  const TABS = pageType === PAGE_TYPES.PRODUCT ? PRODUCT_TABS : WAREHOUSE_TABS;
  const isDarkStore = activeTab === TABS.DARK_STORE;
  const isPlatform = activeTab === TABS.PLATFORM;
  const isProductList = pageType === PAGE_TYPES.PRODUCT && !isDetailPage;

  const cityOptions = useMemo(() => {
    if (!cities?.length) {
      return [];
    }
    return cities.map(city => ({
      value: city.value,
      label: city.label,
    }));
  }, [cities]);

  const regionOptions = useMemo(() => {
    if (!regions?.length) {
      return [];
    }
    return regions.map(region => ({
      value: region.value,
      label: region.label,
    }));
  }, [regions]);

  const domainOptions = useMemo(() => {
    if (domainTypes && Array.isArray(domainTypes) && domainTypes.length > 0) {
      return domainTypes;
    }

    return Object.entries(getirMarketDomainTypes).map(([value, labels]) => ({
      value: Number(value),
      label: labels[getLangKey()] || labels.en,
    }));
  }, [domainTypes]);

  const demographyOptions = useMemo(() => {
    if (!demographies || !Array.isArray(demographies) || !demographies.length) {
      return [];
    }
    return demographies;
  }, [demographies]);

  const sizeOptions = useMemo(() => {
    if (!sizes || !Array.isArray(sizes) || !sizes.length) {
      return [];
    }
    return sizes;
  }, [sizes]);

  const segmentOptions = useMemo(() => {
    return Object.entries(productSegments).map(([value, labels]) => ({
      value: Number(value),
      label: labels[getLangKey()] || labels.en,
    }));
  }, []);

  const categoryOptions = useMemo(() => {
    if (!categories || !Array.isArray(categories) || !categories.length) {
      return [];
    }
    return categories;
  }, [categories]);

  const handleCitySearch = useCallback(search => {
    if (onCitySearch && search?.length >= 2) {
      onCitySearch(search);
    }
  }, [onCitySearch]);

  const handleRegionSearch = useCallback(search => {
    if (onRegionSearch && search?.length >= 2) {
      onRegionSearch(search);
    }
  }, [onRegionSearch]);

  useEffect(() => {
    form.resetFields(['search']);
    setFormValues({ filters: {} });
  }, [activeTab, form, setFormValues]);

  const renderProductListFilters = useCallback(() => (
    <>
      <Col {...DEFAULT_COL_SPANS} className={classes.filterCol}>
        <FilterSelect
          name="category"
          label={t('COLUMNS.CATEGORY')}
          form={form}
          optionsData={categoryOptions}
          loading={categoriesLoading}
        />
      </Col>
      <Col {...DEFAULT_COL_SPANS} className={classes.filterCol}>
        <FilterSelect
          name="segment"
          label={t('SEGMENT')}
          form={form}
          optionsData={segmentOptions}
        />
      </Col>
      <Col {...DEFAULT_COL_SPANS} className={classes.filterCol}>
        <FilterSelect
          name="domain"
          label={t('DOMAIN')}
          form={form}
          optionsData={domainOptions}
          loading={domainTypesLoading}
        />
      </Col>
      <Col {...DEFAULT_COL_SPANS} className={classes.filterCol}>
        <FilterSelect
          name="size"
          label={t('SIZE')}
          form={form}
          optionsData={sizeOptions}
          loading={sizesLoading}
        />
      </Col>
      <Col {...DEFAULT_COL_SPANS} className={classes.filterCol}>
        <FilterSelect
          name="demography"
          label={t('DEMOGRAPHY')}
          form={form}
          optionsData={demographyOptions}
          loading={demographiesLoading}
        />
      </Col>
      <Col {...DEFAULT_COL_SPANS} className={classes.filterCol}>
        <Form.Item
          name="isLocal"
          label={t('IS_LOCAL')}
          valuePropName="checked"
        >
          <Switch
            onChange={checked => {
              form.setFieldsValue({ isLocal: checked });
              form.submit();
            }}
          />
        </Form.Item>
      </Col>
    </>
  ), [
    classes.filterCol,
    t,
    form,
    domainOptions,
    domainTypesLoading,
    demographyOptions,
    demographiesLoading,
    sizeOptions,
    sizesLoading,
    segmentOptions,
    categoryOptions,
    categoriesLoading,
  ]);

  const renderProductDetailFilters = useCallback(() => {
    if (pageType === PAGE_TYPES.DARK_STORE) {
      switch (activeTab) {
        case DARKSTORE_TABS.PRODUCTS:
          return (
            <>
              <Col {...DEFAULT_COL_SPANS} className={classes.filterCol}>
                <FilterSelect
                  name="domain"
                  label={t('DOMAIN')}
                  form={form}
                  optionsData={domainOptions}
                  loading={domainTypesLoading}
                  mode="multiple"
                  maxTagCount={2}
                />
              </Col>
              <Col {...DEFAULT_COL_SPANS} className={classes.filterCol}>
                <FilterSelect
                  name="demography"
                  label={t('DEMOGRAPHY')}
                  form={form}
                />
              </Col>
            </>
          );

        case DARKSTORE_TABS.CENTRAL_WAREHOUSE:
        case DARKSTORE_TABS.SUPPLIERS:
          return (
            <>
              <Col {...DEFAULT_COL_SPANS} className={classes.filterCol}>
                <FilterSelect
                  name="domain"
                  label={t('DOMAIN')}
                  form={form}
                  optionsData={domainOptions}
                  loading={domainTypesLoading}
                  mode="multiple"
                  maxTagCount={2}
                />
              </Col>
              <Col {...DEFAULT_COL_SPANS} className={classes.filterCol}>
                <FilterSelect
                  name="city"
                  label={t('CITY')}
                  form={form}
                  mode="multiple"
                  maxTagCount={2}
                  optionsData={cityOptions}
                  loading={citiesLoading}
                  onChange={handleCitySearch}
                  onSearch={handleCitySearch}
                  showSearch
                  filterOption={false}
                />
              </Col>
            </>
          );

        default:
          return null;
      }
    }

    switch (true) {
      case isDarkStore:
        return (
          <>
            <Col {...DEFAULT_COL_SPANS} className={classes.filterCol}>
              <FilterSelect
                name="demography"
                label={t('DEMOGRAPHY')}
                form={form}
              />
            </Col>
            <Col {...DEFAULT_COL_SPANS} className={classes.filterCol}>
              <FilterSelect
                name="size"
                label={t('SIZE')}
                form={form}
              />
            </Col>
            <Col {...DEFAULT_COL_SPANS} className={classes.filterCol}>
              <FilterSelect
                name="domain"
                label={t('DOMAIN')}
                form={form}
                optionsData={domainOptions}
                loading={domainTypesLoading}
                mode="multiple"
                maxTagCount={2}
              />
            </Col>
            <Col {...DEFAULT_COL_SPANS} className={classes.filterCol}>
              <FilterSelect
                name="city"
                label={t('CITY')}
                form={form}
                mode="multiple"
                maxTagCount={2}
                optionsData={cityOptions}
                loading={citiesLoading}
                onChange={handleCitySearch}
                onSearch={handleCitySearch}
                showSearch
                filterOption={false}
              />
            </Col>
            <Col {...DEFAULT_COL_SPANS} className={classes.filterCol}>
              <FilterSelect
                name="region"
                label={t('REGION')}
                form={form}
                mode="multiple"
                maxTagCount={2}
                optionsData={regionOptions}
                loading={regionsLoading}
                onChange={handleRegionSearch}
              />
            </Col>
          </>
        );

      case !isPlatform:
        return (
          <>
            <Col {...DEFAULT_COL_SPANS} className={classes.filterCol}>
              <FilterSelect
                name="domain"
                label={t('DOMAIN')}
                form={form}
                optionsData={domainOptions}
                loading={domainTypesLoading}
                mode="multiple"
                maxTagCount={2}
              />
            </Col>
            <Col {...DEFAULT_COL_SPANS} className={classes.filterCol}>
              <FilterSelect
                name="city"
                label={t('CITY')}
                form={form}
                mode="multiple"
                maxTagCount={2}
                optionsData={cityOptions}
                loading={citiesLoading}
                onChange={handleCitySearch}
                onSearch={handleCitySearch}
                showSearch
                filterOption={false}
              />
            </Col>
            <Col {...DEFAULT_COL_SPANS} className={classes.filterCol}>
              <FilterSelect
                name="region"
                label={t('REGION')}
                form={form}
                mode="multiple"
                maxTagCount={2}
                optionsData={regionOptions}
                loading={regionsLoading}
                onChange={handleRegionSearch}
              />
            </Col>
          </>
        );

      default:
        return null;
    }
  }, [
    classes.filterCol,
    t,
    form,
    isDarkStore,
    isPlatform,
    cityOptions,
    regionOptions,
    citiesLoading,
    regionsLoading,
    handleCitySearch,
    handleRegionSearch,
    domainOptions,
    domainTypesLoading,
    pageType,
    activeTab,
  ]);

  return (
    <Form
      form={form}
      onFinish={handleFilter}
      layout="vertical"
      name="filter"
      className={classes.form}
    >
      <Row className={classes.filterRow}>
        <Col {...SEARCH_COL_SPANS} className={classes.searchCol}>
          <SearchInput
            name="search"
            label={t('SEARCH')}
            form={form}
          />
        </Col>

        {isProductList ? renderProductListFilters() : renderProductDetailFilters()}

        <Col className={classes.tableControl}>
          <TableControl
            setOpenFreezeColumnsModal={setOpenFreezeColumnsModal}
            setOpenManageColumnsModal={setOpenManageColumnsModal}
            isDarkStore={isDarkStore}
          />
        </Col>
      </Row>
    </Form>
  );
});

export default Filters;
