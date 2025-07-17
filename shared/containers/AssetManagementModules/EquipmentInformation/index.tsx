import { Card, Col, Form, FormInstance, FormItemProps, Row, Select, Skeleton } from 'antd';
import { useTranslation } from 'react-i18next';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import * as Yup from 'yup';

import { useInjectReducer } from '@shared/utils/injectReducer';
import { useInjectSaga } from '@shared/utils/injectSaga';
import { REDUX_KEY } from '@shared/shared/constants';
import { Creators } from './redux/actions';
import useModuleStyle from '@shared/containers/AssetManagementModules/styles';
import reducer from './redux/reducer';
import saga from './redux/saga';
import { equipmentInformationSelector } from './redux/selectors';
import { convertConstantValuesToTranslatedSelectOptions } from '@app/pages/Employee/utils';
import {
  TRACKING_DEVICE_STATUSES,
  VEHICLE_EQUIPMENTS,
  VEHICLE_TIRE_TYPES,
} from '@app/pages/Employee/AssetManagement/constants';
import ActionButtons from '@app/pages/Employee/AssetManagement/components/ActionButtons';
import { validationSchema } from './validationSchema';
import permKey from '@shared/shared/permKey.json';
import { usePermission } from '@shared/hooks';

const reduxKey = REDUX_KEY.ASSET_MANAGEMENT_MODULES.EQUIPMENT_INFORMATION;

const EquipmentInformationModule = () => {
  const { id: assetId } = useParams();
  const dispatch = useDispatch();
  const { t } = useTranslation(['assetManagement']);
  const commonClasses = useModuleStyle();
  const [form] = Form.useForm();

  useInjectReducer({ key: reduxKey, reducer });
  useInjectSaga({ key: reduxKey, saga });

  const vehicleEquipments = useSelector(equipmentInformationSelector.getData);
  const isVehicleEquipmentsPending = useSelector(equipmentInformationSelector.getIsPending);
  const isFirstLoadDone = useSelector(equipmentInformationSelector.isFirstLoadDone);
  const [isFormEditable, setIsFormEditable] = React.useState<boolean>(false);
  const isEquipmentInformationExist = !!(vehicleEquipments?._id);
  const { canAccess } = usePermission();
  const hasEditAccess = canAccess(permKey.PAGE_ASSET_MANAGEMENT_DETAIL_COMPONENT_EDIT_VEHICLE_ASSET);

  useEffect(() => {
    dispatch(Creators.initContainer());
    return () => {
      dispatch(Creators.destroyContainer());
    };
  }, [dispatch]);
  useEffect(() => {
    if (assetId) {
      dispatch(Creators.filterEquipmentInformationRequest({ assetIds: [assetId] }));
    }
  }, [dispatch, assetId]);

  const initialFormValues = {
    equipments: vehicleEquipments?.equipments,
    trackingDeviceStatus: vehicleEquipments?.trackingDeviceStatus,
    tireType: vehicleEquipments?.tireType,
  };
  const tireTypeSelectOptions = convertConstantValuesToTranslatedSelectOptions(
    VEHICLE_TIRE_TYPES,
    { translationBaseKey: 'assetManagement:VEHICLE_TIRE_TYPES', isConvertToInt: true },
  );
  const trackingDeviceStatusSelectOptions = convertConstantValuesToTranslatedSelectOptions(
    TRACKING_DEVICE_STATUSES,
    { translationBaseKey: 'assetManagement:TRACKING_DEVICE_STATUS_TEXTS', isConvertToInt: true },
  );
  const equipmentSelectOptions = convertConstantValuesToTranslatedSelectOptions(
    VEHICLE_EQUIPMENTS,
    { translationBaseKey: 'assetManagement:VEHICLE_EQUIPMENTS' },
  );
  const renderLoading = () => {
    return (
      <Card className={commonClasses.cardContainer}>
        <Skeleton active />
      </Card>
    );
  };

  const handleEditClick = () => {
    form.validateFields();
    setIsFormEditable(true);
  };
  const handleCancelClick = () => {
    form.resetFields();
    setIsFormEditable(false);
  };

  const handleSubmit = async () => {
    try {
      await form.validateFields();

      const updatedData = {
        equipments: form.getFieldValue('equipments'),
        trackingDeviceStatus: form.getFieldValue('trackingDeviceStatus'),
        tireType: form.getFieldValue('tireType'),
      };
      // if equipment information is not exist, create new one
      if (!isEquipmentInformationExist) {
        dispatch(
          Creators.createEquipmentInformationRequest({
            assetId,
            data: { ...updatedData },
            onSuccess: () => {
              setIsFormEditable(false);
              dispatch(Creators.filterEquipmentInformationRequest({ assetIds: [assetId] }));
            },
          }),
        );
        return true;
      }

      dispatch(
        Creators.editEquipmentInformationRequest({
          equipmentInformationId: vehicleEquipments?._id,
          updateData: updatedData,
          onSuccess: () => {
            setIsFormEditable(false);
            dispatch(Creators.filterEquipmentInformationRequest({ assetIds: [assetId] }));
          },
        }),
      );
      return true;
    }
    catch (error) {
      return error;
    }
  };

  const yupValidator = (schema: Yup.ObjectSchema, getFieldsValue: FormInstance['getFieldsValue']) => ({
    async validator({ field }: { field: string }) {
      return schema.validateSyncAt(field, getFieldsValue());
    },
  });
  const yupSchemaObj = validationSchema(t);
  // eslint-disable-next-line no-underscore-dangle
  const _rule = yupValidator(yupSchemaObj, form.getFieldsValue) as unknown;
  const rules = [_rule] as FormItemProps['rules'];

  return (isVehicleEquipmentsPending || !isFirstLoadDone) ? renderLoading() : (
    <Card
      className={commonClasses.cardContainer}
      title={t('assetManagement:EQUIPMENT_INFORMATION')}
    >
      <Form
        id="equipmentInformationForm"
        name="vehicleCoverageForm"
        layout="vertical"
        initialValues={initialFormValues}
        form={form}
      >
        <Row gutter={[12, 12]}>
          <Col xs={24} sm={24} md={12}>
            <Form.Item
              name={['trackingDeviceStatus']}
              label={t('assetManagement:HAS_TRACKING_DEVICE_TITLE')}
              rules={rules}
              required
            >
              <Select
                className={commonClasses.inputContainer}
                options={trackingDeviceStatusSelectOptions}
                disabled={!isFormEditable}
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={12}>
            <Form.Item
              name={['tireType']}
              label={t('assetManagement:TIRE_TYPE_ON_THE_VEHICLE')}
              rules={rules}
              required
            >
              <Select
                className={commonClasses.inputContainer}
                options={tireTypeSelectOptions}
                disabled={!isFormEditable}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[12, 0]}>
          <Col xs={24} sm={24} md={12}>
            <Form.Item
              name={['equipments']}
              label={t('assetManagement:EQUIPMENTS_INSIDE_THE_VEHICLE')}
              rules={rules}
            >
              <Select
                mode="multiple"
                allowClear
                className={commonClasses.inputContainer}
                options={equipmentSelectOptions}
                disabled={!isFormEditable}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
      { hasEditAccess && (
      <ActionButtons
        isFormEditable={isFormEditable}
        isPending={isVehicleEquipmentsPending}
        onEdit={handleEditClick}
        onCancel={handleCancelClick}
        onSave={handleSubmit}
        editBtnText={t('global:EDIT')}
      />
      )}
    </Card>
  );
};

export default EquipmentInformationModule;
