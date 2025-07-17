import React, { useState } from 'react';
import { Button, Col, Divider, Form, Popconfirm, Row, Skeleton, DatePicker, FormInstance, FormItemProps } from 'antd';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { isEmpty } from 'lodash';

import * as Yup from 'yup';

import moment from 'moment';

import { vehicleCoverageSelector } from '@shared/containers/AssetManagementModules/ComplianceRecord/redux/selectors';
import { FORM_MODES, S3_UPLOAD_FOLDER_PATH } from '@app/pages/Employee/AssetManagement/constants';
import ActionButtons from '@app/pages/Employee/AssetManagement/components/ActionButtons';
import useModuleStyle from '@shared/containers/AssetManagementModules/styles';
import { IVehicleCoverageFormProps } from './types';
import { Creators } from '@shared/containers/AssetManagementModules/ComplianceRecord/redux/actions';
import S3Upload from '@app/pages/Employee/AssetManagement/components/Upload/S3Upload';
import { usePermission } from '@shared/hooks';
import permKey from '@shared/shared/permKey.json';
import { validationSchema } from './validationSchema';

const { RangePicker } = DatePicker;
const VehicleCoverageForm: React.FC<IVehicleCoverageFormProps> = ({ mode, vehicleCoverage }) => {
  const { id: assetId } = useParams();
  const { t } = useTranslation(['global', 'assetManagement']);
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const { canAccess } = usePermission();
  const moduleClasses = useModuleStyle();

  const [isFormEditable, setIsFormEditable] = useState<boolean>(false);
  const isVehicleCoveragePending = useSelector(vehicleCoverageSelector.getIsPending);

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
    coverageValidityDate: (mode !== FORM_MODES.ADD && [
      moment(vehicleCoverage?.startDate), moment(vehicleCoverage?.endDate),
    ]),
    documentFileKey: vehicleCoverage?.documentFileKey,
  };

  const handleAddClick = () => {
    setIsFormEditable(true);
    form.resetFields();
  };

  const handleDeleteClick = (vehicleCoverageId: MongoIDType) => {
    dispatch(Creators.deleteVehicleCoverageRequest({
      vehicleCoverageId,
      onSuccess: () => {
        setIsFormEditable(false);
        dispatch(Creators.filterVehicleCoverageRequest({ asset: assetId }));
      },
    }));
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
      dispatch(Creators.createVehicleCoverageRequest({
        vehicleCoverage: {
          asset: assetId,
          startDate: formValues?.coverageValidityDate?.[0]?.startOf('day').toDate(),
          endDate: formValues.coverageValidityDate?.[1]?.endOf('day').toDate(),
          documentFileKey: formValues?.documentFileKey,
        },
        onSuccess: () => {
          setIsFormEditable(false);
          dispatch(Creators.filterVehicleCoverageRequest({ asset: assetId }));
        },
      }));
    }

    if (mode === FORM_MODES.EDIT) {
      dispatch(Creators.updateVehicleCoverageRequest({
        vehicleCoverageId: vehicleCoverage.id,
        updateData: {
          startDate: formValues?.coverageValidityDate[0].startOf('day').toDate(),
          endDate: formValues?.coverageValidityDate[1].endOf('day').toDate(),
          documentFileKey: formValues?.documentFileKey,
        },
        onSuccess: () => {
          setIsFormEditable(false);
          dispatch(Creators.filterVehicleCoverageRequest({ asset: assetId }));
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

    if (isAddMode && isVehicleCoveragePending) {
      return null;
    }

    if (isVehicleCoveragePending) {
      return renderLoading();
    }

    if ((isAddMode && isFormEditable) || isEditMode) {
      return (
        <Row gutter={[12, 0]}>
          <Col xs={24} sm={24} md={12}>
            <Form.Item
              name="coverageValidityDate"
              label={t('assetManagement:VEHICLE_COVERAGE_VALIDITY_DATE')}
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
    const vehicleCoverageExists = !isEmpty(vehicleCoverage);

    if (hasEditAccess && isEditMode && !isFormEditable && vehicleCoverageExists) {
      return (
        <Divider orientation="right" orientationMargin={0}>
          <Button
            className={`${moduleClasses.buttonBase} mr-2`}
            type="primary"
            size="middle"
            loading={isVehicleCoveragePending}
            onClick={handleEditClick}
          >
            {t('global:EDIT')}
          </Button>
          <Popconfirm title={t('global:COMMON_CONFIRM_TEXT')} onConfirm={() => handleDeleteClick(vehicleCoverage?.id)}>
            <Button
              className={moduleClasses.buttonBase}
              danger
              type="primary"
              size="middle"
              loading={isVehicleCoveragePending}
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
              isPending={isVehicleCoveragePending}
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
      id="vehicleCoverageForm"
      name="vehicleCoverageForm"
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

export default VehicleCoverageForm;
