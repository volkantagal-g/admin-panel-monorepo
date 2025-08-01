import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { Card, Col, Form, FormInstance, FormItemProps, Row, Skeleton, Space } from 'antd';
import * as Yup from 'yup';

import moment from 'moment';

import {
  formatFormValuesForDetail,
  rowIndexSorter,
  extractColumnsFromAssetType,
} from '@app/pages/Employee/AssetManagement/utils';
import { getValidationSchema } from '@app/pages/Employee/AssetManagement/New/components/AssetNewForm/validationSchema';
import useModuleStyles from '@app/pages/Employee/AssetManagement/style';
import { getLangKey } from '@shared/i18n.ts';
import { DynamicAssetFormItem } from '@app/pages/Employee/AssetManagement/components';
import ActionButtons from '@app/pages/Employee/AssetManagement/components/ActionButtons';

import { assetSelector } from '../../redux/selectors';
import { Creators } from '../../redux/actions';
import { FORM_MODES } from '@app/pages/Employee/AssetManagement/constants';
import permKey from '@shared/shared/permKey.json';
import { usePermission } from '@shared/hooks';

const AssetDetailForm = () => {
  const { t } = useTranslation(['global', 'assetManagement']);
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const moduleClasses = useModuleStyles();
  const { canAccess } = usePermission();
  const assetData = useSelector(assetSelector.getData);
  const metaData = assetData?.typeData?.schema?.metaData || [];
  const isAssetDataPending = useSelector(assetSelector.getIsPending);
  const isFirstAssetLoadDone = useSelector(assetSelector.getIsFirstLoadDone);
  const { id: assetId } = useParams<{ id: string }>();

  const [isFormEditable, setIsFormEditable] = useState<boolean>(false);
  const [isSaveDisabled, setIsSaveDisabled] = useState<boolean>(true);
  const [vehicleBrand, setVehicleBrand] = useState<number>();
  const [vehicleModel, setVehicleModel] = useState<number>();
  const [assignableStatus, setAssignableStatus] = useState<number>();
  const [assignableStatusReason, setAssignableStatusReason] = useState<number>();
  const [financialLeasingCompany, setFinancialLeasingCompany] = useState<number>();
  const [registrationOwner, setRegistrationOwner] = useState<number>();
  const [financialLeasingValidationDate, setFinancialLeasingValidationDate] = useState([]);
  const [shortLongTermRentingValidationDate, setShortLongTermRentingValidationDate] = useState([]);
  const hasEditAccess = canAccess(permKey.PAGE_ASSET_MANAGEMENT_DETAIL_COMPONENT_EDIT_VEHICLE_ASSET);
  const [isCancelButtonClicked, setIsCancelButtonClicked] = useState(false);

  useEffect(() => {
    dispatch(Creators.getAssetByIdRequest({ assetId }));
    setIsFormEditable(false);
    setIsSaveDisabled(true);
  }, [dispatch, assetId]);

  useEffect(() => {
    if (assetData?.fieldValues?.financialLeasingValidationStartDate) {
      form.setFieldsValue({
        financialLeasingValidationDate: [
          moment(assetData?.fieldValues?.financialLeasingValidationStartDate),
          moment(assetData?.fieldValues?.financialLeasingValidationEndDate),
        ],
      });
    }
    else if (assetData?.fieldValues?.shortLongTermRentingValidationStartDate) {
      form.setFieldsValue({
        shortLongTermRentingValidationDate: [
          moment(assetData?.fieldValues?.shortLongTermRentingValidationStartDate),
          moment(assetData?.fieldValues?.shortLongTermRentingValidationEndDate),
        ],
      });
    }
    // we need to set the initial values for the form because backend value is not in the correct format
    // also need to check cancel button clicked to not reset the form
    // eslint-disable-next-line
  }, [isFirstAssetLoadDone, isCancelButtonClicked]);
  const externalFormStates = {
    vehicleBrand: {
      value: form.getFieldsValue().vehicleBrand,
      setValue: setVehicleBrand,
    },
    vehicleModel: {
      value: form.getFieldsValue().vehicleModel,
      setValue: setVehicleModel,
    },
    assignableStatus: {
      value: form.getFieldsValue().assignableStatus,
      setValue: setAssignableStatus,
    },
    assignableStatusReason: {
      value: form.getFieldsValue().assignableStatusReason,
      setValue: setAssignableStatusReason,
    },
    registrationOwner: {
      value: form.getFieldsValue().registrationOwner,
      setValue: setRegistrationOwner,
    },
    financialLeasingCompany: {
      value: form.getFieldsValue().financialLeasingCompany,
      setValue: setFinancialLeasingCompany,
    },
    financialLeasingValidationDate: {
      value: form.getFieldsValue().financialLeasingValidationDate,
      setValue: setFinancialLeasingValidationDate,
    },
    shortLongTermRentingValidationDate: {
      value: form.getFieldsValue().shortLongTermRentingValidationDate,
      setValue: setShortLongTermRentingValidationDate,
    },
  };

  const handleSubmit = (formValues: any) => {
    const formattedFormValues = formatFormValuesForDetail(formValues);
    dispatch(Creators.updateAssetRequest({
      assetId,
      typeData: assetData?.type,
      updateData: formattedFormValues,
      onSuccess: () => {
        dispatch(Creators.getAssetByIdRequest({ assetId }));
      },
    }));
    setIsFormEditable(false);
    setIsSaveDisabled(true);
  };

  const yupValidator = (schema: Yup.ObjectSchema, getFieldsValue: FormInstance['getFieldsValue']) => ({
    async validator({ field }: { field: string }) {
      return schema.validateSyncAt(field, getFieldsValue());
    },
  });

  const yupSchemaObj = getValidationSchema({ t, columns: extractColumnsFromAssetType(assetData?.typeData) });
  // eslint-disable-next-line no-underscore-dangle
  const _rule = yupValidator(yupSchemaObj, form.getFieldsValue) as unknown;
  const rules = [_rule] as FormItemProps['rules'];

  const renderLoading = () => {
    return (
      <Space direction="vertical" className="w-100">
        <Card className={moduleClasses.cardContainer}>
          <Skeleton active />
        </Card>

        <Card className={moduleClasses.cardContainer}>
          <Skeleton active />
        </Card>
      </Space>
    );
  };
  if (isAssetDataPending) {
    return renderLoading();
  }
  if (!isFirstAssetLoadDone) {
    return null;
  }

  const handleEditClick = () => {
    setIsFormEditable(true);
  };
  const handleCancelClick = () => {
    setIsFormEditable(false);
    setIsSaveDisabled(true);
    setIsCancelButtonClicked(true);
    form.resetFields();
  };
  const handleSaveClick = () => {
    let hasError = false;
    const fieldErrors = form.getFieldsError();
    fieldErrors.forEach(fieldError => {
      if (fieldError.errors.length > 0) {
        hasError = true;
      }
    });
    if (!hasError) {
      handleSubmit(form.getFieldsValue());
    }
  };

  return (
    <Form
      id="assetDetailForm"
      form={form}
      layout="vertical"
      scrollToFirstError
      initialValues={{
        ...assetData?.fieldValues,
        assignableStatus: assetData?.assignableStatus,
        assignableStatusReason: assetData?.assignableStatusReason,
      }}
      onFinish={handleSubmit}
      onValuesChange={(_, allValues) => {
        setIsSaveDisabled(false);
        if (allValues?.registrationOwner) {
          form?.validateFields();
        }
      }}
    >
      <Space direction="vertical" className="w-100">
        {metaData?.sort(rowIndexSorter).map((mData: AssetTypeMetaData) => (
          <Card
            bordered
            className={moduleClasses.cardContainer}
            title={mData?.groupTitle?.[getLangKey()]}
            key={mData?.groupTitle?.[getLangKey()]}
          >
            {mData.rows?.map((mDataRow: any) => (
              <Row
                gutter={[12, 0]}
                key={mDataRow.rowIndex}
              >
                {mDataRow.columns?.map((mDataCol: any) => {
                  return (mDataCol.isUIEnabled.detail && (
                    <Col
                      {...(mDataCol.spanCoefficient || {})}
                      key={mDataCol.fieldName}
                    >
                      <DynamicAssetFormItem
                        mode={FORM_MODES.EDIT}
                        key={mDataCol.fieldName}
                        form={form}
                        rules={rules}
                        itemConfig={mDataCol}
                        disabled={!isFormEditable}
                        externalFormStates={externalFormStates}
                      />
                    </Col>
                  ));
                })}
              </Row>
            ))}
          </Card>
        ))}

        {hasEditAccess && (
        <Row justify="end">
          <Col>
            <ActionButtons
              isFormEditable={isFormEditable}
              isPending={isAssetDataPending}
              onEdit={handleEditClick}
              onCancel={handleCancelClick}
              onSave={handleSaveClick}
              isSaveDisabled={isSaveDisabled}
            />
          </Col>
        </Row>
        )}
      </Space>
    </Form>
  );
};

export default AssetDetailForm;
