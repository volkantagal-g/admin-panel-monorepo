import { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Row, Col } from 'antd';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';

import { Creators } from '@app/pages/MarketProduct/DetailV2/redux/actions';
import {
  getMarketProductByIdSelector,
  updateMarketProductSelector,
} from '@app/pages/MarketProduct/DetailV2/redux/selectors';
import {
  validationSchema,
  getInitialValues,
  getOnlyModifiedValuesBeforeSubmit,
  getDisplayTypeOptions,
} from './formHelper';
import { useEffectOnRequestFinished } from '@shared/hooks';
import { validate } from '@shared/yup';
import { getSelectFilterOption } from '@shared/utils/common';
import { canSubmit } from '@shared/utils/formHelper';
import { PRODUCT_DETAIL_COMPONENT_ID, PRODUCT_DETAIL_CONTAINER } from '@app/pages/MarketProduct/constants';
import { EditSaveCancelButtons, Select, Space } from '@shared/components/GUI';
import useProductActivationErrors from '@app/pages/MarketProduct/DetailV2/hooks/useProductActivationErrors';

const DisplayTypeInfo = () => {
  const dispatch = useDispatch();
  const marketProduct = useSelector(getMarketProductByIdSelector.getData);
  const isUpdatePending = useSelector(updateMarketProductSelector.getIsPending);
  const [isFormEditable, setIsFormEditable] = useState(false);
  const { t } = useTranslation('marketProductPageV2');
  const [form] = Form.useForm();
  const activationErrors = useProductActivationErrors({ containerId: PRODUCT_DETAIL_CONTAINER.DISPLAY_TYPE_INFO.containerId });

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

  const handleDisplayTypeChange = displayType => {
    setFieldValue('displayType', displayType);
  };

  return (
    <Space
      title={t('GALLERY.DISPLAY_TYPE_INFO.TITLE')}
      errorBadgeProps={{
        title: t('PRODUCT_ACTIVATION_ERRORS'),
        errors: activationErrors,
      }}
    >
      <Form
        id={PRODUCT_DETAIL_COMPONENT_ID.DISPLAY_TYPE_INFO}
        form={form}
        onFinish={handleSubmit}
        initialValues={initialValues}
      >
        <Row gutter={[16, 16]}>
          <Col xs={24} md={12} lg={8} id={PRODUCT_DETAIL_COMPONENT_ID.DISPLAY_TYPE}>
            <Select
              name="displayType"
              label={t('GALLERY.DISPLAY_TYPE')}
              value={values?.displayType}
              optionsData={getDisplayTypeOptions()}
              onChange={handleDisplayTypeChange}
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
          form={PRODUCT_DETAIL_COMPONENT_ID.DISPLAY_TYPE_INFO}
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

export default DisplayTypeInfo;
