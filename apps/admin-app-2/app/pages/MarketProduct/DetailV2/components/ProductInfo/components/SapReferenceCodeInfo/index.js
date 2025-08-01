import { useMemo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Col, Row, Form } from 'antd';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import { get } from 'lodash';

import { validate } from '@shared/yup';
import { Creators } from '@app/pages/MarketProduct/DetailV2/redux/actions';
import { getSelectedCountryV2 } from '@shared/redux/selectors/countrySelection';
import { useEffectOnRequestFinished, usePermission } from '@shared/hooks';
import { canSubmit } from '@shared/utils/formHelper';

import { EditSaveCancelButtons, Space, TextInput } from '@shared/components/GUI';
import { getMarketProductByIdSelector, updateMarketProductSelector } from '@app/pages/MarketProduct/DetailV2/redux/selectors';
import { PRODUCT_DETAIL_COMPONENT_ID, PRODUCT_DETAIL_CONTAINER, SAP_REFERENCE_CODE_ENABLED_COUNTRY_CODES } from '@app/pages/MarketProduct/constants';

import { validationSchema, getInitialValues } from './formHelper';
import useProductActivationErrors from '@app/pages/MarketProduct/DetailV2/hooks/useProductActivationErrors';
import permKey from '@shared/shared/permKey.json';

const SapReferenceCodeInfo = () => {
  const dispatch = useDispatch();
  const marketProduct = useSelector(getMarketProductByIdSelector.getData);

  const countryCode = get(useSelector(getSelectedCountryV2), 'code.alpha2');
  const isSapReferenceCodeEnabled = SAP_REFERENCE_CODE_ENABLED_COUNTRY_CODES.includes(countryCode);
  const { t } = useTranslation('marketProductPageV2');

  const { isBundle, status } = useSelector(getMarketProductByIdSelector.getData);
  const isUpdatePending = useSelector(updateMarketProductSelector.getIsPending);
  const activationErrors = useProductActivationErrors({ containerId: PRODUCT_DETAIL_CONTAINER.SAP_REFERENCE_CODE_INFO.containerId });
  const { Can } = usePermission();

  const isArchived = status === 4;

  const initialValues = useMemo(
    () => getInitialValues(marketProduct),
    [marketProduct],
  );

  const [form] = Form.useForm();
  const [isFormEditable, setIsFormEditable] = useState(false);
  const { id } = useParams();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues,
    validate: validate(validationSchema),
    onSubmit: values => {
      const body = { sapReferenceCode: values?.sapReferenceCode };

      return dispatch(Creators.updateMarketProductRequest({
        id,
        body,
      }));
    },
  });

  const { handleSubmit, values, setValues, setFieldValue, touched, errors } = formik;

  const userCanSubmit = useMemo(
    () => {
      const isValid = Object.keys(validate(validationSchema)(values)).length === 0;
      const isModified = canSubmit({
        initialValues,
        values,
      });

      return isModified && isValid;
    },
    [initialValues, values],
  );

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

  if (
    !isSapReferenceCodeEnabled
    || isBundle
  ) {
    return null;
  }

  return (
    <Space
      title={t('SAP_REFERENCE_CODE.TITLE')}
      errorBadgeProps={{
        title: t('PRODUCT_ACTIVATION_ERRORS'),
        errors: activationErrors,
      }}
    >
      <Form
        id={PRODUCT_DETAIL_COMPONENT_ID.SAP_REFERENCE_CODE_INFO}
        form={form}
        onFinish={handleSubmit}
        initialValues={initialValues}
      >
        <Row>
          <Col span={12}>
            <TextInput
              name="sapReferenceCode"
              label={t('SAP_REFERENCE_CODE.LABEL')}
              value={values.sapReferenceCode}
              onChange={e => setFieldValue('sapReferenceCode', e.target.value)}
              disabled={isUpdatePending || !isFormEditable}
              isTouched={get(touched, 'sapReferenceCode')}
              hasError={get(errors, 'sapReferenceCode')}
            />
          </Col>
        </Row>
        {isArchived && (
          <Can permKey={permKey.PAGE_MARKET_PRODUCT_DETAIL_COMPONENT_SAP_REFERENCE_CODE_EDIT}>
            <EditSaveCancelButtons
              disabled={!userCanSubmit}
              form={PRODUCT_DETAIL_COMPONENT_ID.SAP_REFERENCE_CODE_INFO}
              isFormEditable={isFormEditable && isArchived}
              loading={isUpdatePending}
              onCancelClick={handleCancelClick}
              onEditClick={handleEditClick}
            />
          </Can>
        )}
      </Form>
    </Space>
  );
};

export default SapReferenceCodeInfo;
