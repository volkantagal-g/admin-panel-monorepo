import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Col, Form, Row } from 'antd';
import { useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { has, isEmpty } from 'lodash';

import { useEffectOnRequestFinished, usePermission } from '@shared/hooks';
import { EditSaveCancelButtons, Select, Space } from '@shared/components/GUI';
import { validate } from '@shared/yup';
import { validationSchema, getInitialValues } from './formHelper';
import { Creators } from '@app/pages/MarketProduct/DetailV2/redux/actions';
import { canSubmit } from '@shared/utils/formHelper';
import {
  getMarketProductByIdSelector,
  updateMarketProductSelector,
} from '@app/pages/MarketProduct/DetailV2/redux/selectors';
import { getSelectFilterOption } from '@shared/utils/common';
import { PRODUCT_DETAIL_COMPONENT_ID, PRODUCT_DETAIL_CONTAINER } from '@app/pages/MarketProduct/constants';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import useProductActivationErrors from '@app/pages/MarketProduct/DetailV2/hooks/useProductActivationErrors';
import permKey from '@shared/shared/permKey.json';

const BarcodesInfo = () => {
  const dispatch = useDispatch();
  const marketProduct = useSelector(getMarketProductByIdSelector.getData);
  const isUpdatePending = useSelector(updateMarketProductSelector.getIsPending);
  const { t } = useTranslation('marketProductPageV2');
  const activationErrors = useProductActivationErrors({ containerId: PRODUCT_DETAIL_CONTAINER.BARCODES_INFO.containerId });

  const { Can } = usePermission();

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
      const body = { barcodes: values?.barcodes };
      if (has(body, 'barcodes')) {
        if (isEmpty(body.barcodes)) {
          return dispatch(ToastCreators.error({ message: t('BARCODE.ERROR.INVALID_BARCODE') }));
        }
        const hasInvalidBarcode = (body.barcodes || []).some(barcode => barcode.split(' ').length !== 1);
        if (hasInvalidBarcode) {
          return dispatch(ToastCreators.error({ message: t('BARCODE.ERROR.INVALID_BARCODE') }));
        }
      }
      return dispatch(Creators.updateMarketProductRequest({
        id,
        body,
      }));
    },
  });
  const { handleSubmit, values, setValues, setFieldValue, errors } = formik;
  const canBeSubmittable = useMemo(
    () => canSubmit({ initialValues, values }),
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

  const handleSelectBarcodes = value => {
    setFieldValue('barcodes', value);
  };

  return (
    <Space
      title={t('BARCODES')}
      errorBadgeProps={{
        title: t('PRODUCT_ACTIVATION_ERRORS'),
        errors: activationErrors,
      }}
    >
      <Form
        id={PRODUCT_DETAIL_COMPONENT_ID.BARCODES_INFO}
        form={form}
        onFinish={handleSubmit}
        initialValues={initialValues}
      >
        <Row>
          <Col xs={24} lg={8}>
            <Select
              name="barcodes"
              mode="tags"
              label={t('BARCODE.TITLE')}
              allowClear
              value={values.barcodes}
              onChange={handleSelectBarcodes}
              disabled={isUpdatePending || !isFormEditable}
              showSearch
              filterOption={getSelectFilterOption}
              errors={errors}
            />
          </Col>
        </Row>
        <Can permKey={permKey.PAGE_MARKET_PRODUCT_DETAIL_COMPONENT_FIELD_EDIT}>
          <EditSaveCancelButtons
            disabled={!canBeSubmittable}
            form={PRODUCT_DETAIL_COMPONENT_ID.BARCODES_INFO}
            isFormEditable={isFormEditable}
            loading={isUpdatePending}
            onCancelClick={handleCancelClick}
            onEditClick={handleEditClick}
          />
        </Can>
      </Form>
    </Space>
  );
};

export default BarcodesInfo;
