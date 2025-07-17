import React, { useState } from 'react';
import { isEmpty } from 'lodash';
import { useTranslation } from 'react-i18next';
import { Form, DatePicker, Row, Col, Button, Divider, Popconfirm, Skeleton, FormInstance, FormItemProps } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import * as Yup from 'yup';

import moment from 'moment';

import { FORM_MODES, S3_UPLOAD_FOLDER_PATH } from '@app/pages/Employee/AssetManagement/constants';
import { IVehicleInspectionFormProps } from '@shared/containers/AssetManagementModules/ComplianceRecord/components/VehicleInspectionForm/types';
import { Creators } from '@shared/containers/AssetManagementModules/ComplianceRecord/redux/actions';
import useModuleStyle from '@shared/containers/AssetManagementModules/styles';
import ActionButtons from '@app/pages/Employee/AssetManagement/components/ActionButtons';
import { vehicleInspectionSelector } from '@shared/containers/AssetManagementModules/ComplianceRecord/redux/selectors';
import S3Upload from '@app/pages/Employee/AssetManagement/components/Upload/S3Upload';
import permKey from '@shared/shared/permKey.json';
import { usePermission } from '@shared/hooks';
import { validationSchema } from './validationSchema';

const { RangePicker } = DatePicker;

const VehicleInspectionForm: React.FC<IVehicleInspectionFormProps> = ({ mode, vehicleInspection }: IVehicleInspectionFormProps) => {
  const { id: assetId } = useParams();
  const { t } = useTranslation(['global', 'assetManagement']);
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const { canAccess } = usePermission();
  const moduleClasses = useModuleStyle();

  const [isFormEditable, setIsFormEditable] = useState<boolean>(false);
  const isVehicleInspectionPending = useSelector(vehicleInspectionSelector.getIsPending);

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
    inspectionValidityDate: (mode !== FORM_MODES.ADD && [
      moment(vehicleInspection?.startDate), moment(vehicleInspection?.endDate),
    ]),
    documentFileKey: vehicleInspection?.documentFileKey,
  };

  const handleAddClick = () => {
    setIsFormEditable(true);
    form.resetFields();
  };

  const handleDeleteClick = (vehicleInspectionId: MongoIDType) => {
    dispatch(Creators.deleteVehicleInspectionRequest({
      vehicleInspectionId,
      onSuccess: () => {
        setIsFormEditable(false);
        dispatch(Creators.filterVehicleInspectionRequest({ asset: assetId }));
      },
    }));
  };

  const handleEditClick = () => {
    setIsFormEditable(true);
  };

  const handleSaveClick = () => {
    form.submit();
  };

  const handleCancelClick = () => {
    form.resetFields();
    setIsFormEditable(false);
  };

  const handleSubmit = (formValues: any) => {
    if (mode === FORM_MODES.ADD) {
      dispatch(Creators.createVehicleInspectionRequest({
        vehicleInspection: {
          asset: assetId,
          startDate: formValues?.inspectionValidityDate?.[0]?.startOf('day').toDate(),
          endDate: formValues.inspectionValidityDate?.[1]?.endOf('day').toDate(),
          documentFileKey: formValues?.documentFileKey,
        },
        onSuccess: () => {
          setIsFormEditable(false);
          dispatch(Creators.filterVehicleInspectionRequest({ asset: assetId }));
        },
      }));
    }

    if (mode === FORM_MODES.EDIT) {
      dispatch(Creators.updateVehicleInspectionRequest({
        vehicleInspectionId: vehicleInspection.id,
        updateData: {
          startDate: formValues?.inspectionValidityDate[0].startOf('day').toDate(),
          endDate: formValues?.inspectionValidityDate[1].endOf('day').toDate(),
          documentFileKey: formValues?.documentFileKey,
        },
        onSuccess: () => {
          setIsFormEditable(false);
          dispatch(Creators.filterVehicleInspectionRequest({ asset: assetId }));
        },
      }));
    }
  };

  const renderLoading = () => {
    return <Skeleton className="mb-2" active />;
  };

  const renderFormItems = () => {
    const isAddMode = mode === FORM_MODES.ADD;
    const isEditMode = mode === FORM_MODES.EDIT;

    if (isAddMode && isVehicleInspectionPending) {
      return null;
    }

    if (isVehicleInspectionPending) {
      return renderLoading();
    }

    if ((isAddMode && isFormEditable) || isEditMode) {
      return (
        <Row gutter={[12, 0]}>
          <Col xs={24} sm={24} md={12}>
            <Form.Item
              name="inspectionValidityDate"
              label={t('assetManagement:VEHICLE_INSPECTION_VALIDITY_DATE')}
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
    const vehicleInspectionExists = !isEmpty(vehicleInspection);

    if (hasEditAccess && isEditMode && !isFormEditable && vehicleInspectionExists) {
      return (
        <Divider orientation="right" orientationMargin={0}>
          <Button
            className={`${moduleClasses.buttonBase} mr-2`}
            type="primary"
            size="middle"
            loading={isVehicleInspectionPending}
            onClick={handleEditClick}
          >
            {t('global:EDIT')}
          </Button>
          <Popconfirm title={t('global:COMMON_CONFIRM_TEXT')} onConfirm={() => handleDeleteClick(vehicleInspection.id)}>
            <Button
              className={moduleClasses.buttonBase}
              danger
              type="primary"
              size="middle"
              loading={isVehicleInspectionPending}
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
              isPending={isVehicleInspectionPending}
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
      id="vehicleInspectionForm"
      name="vehicleInspectionForm"
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

export default VehicleInspectionForm;
