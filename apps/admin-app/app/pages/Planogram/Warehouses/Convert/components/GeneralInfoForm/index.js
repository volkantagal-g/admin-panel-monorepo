import { Form, Row, Col } from 'antd';
import { useFormik } from 'formik';
import { useMemo, useEffect } from 'react';
import { useTheme } from 'react-jss';
import { useTranslation } from 'react-i18next';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';

import {
  FormItem,
  Select,
  Space,
  TextInput,
  Button,
} from '@shared/components/GUI';
import {
  selectFormatter,
  getInitialValues,
  validationSchema,
  getDomainTypes,
} from '@app/pages/Planogram/Warehouses/Convert/components/GeneralInfoForm/formHelper';
import useStyles from '@app/pages/Planogram/Warehouses/Convert/components/GeneralInfoForm/styles';
import { Creators } from '@app/pages/Planogram/Warehouses/redux/actions';
import { validate } from '@shared/yup';
import {
  getDemographiesSelector,
  getPlanogramWarehouseDetailsSelector,
  getSizesSelector,
  getWarehouseTypesSelector,
  updatePlanogramWarehouseSelector,
} from '@app/pages/Planogram/Warehouses/redux/selectors';

const GeneralInfoForm = () => {
  const [form] = Form.useForm();
  const { t } = useTranslation('planogramPage');
  const theme = useTheme();
  const dispatch = useDispatch();
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
    const planogramWarehousePending = useSelector(getPlanogramWarehouseDetailsSelector.getIsPending);
    return { isPending: sizeListIsPending || demographyListIsPending || warehouseTypesListIsPending || planogramWarehousePending };
  };
  const { isPending } = useWarehouseDetails();

  const initialValues = useMemo(
    () => getInitialValues(planogramWarehouse),
    [planogramWarehouse],
  );

  const formik = useFormik({
    enableReinitialize: true,
    validate: validate(validationSchema),
    initialValues,
    onSubmit: values => {
      const { warehouseId, demographyId, sizeId } = values;
      const body = { demographyId, sizeId };
      return dispatch(Creators.updatePlanogramWarehouseRequest({ warehouseId, body }));
    },
  });

  const { handleSubmit, values, setValues, errors } = formik;

  useEffect(() => {
    form.setFieldsValue(values);
  }, [form, values]);

  useEffect(() => {
    if (!isUpdatePending && updateError) {
      setValues(initialValues);
    }
  }, [initialValues, isUpdatePending, setValues, updateError]);

  return (
    <Space title={t('GENERAL_INFO.TITLE')} className="w-100">
      <Form
        onFinish={handleSubmit}
        layout="vertical"
        id="planogram_warehouse_convert"
        form={form}
      >
        <Row gutter={[theme.spacing(2)]} className={classes.row}>
          <Col span={12}>
            <FormItem name="warehouseName">
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
              mode="multiple"
              disabled
            />
          </Col>
        </Row>
        <Row gutter={[theme.spacing(2)]} className={classes.row}>
          <Col span={12}>
            <FormItem name="city">
              <TextInput
                name="city"
                value={values.city}
                label={t('planogramPage:WAREHOUSES_DETAIL_PAGE.CITY')}
                disabled
              />
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem name="region">
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
                value={values.demographyId}
                optionsData={
                  demographyList?.length > 0
                    ? selectFormatter(demographyList)
                    : ''
                }
                disabled={isPending}
                onChange={value => setValues({ ...values, demographyId: value })}
              />
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem name="sizeId" errors={errors}>
              <Select
                name="sizeId"
                label={t('planogramPage:WAREHOUSES_DETAIL_PAGE.SIZE')}
                value={values.sizeId}
                optionsData={
                  sizeList?.length > 0 ? selectFormatter(sizeList) : []
                }
                disabled={isPending}
                onChange={value => setValues({ ...values, sizeId: value })}
              />
            </FormItem>
          </Col>
        </Row>
        <Row justify="end" gutter={[theme.spacing(2)]}>
          <Col>
            <FormItem className="mb-0 mt-0">
              <Button
                form="planogram_warehouse_convert"
                htmlType="submit"
                size="small"
                type="primary"
                loading={isUpdatePending}
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
