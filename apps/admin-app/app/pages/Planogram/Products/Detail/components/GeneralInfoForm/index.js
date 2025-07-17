import { useMemo, useEffect, useCallback, useState } from 'react';
import { Form, Row, Col, Tooltip, Switch } from 'antd';
import { useFormik } from 'formik';
import { useTheme } from 'react-jss';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { validate } from '@shared/yup';

import {
  updatePlanogramProductSelector,
  getPlanogramProductDetailsSelector,
  getSizesSelector,
  getDemographiesSelector,
  getWarehouseTypesSelector,
  getMainWarehousesAndCitiesSelector,
  filterPlanogramWarehouseSelector,
} from '@app/pages/Planogram/Products/redux/selectors';
import { Creators } from '@app/pages/Planogram/Products/redux/actions';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import {
  Checkbox,
  FormItem,
  Select,
  Space,
  TextInput,
  Button,
} from '@shared/components/GUI';
import { PLANOGRAM_PRODUCT_DOMAIN_TYPES } from '@shared/shared/constantValues';
import { getLangKey } from '@shared/i18n';
import { getSelectFilterOption } from '@app/pages/Planogram/formHelper';
import {
  getInitialValues,
  validationSchema,
  selectFormatter,
} from '@app/pages/Planogram/Products/Detail/components/GeneralInfoForm/formHelper';

import useStyles from '@app/pages/Planogram/Products/Detail/components/GeneralInfoForm/styles';

const GeneralInfoForm = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const theme = useTheme();
  const { t } = useTranslation('planogramPage');
  const classes = useStyles();

  const [isFormEditable, setIsFormEditable] = useState(false);
  const [regularWarehouses, setRegularWarehouses] = useState('');

  const sizeList = useSelector(getSizesSelector.getData);
  const demographyList = useSelector(getDemographiesSelector.getData);
  const warehouseTypesList = useSelector(getWarehouseTypesSelector.getData);

  const cityData = useSelector(getMainWarehousesAndCitiesSelector.getCityData, shallowEqual);
  const mainWarehousesData = useSelector(getMainWarehousesAndCitiesSelector.getMainWarehousesData, shallowEqual);
  const regularWarehousesData = useSelector(filterPlanogramWarehouseSelector.getRegularWarehousesData, shallowEqual);

  const planogramProducts = useSelector(getPlanogramProductDetailsSelector.getProductData, shallowEqual);
  const assignedWarehouses = useSelector(getPlanogramProductDetailsSelector.getAssignedWarehousesData, shallowEqual);

  const updateError = useSelector(updatePlanogramProductSelector.getError);
  const isUpdatePending = useSelector(updatePlanogramProductSelector.getIsPending);

  const useProductDetails = () => {
    const productDetailsIsPending = useSelector(getPlanogramProductDetailsSelector.getIsPending);
    const sizeListIsPending = useSelector(getSizesSelector.getIsPending);
    const demographyListIsPending = useSelector(getDemographiesSelector.getIsPending);
    const warehouseTypesListIsPending = useSelector(getWarehouseTypesSelector.getIsPending);
    const cityMainWarehousesIsPending = useSelector(getMainWarehousesAndCitiesSelector.getIsPending);
    const regularWarehousesIsPending = useSelector(filterPlanogramWarehouseSelector.getIsPending);
    return {
      isPending:
        sizeListIsPending ||
        demographyListIsPending ||
        warehouseTypesListIsPending ||
        productDetailsIsPending,
      isLocalPending: cityMainWarehousesIsPending || regularWarehousesIsPending,
    };
  };
  const { isPending, isLocalPending } = useProductDetails();

  const initialValues = useMemo(
    () => getInitialValues(planogramProducts, assignedWarehouses),
    [planogramProducts, assignedWarehouses],
  );

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

      const invalidList = warehouseIds?.filter(id => !regularWarehousesData?.some(element => element?.id === id));

      if (regularWarehousesData?.length === 0 && warehouseIds?.length > 0) {
        return dispatch(ToastCreators.error({ message: t('planogramPage:PRODUCT_LIST.PRODUCT_DETAIL_PAGE.INVALID_WAREHOUSES_ERROR') }));
      }
      if (invalidList?.length > 0) {
        return dispatch(ToastCreators.error(
          { message: t('planogramPage:PRODUCT_LIST.PRODUCT_DETAIL_PAGE.INVALID_WAREHOUSES_ERROR', { invalidList: invalidList?.toString() }) },
        ));
      }
      return dispatch(
        Creators.updatePlanogramProductRequest({
          productId: planogramProductId,
          body,
        }),
      );
    },
  });
  const { handleSubmit, values, setValues, setFieldValue, errors } = formik;

  useEffect(() => {
    if (form && values) {
      form.setFieldsValue(values);
    }
  }, [form, values]);

  const handleCancelClick = () => {
    setValues(initialValues);
    setIsFormEditable(false);
  };

  const handleEditClick = () => {
    setValues(initialValues);
    setIsFormEditable(true);
  };

  const useValuesNullCheck = () => {
    const isSizeIdsNull = values?.sizeIds?.length === 0;
    const isDemographyIdsNull = values?.demographyIds?.length === 0;
    const isWarehouseTypesIsNull = values?.warehouseTypes?.length === 0;
    return { isValueNull: isSizeIdsNull || isDemographyIdsNull || isWarehouseTypesIsNull };
  };
  const { isValueNull } = useValuesNullCheck();

  const handleChangeAll = (key, data, idKey = 'id') => {
    const value = [];
    if (data?.length > 0) data?.map(element => value.push(element[idKey]));

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
    if (!isValueNull &&
      (filter.mainWarehouseIds?.length > 0 || filter.cityIds?.length > 0)
    ) {
      dispatch(Creators.filterPlanogramWarehouseRequest({ body: { filter } }));
    }
  };

  const getFilteredWarehouseIds = (regularWarehouseData, assignedWarehouseList) => {
    if (!regularWarehouseData || regularWarehouseData.length === 0) {
      return [];
    }

    return regularWarehouseData
      .filter(regularWarehouse => assignedWarehouseList.some(assigned => regularWarehouse.id === assigned.warehouseId))
      .map(warehouse => warehouse.id);
  };

  const setWarehouseValue = useCallback(() => {
    if (isPending || isLocalPending) {
      return;
    }

    const warehouseIds = getFilteredWarehouseIds(
      regularWarehousesData,
      assignedWarehouses,
    );
    setFieldValue('warehouseIds', warehouseIds);
  }, [
    regularWarehousesData,
    assignedWarehouses,
    isPending,
    isLocalPending,
    setFieldValue,
  ]);

  useEffect(() => {
    setWarehouseValue();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [regularWarehousesData]);

  useEffect(() => {
    if (
      !isValueNull &&
      (values.mainWarehouseIds?.length > 0 || values.cityIds?.length > 0)
    ) {
      const filter = {
        cityIds: values.cityIds,
        demographyIds: values.demographyIds,
        domainTypes: values.domainTypes,
        mainWarehouseIds: values.mainWarehouseIds,
        sizeIds: values.sizeIds,
        warehouseTypes: values.warehouseTypes,
      };
      dispatch(Creators.filterPlanogramWarehouseRequest({ body: { filter } }));
    }
  }, [
    dispatch,
    values.domainTypes,
    values.cityIds,
    values.demographyIds,
    values.mainWarehouseIds,
    values.sizeIds,
    values.warehouseTypes,
    isValueNull,
  ]);

  useEffect(() => {
    if (!isUpdatePending) {
      if (updateError) {
        setValues(initialValues);
      }
      setIsFormEditable(false);
    }
  }, [
    initialValues,
    isUpdatePending,
    setIsFormEditable,
    setValues,
    updateError,
    isValueNull,
  ]);

  return (
    <Space title={t('GENERAL_INFO.TITLE')} className="w-100">
      <Form
        form={form}
        onFinish={handleSubmit}
        layout="vertical"
        id="planogram_product_detail"
      >
        <Row gutter={[theme.spacing(2)]} className={classes.row}>
          <Col span={12}>
            <FormItem name="productName" errors={errors}>
              <TextInput
                name="productName"
                label={t(
                  'planogramPage:PRODUCT_LIST.PRODUCT_DETAIL_PAGE.PRODUCT_NAME',
                )}
                disabled
              />
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem name="planogramProductId" errors={errors}>
              <TextInput
                value={values?.planogramProductId}
                name="planogramProductId"
                label={t(
                  'planogramPage:PRODUCT_LIST.PRODUCT_DETAIL_PAGE.PRODUCT_ID',
                )}
                disabled
              />
            </FormItem>
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
                optionsData={
                  warehouseTypesList &&
                  Object.keys(warehouseTypesList)?.length > 0 &&
                  Object.entries(warehouseTypesList)?.map(warehouse => ({
                    value: parseFloat(warehouse[0]),
                    label: warehouse[1],
                  }))
                }
                onChange={value => setValues({ ...values, warehouseTypes: value })}
                disabled={!isFormEditable || isPending}
              />
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem name="domainTypes" errors={errors}>
              <Select
                mode="multiple"
                label={t('planogramPage:PRODUCT_LIST.PRODUCT_DETAIL_PAGE.DOMAIN')}
                value={values?.domainTypes}
                optionsData={PLANOGRAM_PRODUCT_DOMAIN_TYPES.map(domain => ({
                  value: domain.key,
                  label: domain.name[getLangKey()],
                }))}
                disabled={!isFormEditable || isPending}
                onChange={value => setValues({ ...values, domainTypes: value })}
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
                optionsData={
                  demographyList?.length > 0
                    ? selectFormatter(demographyList)
                    : []
                }
                disabled={!isFormEditable || isPending}
                onChange={value => setValues({ ...values, demographyIds: value })}
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
                optionsData={
                  sizeList?.length > 0 ? selectFormatter(sizeList) : []
                }
                disabled={!isFormEditable || isPending}
                onChange={value => setValues({ ...values, sizeIds: value })}
              />
            </FormItem>
          </Col>
        </Row>
        <Row gutter={[theme.spacing(3)]} className={classes.row}>
          <Col span={18}>
            <Checkbox
              name="isLocal"
              disabled={
                !isFormEditable || isPending || isLocalPending || isValueNull
              }
              onChange={({ target: { checked } }) => setFieldValue('isLocal', checked)}
              checked={values?.isLocal}
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
              checked={values?.isActive}
              disabled
              loading={isPending || isLocalPending}
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
              checked={values?.isEnabled}
              disabled
              loading={isPending || isLocalPending}
            />
          </Col>
        </Row>
        {values?.isLocal && (
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
                    onChange={value => setValues({ ...values, mainWarehouseIds: value })}
                    filterOption={getSelectFilterOption}
                    showSearch
                    maxTagCount={2}
                    disabled={!isFormEditable || isPending || isLocalPending}
                  />
                </FormItem>
              </Col>
              <Col span={3}>
                <Button
                  size="small"
                  color="secondary"
                  className={classes.selectAllButton}
                  disabled={!isFormEditable || isPending || isLocalPending}
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
                    onChange={value => setValues({ ...values, cityIds: value })}
                    filterOption={getSelectFilterOption}
                    showSearch
                    maxTagCount={3}
                    disabled={!isFormEditable || isPending || isLocalPending}
                  />
                </FormItem>
              </Col>
              <Col span={3}>
                <Button
                  size="small"
                  color="secondary"
                  className={classes.selectAllButton}
                  disabled={!isFormEditable || isPending || isLocalPending}
                  onClick={() => handleChangeAll('cityIds', cityData)}
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
                    disabled={!isFormEditable || isPending || isLocalPending}
                    onChange={value => setFieldValue('warehouseIds', value)}
                    onSearch={inputValue => setRegularWarehouses(inputValue)}
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
                    !isFormEditable ||
                    isPending ||
                    isLocalPending ||
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
          {isFormEditable ? (
            <>
              <Col>
                <Form.Item className="mb-0 mt-0">
                  <Button
                    size="small"
                    disabled={isPending || isUpdatePending || isLocalPending}
                    onClick={handleCancelClick}
                  >
                    {t('global:CANCEL')}
                  </Button>
                </Form.Item>
              </Col>
              <Col>
                <Form.Item className="mb-0 mt-0">
                  <Button
                    size="small"
                    form="planogram_product_detail"
                    htmlType="submit"
                    loading={isPending || isUpdatePending || isLocalPending}
                  >
                    {t('global:SAVE')}
                  </Button>
                </Form.Item>
              </Col>
            </>
          ) : (
            <Col>
              <Form.Item className="mb-0 mt-0">
                <Button
                  size="small"
                  loading={isPending || isLocalPending}
                  onClick={handleEditClick}
                >
                  {t('global:EDIT')}
                </Button>
              </Form.Item>
            </Col>
          )}
        </Row>
      </Form>
    </Space>
  );
};

export default GeneralInfoForm;
