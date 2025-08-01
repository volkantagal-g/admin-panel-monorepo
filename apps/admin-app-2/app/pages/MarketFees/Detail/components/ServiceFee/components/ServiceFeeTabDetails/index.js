import { Col, Divider, Form, Row, Space as AntSpace } from 'antd';
import { useFormik } from 'formik';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { EditOutlined } from '@ant-design/icons';

import { Creators as ToastCreators } from '@shared/redux/actions/toast';

import {
  formatServiceFeeValuesBeforeSubmit,
  getFormattedSelectOptions,
  getInitialValues,
  validationSchema,
} from '../formHelpers';
import { domainTypeOptions, formatDynamicFeeBeforeSubmit, removeEmptyStringsAndNilValuesFromFeeObject } from '../../../../utils';

import { serviceFeeSourceMap } from '@shared/shared/constantValues';
import LayeredServiceFee from './components/LayeredServiceFees';
import DynamicServiceFee from './components/DynamicServiceFees';
import ConfirmButton from '../../../shared/ConfirmButton';
import { Creators } from '../../../../redux/actions';
import { feeDetailsSelector } from '../../../../redux/selectors';
import { bulkFeeUploadSelector } from '@app/pages/MarketFees/BulkFeeUpload/redux/selectors';
import { Creators as BulkCreators } from '@app/pages/MarketFees/BulkFeeUpload/redux/actions';
import { Button, Select, TextInput } from '@shared/components/GUI';

const ServiceFeeTabDetails = ({ feeDetails = {}, domainType, warehouseId }) => {
  const [isFormEditable, setIsFormEditable] = useState(false);
  const { dynamicServiceFeeLevel } = useSelector(feeDetailsSelector.getDynamicLevels) ?? {};
  const isFeeDetailsPending = useSelector(feeDetailsSelector.getIsPending);
  const isBulkUpdatePending = useSelector(bulkFeeUploadSelector.getIsPending);
  const isPending = !!isBulkUpdatePending || isFeeDetailsPending;
  const dispatch = useDispatch();
  const { t } = useTranslation('feeDetailsPage');

  const dynamicFeeLevel = dynamicServiceFeeLevel?.[domainType];

  const initialValues = useMemo(
    () => getInitialValues({
      feeDetails,
      domainType,
      dynamicServiceLevel: dynamicFeeLevel,
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
      const dynamicServiceFee = values.dynamicServiceFee ? formatDynamicFeeBeforeSubmit(values.dynamicServiceFee) : null;
      const {
        serviceFeeSource,
        fixedServiceFeeAmount,
        layeredServiceFee,
      } = values;
      const serviceFee = formatServiceFeeValuesBeforeSubmit({
        serviceFeeSource,
        fixedServiceFeeAmount,
        dynamicServiceFee,
        layeredServiceFee: layeredServiceFee || {},
      });

      const modifiedServiceFee = removeEmptyStringsAndNilValuesFromFeeObject(serviceFee, 'service');

      return dispatch(
        BulkCreators.marketFeesBulkUploadRequest({
          fees: {
            fees: [{
              domainType: values.domainType,
              warehouseId,
              serviceFee: modifiedServiceFee,
            }],
          },
          onSuccess: () => {
            dispatch(Creators.getFeeDetailsRequest({ warehouseId }));
          },
        }),
      );
    },
  });

  const serviceSourceOptions = getFormattedSelectOptions(serviceFeeSourceMap);

  const [form] = Form.useForm();

  const { values, setFieldValue, setValues, errors } =
    formik;

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
    fixedServiceFeeAmount,
    dynamicServiceLevel,
    serviceFeeSource,
    domainType: selectedDomainType,
  } = values;

  const handleResetForm = () => {
    setValues(initialValues);
    setIsFormEditable(false);
  };

  useEffect(() => {
    form.setFieldsValue({
      fixedServiceFeeAmount,
      dynamicServiceLevel,
      serviceFeeSource,
      domainType: selectedDomainType,
    });
  }, [
    fixedServiceFeeAmount,
    dynamicServiceLevel,
    serviceFeeSource,
    selectedDomainType,
    form,
  ]);

  return (
    <Form form={form} layout="vertical" data-testid="service-fee-details">
      <Row gutter={[8, 8]}>
        <Col xs={24} md={4}>
          <Form.Item
            validateStatus={(isFormEditable && errors.serviceFeeSource) ? 'error' : ''}
            help={isFormEditable ? errors.serviceFeeSource : undefined}
          >
            <Select
              label={t('SERVICE_FEE.SERVICE_FEE_SOURCE')}
              value={values.serviceFeeSource}
              shouldMapOptionsData
              disabled={!isFormEditable}
              onChange={value => setFieldValue('serviceFeeSource', value)}
              optionsData={serviceSourceOptions}
              selectKey="serviceFeeSource"
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
        <Col xs={24} md={4}>
          <Form.Item
            validateStatus={(isFormEditable && errors.dynamicServiceLevel) ? 'error' : ''}
            help={isFormEditable ? errors.dynamicServiceLevel : undefined}
          >
            <TextInput
              onChange={({ target }) => setFieldValue('dynamicServiceLevel', target?.value)}
              inputKey="dynamicServiceLevel"
              label={t('SERVICE_FEE.DYNAMIC_LEVEL')}
              mode="number"
              disabled
              value={values.dynamicServiceLevel}
            />
          </Form.Item>
        </Col>
        <Col xs={24} md={4}>
          <Form.Item
            validateStatus={(isFormEditable && errors.fixedServiceFeeAmount) ? 'error' : ''}
            help={isFormEditable ? errors.fixedServiceFeeAmount : undefined}
          >
            <TextInput
              onChange={({ target }) => setFieldValue('fixedServiceFeeAmount', target?.value)}
              inputKey="fixedServiceFeeAmount"
              label={t('SERVICE_FEE.FIXED_SERVICE_FEE')}
              mode="number"
              disabled={!isFormEditable}
              value={values.fixedServiceFeeAmount}
            />
          </Form.Item>
        </Col>
      </Row>
      <Divider />
      <Row gutter={[8, 8]}>
        <Col xs={24}>
          <LayeredServiceFee
            isFormEditable={isFormEditable}
            domainType={domainType}
            values={values}
            setFieldValue={setFieldValue}
            errors={errors}
          />
        </Col>
        <Divider />
        <Col xs={24}>
          <DynamicServiceFee
            isFormEditable={isFormEditable}
            domainType={domainType}
            values={values}
            setFieldValue={setFieldValue}
            errors={errors}
          />
        </Col>
      </Row>
      <Row justify="end">
        <AntSpace align="end">
          {isFormEditable ? (
            <>
              <Button color="secondary" onClick={handleResetForm} size="small">
                {t('global:CANCEL')}
              </Button>
              <ConfirmButton isLoading={isPending} onConfirm={handleCustomSubmit} domainType={domainType || values.domainType} />,
            </>
          ) : (
            <Button size="small" type="primary" icon={<EditOutlined />} onClick={() => setIsFormEditable(true)}>{t('global:EDIT')}</Button>
          )}
        </AntSpace>
      </Row>
    </Form>
  );
};

export default ServiceFeeTabDetails;
