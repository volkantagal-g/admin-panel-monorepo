import { Row, Col, Form } from 'antd';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import React, { useCallback, useMemo } from 'react';

import { getLangKey } from '@shared/i18n';
import {
  getSelectFilterOption,
  setNullToEmptyStringDeep,
} from '@shared/utils/common';
import {
  getCitiesSelector,
  regionsSelector,
} from '@shared/redux/selectors/common';

import { selectFormatter } from '@app/pages/Planogram/Warehouses/components/Filters/utils';
import { Creators } from '@app/pages/Planogram/Warehouses/redux/actions';
import { Button, FormItem, Select, Space } from '@shared/components/GUI';
import {
  getDemographiesSelector,
  getMainWarehousesAndCitiesSelector,
  getSizesSelector,
  getWarehouseTypesSelector,
  listPlanogramWarehousesInitialSelector,
} from '@app/pages/Planogram/Warehouses/redux/selectors';
import { getCustomDomainTypeOptions } from '@app/pages/Planogram/formHelper';
import { PLANOGRAM_PRODUCT_DOMAIN_TYPES } from '@shared/shared/constantValues';
import useStyles from '@app/pages/Planogram/Warehouses/components/Filters/styles';

const Filters = React.memo(({ getRegionsRequest, setFormValues, initialPagination }) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const { t } = useTranslation('planogramPage');
  const classes = useStyles();

  const sizeList = useSelector(getSizesSelector.getData);
  const demographyList = useSelector(getDemographiesSelector.getData);
  const warehouseTypesList = useSelector(getWarehouseTypesSelector.getData);
  const warehouseListFilter = useSelector(listPlanogramWarehousesInitialSelector.getWarehouseList);
  const mainWarehousesData = useSelector(getMainWarehousesAndCitiesSelector.getMainWarehousesData);
  const cities = useSelector(getCitiesSelector.getData);
  const regions = useSelector(regionsSelector.getData);

  const useWarehouseFilters = () => {
    const sizeListIsPending = useSelector(getSizesSelector.getIsPending);
    const demographyListIsPending = useSelector(getDemographiesSelector.getIsPending);
    const warehouseTypesListIsPending = useSelector(getWarehouseTypesSelector.getIsPending);
    const warehouseListFilterIsPending = useSelector(listPlanogramWarehousesInitialSelector.getIsPending);
    const mainWarehousesIsPending = useSelector(getMainWarehousesAndCitiesSelector.getIsPending);
    const regionListIsPending = useSelector(regionsSelector.getIsPending);
    const cityListIsPending = useSelector(getCitiesSelector.getIsPending);
    return {
      isPending:
        warehouseListFilterIsPending ||
        sizeListIsPending ||
        demographyListIsPending ||
        warehouseTypesListIsPending ||
        mainWarehousesIsPending ||
        regionListIsPending ||
        cityListIsPending,
    };
  };
  const { isPending } = useWarehouseFilters();

  const cityOptions = useMemo(
    () => cities?.map(city => {
      return { value: city._id, label: city.name?.[getLangKey()] };
    }),
    [cities],
  );

  const regionOptions = useMemo(
    () => regions?.map(region => {
      return { value: region._id, label: region.name?.[getLangKey()] };
    }),
    [regions],
  );

  const handleCityChange = selectedCityId => {
    if (form.getFieldsValue().regionId) {
      form.resetFields(['regionId']);
    }
    form.setFieldsValue({ cityId: selectedCityId });
    getRegionsRequest({ cityId: selectedCityId });
  };

  const handleFilter = useCallback(() => {
    const formValues = form.getFieldsValue();
    setNullToEmptyStringDeep(formValues);
    setFormValues(formValues);
    dispatch(Creators.listPlanogramWarehousesRequest({ body: { filter: { ...formValues }, pagination: initialPagination } }));
  }, [form, initialPagination, setFormValues, dispatch]);

  const getWarehouseNameList = useMemo(() => {
    return warehouseListFilter?.map(warehouse => ({
      value: warehouse?.id,
      label: warehouse?.name,
    }));
  }, [warehouseListFilter]);

  return (
    <Form form={form} onFinish={handleFilter} layout="vertical" name="filter">
      <Space title={t('FILTER')} className="w-100">
        <Row gutter={[8, 8]}>
          <Col span={6}>
            <FormItem
              name="warehouseIds"
              className={classes.notAutoCompleteItem}
            >
              <Select
                label={t('WAREHOUSES_PAGES.LIST_AND_FILTER.WAREHOUSE_ID')}
                name="warehouseIds"
                mode="tags"
                autoComplete="off"
                allowClear
                showSearch
                filterOption={getSelectFilterOption}
                onChange={warehouseIds => form.setFieldsValue({ warehouseIds })}
              />
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem name="names">
              <Select
                label={(
                  <label htmlFor="warehouse-name">
                    {t('WAREHOUSES_PAGES.LIST_AND_FILTER.WAREHOUSE_NAME')}
                  </label>
                )}
                id="warehouse-name"
                mode="tags"
                allowClear
                autoComplete
                showSearch
                className={classes.autoCompleteItem}
                filterOption={getSelectFilterOption}
                optionsData={getWarehouseNameList}
              />
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem name="demographyIds">
              <Select
                label={(
                  <label htmlFor="demography-id">
                    {t('WAREHOUSES_PAGES.LIST_AND_FILTER.DEMOGRAPHY')}
                  </label>
                )}
                id="demography-id"
                name="demographyIds"
                mode="multiple"
                allowClear
                filterOption={getSelectFilterOption}
                loading={isPending}
                optionsData={
                  demographyList?.length > 0
                    ? selectFormatter(demographyList)
                    : []
                }
              />
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem name="sizeIds">
              <Select
                label={(
                  <label htmlFor="size-id">
                    {t('WAREHOUSES_PAGES.LIST_AND_FILTER.SIZE')}
                  </label>
                )}
                id="size-id"
                name="sizeIds"
                mode="multiple"
                allowClear
                filterOption={getSelectFilterOption}
                loading={isPending}
                optionsData={
                  sizeList?.length > 0 ? selectFormatter(sizeList) : []
                }
              />
            </FormItem>
          </Col>
        </Row>
        <Row gutter={[8, 8]}>
          <Col span={6}>
            <FormItem name="domainTypes">
              <Select
                label={(
                  <label htmlFor="domain-type">
                    {t('WAREHOUSES_PAGES.LIST_AND_FILTER.DOMAIN')}
                  </label>
                )}
                id="domain-type"
                name="domainTypes"
                mode="multiple"
                allowClear
                filterOption={getSelectFilterOption}
                optionsData={getCustomDomainTypeOptions(
                  PLANOGRAM_PRODUCT_DOMAIN_TYPES,
                )}
              />
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem name="warehouseTypes">
              <Select
                label={(
                  <label htmlFor="warehouse-type">
                    {t('WAREHOUSES_PAGES.LIST_AND_FILTER.WAREHOUSE_TYPE')}
                  </label>
                )}
                id="warehouse-type"
                name="warehouseTypes"
                mode="multiple"
                allowClear
                filterOption={getSelectFilterOption}
                loading={isPending}
                maxTagCount={2}
                optionsData={
                  warehouseTypesList &&
                  Object.keys(warehouseTypesList)?.length > 0 &&
                  Object.entries(warehouseTypesList)?.map(([key, value]) => ({
                    value: parseFloat(key),
                    label: value,
                  }))
                }
              />
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem name="cityIds">
              <Select
                label={(
                  <label htmlFor="city-id">
                    {t('WAREHOUSES_PAGES.LIST_AND_FILTER.CITY')}
                  </label>
                )}
                id="city-id"
                name="cityIds"
                mode="multiple"
                allowClear
                showSearch
                maxTagCount={2}
                filterOption={getSelectFilterOption}
                optionsData={cityOptions || []}
                onChange={handleCityChange}
              />
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem name="regionIds">
              <Select
                label={(
                  <label htmlFor="region-id">
                    {t('WAREHOUSES_PAGES.LIST_AND_FILTER.REGION')}
                  </label>
                )}
                id="region-id"
                name="regionIds"
                mode="multiple"
                allowClear
                showSearch
                maxTagCount={2}
                optionsData={regionOptions || []}
                filterOption={getSelectFilterOption}
              />
            </FormItem>
          </Col>
        </Row>
        <Row gutter={[8, 8]} className={classes.endOfFilter}>
          <Col span={6}>
            <FormItem name="mainWarehouseIds">
              <Select
                label={(
                  <label htmlFor="main-warehouses">
                    {t('WAREHOUSES_PAGES.LIST_AND_FILTER.MAIN_WAREHOUSE')}
                  </label>
                )}
                id="main-warehouses"
                name="mainWarehouseIds"
                mode="multiple"
                allowClear
                showSearch
                maxTagCount={2}
                optionsData={selectFormatter(mainWarehousesData)}
                filterOption={getSelectFilterOption}
              />
            </FormItem>
          </Col>
          <Button type="primary" htmlType="submit">
            {t('global:APPLY')}
          </Button>
        </Row>
      </Space>
    </Form>
  );
});

export default Filters;
