import React, { useState } from 'react';
import { Col, Form, Row, Skeleton, DatePicker, Divider, Button, Popconfirm, FormInstance, FormItemProps } from 'antd';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment/moment';
import { isEmpty } from 'lodash';

import * as Yup from 'yup';

import useModuleStyle from '@shared/containers/AssetManagementModules/styles';
import { FORM_MODES, S3_UPLOAD_FOLDER_PATH } from '@app/pages/Employee/AssetManagement/constants';
import ActionButtons from '@app/pages/Employee/AssetManagement/components/ActionButtons';
import { vehicleInsuranceSelector } from '@shared/containers/AssetManagementModules/ComplianceRecord/redux/selectors';
import { Creators } from '@shared/containers/AssetManagementModules/ComplianceRecord/redux/actions';
import { IVehicleInsuranceFormProps } from './types';
import S3Upload from '@app/pages/Employee/AssetManagement/components/Upload/S3Upload';
import permKey from '@shared/shared/permKey.json';
import { usePermission } from '@shared/hooks';
import { validationSchema } from './validationSchema';

const { RangePicker } = DatePicker;

const VehicleInsuranceForm: React.FC<IVehicleInsuranceFormProps> = ({ mode, vehicleInsurance }) => {
  const { id: assetId } = useParams();
  const { t } = useTranslation(['global', 'assetManagement']);
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const { canAccess } = usePermission();
  const moduleClasses = useModuleStyle();

  const [isFormEditable, setIsFormEditable] = useState<boolean>(false);
  const isVehicleInsurancePending = useSelector(vehicleInsuranceSelector.getIsPending);

  const hasEditAccess = canAccess(permKey.PAGE_ASSET_MANAGEMENT_DETAIL_COMPONENT_EDIT_VEHICLE_ASSET);

  const yupValidator = (schema: Yup.ObjectSchema, getFieldsValue: FormInstance['getFieldsValue']) => ({
    async validator({ field }: { field: string }) {
      return schema.validateSyncAt(field, getFieldsValue());
    },
  });
  const yupSchemaObj = validationSchema(t);
  // eslint-disable-next-line no-underscore-dangle
  const _rule = yupValidator(yupSchemaObj, form.getFieldsValue) as unknown;
  const rules = [_rule] as FormItemProps['rules'];

  const initialFormValues = {
    insuranceValidityDate: (mode !== FORM_MODES.ADD && [
      moment(vehicleInsurance?.startDate), moment(vehicleInsurance?.endDate),
    ]),
    documentFileKey: vehicleInsurance?.documentFileKey,
  };

  const handleAddClick = () => {
    setIsFormEditable(true);
    form.resetFields();
  };

  const handleEditClick = () => {
    setIsFormEditable(true);
  };

  const handleCancelClick = () => {
    form.resetFields();
    setIsFormEditable(false);
  };

  const handleSaveClick = () => {
    form.submit();
  };

  const handleSubmit = (formValues: any) => {
    if (mode === FORM_MODES.ADD) {
      dispatch(Creators.createVehicleInsuranceRequest({
        vehicleInsurance: {
          asset: assetId,
          startDate: formValues?.insuranceValidityDate?.[0]?.startOf('day').toDate(),
          endDate: formValues?.insuranceValidityDate?.[1]?.endOf('day').toDate(),
          documentFileKey: formValues?.documentFileKey,
        },
        onSuccess: () => {
          setIsFormEditable(false);
          dispatch(Creators.filterVehicleInsuranceRequest({ asset: assetId }));
        },
      }));
    }

    if (mode === FORM_MODES.EDIT) {
      dispatch(Creators.updateVehicleInsuranceRequest({
        vehicleInsuranceId: vehicleInsurance?.id,
        updateData: {
          startDate: formValues?.insuranceValidityDate?.[0]?.startOf('day').toDate(),
          endDate: formValues?.insuranceValidityDate?.[1]?.endOf('day').toDate(),
          documentFileKey: formValues?.documentFileKey,
        },
        onSuccess: () => {
          setIsFormEditable(false);
          dispatch(Creators.filterVehicleInsuranceRequest({ asset: assetId }));
        },
      }));
    }
  };

  const handleDeleteClick = (vehicleInsuranceId: MongoIDType) => {
    dispatch(Creators.deleteVehicleInsuranceRequest({
      vehicleInsuranceId,
      onSuccess: () => {
        setIsFormEditable(false);
        dispatch(Creators.filterVehicleInsuranceRequest({ asset: assetId }));
      },
    }));
  };

  const renderLoading = () => {
    return <Skeleton className="mb-2" active />;
  };

  const renderFormItems = () => {
    const isAddMode = mode === FORM_MODES.ADD;
    const isEditMode = mode === FORM_MODES.EDIT;

    if (isAddMode && isVehicleInsurancePending) {
      return null;
    }

    if (isVehicleInsurancePending) {
      return renderLoading();
    }

    if ((isAddMode && isFormEditable) || isEditMode) {
      return (
        <Row gutter={[12, 0]}>
          <Col xs={24} sm={24} md={12}>
            <Form.Item
              name="insuranceValidityDate"
              label={t('assetManagement:TRAFFIC_INSURANCE_VALIDITY_DATE')}
              rules={rules}
              required
            >
              <RangePicker
                className={`${moduleClasses.inputContainer} w-100`}
                disabled={!isFormEditable}
                allowClear={false}
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={12}>
            <Form.Item
              name="documentFileKey"
              label={t('assetManagement:DOCUMENT_UPLOAD_AREA')}
              rules={rules}
              required
            >
              <S3Upload
                key="documentFileKey"
                form={form}
                className={moduleClasses.inputContainer}
                disabled={!isFormEditable}
                value={vehicleInsurance?.documentFileKey}
                folderPath={S3_UPLOAD_FOLDER_PATH.VEHICLES}
              />
            </Form.Item>
          </Col>
        </Row>
      );
    }

    return null;
  };

  const renderButtons = () => {
    const isAddMode = mode === FORM_MODES.ADD;
    const isEditMode = mode === FORM_MODES.EDIT;
    const vehicleInsuranceExists = !isEmpty(vehicleInsurance);

    if (hasEditAccess && isEditMode && !isFormEditable && vehicleInsuranceExists) {
      return (
        <Divider orientation="right" orientationMargin={0}>
          <Button
            className={`${moduleClasses.buttonBase} mr-2`}
            type="primary"
            size="middle"
            loading={isVehicleInsurancePending}
            onClick={handleEditClick}
          >
            {t('global:EDIT')}
          </Button>
          <Popconfirm title={t('global:COMMON_CONFIRM_TEXT')} onConfirm={() => handleDeleteClick(vehicleInsurance?.id)}>
            <Button
              className={moduleClasses.buttonBase}
              danger
              type="primary"
              size="middle"
              loading={isVehicleInsurancePending}
            >
              {t('global:DELETE')}
            </Button>
          </Popconfirm>
        </Divider>
      );
    }

    if ((isAddMode || (isEditMode && isFormEditable)) && hasEditAccess) {
      return (
        <Row className={isEditMode && isFormEditable ? 'mb-2' : ''}>
          <Col span={24}>
            <ActionButtons
              isFormEditable={isFormEditable}
              isPending={isVehicleInsurancePending}
              onEdit={handleAddClick}
              onCancel={handleCancelClick}
              onSave={handleSaveClick}
              editBtnText={t('global:ADD')}
            />
          </Col>
        </Row>
      );
    }

    return null;
  };

  return (
    <Form
      id="vehicleInsuranceForm"
      name="vehicleInsuranceForm"
      form={form}
      layout="vertical"
      onFinish={handleSubmit}
      initialValues={initialFormValues}
    >
      {renderFormItems()}
      {renderButtons()}
    </Form>
  );
};

export default VehicleInsuranceForm;
