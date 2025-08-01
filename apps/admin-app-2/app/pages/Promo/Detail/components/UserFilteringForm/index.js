import { memo, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'react-jss';
import { useFormik } from 'formik';
import { get } from 'lodash';
import { Button, Col, Collapse, Form, InputNumber, Row } from 'antd';

import { updateUserFilteringSelector } from '@app/pages/Promo/Detail/redux/selectors';
import { getInitialValues, validationSchema } from './formHelper';
import permKey from '@shared/shared/permKey.json';
import { canSubmit } from '@shared/utils/formHelper';
import { usePermission, usePrevious } from '@shared/hooks';
import { Creators } from '../../redux/actions';
import { validate } from '@shared/yup';
import { PromoDetailSlice } from '@app/pages/Promo/Detail/redux/slice';

const { Panel } = Collapse;

const UserFilteringForm = () => {
  const dispatch = useDispatch();
  const { canAccess } = usePermission();
  const canEdit = canAccess(permKey.PAGE_PROMO_DETAIL_EDIT);
  const promo = useSelector(PromoDetailSlice.selectors.promo);
  const isUpdatePending = useSelector(updateUserFilteringSelector.getIsPending);
  const updateError = useSelector(updateUserFilteringSelector.getError);

  const [isFormEditable, setIsFormEditable] = useState(false);
  const { t } = useTranslation('promoPage');
  const [form] = Form.useForm();
  const theme = useTheme();
  const prevIsUpdatePending = usePrevious(isUpdatePending);

  const initialValues = useMemo(() => getInitialValues(promo), [promo]);

  const formik = useFormik({
    enableReinitialize: true,
    validate: validate(() => validationSchema(t)),
    validateOnChange: false,
    validateOnBlur: false,
    initialValues,
    onSubmit: values => {
      return dispatch(
        Creators.updateUserFilteringRequest({
          id: get(promo, '_id'),
          body: values,
        }),
      );
    },
  });

  const { handleSubmit, values, setValues, errors, setFieldValue } = formik;

  const canBeSubmittable = useMemo(() => canSubmit({ initialValues, values }), [initialValues, values]);

  useEffect(() => {
    if (prevIsUpdatePending && !isUpdatePending) {
      if (updateError) {
        setValues(initialValues);
      }
      setIsFormEditable(false);
    }
  }, [prevIsUpdatePending, setIsFormEditable, setValues, updateError, isUpdatePending, initialValues]);

  useEffect(() => {
    form.setFieldsValue(values);
  }, [values, promo, form]);

  const handleCancelClick = () => {
    setValues(initialValues);
    setIsFormEditable(false);
  };

  const handleEditClick = () => {
    setIsFormEditable(true);
  };

  const cardFooter = (
    <Row justify="end" gutter={[theme.spacing(2)]}>
      {isFormEditable ? (
        <>
          <Col>
            <Form.Item className="mb-0 mt-0">
              <Button size="small" onClick={handleCancelClick}>
                {t('button:CANCEL')}
              </Button>
            </Form.Item>
          </Col>
          <Col>
            <Form.Item className="mb-0 mt-0">
              <Button
                size="small"
                form="user-filtering"
                type="primary"
                htmlType="submit"
                loading={isUpdatePending}
                disabled={!canBeSubmittable}
              >
                {t('button:SAVE')}
              </Button>
            </Form.Item>
          </Col>
        </>
      ) : (
        <Col>
          <Form.Item className="mb-0 mt-0">
            <Button size="small" onClick={handleEditClick}>
              {t('button:EDIT')}
            </Button>
          </Form.Item>
        </Col>
      )}
    </Row>
  );

  return (
    <Form form={form} id="user-filtering" onFinish={handleSubmit} layout="vertical">
      <Row gutter={[theme.spacing(3)]}>
        <Col span={12}>
          <Form.Item
            help={get(errors, 'useLimit')}
            validateStatus={get(errors, 'useLimit') ? 'error' : 'success'}
            name="useLimit"
            label={t('USER_FILTERING.USE_LIMIT')}
          >
            <InputNumber
              disabled={isUpdatePending || !isFormEditable}
              onChange={value => setFieldValue('useLimit', value)}
              size="large"
              min={1}
              className="w-100"
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            help={get(errors, 'useLimitPerDay')}
            validateStatus={get(errors, 'useLimitPerDay') ? 'error' : 'success'}
            name="useLimitPerDay"
            label={t('USER_FILTERING.DAILY_USE_LIMIT')}
          >
            <InputNumber
              disabled={isUpdatePending || !isFormEditable}
              onChange={value => setFieldValue('useLimitPerDay', value)}
              size="large"
              min={0}
              className="w-100"
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[theme.spacing(3)]}>
        <Col span={12}>
          <Form.Item
            help={get(errors, 'minSucOrderCount')}
            validateStatus={get(errors, 'minSucOrderCount') ? 'error' : 'success'}
            name="minSucOrderCount"
            label={t('USER_FILTERING.MIN_SUC_ORDER_COUNT')}
          >
            <InputNumber
              disabled={isUpdatePending || !isFormEditable}
              onChange={value => setFieldValue('minSucOrderCount', value)}
              size="large"
              min={0}
              className="w-100"
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            help={get(errors, 'maxSucOrderCount')}
            validateStatus={get(errors, 'maxSucOrderCount') ? 'error' : 'success'}
            name="maxSucOrderCount"
            label={t('USER_FILTERING.MAX_SUC_ORDER_COUNT')}
          >
            <InputNumber
              disabled={isUpdatePending || !isFormEditable}
              onChange={value => setFieldValue('maxSucOrderCount', value)}
              size="large"
              min={-1}
              className="w-100"
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[theme.spacing(3)]}>
        <Col span={12}>
          <Form.Item
            help={get(errors, 'minSucFoodOrderCount')}
            validateStatus={get(errors, 'minSucFoodOrderCount') ? 'error' : 'success'}
            name="minSucFoodOrderCount"
            label={t('USER_FILTERING.MIN_SUC_FOOD_ORDER_COUNT')}
          >
            <InputNumber
              disabled={isUpdatePending || !isFormEditable}
              onChange={value => setFieldValue('minSucFoodOrderCount', value)}
              size="large"
              min={0}
              className="w-100"
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            help={get(errors, 'maxSucFoodOrderCount')}
            validateStatus={get(errors, 'maxSucFoodOrderCount') ? 'error' : 'success'}
            name="maxSucFoodOrderCount"
            label={t('USER_FILTERING.MAX_SUC_FOOD_ORDER_COUNT')}
          >
            <InputNumber
              disabled={isUpdatePending || !isFormEditable}
              onChange={value => setFieldValue('maxSucFoodOrderCount', value)}
              size="large"
              min={-1}
              className="w-100"
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[theme.spacing(3)]}>
        <Col span={12}>
          <Form.Item
            help={get(errors, 'minSucMarketOrderCount')}
            validateStatus={get(errors, 'minSucMarketOrderCount') ? 'error' : 'success'}
            name="minSucMarketOrderCount"
            label={t('USER_FILTERING.MIN_SUC_MARKET_ORDER_COUNT')}
          >
            <InputNumber
              disabled={isUpdatePending || !isFormEditable}
              onChange={value => setFieldValue('minSucMarketOrderCount', value)}
              size="large"
              min={0}
              className="w-100"
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            help={get(errors, 'maxSucMarketOrderCount')}
            validateStatus={get(errors, 'maxSucMarketOrderCount') ? 'error' : 'success'}
            name="maxSucMarketOrderCount"
            label={t('USER_FILTERING.MAX_SUC_MARKET_ORDER_COUNT')}
          >
            <InputNumber
              disabled={isUpdatePending || !isFormEditable}
              onChange={value => setFieldValue('maxSucMarketOrderCount', value)}
              size="large"
              min={-1}
              className="w-100"
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[theme.spacing(3)]}>
        <Col span={12}>
          <Form.Item
            help={get(errors, 'minSucWaterOrderCount')}
            validateStatus={get(errors, 'minSucWaterOrderCount') ? 'error' : 'success'}
            name="minSucWaterOrderCount"
            label={t('USER_FILTERING.MIN_SUC_VOYAGER_ORDER_COUNT')}
          >
            <InputNumber
              disabled={isUpdatePending || !isFormEditable}
              onChange={value => setFieldValue('minSucWaterOrderCount', value)}
              size="large"
              min={0}
              className="w-100"
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            help={get(errors, 'maxSucWaterOrderCount')}
            validateStatus={get(errors, 'maxSucWaterOrderCount') ? 'error' : 'success'}
            name="maxSucWaterOrderCount"
            label={t('USER_FILTERING.MAX_SUC_VOYAGER_ORDER_COUNT')}
          >
            <InputNumber
              disabled={isUpdatePending || !isFormEditable}
              onChange={value => setFieldValue('maxSucWaterOrderCount', value)}
              size="large"
              min={-1}
              className="w-100"
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[theme.spacing(3)]}>
        <Col span={12}>
          <Form.Item
            help={get(errors, 'minSucKuzeydenOrderCount')}
            validateStatus={get(errors, 'minSucKuzeydenOrderCount') ? 'error' : 'success'}
            name="minSucKuzeydenOrderCount"
            label={t('USER_FILTERING.MIN_SUC_CARBOY_ORDER_COUNT')}
          >
            <InputNumber
              disabled={isUpdatePending || !isFormEditable}
              onChange={value => setFieldValue('minSucKuzeydenOrderCount', value)}
              size="large"
              min={0}
              className="w-100"
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            help={get(errors, 'maxSucKuzeydenOrderCount')}
            validateStatus={get(errors, 'maxSucKuzeydenOrderCount') ? 'error' : 'success'}
            name="maxSucKuzeydenOrderCount"
            label={t('USER_FILTERING.MAX_SUC_CARBOY_ORDER_COUNT')}
          >
            <InputNumber
              disabled={isUpdatePending || !isFormEditable}
              onChange={value => setFieldValue('maxSucKuzeydenOrderCount', value)}
              size="large"
              min={-1}
              className="w-100"
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[theme.spacing(3)]}>
        <Col span={12}>
          <Form.Item
            help={get(errors, 'minSucGorillasOrderCount')}
            validateStatus={get(errors, 'minSucGorillasOrderCount') ? 'error' : 'success'}
            name="minSucGorillasOrderCount"
            label={t('USER_FILTERING.MIN_SUC_GORILLAS_ORDER_COUNT')}
          >
            <InputNumber
              disabled={isUpdatePending || !isFormEditable}
              onChange={value => setFieldValue('minSucGorillasOrderCount', value)}
              size="large"
              min={0}
              className="w-100"
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            help={get(errors, 'maxSucGorillasOrderCount')}
            validateStatus={get(errors, 'maxSucGorillasOrderCount') ? 'error' : 'success'}
            name="maxSucGorillasOrderCount"
            label={t('USER_FILTERING.MAX_SUC_GORILLAS_ORDER_COUNT')}
          >
            <InputNumber
              disabled={isUpdatePending || !isFormEditable}
              onChange={value => setFieldValue('maxSucGorillasOrderCount', value)}
              size="large"
              min={-1}
              className="w-100"
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[theme.spacing(3)]}>
        <Col span={12}>
          <Form.Item
            help={get(errors, 'reqDaysAfterLastOrder')}
            validateStatus={get(errors, 'reqDaysAfterLastOrder') ? 'error' : 'success'}
            name="reqDaysAfterLastOrder"
            label={t('USER_FILTERING.REQ_DAYS_AFTER_LAST_ORDER')}
          >
            <InputNumber
              disabled={isUpdatePending || !isFormEditable}
              onChange={value => setFieldValue('reqDaysAfterLastOrder', value)}
              size="large"
              min={0}
              className="w-100"
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            help={get(errors, 'reqDaysAfterLastFoodOrder')}
            validateStatus={get(errors, 'reqDaysAfterLastFoodOrder') ? 'error' : 'success'}
            name="reqDaysAfterLastFoodOrder"
            label={t('USER_FILTERING.REQ_DAYS_AFTER_LAST_FOOD_ORDER')}
          >
            <InputNumber
              disabled={isUpdatePending || !isFormEditable}
              onChange={value => setFieldValue('reqDaysAfterLastFoodOrder', value)}
              size="large"
              min={0}
              className="w-100"
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[theme.spacing(3)]}>
        <Col span={12}>
          <Form.Item
            help={get(errors, 'orderLimitCount')}
            validateStatus={get(errors, 'orderLimitCount') ? 'error' : 'success'}
            name="orderLimitCount"
            label={t('USER_FILTERING.ORDER_LIMIT_COUNT')}
          >
            <InputNumber
              disabled={isUpdatePending || !isFormEditable}
              onChange={value => setFieldValue('orderLimitCount', value)}
              size="large"
              min={0}
              className="w-100"
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            help={get(errors, 'isOnlyPremiumDeviceModels')}
            validateStatus={get(errors, 'isOnlyPremiumDeviceModels') ? 'error' : 'success'}
            name="isOnlyPremiumDeviceModels"
            label={t('USER_FILTERING.ONLY_PREMIUM_DEVICE_MODELS')}
          >
            <input
              type="checkbox"
              disabled={isUpdatePending || !isFormEditable}
              checked={values.isOnlyPremiumDeviceModels}
              onChange={e => setFieldValue('isOnlyPremiumDeviceModels', e.target.checked)}
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[theme.spacing(3)]}>
        <Col span={12}>
          <Form.Item
            help={get(errors, 'isHealthCareProfessionalsPromo')}
            validateStatus={get(errors, 'isHealthCareProfessionalsPromo') ? 'error' : 'success'}
            name="isHealthCareProfessionalsPromo"
            label={t('USER_FILTERING.HEALTHCARE_PROFESSIONAL')}
          >
            <input
              type="checkbox"
              disabled={isUpdatePending || !isFormEditable}
              checked={values.isHealthCareProfessionalsPromo}
              onChange={e => setFieldValue('isHealthCareProfessionalsPromo', e.target.checked)}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            help={get(errors, 'isLocalCountryPhoneCodeRequired')}
            validateStatus={get(errors, 'isLocalCountryPhoneCodeRequired') ? 'error' : 'success'}
            name="isLocalCountryPhoneCodeRequired"
            label={t('USER_FILTERING.SHOW_ONLY_TO_LOCAL_NUMBERS')}
          >
            <input
              type="checkbox"
              disabled={isUpdatePending || !isFormEditable}
              checked={values.isLocalCountryPhoneCodeRequired}
              onChange={e => setFieldValue('isLocalCountryPhoneCodeRequired', e.target.checked)}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            help={get(errors, 'isPublic')}
            validateStatus={get(errors, 'isPublic') ? 'error' : 'success'}
            name="isPublic"
            label={t('USER_FILTERING.SHOW_LOCATION_FREE')}
          >
            <input
              type="checkbox"
              disabled={isUpdatePending || !isFormEditable}
              checked={values.isPublic}
              onChange={e => setFieldValue('isPublic', e.target.checked)}
            />
          </Form.Item>
        </Col>
      </Row>
      {canEdit && cardFooter}
    </Form>
  );
};

const UserFilteringSection = memo(function UserFilteringSection() {
  const { t } = useTranslation('promoPage');

  const isParent = useSelector(PromoDetailSlice.selectors.isParent);

  if (isParent) {
    return null;
  }

  return (
    <Collapse className="mb-2">
      <Panel header={t('USER_FILTERING.HEADER_TITLE')} key={1}>
        <UserFilteringForm />
      </Panel>
    </Collapse>
  );
});

export default UserFilteringSection;
