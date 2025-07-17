import { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'react-jss';
import { useFormik } from 'formik';
import { get } from 'lodash';
import { Form, Row, Col } from 'antd';

import { Space, Select, EditSaveCancelButtons } from '@shared/components/GUI';
import {
  getMarketProductByIdSelector,
  updateMarketProductSelector,
} from '@app/pages/MarketProduct/DetailV2/redux/selectors';
import {
  validationSchema,
  getInitialValues,
  getOnlyModifiedValuesBeforeSubmit,
} from './formHelper';
import { canSubmit } from '@shared/utils/formHelper';
import { useEffectOnRequestFinished } from '@shared/hooks';
import { Creators } from '@app/pages/MarketProduct/DetailV2/redux/actions';
import { validate } from '@shared/yup';
import { MARKET_PRODUCT_TYPE } from '@shared/shared/constants';
import { getSelectFilterOption } from '@shared/utils/common';
import {
  getMarketProductSubTypeOptions,
  getMarketProductTypeOptions,
  getMarketProductUnitOptions,
} from '@app/pages/MarketProduct/utils';
import { PRODUCT_DETAIL_COMPONENT_ID, PRODUCT_DETAIL_CONTAINER } from '@app/pages/MarketProduct/constants';
import useProductActivationErrors from '@app/pages/MarketProduct/DetailV2/hooks/useProductActivationErrors';

const ProductType = () => {
  const dispatch = useDispatch();
  const marketProduct = useSelector(getMarketProductByIdSelector.getData);
  const isUpdatePending = useSelector(updateMarketProductSelector.getIsPending);
  const [isFormEditable, setIsFormEditable] = useState(false);
  const { t } = useTranslation('marketProductPageV2');
  const activationErrors = useProductActivationErrors({ containerId: PRODUCT_DETAIL_CONTAINER.PRODUCT_TYPE_INFO.containerId });
  const [form] = Form.useForm();
  const theme = useTheme();

  const initialValues = useMemo(() => getInitialValues(marketProduct), [
    marketProduct,
  ]);

  const formik = useFormik({
    enableReinitialize: true,
    validate: validate(validationSchema),
    initialValues,
    onSubmit: values => {
      const body = getOnlyModifiedValuesBeforeSubmit({
        initialValues,
        values,
      });
      return dispatch(
        Creators.updateMarketProductRequest({
          id: get(marketProduct, '_id'),
          body,
        }),
      );
    },
  });

  const { handleSubmit, values, errors, setFieldValue, setValues } = formik;

  const canBeSubmittable = useMemo(() => canSubmit({ initialValues, values }), [initialValues, values]);

  useEffect(() => {
    form.setFieldsValue(values);
  }, [form, values]);

  useEffectOnRequestFinished(
    updateMarketProductSelector,
    () => {
      setIsFormEditable(false);
    },
    () => {
      setValues(initialValues);
      setIsFormEditable(false);
    },
  );

  const handleCancelClick = () => {
    setValues(initialValues);
    setIsFormEditable(false);
  };

  const handleEditClick = () => {
    setValues(initialValues);
    setIsFormEditable(true);
  };

  const isProductWeight = Number(values.type) === MARKET_PRODUCT_TYPE.WEIGHT;
  const isFormDisabled = isUpdatePending || !isFormEditable;
  const isSubTypeDisabled = isFormDisabled || typeof marketProduct.subType !== 'undefined';

  return (
    <Space
      title={t('PRODUCT_TYPE_INFO.TITLE')}
      errorBadgeProps={{
        title: t('PRODUCT_ACTIVATION_ERRORS'),
        errors: activationErrors,
      }}
    >
      <Form form={form} id={PRODUCT_DETAIL_COMPONENT_ID.PRODUCT_TYPE_INFO} onFinish={handleSubmit} layout="vertical">
        <Row gutter={theme.spacing(3)}>
          <Col span={8}>
            <Select
              hasForm
              name="type"
              labelWithTooltip={{
                label: t('PRODUCT_TYPE_INFO.PRODUCT_TYPE'),
                tooltipTitle: t('PRODUCT_TYPE_INFO.TOOLTIP.PRODUCT_TYPE'),
              }}
              value={values.type}
              optionsData={getMarketProductTypeOptions()}
              onChange={type => setFieldValue('type', type)}
              disabled
              errors={errors}
              autoComplete="off"
              showSearch
              filterOption={getSelectFilterOption}
            />
          </Col>
          {isProductWeight && (
            <Col span={8}>
              <Select
                hasForm
                name="subType"
                id="subType"
                // TODO(umut.ozdemir1): most of @shared/components/GUI components are making things hard, raise this issue in the future
                labelWithTooltip={{
                  label: <label style={{ fontSize: 'unset', marginBottom: 'unset' }} htmlFor="subType">{t('PRODUCT_TYPE_INFO.PRODUCT_SUB_TYPE')}</label>,
                  tooltipTitle: t('PRODUCT_TYPE_INFO.TOOLTIP.PRODUCT_SUB_TYPE'),
                }}
                value={values.subType}
                optionsData={getMarketProductSubTypeOptions(values.type)}
                onChange={subType => setFieldValue('subType', subType)}
                disabled={isSubTypeDisabled}
                errors={errors}
                autoComplete="off"
                showSearch
                filterOption={getSelectFilterOption}
              />
            </Col>
          )}
          <Col span={8}>
            <Select
              hasForm
              name="unit"
              labelWithTooltip={{
                label: t('PRODUCT_TYPE_INFO.PRODUCT_UNIT'),
                tooltipTitle: t('PRODUCT_TYPE_INFO.TOOLTIP.PRODUCT_UNIT'),
              }}
              value={values.unit}
              optionsData={getMarketProductUnitOptions(values?.type)}
              onChange={unit => setFieldValue('unit', unit)}
              disabled={isUpdatePending || !isFormEditable}
              errors={errors}
              autoComplete="off"
              showSearch
              filterOption={getSelectFilterOption}
            />
          </Col>
        </Row>
        <EditSaveCancelButtons
          disabled={!canBeSubmittable}
          form={PRODUCT_DETAIL_COMPONENT_ID.PRODUCT_TYPE_INFO}
          htmlType="submit"
          isFormEditable={isFormEditable}
          loading={isUpdatePending}
          onCancelClick={handleCancelClick}
          onEditClick={handleEditClick}
        />
      </Form>
    </Space>
  );
};

export default ProductType;
