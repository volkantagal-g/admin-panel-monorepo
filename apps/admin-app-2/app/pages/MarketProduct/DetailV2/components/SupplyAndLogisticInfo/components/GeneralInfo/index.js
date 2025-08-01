import { memo, useState, useMemo, useEffect } from 'react';
import { Col, Form, Row } from 'antd';

import { useFormik } from 'formik';

import { useDispatch, useSelector } from 'react-redux';

import { useTranslation } from 'react-i18next';

import { useParams } from 'react-router-dom';

import {
  createSupplyLogisticInfoSelector,
  getSupplyLogisticInfoSelector,
  updateSupplyLogisticInfoSelector,
} from '@app/pages/MarketProduct/DetailV2/redux/selectors';
import { Checkbox, EditSaveCancelButtons, NumberInput, Space } from '@shared/components/GUI';

import {
  getInitialValues, validationSchema,
  getOnlyModifiedValuesBeforeSubmit,
} from './formHelper';
import { canSubmit } from '@shared/utils/formHelper';
import { validate } from '@shared/yup';
import { Creators } from '@app/pages/MarketProduct/DetailV2/redux/actions';
import { usePrevious } from '@shared/hooks';
import { PRODUCT_DETAIL_CONTAINER } from '@app/pages/MarketProduct/constants';
import useProductActivationErrors from '@app/pages/MarketProduct/DetailV2/hooks/useProductActivationErrors';

export const GeneralInfo = memo(function GeneralInfo() {
  const { t } = useTranslation('marketProductPageV2');
  const dispatch = useDispatch();
  const { id } = useParams();

  const activationErrors = useProductActivationErrors({ containerId: PRODUCT_DETAIL_CONTAINER.GENERAL_INFO.containerId });

  const [isFormEditable, setIsFormEditable] = useState(false);

  const supplyLogisticInfo = useSelector(getSupplyLogisticInfoSelector.getData);
  const supplyLogisticInfoPending = useSelector(getSupplyLogisticInfoSelector.getIsPending);
  const isCreatePending = useSelector(createSupplyLogisticInfoSelector.getIsPending);
  const isUpdatePending = useSelector(updateSupplyLogisticInfoSelector.getIsPending);
  const isUpdateFailure = useSelector(updateSupplyLogisticInfoSelector.getError);
  const isPending = isCreatePending || isUpdatePending || supplyLogisticInfoPending;
  const prevIsUpdatePending = usePrevious(isPending);

  const formId = 'generalInfo';
  const [form] = Form.useForm();
  const initialValues = useMemo(
    () => getInitialValues(supplyLogisticInfo),
    [supplyLogisticInfo],
  );
  const formik = useFormik({
    enableReinitialize: true,
    initialValues,
    validate: validate(validationSchema),
    onSubmit: values => {
      const { isCreated, ...body } = getOnlyModifiedValuesBeforeSubmit({ initialValues, values });
      return dispatch(Creators.createOrUpdateSupplyLogisticInfoRequest({ id, body, isCreated }));
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
      title={t('SUPPLY_LOGISTIC_GENERAL_INFO.TITLE')}
      errorBadgeProps={{
        title: t('PRODUCT_ACTIVATION_ERRORS'),
        errors: activationErrors,
      }}
    >
      <Form form={form} id={formId} onFinish={handleSubmit}>
        <Row gutter={[16, 16]}>
          <Col xs={24} md={8}>
            <NumberInput
              errors={errors}
              data-testid="criticalStockStore"
              name="criticalStockStore"
              label={t('SUPPLY_LOGISTIC_GENERAL_INFO.CRITICAL_AMOUNT_STORE')}
              value={values.criticalStockStore}
              onChange={value => handleInputForm('criticalStockStore', value)}
              disabled={isPending || !isFormEditable}
              min={0}
            />
          </Col>
          <Col xs={24} md={8}>
            <NumberInput
              errors={errors}
              name="minStock"
              label={t('SUPPLY_LOGISTIC_GENERAL_INFO.MIN_STOCK')}
              value={values.minStock}
              onChange={value => handleInputForm('minStock', value)}
              disabled={isPending || !isFormEditable}
              min={0}
            />
          </Col>
          <Col xs={24} md={8}>
            <NumberInput
              errors={errors}
              name="maxStock"
              label={t('SUPPLY_LOGISTIC_GENERAL_INFO.MAX_STOCK')}
              value={values.maxStock}
              onChange={value => handleInputForm('maxStock', value)}
              disabled={isPending || !isFormEditable}
              min={0}
            />
          </Col>
          <Col xs={24} md={8}>
            <NumberInput
              errors={errors}
              name="minStockDay"
              label={t('SUPPLY_LOGISTIC_GENERAL_INFO.MIN_STOCK_DAY')}
              value={values.minStockDay}
              onChange={value => handleInputForm('minStockDay', value)}
              disabled={isPending || !isFormEditable}
              min={0}
            />
          </Col>
          <Col xs={24} md={8}>
            <NumberInput
              errors={errors}
              name="maxStockDay"
              label={t('SUPPLY_LOGISTIC_GENERAL_INFO.MAX_STOCK_DAY')}
              value={values.maxStockDay}
              onChange={value => handleInputForm('maxStockDay', value)}
              disabled={isPending || !isFormEditable}
              min={0}
            />
          </Col>
          <Col xs={24} md={8}>
            <NumberInput
              errors={errors}
              name="inventoryCheckPeriod"
              label={t('SUPPLY_LOGISTIC_GENERAL_INFO.INVENTORY_CHECK_PERIOD')}
              value={values.inventoryCheckPeriod}
              onChange={value => handleInputForm('inventoryCheckPeriod', value)}
              disabled={isPending || !isFormEditable}
              min={0}
            />
          </Col>
          <Col xs={12} lg={6} xl={4}>
            <Checkbox
              name="isCriticalStockWarningEnabled"
              onChange={event => handleInputForm('isCriticalStockWarningEnabled', event.target.checked)}
              checked={values.isCriticalStockWarningEnabled}
              disabled={isPending || !isFormEditable}
            >{t('SUPPLY_LOGISTIC_GENERAL_INFO.CRITICAL_STOCK_WARNING_ENABLED')}
            </Checkbox>
          </Col>
          <Col xs={12} lg={6} xl={4}>
            <Checkbox
              name="isIncludedToGeneralInventoryCheck"
              onChange={event => handleInputForm('isIncludedToGeneralInventoryCheck', event.target.checked)}
              checked={values.isIncludedToGeneralInventoryCheck}
              disabled={isPending || !isFormEditable}
            >{t('SUPPLY_LOGISTIC_GENERAL_INFO.IS_INCLUDED_TO_GENERAL_INVENTORY')}
            </Checkbox>
          </Col>
          <Col xs={12} lg={6} xl={4}>
            <Checkbox
              name="isConsumable"
              onChange={event => handleInputForm('isConsumable', event.target.checked)}
              checked={values.isConsumable}
              disabled={isPending || !isFormEditable}
            >{t('SUPPLY_LOGISTIC_GENERAL_INFO.CONSUMABLE_PRODUCT')}
            </Checkbox>
          </Col>
          <Col xs={12} lg={6} xl={4}>
            <Checkbox
              name="isEquipment"
              onChange={event => handleInputForm('isEquipment', event.target.checked)}
              checked={values.isEquipment}
              disabled={isPending || !isFormEditable}
            >{t('SUPPLY_LOGISTIC_GENERAL_INFO.EQUIPMENT')}
            </Checkbox>
          </Col>
          <Col xs={12} lg={6} xl={4}>
            <Checkbox
              name="isKuzeydenEquipment"
              onChange={event => handleInputForm('isKuzeydenEquipment', event.target.checked)}
              checked={values.isKuzeydenEquipment}
              disabled={isPending || !isFormEditable}
            >{t('SUPPLY_LOGISTIC_GENERAL_INFO.KUZEYDENEQUIPMENT')}
            </Checkbox>
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
