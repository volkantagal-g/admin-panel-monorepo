import { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Row, Col } from 'antd';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';

import {
  getMarketProductByIdSelector,
  updateMarketProductSelector,
} from '@app/pages/MarketProduct/DetailV2/redux/selectors';
import {
  validationSchema,
  getInitialValues,
  getOnlyModifiedValuesBeforeSubmit,
  getHfssIndicatorTypeOptions,
  getHfssFoodOrDrinkTypeOptions,
  getHfssFoodCategoryTypeOptions,
} from './formHelper';
import { useEffectOnRequestFinished } from '@shared/hooks';
import { Creators } from '@app/pages/MarketProduct/DetailV2/redux/actions';
import { validate } from '@shared/yup';
import { getSelectFilterOption } from '@shared/utils/common';
import { canSubmit } from '@shared/utils/formHelper';
import { MARKET_PRODUCT_STATUS } from '@shared/shared/constants';
import {
  HFSS_INDICATOR_TYPE,
  PRODUCT_DETAIL_COMPONENT_ID,
  PRODUCT_DETAIL_CONTAINER,
} from '@app/pages/MarketProduct/constants';
import { EditSaveCancelButtons, NumberInput, Select, InfoIcon, Space } from '@shared/components/GUI';
import useProductActivationErrors from '@app/pages/MarketProduct/DetailV2/hooks/useProductActivationErrors';

const HfssInfo = () => {
  const dispatch = useDispatch();
  const marketProduct = useSelector(getMarketProductByIdSelector.getData);
  const isUpdatePending = useSelector(updateMarketProductSelector.getIsPending);
  const [isFormEditable, setIsFormEditable] = useState(false);
  const { t } = useTranslation('marketProductPageV2');
  const [form] = Form.useForm();
  const activationErrors = useProductActivationErrors({ containerId: PRODUCT_DETAIL_CONTAINER.HFSS_INFO.containerId });

  const initialValues = useMemo(
    () => getInitialValues(marketProduct),
    [marketProduct],
  );

  const paramsForValidate = { isProductActive: marketProduct.status === MARKET_PRODUCT_STATUS.ACTIVE };

  const formik = useFormik({
    enableReinitialize: true,
    validate: validate(validationSchema, paramsForValidate),
    initialValues,
    onSubmit: values => {
      const body = getOnlyModifiedValuesBeforeSubmit({ initialValues, values });
      return dispatch(Creators.updateMarketProductRequest({
        id: marketProduct?._id,
        body,
      }));
    },
  });

  const { handleSubmit, values, errors, setFieldValue, setValues } = formik;
  const canBeSubmittable = useMemo(
    () => canSubmit({ initialValues, values }),
    [initialValues, values],
  );

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

  const handleHfssIndicatorChange = value => {
    if (value !== HFSS_INDICATOR_TYPE.HFSS) {
      setValues({
        hfssInfo: {
          hfssIndicator: value,
          hfssFoodOrDrink: null,
          hfssFoodCategory: null,
          hfssNutrientProfileScore: null,
        },
      });
    }
    else {
      setFieldValue(['hfssInfo', 'hfssIndicator'], value);
    }
  };

  const isHfss = values?.hfssInfo?.hfssIndicator === HFSS_INDICATOR_TYPE.HFSS;

  return (
    <Space
      title={t('HFSS_INFO.TITLE')}
      errorBadgeProps={{
        title: t('PRODUCT_ACTIVATION_ERRORS'),
        errors: activationErrors,
      }}
    >
      <Form
        form={form}
        onFinish={handleSubmit}
        initialValues={initialValues}
        id={PRODUCT_DETAIL_COMPONENT_ID.HFSS_INFO}
      >
        <Row gutter={[16, 16]}>
          <Col xs={24} md={12} lg={8}>
            <Select
              name={['hfssInfo', 'hfssIndicator']}
              label={t('HFSS_INFO.HFSS_INDICATOR')}
              value={values?.hfssInfo?.hfssIndicator}
              optionsData={getHfssIndicatorTypeOptions()}
              onChange={handleHfssIndicatorChange}
              disabled={isUpdatePending || !isFormEditable}
              errors={errors}
              autoComplete="off"
              showSearch
              filterOption={getSelectFilterOption}
            />
          </Col>
          <Col xs={24} md={12} lg={8}>
            <Select
              name={['hfssInfo', 'hfssFoodOrDrink']}
              label={(<>{t('HFSS_INFO.HFSS_FOOD_OR_DRINK')}<InfoIcon title={t('TOOLTIP.HFSS_FOOD_OR_DRINK')} /></>)}
              value={values?.hfssInfo?.hfssFoodOrDrink}
              optionsData={getHfssFoodOrDrinkTypeOptions()}
              onChange={value => {
                setFieldValue(['hfssInfo', 'hfssFoodOrDrink'], value);
              }}
              errors={errors}
              disabled={!isHfss || isUpdatePending || !isFormEditable}
              autoComplete="off"
              showSearch
              filterOption={getSelectFilterOption}
            />
          </Col>
          <Col xs={24} md={12} lg={8}>
            <Select
              name={['hfssInfo', 'hfssFoodCategory']}
              label={t('HFSS_INFO.HFSS_FOOD_CATEGORY')}
              value={values?.hfssInfo?.hfssFoodCategory}
              errors={errors}
              optionsData={getHfssFoodCategoryTypeOptions()}
              onChange={value => {
                setFieldValue(['hfssInfo', 'hfssFoodCategory'], value);
              }}
              disabled={!isHfss || isUpdatePending || !isFormEditable}
              autoComplete="off"
              showSearch
              filterOption={getSelectFilterOption}
            />
          </Col>
          <Col xs={24} md={12} lg={8}>
            <NumberInput
              name={['hfssInfo', 'hfssNutrientProfileScore']}
              label={t('HFSS_INFO.NUTRIENT_PROFILE_SCORE')}
              value={values?.hfssInfo?.hfssNutrientProfileScore}
              onChange={value => {
                setFieldValue(['hfssInfo', 'hfssNutrientProfileScore'], value);
              }}
              disabled={!isHfss || isUpdatePending || !isFormEditable}
              errors={errors}
            />
          </Col>
        </Row>
        <EditSaveCancelButtons
          disabled={!canBeSubmittable}
          form={PRODUCT_DETAIL_COMPONENT_ID.HFSS_INFO}
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

export default HfssInfo;
