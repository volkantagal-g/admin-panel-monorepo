import { memo, useState, useMemo, useEffect } from 'react';
import { Col, Form, Row } from 'antd';

import { useFormik } from 'formik';

import { useDispatch, useSelector } from 'react-redux';

import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import { Space, EditSaveCancelButtons, Select } from '@shared/components/GUI';

import {
  getSupplyLogisticInfoSelector, createSupplyLogisticInfoSelector,
  updateSupplyLogisticInfoSelector,
} from '@app/pages/MarketProduct/DetailV2/redux/selectors';

import {
  getInitialValues, getStorageTemperatureDemandType,
  getOnlyModifiedValuesBeforeSubmit,
} from './formHelper';
import { canSubmit } from '@shared/utils/formHelper';
import { usePrevious, usePermission } from '@shared/hooks';
import { Creators } from '@app/pages/MarketProduct/DetailV2/redux/actions';
import useProductActivationErrors from '@app/pages/MarketProduct/DetailV2/hooks/useProductActivationErrors';
import { PRODUCT_DETAIL_CONTAINER } from '@app/pages/MarketProduct/constants';
import permKey from '@shared/shared/permKey.json';

export const DemandAndStorageInfo = memo(function DemandAndStorageInfo() {
  const { t } = useTranslation('marketProductPageV2');
  const { id } = useParams();
  const dispatch = useDispatch();

  const { canAccess } = usePermission();

  const [isFormEditable, setIsFormEditable] = useState(false);

  const supplyLogisticInfo = useSelector(getSupplyLogisticInfoSelector.getData);
  const supplyLogisticInfoPending = useSelector(getSupplyLogisticInfoSelector.getIsPending);
  const isCreatePending = useSelector(createSupplyLogisticInfoSelector.getIsPending);
  const isUpdatePending = useSelector(updateSupplyLogisticInfoSelector.getIsPending);
  const isUpdateFailure = useSelector(updateSupplyLogisticInfoSelector.getError);
  const isPending = isCreatePending || isUpdatePending || supplyLogisticInfoPending;
  const prevIsUpdatePending = usePrevious(isPending);
  const activationErrors = useProductActivationErrors({ containerId: PRODUCT_DETAIL_CONTAINER.DEMAND_STORAGE_INFO.containerId });

  const formId = 'demandAndStorage';
  const [form] = Form.useForm();
  const initialValues = useMemo(
    () => getInitialValues(supplyLogisticInfo),
    [supplyLogisticInfo],
  );
  const formik = useFormik({
    enableReinitialize: true,
    initialValues,
    onSubmit: values => {
      const { isCreated, ...body } = getOnlyModifiedValuesBeforeSubmit({ initialValues, values });
      return dispatch(Creators.createOrUpdateSupplyLogisticInfoRequest({ id, body, isCreated, errors: activationErrors }));
    },
  });
  const { handleSubmit, values, errors, setFieldValue, setValues } = formik;
  const canBeSubmittable = useMemo(
    () => canSubmit({ initialValues, values }),
    [initialValues, values],
  );

  const handleCancelClick = () => {
    setValues(initialValues);
    setIsFormEditable(false);
  };
  const handleEditClick = () => {
    setValues(initialValues);
    setIsFormEditable(true);
  };

  useEffect(() => {
    if (prevIsUpdatePending && !isUpdatePending) {
      if (isUpdateFailure) {
        setValues(values);
      }
      else {
        setIsFormEditable(false);
      }
    }
    form.setFieldsValue(values);
  }, [form, initialValues, isUpdateFailure, isUpdatePending, prevIsUpdatePending, setValues, values]);

  const handleInputForm = (field, value) => {
    setFieldValue(field, value);
  };

  return (
    <Space
      title={t('DEMAND_AND_STORAGE.TITLE')}
      errorBadgeProps={{
        title: t('PRODUCT_ACTIVATION_ERRORS'),
        errors: activationErrors,
      }}
    >
      <Form form={form} id={formId} onFinish={handleSubmit}>
        <Row gutter={[16, 16]}>
          <Col xs={24} md={8}>
            <Select
              errors={errors}
              dataTestId="demandType"
              name="demandType"
              label={t('DEMAND_AND_STORAGE.DEMAND_TYPE')}
              value={values.demandType}
              optionsData={getStorageTemperatureDemandType(false, 'demand')}
              onChange={value => handleInputForm('demandType', value)}
              disabled={isPending || !isFormEditable}
            />
          </Col>
          <Col xs={24} md={8}>
            <Select
              errors={errors}
              dataTestId="storageType"
              name="storageType"
              label={t('DEMAND_AND_STORAGE.STORAGE_TYPE')}
              value={values.storageType}
              optionsData={getStorageTemperatureDemandType(false, 'storage')}
              onChange={value => handleInputForm('storageType', value)}
              disabled={isPending || !isFormEditable || !canAccess(permKey.PAGE_MARKET_PRODUCT_DETAIL_COMPONENT_FIELD_EDIT)}
            />
          </Col>
          <Col xs={24} md={8}>
            <Select
              errors={errors}
              dataTestId="refrigeratorTemperature"
              name="refrigeratorTemperature"
              label={t('DEMAND_AND_STORAGE.REFRIGERATOR_TEMPERATURE')}
              value={values.refrigeratorTemperature}
              optionsData={getStorageTemperatureDemandType()}
              onChange={value => handleInputForm('refrigeratorTemperature', value)}
              disabled={isPending || !isFormEditable}
            />
          </Col>
        </Row>
        <EditSaveCancelButtons
          disabled={!canBeSubmittable}
          form={formId}
          isFormEditable={isFormEditable}
          onCancelClick={handleCancelClick}
          onEditClick={handleEditClick}
          loading={isPending}
        />
      </Form>
    </Space>
  );
});
