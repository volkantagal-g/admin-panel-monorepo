import { Form, Row, Col, Switch, Tooltip } from 'antd';
import { useFormik } from 'formik';
import { useMemo, useEffect, useState } from 'react';
import { useTheme } from 'react-jss';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { validate } from '@shared/yup';

import {
  filterPlanogramWarehouseSelector,
  getDemographiesSelector,
  getMainWarehousesAndCitiesSelector,
  getPlanogramProductDetailsSelector,
  getSizesSelector,
  getWarehouseTypesSelector,
} from '@app/pages/Planogram/Products/redux/selectors';
import { Creators } from '@app/pages/Planogram/Products/redux/actions';

import { PLANOGRAM_PRODUCT_DOMAIN_TYPES } from '@shared/shared/constantValues';
import { getLangKey } from '@shared/i18n';
import { selectFormatter, getSelectFilterOption } from '@app/pages/Planogram/formHelper';
import {
  getInitialValues,
  validationSchema,
} from '@app/pages/Planogram/Products/Convert/components/GeneralInfoForm/formHelper';

import {
  Checkbox,
  FormItem,
  Select,
  Space,
  TextInput,
  Button,
} from '@shared/components/GUI';
import useStyles from '@app/pages/Planogram/Products/Convert/components/GeneralInfoForm/styles';

const GeneralInfoForm = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const classes = useStyles();
  const [form] = Form.useForm();
  const { t } = useTranslation('planogramPage');
  const formId = 'planogram_product_convert';

  const sizeList = useSelector(getSizesSelector.getData);
  const demographyList = useSelector(getDemographiesSelector.getData);
  const warehouseTypesList = useSelector(getWarehouseTypesSelector.getData);

  const cityData = useSelector(getMainWarehousesAndCitiesSelector.getCityData, shallowEqual);
  const mainWarehousesData = useSelector(getMainWarehousesAndCitiesSelector.getMainWarehousesData, shallowEqual);
  const regularWarehousesData = useSelector(filterPlanogramWarehouseSelector.getRegularWarehousesData, shallowEqual);
  const regularWarehousesPending = useSelector(filterPlanogramWarehouseSelector.getIsPending);
  const productDetails = useSelector(getPlanogramProductDetailsSelector.getProductData, shallowEqual);

  const initialValues = useMemo(() => getInitialValues(productDetails), [productDetails]);

  const useProductDetails = () => {
    const sizeListIsPending = useSelector(getSizesSelector.getIsPending);
    const demographyListIsPending = useSelector(getDemographiesSelector.getIsPending);
    const productDetailsIsPending = useSelector(getPlanogramProductDetailsSelector.getIsPending);
    const mainWarehousesAndCitiesPending = useSelector(getMainWarehousesAndCitiesSelector.getIsPending);
    const warehouseTypesListIsPending = useSelector(getWarehouseTypesSelector.getIsPending);
    return {
      isPending:
        sizeListIsPending ||
        demographyListIsPending ||
        productDetailsIsPending ||
        mainWarehousesAndCitiesPending ||
        warehouseTypesListIsPending,
    };
  };
  const { isPending } = useProductDetails();
  const [regularWarehouses, setRegularWarehouses] = useState('');

  const regularWarehousesOptions = useMemo(
    () => selectFormatter(regularWarehousesData),
    [regularWarehousesData],
  );

  const formik = useFormik({
    enableReinitialize: true,
    validate: validate(validationSchema),
    initialValues,
    onSubmit: values => {
      const { planogramProductId, demographyIds, domainTypes, isLocal, sizeIds, warehouseIds, warehouseTypes } = values;
      const body = { demographyIds, isLocal, sizeIds, warehouseIds, warehouseTypes, domainTypes };
      dispatch(
        Creators.updatePlanogramProductRequest({
          productId: planogramProductId,
          body,
        }),
      );
    },
  });
  const { handleSubmit, values, setFieldValue, errors, setValues } = formik;

  useEffect(() => {
    if (form && values) {
      form.setFieldsValue(values);
    }
  }, [form, values]);

  const handleChange = (key, value) => {
    const filter = {
      cityIds: values.cityIds,
      demographyIds: values.demographyIds,
      domainTypes: values.domainTypes,
      mainWarehouseIds: values.mainWarehouseIds,
      sizeIds: values.sizeIds,
      warehouseTypes: values.warehouseTypes,
      [key]: value,
    };
    setValues({ ...values, ...filter });
    if (
      filter.sizeIds?.length > 0 &&
      filter.demographyIds?.length > 0 &&
      filter.warehouseTypes?.length > 0 &&
      (filter.mainWarehouseIds?.length > 0 || filter.cityIds?.length > 0)
    ) {
      dispatch(Creators.filterPlanogramWarehouseRequest({ body: { filter } }));
    }
  };

  const handleChangeAll = (key, data, idKey = 'id') => {
    const value = [];
    if (data?.length > 0) data?.map(element => value.push(element[idKey]));
    handleChange(key, value);
  };

  return (
    <Space title={t('GENERAL_INFO.TITLE')} className="w-100">
      <Form form={form} onFinish={handleSubmit} layout="vertical" id={formId}>
        <Row gutter={[theme.spacing(2)]} className={classes.row}>
          <Col span={12}>
            <TextInput
              name="productName"
              label={t(
                'planogramPage:PRODUCT_LIST.PRODUCT_DETAIL_PAGE.PRODUCT_NAME',
              )}
              value={values.productName}
              disabled
            />
          </Col>
          <Col span={12}>
            <TextInput
              name="planogramProductId"
              label={t(
                'planogramPage:PRODUCT_LIST.PRODUCT_DETAIL_PAGE.PRODUCT_ID',
              )}
              value={values.planogramProductId}
              disabled
            />
          </Col>
        </Row>
        <Row gutter={[theme.spacing(2)]} className={classes.row}>
          <Col span={12}>
            <FormItem name="warehouseTypes" errors={errors}>
              <Select
                mode="multiple"
                name="warehouseTypes"
                label={t(
                  'planogramPage:PRODUCT_LIST.PRODUCT_DETAIL_PAGE.WAREHOUSE_TYPE',
                )}
                value={values.warehouseTypes}
                optionsData={
                  Object.entries(warehouseTypesList)?.length > 0 &&
                  Object.entries(warehouseTypesList)?.map(warehouse => ({
                    value: parseFloat(warehouse[0]),
                    label: warehouse[1],
                  }))
                }
                disabled={isPending}
                onChange={value => handleChange('warehouseTypes', value)}
              />
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem name="domainTypes" errors={errors}>
              <Select
                mode="multiple"
                label={t(
                  'planogramPage:PRODUCT_LIST.PRODUCT_DETAIL_PAGE.DOMAIN',
                )}
                value={values?.domainTypes}
                optionsData={PLANOGRAM_PRODUCT_DOMAIN_TYPES.map(domain => ({
                  value: domain.key,
                  label: domain.name[getLangKey()],
                }))}
                disabled={isPending}
                onChange={value => handleChange('domainTypes', value)}
              />
            </FormItem>
          </Col>
        </Row>
        <Row gutter={[theme.spacing(2)]} className={classes.row}>
          <Col span={12}>
            <FormItem name="demographyIds" errors={errors}>
              <Select
                name="demographyIds"
                label={t(
                  'planogramPage:PRODUCT_LIST.PRODUCT_DETAIL_PAGE.DEMOGRAPHY',
                )}
                value={values.demographyIds}
                optionsData={
                  demographyList?.length > 0
                    ? selectFormatter(demographyList)
                    : []
                }
                disabled={isPending}
                onChange={value => handleChange('demographyIds', value)}
                mode="multiple"
              />
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem name="sizeIds" errors={errors}>
              <Select
                mode="multiple"
                name="sizeIds"
                label={t('planogramPage:PRODUCT_LIST.PRODUCT_DETAIL_PAGE.SIZE')}
                value={values.sizeIds}
                optionsData={
                  sizeList?.length > 0
                    ? selectFormatter(sizeList)
                    : []
                }
                disabled={isPending}
                onChange={value => handleChange('sizeIds', value)}
              />
            </FormItem>
          </Col>
        </Row>
        <Row gutter={[theme.spacing(3)]} className={classes.row}>
          <Col span={18}>
            <Checkbox
              name="isLocal"
              disabled={
                isPending ||
                values.demographyIds?.length === 0 ||
                values.sizeIds?.length === 0 ||
                values.warehouseTypes?.length === 0
              }
              onChange={({ target: { checked } }) => setFieldValue('isLocal', checked)}
            >
              <Tooltip
                title={t(
                  'planogramPage:PRODUCT_LIST.PRODUCT_DETAIL_PAGE.DEFINE_DEMOGRAPHY_SIZE_WHTYPE_TO_ACTIVATE',
                )}
              >
                {t('planogramPage:PRODUCT_LIST.PRODUCT_DETAIL_PAGE.IS_LOCAL')}
              </Tooltip>
            </Checkbox>
          </Col>
          <Col span={3}>
            <span className="mr-2">
              {t('PRODUCT_LIST.PRODUCT_DETAIL_PAGE.ACTIVE')}
            </span>
            <Switch
              checkedChildren="ON"
              unCheckedChildren="OFF"
              name="activeness"
              checked={values.isActive}
              disabled
            />
          </Col>
          <Col span={3}>
            <span className="mr-2">
              {t('PRODUCT_LIST.PRODUCT_DETAIL_PAGE.ENABLED')}
            </span>
            <Switch
              checkedChildren="ON"
              unCheckedChildren="OFF"
              name="enabled"
              checked={values.isEnabled}
              disabled
            />
          </Col>
        </Row>
        {values.isLocal && (
          <>
            <Row gutter={[theme.spacing(3)]} className={classes.row}>
              <Col span={9}>
                <FormItem name="mainWarehouseIds">
                  <Select
                    optionsData={selectFormatter(mainWarehousesData)}
                    label={t('PRODUCT_LIST.PRODUCT_DETAIL_PAGE.MAIN_WAREHOUSE')}
                    name="mainWarehouseIds"
                    allowClear
                    mode="multiple"
                    onChange={value => handleChange('mainWarehouseIds', value)}
                    filterOption={getSelectFilterOption}
                    showSearch
                    maxTagCount={3}
                    disabled={isPending}
                  />
                </FormItem>
              </Col>
              <Col span={3}>
                <Button
                  size="small"
                  color="secondary"
                  className={classes.selectAllButton}
                  disabled={
                    !mainWarehousesData && mainWarehousesData?.length === 0
                  }
                  onClick={() => {
                    handleChangeAll('mainWarehouseIds', mainWarehousesData);
                  }}
                >
                  {t('SELECT_ALL')}
                </Button>
              </Col>
              <Col span={9}>
                <FormItem name="cityIds">
                  <Select
                    optionsData={selectFormatter(cityData)}
                    label={t('PRODUCT_LIST.PRODUCT_DETAIL_PAGE.CITY')}
                    name="cityIds"
                    allowClear
                    mode="multiple"
                    onChange={value => handleChange('cityIds', value)}
                    filterOption={getSelectFilterOption}
                    showSearch
                    maxTagCount={4}
                    disabled={isPending}
                  />
                </FormItem>
              </Col>
              <Col span={3}>
                <Button
                  size="small"
                  color="secondary"
                  className={classes.selectAllButton}
                  disabled={!cityData || cityData?.length === 0}
                  onClick={() => {
                    handleChangeAll('cityIds', cityData);
                  }}
                >
                  {t('SELECT_ALL')}
                </Button>
              </Col>
            </Row>
            <Row gutter={[theme.spacing(3)]} className={classes.row}>
              <Col span={21}>
                <FormItem
                  name="warehouseIds"
                  errors={values?.isLocal && errors}
                >
                  <Select
                    name="warehouseIds"
                    label={t('PRODUCT_LIST.PRODUCT_DETAIL_PAGE.WAREHOUSE')}
                    mode="multiple"
                    value={values?.warehouseIds}
                    filterOption={(inputValue, option) => {
                      return getSelectFilterOption(inputValue, option, true);
                    }}
                    showSearch
                    optionsData={regularWarehousesOptions}
                    allowClear
                    maxTagCount={1000}
                    disabled={regularWarehousesPending}
                    onChange={value => setFieldValue('warehouseIds', value)}
                    onSearch={inputValue => {
                      setRegularWarehouses(inputValue);
                    }}
                    onClear={() => setRegularWarehouses('')}
                  />
                </FormItem>
              </Col>
              <Col span={3}>
                <Button
                  size="small"
                  color="secondary"
                  className={classes.selectAllButton}
                  disabled={
                    !regularWarehousesData ||
                    regularWarehousesData?.length === 0
                  }
                  onClick={() => {
                    const filteredResult = regularWarehousesOptions
                      .filter(warehouse => getSelectFilterOption(regularWarehouses, warehouse, true))
                      .map(item => item.value);
                    const result = [...new Set([...values?.warehouseIds || [], ...filteredResult])];
                    setFieldValue('warehouseIds', result);
                    setRegularWarehouses('');
                  }}
                >
                  {regularWarehouses ? t('SELECT_RESULTS') : t('SELECT_ALL')}
                </Button>
              </Col>
            </Row>
          </>
        )}
        <Row justify="end" gutter={[theme.spacing(2)]}>
          <Col>
            <FormItem className="mb-0 mt-0">
              <Button
                form={formId}
                htmlType="submit"
                size="small"
                type="primary"
                loading={isPending}
                onClick={handleSubmit}
              >
                {t('global:SAVE')}
              </Button>
            </FormItem>
          </Col>
        </Row>
      </Form>
    </Space>
  );
};

export default GeneralInfoForm;
