import { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import { get } from 'lodash';
import { Form, Row, Col } from 'antd';

import {
  getMarketProductByIdSelector,
  updateMarketProductSelector,
} from '@app/pages/MarketProduct/DetailV2/redux/selectors';
import {
  validationSchema,
  getInitialValues,
  getOnlyModifiedValuesBeforeSubmit,
  getProductSourceOptions,
} from './formHelper';
import { canSubmit } from '@shared/utils/formHelper';
import { useEffectOnRequestFinished } from '@shared/hooks';
import { Creators } from '@app/pages/MarketProduct/DetailV2/redux/actions';
import { validate } from '@shared/yup';
import { MARKET_PRODUCT_STATUS } from '@shared/shared/constants';
import SelectMarketProductCategory from '@shared/containers/GUI/Select/MarketProductCategory';
import { PRODUCT_DETAIL_COMPONENT_ID, PRODUCT_DETAIL_CONTAINER } from '@app/pages/MarketProduct/constants';
import { Select, EditSaveCancelButtons, Space, MultiLanguageSelect } from '@shared/components/GUI';
import { getSelectFilterOption } from '@shared/utils/common';
import useProductActivationErrors from '@app/pages/MarketProduct/DetailV2/hooks/useProductActivationErrors';
import { getCountryRestrictedDomainTypeOptions } from '@app/pages/MarketProduct/utils';

const MarketInfo = () => {
  const dispatch = useDispatch();
  const marketProduct = useSelector(getMarketProductByIdSelector.getData);
  const isUpdatePending = useSelector(updateMarketProductSelector.getIsPending);
  const activationErrors = useProductActivationErrors({ containerId: PRODUCT_DETAIL_CONTAINER.MARKET_INFO.containerId });

  const [isFormEditable, setIsFormEditable] = useState(false);
  const { t } = useTranslation('marketProductPageV2');
  const [form] = Form.useForm();

  const paramsForValidate = {
    isProductActive: marketProduct.status === MARKET_PRODUCT_STATUS.ACTIVE,
    isBundle: marketProduct.isBundle,
  };

  const initialValues = useMemo(() => getInitialValues(marketProduct), [marketProduct]);

  const formik = useFormik({
    enableReinitialize: true,
    validate: validate(validationSchema, paramsForValidate),
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

  return (
    <Space
      title={t('MARKET_INFO.TITLE')}
      errorBadgeProps={{
        title: t('PRODUCT_ACTIVATION_ERRORS'),
        errors: activationErrors,
      }}
    >
      <Form form={form} id={PRODUCT_DETAIL_COMPONENT_ID.MARKET_INFO} onFinish={handleSubmit} layout="vertical">
        <Row gutter={16} className="mb-2">
          <Col sm={24} md={12} lg={8}>
            <Select
              allowClear
              mode="multiple"
              name="domainTypes"
              label={t('MARKET_INFO.PRODUCT_TARGETS')}
              value={values.domainTypes}
              optionsData={getCountryRestrictedDomainTypeOptions(marketProduct.countryCode)}
              onChange={domainTypes => {
                setFieldValue('domainTypes', domainTypes);
              }}
              disabled={isUpdatePending || !isFormEditable}
              errors={errors}
              autoComplete="off"
              showSearch
              filterOption={getSelectFilterOption}
              dataTestId="product-targets"
            />
          </Col>

          <Col sm={24} md={12} lg={8}>
            <SelectMarketProductCategory
              labelWithTooltip={{
                label: t('MARKET_INFO.CATEGORY'),
                tooltipTitle: t('MARKET_INFO.TOOLTIP.CATEGORY'),
              }}
              value={values.category}
              onChange={categoryId => setFieldValue('category', categoryId)}
              disabled
              isFormEditable={isFormEditable}
              requestParams={{ fields: ['name'] }}
            />
          </Col>

          <Col sm={24} md={12} lg={8}>
            <SelectMarketProductCategory
              labelWithTooltip={{
                label: t('MARKET_INFO.SUB_CATEGORY'),
                tooltipTitle: t('MARKET_INFO.TOOLTIP.CATEGORY'),
              }}
              value={values.subCategory}
              onChange={subCategoryId => setFieldValue('subCategory', subCategoryId)}
              disabled
              isFormEditable={isFormEditable}
              requestParams={{ fields: ['name'] }}
            />
          </Col>
        </Row>
        <MultiLanguageSelect
          wrapperId={PRODUCT_DETAIL_COMPONENT_ID.KEYWORDS}
          label={t('MARKET_INFO.KEYWORDS')}
          fieldPath={['keywords']}
          formik={formik}
          disabled={isUpdatePending || !isFormEditable}
          selectProps={{ mode: 'tags' }}
        />
        <MultiLanguageSelect
          wrapperId={PRODUCT_DETAIL_COMPONENT_ID.BOOSTED_KEYWORDS}
          label={t('MARKET_INFO.BOOSTED_KEYWORDS')}
          fieldPath={['boostedKeywords']}
          formik={formik}
          disabled={isUpdatePending || !isFormEditable}
          selectProps={{ mode: 'tags' }}
        />
        <Select
          label={t('MARKET_INFO.PRODUCT_SOURCE')}
          allowClear
          value={values.productSource}
          optionsData={getProductSourceOptions()}
          onChange={productSource => {
            setFieldValue('productSource', productSource || null);
          }}
          disabled={isUpdatePending || !isFormEditable}
          autoComplete="off"
          showSearch
          filterOption={getSelectFilterOption}
          getPopupContainer={trigger => trigger?.parentNode}
        />
        <EditSaveCancelButtons
          disabled={!canBeSubmittable}
          form={PRODUCT_DETAIL_COMPONENT_ID.MARKET_INFO}
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

export default MarketInfo;
