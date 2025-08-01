import { Form, Radio as RadioAntd, message } from 'antd';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { Button, Radio, Select } from '@shared/components/GUI';
import { BOOLEAN_LABELS } from '@app/pages/MarketProductChainManagement/constants';
import { REDUX_KEY } from '@shared/shared/constants';

import { Creators } from '../redux/actions';
import useStyles from '../styles';

const createBooleanOptions = (labels, t, i18n) => Object.entries(labels).map(([value, label]) => {
  const currentLang = i18n?.language || 'en';
  const displayLabel = typeof label === 'object' && label !== null
    ? (label[currentLang] || label.en || label.tr || String(label))
    : t(label);

  return {
    value: value === 'true',
    label: displayLabel,
  };
});

const ConfigurationForm = ({ form, isEditMode, productId }) => {
  const classes = useStyles();
  const { t, i18n } = useTranslation('marketProductChainManagement');
  const dispatch = useDispatch();
  const [isLocalValue, setIsLocalValue] = useState(false);
  const [originalMatchedValues, setOriginalMatchedValues] = useState({
    mainWarehouses: [],
    cities: [],
    warehouses: [],
  });

  // Get form data from redux state
  const {
    domainTypes = [],
    demographies = [],
    sizes = [],
    isLocal = false,
    warehouseTypes = [],
    mainWarehousesAndCities = [],
    mainWarehouses = [],
    cities = [],
    warehouses = [],
    cityOptions = [],
    darkstores = [],
    isLoading = false,
    isUpdating = false,
    // Final processed options from saga
    processedDemographyOptions = [],
    processedSizeOptions = [],
    processedDomainTypeOptions = [],
    processedWarehouseTypeOptions = [],
  } = useSelector(state => state[REDUX_KEY.MARKET_PRODUCT_CHAIN_MANAGEMENT.CONFIGURATION] || {});

  // Auto-populate form when data loads
  useEffect(() => {
    setIsLocalValue(isLocal);

    form.setFieldsValue({
      isLocal,
      domainTypes,
      demographies,
      sizes,
      warehouseTypes: warehouseTypes?.map(type => Number(type)) || [],
      mainWarehouses,
      cities,
      warehouses,
    });

    // Store original matched values for isLocal toggle
    if (isLocal && (mainWarehouses.length > 0 || cities.length > 0 || warehouses.length > 0)) {
      setOriginalMatchedValues({
        mainWarehouses: mainWarehouses || [],
        cities: cities || [],
        warehouses: warehouses || [],
      });
    }
  }, [
    form, isLocal, domainTypes, demographies, sizes, warehouseTypes, mainWarehouses, cities, warehouses,
  ]);

  // Fetch dynamic options only once on component mount
  useEffect(() => {
    dispatch(Creators.getDemographyLookupRequest(''));
    dispatch(Creators.getSizeLookupRequest(''));
    dispatch(Creators.getDomainTypeLookupRequest(''));
    dispatch(Creators.getWarehouseTypeLookupRequest(''));
  }, [dispatch]);

  // Clear isLocal fields when other filters change
  const clearIsLocalFields = useCallback(() => {
    if (isLocalValue) {
      form.setFieldsValue({
        isLocal: false,
        mainWarehouses: [],
        cities: [],
        warehouses: [],
      });
      setIsLocalValue(false);
    }
  }, [form, isLocalValue]);

  const handleIsLocalChange = useCallback(e => {
    const newValue = e.target.value;
    setIsLocalValue(newValue);

    if (newValue) {
      // Restore original values or search for new ones
      const hasOriginalValues = originalMatchedValues.mainWarehouses.length > 0 ||
                               originalMatchedValues.cities.length > 0 ||
                               originalMatchedValues.warehouses.length > 0;

      if (hasOriginalValues) {
        form.setFieldsValue({
          mainWarehouses: originalMatchedValues.mainWarehouses,
          cities: originalMatchedValues.cities,
          warehouses: originalMatchedValues.warehouses,
        });
      }
      else if (productId) {
        dispatch(Creators.getDarkstoresRequest({
          productId,
          formValues: form.getFieldsValue(),
        }));
      }
    }
    else {
      form.setFieldsValue({
        mainWarehouses: [],
        cities: [],
        warehouses: [],
      });
    }
  }, [dispatch, form, productId, originalMatchedValues]);

  const handleCitySearch = useCallback(search => {
    if (search?.length >= 2) {
      dispatch(Creators.getCityLookupRequest(search));
    }
  }, [dispatch]);

  const handleSearchDarkstores = useCallback(() => {
    if (!productId) {
      message.error(t('PRODUCT_ID_REQUIRED'));
      return;
    }

    dispatch(Creators.getDarkstoresRequest({
      productId,
      formValues: form.getFieldsValue(),
    }));
  }, [dispatch, form, productId, t]);

  const handleSelectAll = useCallback(() => {
    if (darkstores.length > 0) {
      const allValues = darkstores.map(d => d.value);
      form.setFieldsValue({ warehouses: allValues });
    }
  }, [darkstores, form]);

  // Options - Boolean options need processing, others come ready from saga
  const booleanOptions = createBooleanOptions(BOOLEAN_LABELS, t, i18n);

  const warehouseOptions = useMemo(() => {
    const options = darkstores.map(darkstore => ({
      value: darkstore.value,
      label: darkstore.label,
      cityName: darkstore.cityName,
      regionName: darkstore.regionName,
    }));

    return options;
  }, [darkstores]);

  const handleFormSubmit = values => {
    dispatch(Creators.updateProductConfigurationRequest(productId, {
      isLocal: values.isLocal || false,
      domainTypes: values.domainTypes || [],
      demographyIds: values.demographies || [],
      sizeIds: values.sizes || [],
      warehouseTypes: values.warehouseTypes || [],
      warehouseIds: values.warehouses || [],
    }));
  };

  return (
    <Form
      form={form}
      className={classes.formContainer}
      initialValues={{
        domainTypes: [],
        demographies: [],
        sizes: [],
        isLocal: false,
        warehouseTypes: [],
        mainWarehouses: [],
        cities: [],
        warehouses: [],
      }}
      onFinish={handleFormSubmit}
    >
      <div className={classes.row}>
        <Form.Item name="warehouseTypes" className={classes.formItem}>
          <Select
            label={t('COLUMNS.WAREHOUSE_TYPE')}
            optionsData={processedWarehouseTypeOptions}
            disabled={!isEditMode || isUpdating}
            loading={isLoading || isUpdating}
            mode="multiple"
            allowClear
            value={form.getFieldValue('warehouseTypes')}
            onChange={value => {
              form.setFieldsValue({ warehouseTypes: value });
              clearIsLocalFields();
            }}
          />
        </Form.Item>
        <Form.Item name="domainTypes" className={classes.formItem}>
          <Select
            label={t('COLUMNS.DOMAIN')}
            optionsData={processedDomainTypeOptions}
            disabled={!isEditMode || isUpdating}
            mode="multiple"
            loading={isLoading || isUpdating}
            onChange={() => clearIsLocalFields()}
          />
        </Form.Item>
      </div>

      <div className={classes.row}>
        <Form.Item name="demographies" className={classes.formItem}>
          <Select
            label={t('COLUMNS.DEMOGRAPHY')}
            optionsData={processedDemographyOptions}
            disabled={!isEditMode || isUpdating}
            mode="multiple"
            loading={isLoading || isUpdating}
            onChange={() => clearIsLocalFields()}
          />
        </Form.Item>
        <Form.Item name="sizes" className={classes.formItem}>
          <Select
            label={t('COLUMNS.SIZE')}
            optionsData={processedSizeOptions}
            disabled={!isEditMode || isUpdating}
            mode="multiple"
            loading={isLoading || isUpdating}
            onChange={() => clearIsLocalFields()}
          />
        </Form.Item>
      </div>

      <div className={classes.formGroup}>
        <div className={classes.label}>{t('COLUMNS.LOCAL')}</div>
        <Form.Item name="isLocal" noStyle>
          <RadioAntd.Group
            disabled={!isEditMode || isUpdating}
            onChange={handleIsLocalChange}
          >
            {booleanOptions.map(option => (
              <Radio key={option.value} value={option.value}>
                <span>{option.label}</span>
              </Radio>
            ))}
          </RadioAntd.Group>
        </Form.Item>
      </div>

      {isLocalValue && (
        <>
          <div className={classes.row}>
            <Form.Item name="mainWarehouses" className={classes.formItem}>
              <Select
                label={t('COLUMNS.MAIN_WAREHOUSE')}
                optionsData={mainWarehousesAndCities}
                disabled={!isEditMode || isUpdating}
                mode="multiple"
                showSearch
                filterOption={false}
                loading={isLoading || isUpdating}
                allowClear
              />
            </Form.Item>
            <Form.Item name="cities" className={classes.formItem}>
              <Select
                label={t('COLUMNS.CITY')}
                optionsData={cityOptions}
                disabled={!isEditMode || isUpdating}
                mode="multiple"
                showSearch
                onSearch={handleCitySearch}
                filterOption={(input, option) => option.label.toLowerCase().includes(input.toLowerCase())}
                loading={isLoading || isUpdating}
                allowClear
              />
            </Form.Item>
          </div>
          <div className={classes.row}>
            <div className={classes.selectWithSearchButton}>
              <Form.Item
                name="warehouses"
                className={classes.formItem}
                rules={[
                  {
                    required: isLocalValue,
                    message: t('WAREHOUSE_REQUIRED'),
                  },
                ]}
              >
                <Select
                  label={t('COLUMNS.WAREHOUSES')}
                  optionsData={warehouseOptions}
                  disabled={!isEditMode || isUpdating}
                  mode="multiple"
                  loading={isLoading || isUpdating}
                  allowClear
                  showSearch
                  filterOption={(input, option) => option.label.toLowerCase().includes(input.toLowerCase())}
                  onChange={value => form.setFieldsValue({ warehouses: value })}
                />
              </Form.Item>
              <div className={classes.buttonGroup}>
                <Button
                  type="primary"
                  onClick={handleSearchDarkstores}
                  disabled={!isEditMode || isUpdating}
                  className={classes.searchDarkstoresButton}
                >
                  {t('BUTTONS.SEARCH_DARKSTORES')}
                </Button>
                <Button
                  type="default"
                  onClick={handleSelectAll}
                  disabled={!isEditMode || warehouseOptions.length === 0 || isUpdating}
                  className={classes.selectAllButton}
                >
                  {t('BUTTONS.SELECT_ALL')}
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
    </Form>
  );
};

export default ConfigurationForm;
