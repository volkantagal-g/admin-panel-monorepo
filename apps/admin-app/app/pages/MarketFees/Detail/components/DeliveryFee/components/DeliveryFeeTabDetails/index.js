import { Col, Divider, Form, Row, Space } from 'antd';
import { useFormik } from 'formik';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { EditOutlined } from '@ant-design/icons';

import { Creators as ToastCreators } from '@shared/redux/actions/toast';

import {
  formatDeliveryFeeValuesBeforeSubmit,
  getFormattedSelectOptions,
  getInitialValues,
  validationSchema,
} from '../formHelpers';
import { deliveryFeeSourceMap } from '@shared/shared/constantValues';
import LayeredDeliveryFee from './components/LayeredDeliveryFees';
import DynamicDeliveryFee from './components/DynamicDeliveryFees';
import ZoneBasedLayeredDeliveryFee from './components/ZoneBasedLayeredDeliveryFees';
import {
  domainTypeOptions,
  formatDynamicFeeBeforeSubmit,
  formatZoneBasedFixedAmountBeforeSubmit,
  removeEmptyStringsAndNilValuesFromFeeObject,
} from '../../../../utils';
import ConfirmButton from '../../../shared/ConfirmButton';
import { Creators } from '../../../../redux/actions';
import { Creators as BulkCreators } from '@app/pages/MarketFees/BulkFeeUpload/redux/actions';
import { feeDetailsSelector } from '../../../../redux/selectors';
import { bulkFeeUploadSelector } from '@app/pages/MarketFees/BulkFeeUpload/redux/selectors';
import { Button, Select, TextInput } from '@shared/components/GUI';

const DeliveryFeeTabDetails = ({
  feeDetails = {},
  domainType,
  warehouseId,
}) => {
  const [isFormEditable, setIsFormEditable] = useState(false);
  const { dynamicDeliveryFeeLevel } =
    useSelector(feeDetailsSelector.getDynamicLevels) ?? {};
  const isFeeDetailsPending = useSelector(feeDetailsSelector.getIsPending);
  const isBulkUpdatePending = useSelector(bulkFeeUploadSelector.getIsPending);
  const isPending = !!isBulkUpdatePending || isFeeDetailsPending;
  const dispatch = useDispatch();
  const { t } = useTranslation('feeDetailsPage');

  const dynamicFeeLevel = dynamicDeliveryFeeLevel?.[domainType];

  const initialValues = useMemo(
    () => getInitialValues({
      feeDetails,
      domainType,
      dynamicDeliveryLevel: dynamicFeeLevel,
    }),
    [feeDetails, domainType, dynamicFeeLevel],
  );

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validateOnChange: true,
    validateOnBlur: true,
    validateOnMount: true,
    validate: values => {
      try {
        validationSchema(t).validateSync(values, { abortEarly: false, isOnSubmit: true });
        return {};
      }
      catch (err) {
        const errors = {};
        err.inner.forEach(error => {
          if (!errors[error.path]) {
            errors[error.path] = error.message;
          }
        });
        return errors;
      }
    },
    onSubmit: values => {
      const dynamicDeliveryFee = values.dynamicDeliveryFee
        ? formatDynamicFeeBeforeSubmit(values.dynamicDeliveryFee)
        : {};
      const zoneBasedLayeredDeliveryFee = values.zoneBasedLayeredDeliveryFee
        ? formatDynamicFeeBeforeSubmit(values.zoneBasedLayeredDeliveryFee)
        : {};
      const {
        fixedDeliveryFeeAmountZoneOne,
        fixedDeliveryFeeAmountZoneTwo,
        fixedDeliveryFeeAmountZoneThree,
      } = values;
      const zoneBasedFixedDeliveryFeeAmount = formatZoneBasedFixedAmountBeforeSubmit({
        fixedDeliveryFeeAmountZoneOne,
        fixedDeliveryFeeAmountZoneTwo,
        fixedDeliveryFeeAmountZoneThree,

      });

      const {
        deliveryFeeSource,
        fixedDeliveryFeeAmount,
        freeDeliveryOrderNumber,
        layeredDeliveryFee,
      } = values;
      const deliveryFee = formatDeliveryFeeValuesBeforeSubmit({
        deliveryFeeSource,
        fixedDeliveryFeeAmount,
        freeDeliveryOrderNumber,
        dynamicDeliveryFee,
        layeredDeliveryFee: layeredDeliveryFee || {},
        zoneBasedLayeredDeliveryFee,
        zoneBasedFixedDeliveryFeeAmount,
      });
      const modifiedDeliveryFee = removeEmptyStringsAndNilValuesFromFeeObject(deliveryFee);

      return dispatch(
        BulkCreators.marketFeesBulkUploadRequest({
          fees: {
            fees: [
              {
                domainType: values.domainType,
                warehouseId,
                deliveryFee: modifiedDeliveryFee,
              },
            ],
          },
          onSuccess: () => {
            dispatch(Creators.getFeeDetailsRequest({ warehouseId }));
          },
        }),
      );
    },
  });

  const deliverySourceOptions = getFormattedSelectOptions(deliveryFeeSourceMap);

  const [form] = Form.useForm();

  const { values, setFieldValue, setValues, errors } = formik;

  const handleCustomSubmit = () => {
    try {
      validationSchema(t).validateSync(values, {
        abortEarly: false,
        context: { isOnSubmit: true },
      });
      formik.handleSubmit();
    }
    catch (err) {
      err.inner.forEach(error => {
        dispatch(ToastCreators.error({ message: error.message, toastOptions: { autoClose: 5000 } }));
      });
    }
  };

  const {
    fixedDeliveryFeeAmount,
    dynamicDeliveryLevel,
    deliveryFeeSource,
    freeDeliveryOrderNumber,
    domainType: selectedDomainType,
    fixedDeliveryFeeAmountZoneOne,
    fixedDeliveryFeeAmountZoneTwo,
    fixedDeliveryFeeAmountZoneThree,
  } = values;

  const handleResetForm = () => {
    setIsFormEditable(false);
    setValues(initialValues);
  };

  useEffect(() => {
    form.setFieldsValue({
      fixedDeliveryFeeAmount,
      dynamicDeliveryLevel,
      deliveryFeeSource,
      freeDeliveryOrderNumber,
      domainType: selectedDomainType,
      fixedDeliveryFeeAmountZoneOne,
      fixedDeliveryFeeAmountZoneTwo,
      fixedDeliveryFeeAmountZoneThree,
    });
  }, [
    fixedDeliveryFeeAmount,
    dynamicDeliveryLevel,
    deliveryFeeSource,
    freeDeliveryOrderNumber,
    selectedDomainType,
    form,
    fixedDeliveryFeeAmountZoneOne,
    fixedDeliveryFeeAmountZoneTwo,
    fixedDeliveryFeeAmountZoneThree,
  ]);

  const zoneLabel = `${t('DELIVERY_FEE.FIXED_DELIVERY_FEE')} - ${t(
    'DELIVERY_FEE.ZONE.LABEL',
  )}`;

  return (
    <Form form={form} layout="vertical" data-testid="delivery-fee-details">
      <Row gutter={[8, 8]}>
        <Col xs={24} md={6}>
          <Form.Item
            validateStatus={(isFormEditable && errors.deliveryFeeSource) ? 'error' : ''}
            help={isFormEditable ? errors.deliveryFeeSource : undefined}
          >
            <Select
              label={t('DELIVERY_FEE.DELIVERY_FEE_SOURCE')}
              value={values.deliveryFeeSource}
              shouldMapOptionsData
              disabled={!isFormEditable}
              onChange={value => setFieldValue('deliveryFeeSource', value)}
              optionsData={deliverySourceOptions}
              selectKey="deliveryFeeSource"
            />
          </Form.Item>
        </Col>
        {!domainType && (
          <Col xs={24} md={4}>
            <Form.Item
              validateStatus={(isFormEditable && errors.domainType) ? 'error' : ''}
              help={isFormEditable ? errors.domainType : undefined}
            >
              <Select
                label={t('global:SERVICE')}
                value={values.domainType}
                shouldMapOptionsData
                disabled={!isFormEditable}
                onChange={value => setFieldValue('domainType', value)}
                optionsData={domainTypeOptions}
                selectKey="domainType"
              />
            </Form.Item>
          </Col>
        )}
        <Col xs={24} md={6}>
          <Form.Item
            validateStatus={(isFormEditable && errors.dynamicDeliveryLevel) ? 'error' : ''}
            help={isFormEditable ? errors.dynamicDeliveryLevel : undefined}
          >
            <TextInput
              onChange={({ target }) => setFieldValue('dynamicDeliveryLevel', target?.value)}
              inputKey="dynamicDeliveryLevel"
              label={t('DELIVERY_FEE.DYNAMIC_LEVEL')}
              mode="number"
              disabled
              value={dynamicDeliveryLevel}
            />
          </Form.Item>
        </Col>
        <Col xs={24} md={6}>
          <Form.Item
            validateStatus={(isFormEditable && errors.fixedDeliveryFeeAmount) ? 'error' : ''}
            help={isFormEditable ? errors.fixedDeliveryFeeAmount : undefined}
          >
            <TextInput
              onChange={({ target }) => setFieldValue('fixedDeliveryFeeAmount', target?.value)}
              label={t('DELIVERY_FEE.FIXED_DELIVERY_FEE')}
              mode="number"
              disabled={!isFormEditable}
              value={fixedDeliveryFeeAmount}
            />
          </Form.Item>
        </Col>
        <Col xs={24} md={6}>
          <Form.Item
            validateStatus={(isFormEditable && errors.freeDeliveryOrderNumber) ? 'error' : ''}
            help={isFormEditable ? errors.freeDeliveryOrderNumber : undefined}
          >
            <TextInput
              onChange={({ target }) => setFieldValue('freeDeliveryOrderNumber', target?.value)}
              label={t('DELIVERY_FEE.FREE_DELIVERY_FOR_X_ORDER')}
              mode="number"
              disabled={!isFormEditable}
              value={freeDeliveryOrderNumber}
            />
          </Form.Item>
        </Col>
        <Col xs={24} md={6}>
          <Form.Item
            validateStatus={(isFormEditable && errors.fixedDeliveryFeeAmountZoneOne) ? 'error' : ''}
            help={isFormEditable ? errors.fixedDeliveryFeeAmountZoneOne : undefined}
          >
            <TextInput
              onChange={({ target }) => setFieldValue('fixedDeliveryFeeAmountZoneOne', target?.value)}
              label={`${zoneLabel} 1`}
              mode="number"
              disabled={!isFormEditable}
              value={fixedDeliveryFeeAmountZoneOne}
            />
          </Form.Item>
        </Col>
        <Col xs={24} md={6}>
          <Form.Item
            validateStatus={(isFormEditable && errors.fixedDeliveryFeeAmountZoneTwo) ? 'error' : ''}
            help={isFormEditable ? errors.fixedDeliveryFeeAmountZoneTwo : undefined}
          >
            <TextInput
              onChange={({ target }) => setFieldValue('fixedDeliveryFeeAmountZoneTwo', target?.value)}
              label={`${zoneLabel} 2`}
              mode="number"
              disabled={!isFormEditable}
              value={fixedDeliveryFeeAmountZoneTwo}
            />
          </Form.Item>
        </Col>
        <Col xs={24} md={6}>
          <Form.Item
            validateStatus={(isFormEditable && errors.fixedDeliveryFeeAmountZoneThree) ? 'error' : ''}
            help={isFormEditable ? errors.fixedDeliveryFeeAmountZoneThree : undefined}
          >
            <TextInput
              onChange={({ target }) => setFieldValue('fixedDeliveryFeeAmountZoneThree', target?.value)}
              label={`${zoneLabel} 3`}
              mode="number"
              disabled={!isFormEditable}
              value={fixedDeliveryFeeAmountZoneThree}
              error={errors.fixedDeliveryFeeAmountZoneThree}
            />
          </Form.Item>
        </Col>
      </Row>

      <Divider />
      <Row gutter={[4, 4]}>
        <Col xs={24}>
          <LayeredDeliveryFee
            setFieldValue={setFieldValue}
            isFormEditable={isFormEditable}
            domainType={domainType}
            values={values}
            errors={errors}
          />
        </Col>
        <Divider />
        <Col xs={24}>
          <ZoneBasedLayeredDeliveryFee
            setFieldValue={setFieldValue}
            isFormEditable={isFormEditable}
            domainType={domainType}
            values={values}
            errors={errors}
          />
        </Col>
        <Divider />
        <Col xs={24}>
          <DynamicDeliveryFee
            setFieldValue={setFieldValue}
            isFormEditable={isFormEditable}
            domainType={domainType}
            values={values}
            errors={errors}
          />
        </Col>
      </Row>
      <Row justify="end">
        <Space align="end">
          {isFormEditable ? (
            <>
              <Button
                size="small"
                color="secondary"
                type="button"
                onClick={handleResetForm}
              >
                {t('CANCEL')}
              </Button>
              <ConfirmButton
                onConfirm={handleCustomSubmit}
                domainType={domainType || values.domainType}
                isLoading={isPending}
              />
            </>
          ) : (
            <Button
              size="small"
              type="primary"
              icon={<EditOutlined />}
              onClick={() => setIsFormEditable(true)}
            >
              {t('global:EDIT')}
            </Button>
          )}
        </Space>
      </Row>
    </Form>
  );
};

export default DeliveryFeeTabDetails;
