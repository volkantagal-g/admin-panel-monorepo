import React, { useMemo, useEffect } from 'react';
import { Form, Row, Col } from 'antd';
import { useFormik } from 'formik';
import { useTheme } from 'react-jss';
import { useTranslation } from 'react-i18next';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';

import {
  FormItem,
  TextInput,
  Button,
  Space,
  Select,
} from '@shared/components/GUI';

import { Creators } from '@app/pages/Planogram/Warehouses/redux/actions';
import { validate } from '@shared/yup';

import {
  getInitialValues,
  selectFormatter,
  validationSchema,
  getDomainTypes,
} from '@app/pages/Planogram/Warehouses/Detail/components/GeneralInfoForm/formHelper';

import {
  getDemographiesSelector,
  getPlanogramWarehouseDetailsSelector,
  getSizesSelector,
  getWarehouseTypesSelector,
  updatePlanogramWarehouseSelector,
} from '@app/pages/Planogram/Warehouses/redux/selectors';

import useStyles from '@app/pages/Planogram/Warehouses/Detail/components/GeneralInfoForm/styles';

const GeneralInfoForm = React.memo(({ isFormEditable, setIsFormEditable }) => {
  const dispatch = useDispatch();
  const theme = useTheme();

  const [form] = Form.useForm();
  const { t } = useTranslation('planogramPage');
  const classes = useStyles();

  const sizeList = useSelector(getSizesSelector.getData);
  const demographyList = useSelector(getDemographiesSelector.getData);
  const warehouseTypesList = useSelector(getWarehouseTypesSelector.getData);
  const planogramWarehouse = useSelector(getPlanogramWarehouseDetailsSelector.getWarehouseData, shallowEqual);

  const isUpdatePending = useSelector(updatePlanogramWarehouseSelector.getIsPending);
  const updateError = useSelector(updatePlanogramWarehouseSelector.getError);

  const useWarehouseDetails = () => {
    const sizeListIsPending = useSelector(getSizesSelector.getIsPending);
    const demographyListIsPending = useSelector(getDemographiesSelector.getIsPending);
    const warehouseTypesListIsPending = useSelector(getWarehouseTypesSelector.getIsPending);
    const warehouseDetailPending = useSelector(getPlanogramWarehouseDetailsSelector.getIsPending);
    return { isPending: sizeListIsPending || demographyListIsPending || warehouseTypesListIsPending || warehouseDetailPending };
  };
  const { isPending } = useWarehouseDetails();

  const initialValues = useMemo(
    () => getInitialValues(planogramWarehouse),
    [planogramWarehouse],
  );

  const formik = useFormik({
    enableReinitialize: true,
    initialValues,
    validate: validate(validationSchema),
    onSubmit: values => {
      const { warehouseId, demographyId, sizeId } = values;
      const body = { demographyId, sizeId };
      return dispatch(Creators.updatePlanogramWarehouseRequest({ warehouseId, body }));
    },
  });

  const { handleSubmit, values, setValues, errors } = formik;

  const handleCancelClick = () => {
    setValues(initialValues);
    setIsFormEditable(false);
  };

  const handleEditClick = () => {
    setValues(initialValues);
    setIsFormEditable(true);
  };

  useEffect(() => {
    form.setFieldsValue(values);
  }, [form, values]);

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
  ]);

  return (
    <Space title={t('GENERAL_INFO.TITLE')} className="w-100">
      <Form
        onFinish={handleSubmit}
        layout="vertical"
        id="planogram_warehouse_detail"
        form={form}
      >
        <Row gutter={[theme.spacing(2)]} className={classes.row}>
          <Col span={12}>
            <FormItem name="warehouseName" errors={errors}>
              <TextInput
                name="warehouseName"
                label={t('planogramPage:WAREHOUSES_DETAIL_PAGE.WAREHOUSE_NAME')}
                disabled
              />
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem name="warehouseId" errors={errors}>
              <TextInput
                name="warehouseId"
                label={t('planogramPage:WAREHOUSES_DETAIL_PAGE.WAREHOUSE_ID')}
                disabled
              />
            </FormItem>
          </Col>
        </Row>
        <Row gutter={[theme.spacing(2)]} className={classes.row}>
          <Col span={12}>
            <TextInput
              value={warehouseTypesList?.[values?.warehouseType]}
              name="warehouseType"
              label={t('planogramPage:WAREHOUSES_DETAIL_PAGE.WAREHOUSE_TYPE')}
              disabled
            />
          </Col>
          <Col span={12}>
            <TextInput
              value={(getDomainTypes(values?.domainTypes))?.filter(domain => !!domain)}
              label={t('planogramPage:WAREHOUSES_DETAIL_PAGE.DOMAIN')}
              disabled
            />
          </Col>
        </Row>
        <Row gutter={[theme.spacing(2)]} className={classes.row}>
          <Col span={12}>
            <FormItem name="city" errors={errors}>
              <TextInput
                name="city"
                value={values.city}
                label={t('planogramPage:WAREHOUSES_DETAIL_PAGE.CITY')}
                disabled
              />
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem name="region" errors={errors}>
              <TextInput
                name="region"
                value={values.region}
                label={t('planogramPage:WAREHOUSES_DETAIL_PAGE.REGION')}
                disabled
              />
            </FormItem>
          </Col>
        </Row>
        <Row gutter={[theme.spacing(2)]} className={classes.row}>
          <Col span={12}>
            <FormItem name="demographyId" errors={errors}>
              <Select
                name="demographyId"
                label={t('planogramPage:WAREHOUSES_DETAIL_PAGE.DEMOGRAPHY')}
                optionsData={
                  demographyList?.length > 0
                    ? selectFormatter(demographyList)
                    : ''
                }
                disabled={!isFormEditable || isPending}
                onChange={value => setValues({ ...values, demographyId: value })}
              />
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem name="sizeId" errors={errors}>
              <Select
                name="sizeId"
                label={t('planogramPage:WAREHOUSES_DETAIL_PAGE.SIZE')}
                optionsData={
                  sizeList?.length > 0 ? selectFormatter(sizeList) : ''
                }
                disabled={!isFormEditable || isPending}
                onChange={value => setValues({ ...values, sizeId: value })}
              />
            </FormItem>
          </Col>
        </Row>
        <Row justify="end" gutter={[theme.spacing(2)]} className={classes.row}>
          {isFormEditable ? (
            <>
              <Col>
                <Form.Item className="mb-0 mt-0">
                  <Button
                    size="small"
                    disabled={isPending || isUpdatePending}
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
                    form="planogram_warehouse_detail"
                    htmlType="submit"
                    loading={isPending || isUpdatePending}
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
                  loading={isPending}
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
});

export default GeneralInfoForm;
