import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { isEmpty, uniq, uniqBy, find, get } from 'lodash';
import { Button, Col, Dropdown, Form, Input, Menu, Row, Select, Switch, Tooltip } from 'antd';
import { DeleteOutlined, PlusOutlined, InfoCircleOutlined } from '@ant-design/icons';
import Formula from 'fparser';

import { getLangKey } from '@shared/i18n';
import {
  marketOrderCheckoutErrorCodes,
  marketOrderStatuses,
  marketVehicleTypes,
  paymentMethods,
  posBanks,
} from '@shared/shared/constantValues';
import { DEVICE_TYPES } from '@shared/shared/constants';
import { convertConstantValueTranslationsToSelectOptions, convertConstantValuesToSelectOptions } from '@shared/utils/common';
import { getirMarketDomainTypes } from '@app/pages/MarketProduct/constantValues';
import SelectCity from '@shared/containers/Select/City';
import SelectWarehouse from '@shared/containers/Select/Warehouse';
import { getWarehousesSelector } from '@shared/containers/Select/Warehouse/redux/selectors';

import { getMetricGroupSelector } from '../ACMetricGroup/redux/selectors';

import BATBox from '../../../components/BATBox';
import ValueBox from './components/ValueBox';

import {
  convertDeviceTypesToSelectOptions,
  createObjectWithKeysFromArray,
  // getTimePeriodOptions,
} from './utils';
import useStyles from './styles';
import { ABSTRACT_COURIER_DOMAIN_TYPES, COMPARE_WITH_PAST_SELECT_OPTIONS, FILTER_COMPONENT_FIELDS } from '@app/pages/BusinessAlertingTool/constants';

type DefineValueFiltersType = {
  label: { [x: string]: string };
  isUIEnabled: boolean | undefined;
  fieldName: string;
  component: {
    options: { [x: string]: any };
    type: string;
  };
  value?: any;
};

// eslint-disable-next-line react/require-default-props
function ACDefineValue({ formik, isFormEditable = true, form }: { formik: any; isFormEditable: boolean | undefined; form?: any; }) {
  const classes = useStyles();
  const { t } = useTranslation(['batAlertConditionCommon']);
  const { setFieldValue, values } = formik;
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const [selectedFilters, setSelectedFilters] = useState<DefineValueFiltersType[]>([]);

  const metricGroup = useSelector(getMetricGroupSelector.getData);
  const isMetricGroupPending = useSelector(getMetricGroupSelector.getIsPending);
  const warehouses = useSelector(getWarehousesSelector.getData);
  const abstractCourierDomainTypesSelectOptions = convertConstantValueTranslationsToSelectOptions({
    constants: ABSTRACT_COURIER_DOMAIN_TYPES,
    translationBaseKey: 'batAlertConditionCommon:CONSTANT_VALUES.ABSTRACT_COURIER_DOMAIN_TYPES',
  });
  const compareWithPastSelectOptions = convertConstantValueTranslationsToSelectOptions({
    constants: COMPARE_WITH_PAST_SELECT_OPTIONS,
    translationBaseKey: 'batAlertConditionCommon:CONSTANT_VALUES.COMPARE_WITH_PAST',
  });

  useEffect(() => {
    if (form) {
      setFieldValue(['queryInfo', 'raw']);
      form.setFieldsValue({ queryInfo: { raw: undefined } });
      setSelectedFilters([]);
    }
    else {
      const filters = values?.queryInfo?.raw?.filters;
      if (isEmpty(filters)) {
        setSelectedFilters([]);
      }
      else {
        updateSelectedFilters(filters);
      }
    }
    setFieldValue(['queryInfo', 'raw', 'timePeriod'], metricGroup?.dataOptions?.frequency?.intervalValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [metricGroup?._id]);

  useEffect(() => {
    const variables = values?.queryInfo?.raw?.variables;
    if (isEmpty(variables)) {
      setSelectedValues([]);
    }
    else {
      updateSelectedValues(variables);
    }
  }, [values?.queryInfo?.raw?.variables]);

  return (
    <div>
      {
        (!isEmpty(metricGroup) && !isMetricGroupPending) ? (
          <Row gutter={[8, 8]}>
            <Col xs={24} sm={12}>
              <Form.Item
                name={['queryInfo', 'raw', 'variables']}
                rules={[{ required: true, message: t('error:REQUIRED') }]}
              >
                <BATBox
                  title={t('batAlertConditionCommon:SELECT_YOUR_VALUE')}
                  action={(
                    <Dropdown overlay={getMenuItems(metricGroup?.tableSchema?.values, valuesMenuItemOnClick)} trigger={['click']} disabled={!isFormEditable}>
                      <Button size="small" type="text">
                        <PlusOutlined />
                      </Button>
                    </Dropdown>
                  )}
                >
                  {
                    !isEmpty(selectedValues) && (
                      <div className={classes.valueBoxContainer}>
                        {
                          Object
                            .entries(createObjectWithKeysFromArray(selectedValues))
                            .map(item => (
                              <ValueBox
                                key={item[0]}
                                item={item}
                                values={metricGroup?.tableSchema?.values.find((val: any) => val.fieldName === item[1])}
                                removeOnClick={handleRemoveOnClick}
                                disabled={!isFormEditable}
                              />
                            ))
                        }
                      </div>
                    )
                  }
                </BATBox>
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item name={['queryInfo', 'raw', 'filters']}>
                <BATBox
                  title={t('batAlertConditionCommon:FILTERS')}
                  action={(
                    <Dropdown
                      placement="bottomRight"
                      overlay={getMenuItems(
                        metricGroup?.tableSchema?.filters.filter((filter: { isUIEnabled: boolean | undefined; }) => filter.isUIEnabled),
                        filtersMenuItemOnClick,
                      )}
                      trigger={['click']}
                      disabled={!isFormEditable}
                    >
                      <Button size="small" type="text">
                        <PlusOutlined />
                      </Button>
                    </Dropdown>
                  )}
                >
                  {
                    !isEmpty(selectedFilters) && (
                      <div className={classes.valueBoxContainer}>
                        {
                          selectedFilters.map((filter: any) => {
                            return filter ? (
                              <div className={classes.componentBox} key={filter.fieldName}>
                                <Form.Item
                                  name={['queryInfo', 'raw', 'filters', `${filter?.fieldName}`]}
                                  label={filter?.label[getLangKey()]}
                                  labelCol={{
                                    xs: { span: 24 },
                                    xl: { span: 5 },
                                  }}
                                  labelAlign="left"
                                  rules={[{ required: true, message: t('error:REQUIRED') }]}
                                >
                                  {getFilterComponent(filter)}
                                </Form.Item>
                                <div className={classes.deleteButton}>
                                  <Button
                                    type="text"
                                    size="small"
                                    danger
                                    onClick={() => {
                                      setFieldValue(['queryInfo', 'raw', 'filters', `${filter.fieldName}`]);
                                      setSelectedFilters(selectedFilters.filter((f => filter.fieldName !== f.fieldName)));
                                    }}
                                    disabled={!isFormEditable}
                                  >
                                    <DeleteOutlined />
                                  </Button>
                                </div>
                              </div>
                            ) : null;
                          })
                        }
                      </div>
                    )
                  }
                </BATBox>
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <BATBox
                title={(
                  <Tooltip title={t('batAlertConditionCommon:FORMULA_INFO')}>
                    {t('batAlertConditionCommon:FORMULA')}
                    <InfoCircleOutlined role="button" className="align-middle ml-1" />
                  </Tooltip>
                )}
              >
                <Form.Item
                  name={['queryInfo', 'raw', 'formula']}
                  rules={[
                    {
                      validator: (_, value) => {
                        if (!isFormulaValid()) {
                          return Promise.reject(t('batAlertConditionCommon:INVALID_FORMULA'));
                        }
                        return Promise.resolve();
                      },
                    },
                  ]}
                >
                  <Input
                    placeholder="(A+B)/C"
                    disabled={(form && selectedValues.length === 1) || !isFormEditable}
                    onChange={event => {
                      const { value } = event.target;
                      setFieldValue(['queryInfo', 'raw', 'formula'], value);
                    }}
                  />
                </Form.Item>
              </BATBox>
            </Col>
            <Col xs={24} sm={12}>
              <BATBox
                title={t('batAlertConditionCommon:BREAKDOWN')}
                action={(
                  <Dropdown
                    overlay={getMenuItems(
                      metricGroup?.tableSchema?.filters.filter((filter: { isUIEnabled: boolean | undefined; }) => filter.isUIEnabled),
                      breakdownMenuItemOnClick,
                    )}
                    trigger={['click']}
                    disabled={!isFormEditable}
                  >
                    <Button size="small" type="text">
                      <PlusOutlined />
                    </Button>
                  </Dropdown>
                )}
              >
                {!isEmpty(values?.queryInfo?.raw?.breakdown) && (
                  <div className={classes.valueBoxContainer}>
                    <div className={classes.componentBox}>
                      <div>
                        {getBreakdownLabel(values?.queryInfo?.raw?.breakdown)}
                      </div>
                      <div>
                        <Button
                          type="text"
                          size="small"
                          danger
                          onClick={() => setFieldValue(['queryInfo', 'raw', 'breakdown'])}
                          disabled={!isFormEditable}
                        >
                          <DeleteOutlined />
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </BATBox>
            </Col>
            {/* <Col xs={24} sm={12}>
              <BATBox
                title={t('batAlertConditionCommon:TIME_PERIOD')}
              >
                <Form.Item
                  name={['queryInfo', 'raw', 'timePeriod']}
                  rules={[{ required: true, message: t('error:REQUIRED') }]}
                >
                  <Select
                    className="w-100"
                    options={getTimePeriodOptions(metricGroup?.dataOptions?.frequency)}
                    onChange={timePeriod => setFieldValue(['queryInfo', 'raw', 'timePeriod'], timePeriod)}
                    disabled={!isFormEditable}
                    placeholder={t('batAlertConditionCommon:PLACEHOLDERS.TIME_PERIOD')}
                  />
                </Form.Item>
              </BATBox>
            </Col> */}
            <Col xs={24}>
              <div className={classes.line} />
            </Col>
            <Col xs={24} sm={12}>
              <Row gutter={[8, 8]}>
                <div className={classes.comparisonContainer}>
                  <Col xs={12}>
                    <Form.Item
                      name={['queryInfo', 'raw', 'compareWithPast']}
                    >
                      <div className={classes.comparisonSwitchContainer}>
                        {t('batAlertConditionCommon:CONSTANT_VALUES.COMPARE_WITH_PAST.TITLE')}
                        <Switch
                          checked={values?.queryInfo?.raw?.compareWithPast}
                          onChange={compareWithPast => setFieldValue(['queryInfo', 'raw', 'compareWithPast'], compareWithPast)}
                          disabled={!isFormEditable}
                        />
                      </div>
                    </Form.Item>
                  </Col>
                  <Col xs={12}>
                    <div>
                      <Form.Item
                        name={['queryInfo', 'raw', 'compareWithPastPeriod']}
                      >
                        <Select
                          value={values?.queryInfo?.raw?.compareWithPastPeriod}
                          className="w-100"
                          options={compareWithPastSelectOptions}
                          placeholder={t('batAlertConditionCommon:COMPARISON_PERIOD')}
                          onChange={compareWithPastPeriod => setFieldValue(['queryInfo', 'raw', 'compareWithPastPeriod'], compareWithPastPeriod)}
                          disabled={!values?.queryInfo?.raw?.compareWithPast || !isFormEditable}
                          allowClear
                        />
                      </Form.Item>
                    </div>
                  </Col>
                </div>
              </Row>
            </Col>
          </Row>
        ) : null
      }
    </div>
  );

  function handleRemoveOnClick(value: string) {
    const tmpSelectedValues = selectedValues;
    const index = tmpSelectedValues.indexOf(value);

    tmpSelectedValues.splice(index, 1);
    setSelectedValues([...tmpSelectedValues]);
    const variables = createObjectWithKeysFromArray(uniq([...tmpSelectedValues]));
    setFieldValue(['queryInfo', 'raw', 'variables'], variables);
  }

  function valuesMenuItemOnClick(fieldName: string) {
    setSelectedValues(uniq([...selectedValues, fieldName]));
    const variables = createObjectWithKeysFromArray(uniq([...selectedValues, fieldName]));
    setFieldValue(['queryInfo', 'raw', 'variables'], variables);
  }

  function filtersMenuItemOnClick(fieldName: string) {
    const selectedFilter = metricGroup?.tableSchema?.filters.filter((filter: DefineValueFiltersType) => filter.fieldName === fieldName);

    if (!isEmpty(selectedFilter)) {
      setSelectedFilters(uniqBy([...selectedFilters, selectedFilter[0]], 'fieldName'));
    }
  }

  function breakdownMenuItemOnClick(fieldName: string) {
    setFieldValue(['queryInfo', 'raw', 'breakdown'], fieldName);
  }

  function getMenuItems(items: any[] = [], handleOnClick: (val: string) => void) {
    return (
      <Menu>
        {
          items.map(
            (value: { fieldName: string; label: { [x: string]: string } }) => (
              <Menu.Item
                key={value.fieldName}
                onClick={() => handleOnClick(value.fieldName)}
              >
                {value.label[getLangKey()]}
              </Menu.Item>
            ),
          )
        }
      </Menu>
    );
  }

  function getFilterComponent(filter: { [x: string]: any }): React.ReactNode | null {
    const { component, fieldName } = filter;
    switch (component.type) {
      case FILTER_COMPONENT_FIELDS.WAREHOUSE: {
        const cityIds = get(values, ['queryInfo', 'raw', 'filters', 'city_id']);
        return (
          <SelectWarehouse
            isMultiple={component?.options?.isMulti}
            className="w-100"
            placeholder={t('global:WAREHOUSE')}
            onChange={(selected: any) => setFieldValue(['queryInfo', 'raw', 'filters', `${fieldName}`], selected)}
            cityIds={cityIds}
            isDisabled={!isFormEditable}
          />
        );
      }
      case FILTER_COMPONENT_FIELDS.CITY:
        return (
          <SelectCity
            className="w-100"
            mode={component?.options?.isMulti ? 'multiple' : undefined}
            onChange={(selected: any) => {
              setFieldValue(['queryInfo', 'raw', 'filters', `${fieldName}`], selected);

              const selectedWarehouses = values?.queryInfo?.raw?.filters?.warehouse_id || [];
              if (selectedWarehouses.length > 0) {
                const tmpSelectedWarehouses: string[] = [];
                selectedWarehouses.forEach((warehouseId: string) => {
                  const { city: { _id: cityId } } = find(warehouses, warehouse => warehouse._id === warehouseId);

                  if (selected.includes(cityId)) {
                    tmpSelectedWarehouses.push(warehouseId);
                  }
                });
                setFieldValue(['queryInfo', 'raw', 'filters', 'warehouse_id'], tmpSelectedWarehouses);
              }
            }}
            showArrow
            isDisabled={!isFormEditable}
          />
        );
      case FILTER_COMPONENT_FIELDS.VEHICLE_TYPE:
        return (
          <Select
            className="w-100"
            options={convertConstantValuesToSelectOptions(marketVehicleTypes)}
            mode={component?.options?.isMulti ? 'multiple' : undefined}
            onChange={(selected: any) => setFieldValue(['queryInfo', 'raw', 'filters', `${fieldName}`], selected)}
            disabled={!isFormEditable}
            showArrow
          />
        );
      case FILTER_COMPONENT_FIELDS.MARKET_ORDER_STATUS:
        return (
          <Select
            className="w-100"
            options={convertConstantValuesToSelectOptions(marketOrderStatuses)}
            mode={component?.options?.isMulti ? 'multiple' : undefined}
            onChange={(selected: any) => setFieldValue(['queryInfo', 'raw', 'filters', `${fieldName}`], selected)}
            disabled={!isFormEditable}
            showArrow
          />
        );
      case FILTER_COMPONENT_FIELDS.ORDER_CHANNEL:
        return (
          <Select
            className="w-100"
            options={convertDeviceTypesToSelectOptions(DEVICE_TYPES)}
            mode={component?.options?.isMulti ? 'multiple' : undefined}
            onChange={(selected: any) => setFieldValue(['queryInfo', 'raw', 'filters', `${fieldName}`], selected)}
            disabled={!isFormEditable}
            showArrow
          />
        );
      case FILTER_COMPONENT_FIELDS.PAYMENT_POS_BANK:
        return (
          <Select
            className="w-100"
            options={convertConstantValuesToSelectOptions(posBanks)}
            mode={component?.options?.isMulti ? 'multiple' : undefined}
            onChange={(selected: any) => setFieldValue(['queryInfo', 'raw', 'filters', `${fieldName}`], selected)}
            disabled={!isFormEditable}
            showArrow
          />
        );
      case FILTER_COMPONENT_FIELDS.MARKET_ORDER_DOMAIN_TYPE:
        return (
          <Select
            className="w-100"
            options={convertConstantValuesToSelectOptions(getirMarketDomainTypes)}
            mode={component?.options?.isMulti ? 'multiple' : undefined}
            onChange={(selected: any) => setFieldValue(['queryInfo', 'raw', 'filters', `${fieldName}`], selected)}
            disabled={!isFormEditable}
            showArrow
          />
        );
      case FILTER_COMPONENT_FIELDS.COURIER_DOMAIN_TYPE:
        return (
          <Select
            className="w-100"
            options={abstractCourierDomainTypesSelectOptions}
            mode={component?.options?.isMulti ? 'multiple' : undefined}
            onChange={(selected: any) => setFieldValue(['queryInfo', 'raw', 'filters', `${fieldName}`], selected)}
            disabled={!isFormEditable}
            showArrow
          />
        );
      case FILTER_COMPONENT_FIELDS.MARKET_ORDER_ERROR_REASON:
        return (
          <Select
            className="w-100"
            options={convertConstantValuesToSelectOptions(marketOrderCheckoutErrorCodes)}
            mode={component?.options?.isMulti ? 'multiple' : undefined}
            onChange={(selected: any) => setFieldValue(['queryInfo', 'raw', 'filters', `${fieldName}`], selected)}
            disabled={!isFormEditable}
            showArrow
          />
        );
      case FILTER_COMPONENT_FIELDS.PAYMENT_METHOD:
        return (
          <Select
            className="w-100"
            options={convertConstantValuesToSelectOptions(paymentMethods)}
            mode={component?.options?.isMulti ? 'multiple' : undefined}
            onChange={(selected: any) => setFieldValue(['queryInfo', 'raw', 'filters', `${fieldName}`], selected)}
            disabled={!isFormEditable}
            showArrow
          />
        );
      default:
        return null;
    }
  }

  function getBreakdownLabel(fieldName: string) {
    const items = metricGroup?.tableSchema?.filters || [];

    const selectedItem = items.filter((item: { fieldName: string; }) => item.fieldName === fieldName)[0];

    return selectedItem?.label[getLangKey()];
  }

  function updateSelectedValues(variables: any) {
    const tempSelectedValues: string[] = [];

    Object.entries(variables).forEach(([_, v]: any) => {
      tempSelectedValues.push(v);
    });

    setSelectedValues(uniq([...tempSelectedValues]));
  }

  function updateSelectedFilters(filters: { [x: string]: string }) {
    const metricGroupFilters = metricGroup?.tableSchema?.filters || [];
    const filtersMap: any = {};
    const tempSelectedFilters: any[] = [];

    metricGroupFilters.forEach((filter: DefineValueFiltersType) => {
      if (filter.isUIEnabled) {
        filtersMap[filter.fieldName] = filter;
      }
    });

    Object.entries(filters).forEach(([k, _]: [string, any]) => {
      const filter = filtersMap[k];
      tempSelectedFilters.push(filter);
    });

    setSelectedFilters(tempSelectedFilters);
  }

  function isFormulaValid() {
    const formulaValue = values?.queryInfo?.raw?.formula;
    if (form && selectedValues.length === 1) {
      setFieldValue(['queryInfo', 'raw', 'formula'], 'A');
      form.setFieldsValue({ queryInfo: { raw: { formula: 'A' } } });
      return true;
    }
    if (!formulaValue || formulaValue.length === 0) return false;

    try {
      const formula = new Formula(formulaValue);
      const variables = formula.getVariables();

      if (selectedValues.length !== variables.length) return false;

      const keys = Object.keys(values?.queryInfo?.raw?.variables || {});
      if (JSON.stringify(keys) !== JSON.stringify(variables)) return false;

      return true;
    }
    catch (error) {
      return false;
    }
  }
}

export default ACDefineValue;
