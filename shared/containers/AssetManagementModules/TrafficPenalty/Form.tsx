import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import {
  Button,
  Divider,
  Skeleton,
  Form,
  Row,
  Col,
  DatePicker,
  Popconfirm,
  FormInstance,
  FormItemProps,
} from 'antd';
import { useTranslation } from 'react-i18next';
import { isEmpty } from 'lodash';

import * as Yup from 'yup';

import type { Moment } from 'moment/moment';

import { FORM_MODES, S3_UPLOAD_FOLDER_PATH } from '@app/pages/Employee/AssetManagement/constants';
import { usePermission } from '@shared/hooks';
import permKey from '@shared/shared/permKey.json';
import { Creators } from './redux/actions';

import ActionButtons from '@app/pages/Employee/AssetManagement/components/ActionButtons';
import { IVehicleTrafficPenaltyRecord } from '@shared/containers/AssetManagementModules/types';
import useModuleStyle from '@shared/containers/AssetManagementModules/styles';
import S3Upload from '@app/pages/Employee/AssetManagement/components/Upload/S3Upload';
import { validationSchema } from './validationSchema';

const VehicleTrafficPenaltyForm = ({
  mode = FORM_MODES.EDIT,
  vehicleRecord,
  isTrafficPenaltyPending,
}: { mode: typeof FORM_MODES[keyof typeof FORM_MODES], vehicleRecord?: IVehicleTrafficPenaltyRecord, isTrafficPenaltyPending?: boolean }) => {
  const { t } = useTranslation(['assetManagement']);
  const { canAccess } = usePermission();
  const dispatch = useDispatch();
  const { id: assetId } = useParams();
  const moduleClasses = useModuleStyle();
  const [isFormEditable, setIsFormEditable] = useState<boolean>(false);
  const hasEditAccess = canAccess(permKey.PAGE_ASSET_MANAGEMENT_DETAIL_COMPONENT_EDIT_VEHICLE_ASSET);
  const [form] = Form.useForm();

  const yupValidator = (schema: Yup.ObjectSchema, getFieldsValue: FormInstance['getFieldsValue']) => ({
    async validator({ field }: { field: string }) {
      return schema.validateSyncAt(field, getFieldsValue());
    },
  });
  const yupSchemaObj = validationSchema(t);
  // eslint-disable-next-line no-underscore-dangle
  const _rule = yupValidator(yupSchemaObj, form.getFieldsValue) as unknown;
  const rules = [_rule] as FormItemProps['rules'];

  const handleSubmit = (formValues: any): void => {
    form.validateFields();
    const trafficPenaltyRecord = {
      penaltyDate: formValues?.penaltyDate?.startOf('day').toDate(),
      documentFileKey: formValues?.documentFileKey,
    };

    if (mode === FORM_MODES.ADD) {
      dispatch(Creators.createTrafficPenaltyRequest({
        trafficPenaltyRecord: {
          asset: assetId,
          ...trafficPenaltyRecord,
        },
        onSuccess: () => {
          setIsFormEditable(false);
          dispatch(Creators.filterTrafficPenaltyRequest({ assetId }));
        },
      }));
    }

    if (mode === FORM_MODES.EDIT) {
      dispatch(Creators.updateTrafficPenaltyRequest({
        trafficPenaltyRecordId: vehicleRecord?._id,
        updateData: {
          penaltyDate: formValues?.penaltyDate?.startOf('day').toDate(),
          documentFileKey: formValues?.documentFileKey,
        },
        onSuccess: () => {
          setIsFormEditable(false);
          dispatch(Creators.filterTrafficPenaltyRequest({ assetId }));
        },
      }));
    }
  };

  const handleDeleteClick = ({ trafficPenaltyId }: { trafficPenaltyId: MongoIDType }) => {
    dispatch(Creators.deleteTrafficPenaltyRequest({
      trafficPenaltyRecordId: trafficPenaltyId,
      onSuccess: () => {
        setIsFormEditable(false);
        dispatch(Creators.filterTrafficPenaltyRequest({ assetId }));
      },
    }));
  };
  const handleAddClick = () => {
    setIsFormEditable(true);
    form.resetFields();
  };
  const handleEditClick = () => {
    setIsFormEditable(true);
  };
  const handleCancelClick = () => {
    setIsFormEditable(false);
    form.resetFields();
  };
  const handleSaveClick = () => {
    form.submit();
  };

  if (!hasEditAccess && mode === FORM_MODES.ADD) {
    return null;
  }

  if (mode === FORM_MODES.EDIT && (isTrafficPenaltyPending)) {
    return (
      <Skeleton
        paragraph={{ rows: 4 }}
        active
        loading
      />
    );
  }

  const renderButtons = () => {
    const isAddMode = mode === FORM_MODES.ADD;
    const isEditMode = mode === FORM_MODES.EDIT;
    const trafficPenaltyRecordExists = !isEmpty(vehicleRecord);

    if (hasEditAccess && isEditMode && !isFormEditable && trafficPenaltyRecordExists) {
      return (
        <Divider orientation="right" orientationMargin={0}>
          <Button
            className={`${moduleClasses.buttonBase} mr-2`}
            type="primary"
            size="middle"
            loading={isTrafficPenaltyPending}
            onClick={handleEditClick}
          >
            {t('global:EDIT')}
          </Button>
          <Popconfirm title={t('global:COMMON_CONFIRM_TEXT')} onConfirm={() => handleDeleteClick({ trafficPenaltyId: vehicleRecord?._id })}>
            <Button
              className={moduleClasses.buttonBase}
              danger
              type="primary"
              size="middle"
              loading={isTrafficPenaltyPending}
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
              isPending={isTrafficPenaltyPending}
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
    <>
      { mode === FORM_MODES.ADD && !!vehicleRecord && <Divider /> }
      <Form
        form={form}
        name="vehicleTrafficPenaltyInfoForm"
        id="vehicleTrafficPenaltyInfoForm"
        layout="vertical"
        onFinish={handleSubmit}
        onValuesChange={() => {
          form.validateFields();
        }}
        initialValues={{
          penaltyDate: vehicleRecord?.penaltyDate
            ? moment(vehicleRecord.penaltyDate)
            : undefined,
          documentFileKey: vehicleRecord?.documentFileKey,
        }}
      >
        {
          ((mode === FORM_MODES.ADD && isFormEditable) || mode === FORM_MODES.EDIT) && (
            <Row gutter={[12, 12]}>
              <Col xs={24} sm={24} md={12}>
                <Form.Item
                  name="penaltyDate"
                  label={t('assetManagement:TRAFFIC_PENALTY_DATE')}
                  rules={rules}
                  required
                >
                  <DatePicker
                    disabled={!isFormEditable}
                    className={`${moduleClasses.inputContainer} w-100`}
                    disabledDate={(current: Moment) => current && current > moment().endOf('day')}
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
                    className={moduleClasses.inputContainer}
                    form={form}
                    disabled={!isFormEditable}
                    folderPath={S3_UPLOAD_FOLDER_PATH.VEHICLES}
                  />
                </Form.Item>
              </Col>
            </Row>
          )
        }
      </Form>
      {renderButtons()}
    </>
  );
};

export default VehicleTrafficPenaltyForm;
