import { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form } from 'antd';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import { get } from 'lodash';

import {
  getMarketProductByIdSelector,
  updateMarketProductSelector,
} from '@app/pages/MarketProduct/DetailV2/redux/selectors';
import {
  validationSchema,
  getInitialValues,
  getOnlyModifiedValuesBeforeSubmit,
} from './formHelper';
import { Creators } from '@app/pages/MarketProduct/DetailV2/redux/actions';
import { validate } from '@shared/yup';
import { Space, MultiLanguageTextEditor, EditSaveCancelButtons } from '@shared/components/GUI';
import { canSubmit } from '@shared/utils/formHelper';
import { PRODUCT_DETAIL_TEXT_EDITOR, PRODUCT_DETAIL_COMPONENT_ID } from '@app/pages/MarketProduct/constants';
import { useEffectOnRequestFinished } from '@shared/hooks';

const UsageInfo = () => {
  const dispatch = useDispatch();
  const marketProduct = useSelector(getMarketProductByIdSelector.getData);
  const isUpdatePending = useSelector(updateMarketProductSelector.getIsPending);

  const [isFormEditable, setIsFormEditable] = useState(false);
  const { t } = useTranslation('marketProductPageV2');
  const [form] = Form.useForm();

  const initialValues = useMemo(
    () => getInitialValues(marketProduct),
    [marketProduct],
  );

  const formik = useFormik({
    enableReinitialize: true,
    validate: validate(validationSchema),
    initialValues,
    onSubmit: values => {
      const body = getOnlyModifiedValuesBeforeSubmit({ initialValues, values });
      dispatch(Creators.updateMarketProductRequest({
        id: get(marketProduct, '_id'),
        body,
      }));
    },
  });

  const { handleSubmit, values, setValues } = formik;

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
    setIsFormEditable(true);
  };

  return (
    <Space title={t('USAGE_INFO.TITLE')}>
      <Form
        form={form}
        id={PRODUCT_DETAIL_COMPONENT_ID.USAGE_INFO}
        onFinish={handleSubmit}
        layout="vertical"
      >
        <MultiLanguageTextEditor
          originalValue={get(initialValues, 'details.usage', {})}
          label={t('USAGE_INFO.USAGE')}
          fieldPath={['details', 'usage']}
          formik={formik}
          disabled={isUpdatePending || !isFormEditable}
          toolbarItems={PRODUCT_DETAIL_TEXT_EDITOR.TOOLBAR_ITEMS}
          formats={PRODUCT_DETAIL_TEXT_EDITOR.FORMATS}
        />
        <EditSaveCancelButtons
          disabled={!canBeSubmittable}
          form={PRODUCT_DETAIL_COMPONENT_ID.USAGE_INFO}
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

export default UsageInfo;
