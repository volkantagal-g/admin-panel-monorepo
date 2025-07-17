import { useMemo, useState, useCallback } from 'react';
import { Form } from 'antd';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { get } from 'lodash';
import { useTranslation } from 'react-i18next';

import { useEffectOnRequestFinished, usePermission } from '@shared/hooks';
import { canSubmit } from '@shared/utils/formHelper';
import { PRODUCT_DETAIL_COMPONENT_ID, PRODUCT_DETAIL_CONTAINER } from '@app/pages/MarketProduct/constants';
import { MARKET_PRODUCT_STATUS } from '@shared/shared/constants';
import {
  validationSchema,
  getInitialValues,
  getOnlyModifiedValuesBeforeSubmit,
} from './formHelper';
import {
  getMarketProductByIdSelector,
  updateMarketProductSelector,
} from '@app/pages/MarketProduct/DetailV2/redux/selectors';
import { validate } from '@shared/yup';
import { EditSaveCancelButtons, MultiLanguageInput, Space } from '@shared/components/GUI';
import { Creators } from '@app/pages/MarketProduct/DetailV2/redux/actions';
import useProductActivationErrors from '@app/pages/MarketProduct/DetailV2/hooks/useProductActivationErrors';
import permKey from '@shared/shared/permKey.json';

const ProductNames = () => {
  const [isFormEditable, setIsFormEditable] = useState(false);
  const { t } = useTranslation('marketProductPageV2');
  const [form] = Form.useForm();
  const isUpdatePending = useSelector(updateMarketProductSelector.getIsPending);
  const dispatch = useDispatch();
  const marketProduct = useSelector(getMarketProductByIdSelector.getData);
  const activationErrors = useProductActivationErrors({ containerId: PRODUCT_DETAIL_CONTAINER.PRODUCT_NAMES_INFO.containerId });

  const { canAccess } = usePermission();

  const initialValues = useMemo(
    () => getInitialValues(marketProduct),
    [marketProduct],
  );
  const colProps = useMemo(() => ({ xs: 24, md: 12, lg: 8 }), []);

  const paramsForValidate = { isProductActive: marketProduct.status === MARKET_PRODUCT_STATUS.ACTIVE };

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

  const { handleSubmit, values, setValues } = formik;

  const canBeSubmittable = useMemo(() => canSubmit({ initialValues, values }), [initialValues, values]);

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

  const handleCancelClick = useCallback(() => {
    setValues(initialValues);
    setIsFormEditable(false);
  }, [initialValues, setValues]);

  const handleEditClick = useCallback(() => {
    setValues(initialValues);
    setIsFormEditable(true);
  }, [initialValues, setValues]);

  return (
    <Space
      title={t('PRODUCT_NAMES.TITLE')}
      errorBadgeProps={{
        title: t('PRODUCT_ACTIVATION_ERRORS'),
        errors: activationErrors,
      }}
    >
      <Form
        form={form}
        id={PRODUCT_DETAIL_COMPONENT_ID.PRODUCT_NAMES}
        onFinish={handleSubmit}
        layout="vertical"
      >
        <MultiLanguageInput
          className="mb-3"
          colProps={colProps}
          wrapperId={PRODUCT_DETAIL_COMPONENT_ID.NAME}
          label={t('PRODUCT_NAMES.NAME')}
          fieldPath={['name']}
          formik={formik}
          disabled={isUpdatePending || !isFormEditable}
        />
        <MultiLanguageInput
          className="mb-3"
          colProps={colProps}
          wrapperId={PRODUCT_DETAIL_COMPONENT_ID.SHORT_NAME}
          label={t('PRODUCT_NAMES.SHORT_NAME')}
          fieldPath={['shortName']}
          formik={formik}
          disabled={isUpdatePending || !isFormEditable || !canAccess(permKey.PAGE_MARKET_PRODUCT_DETAIL_COMPONENT_FIELD_EDIT)}
        />
        <MultiLanguageInput
          className="mb-3"
          colProps={colProps}
          wrapperId={PRODUCT_DETAIL_COMPONENT_ID.DISPLAY_NAME}
          label={t('PRODUCT_NAMES.DISPLAY_NAME')}
          fieldPath={['displayName']}
          formik={formik}
          disabled={isUpdatePending || !isFormEditable}
        />
        <MultiLanguageInput
          className="mb-3"
          colProps={colProps}
          wrapperId={PRODUCT_DETAIL_COMPONENT_ID.SHORT_DESCRIPTION}
          label={t('PRODUCT_NAMES.SHORT_DESCRIPTION')}
          fieldPath={['shortDescription']}
          formik={formik}
          disabled={isUpdatePending || !isFormEditable}
        />
        <EditSaveCancelButtons
          disabled={!canBeSubmittable}
          form={PRODUCT_DETAIL_COMPONENT_ID.PRODUCT_NAMES}
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

export default ProductNames;
