import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Button, Card, Col, Form, FormInstance, FormItemProps, Popconfirm, Row, Skeleton, Space } from 'antd';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

import useModuleStyles from '@app/pages/Employee/AssetManagement/style';
import { getLangKey } from '@shared/i18n.ts';
import { Creators } from '@app/pages/Employee/AssetManagement/New/redux/actions';
import {
  assetTypeSelector,
  createAssetSelector,
} from '@app/pages/Employee/AssetManagement/New/redux/selectors';
import { formatFormValues, rowIndexSorter, extractColumnsFromAssetType } from '@app/pages/Employee/AssetManagement/utils';
import { ASSET_TYPE_IDS } from '@app/pages/Employee/AssetManagement/constants';
import { DynamicAssetFormItem } from '@app/pages/Employee/AssetManagement/components';
import { IAssetNewFormProps } from '../../types';
import { getValidationSchema } from './validationSchema';
import { ROUTE } from '@app/routes';

const AssetNewForm = (props: IAssetNewFormProps) => {
  const { t } = useTranslation(['global', 'assetManagement']);
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const assetType = useSelector(assetTypeSelector.getData);
  const isAssetTypePending = useSelector(assetTypeSelector.getIsPending);
  const isCreateAssetPending = useSelector(createAssetSelector.getIsPending);
  const metaData = assetType?.schema?.metaData || [];
  const moduleClasses = useModuleStyles();
  const navigate = useNavigate();

  const [vehicleBrand, setVehicleBrand] = useState<number>();
  const [vehicleModel, setVehicleModel] = useState<number>();
  const [registrationOwner, setRegistrationOwner] = useState<number>();
  const [financialLeasingCompany, setFinancialLeasingCompany] = useState<number>();
  const [financialLeasingValidationDate, setFinancialLeasingValidationDate] = useState([]);
  const [shortLongTermRentingValidationDate, setShortLongTermRentingValidationDate] = useState([]);

  const externalFormStates = {
    vehicleBrand: {
      value: vehicleBrand,
      setValue: setVehicleBrand,
    },
    vehicleModel: {
      value: vehicleModel,
      setValue: setVehicleModel,
    },
    registrationOwner: {
      value: registrationOwner,
      setValue: setRegistrationOwner,
    },
    financialLeasingCompany: {
      value: financialLeasingCompany,
      setValue: setFinancialLeasingCompany,
    },
    financialLeasingValidationDate: {
      value: financialLeasingValidationDate,
      setValue: setFinancialLeasingValidationDate,
    },
    shortLongTermRentingValidationDate: {
      value: shortLongTermRentingValidationDate,
      setValue: setShortLongTermRentingValidationDate,
    },
  };

  useEffect(() => {
    dispatch(Creators.getAssetTypeByIdRequest({ assetId: ASSET_TYPE_IDS.VEHICLE }));
  }, [dispatch]);

  const handleSubmit = (formValues: any) => {
    const formattedFormValues = formatFormValues(formValues);
    dispatch(Creators.createAssetRequest({
      asset: formattedFormValues,
      onSuccess: (createdAssetId: string) => {
        navigate(ROUTE.ASSET_MANAGEMENT_DETAIL.path.replace(':id', createdAssetId));
      },
    }));

    return formattedFormValues;
  };

  const yupValidator = (schema: Yup.ObjectSchema, getFieldsValue: FormInstance['getFieldsValue']) => ({
    async validator({ field }: { field: string }) {
      return schema.validateSyncAt(field, getFieldsValue());
    },
  });

  const yupSchemaObj = getValidationSchema({ t, columns: extractColumnsFromAssetType(assetType) });
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

  if (isAssetTypePending) {
    return renderLoading();
  }

  return (
    <Form
      id="assetNewForm"
      form={form}
      layout="vertical"
      scrollToFirstError
      onFinish={handleSubmit}
      onValuesChange={(_, allValues) => {
        if (allValues?.registrationOwner) {
          form?.validateFields();
        }
      }}
    >
      <Space direction="vertical" className="w-100">
        {metaData.sort(rowIndexSorter).map((mData: AssetTypeMetaData) => (
          <Card
            bordered
            className={moduleClasses.cardContainer}
            title={mData?.groupTitle?.[getLangKey()]}
          >
            {mData.rows?.map((mDataRow: any) => (
              <Row key={mDataRow.rowIndex} gutter={[12, 0]}>
                {mDataRow.columns?.map((mDataCol: any) => {
                  return mDataCol.isUIEnabled.create && (
                    <Col key={`${mDataCol.fieldName}-col`} {...(mDataCol.spanCoefficient || {})}>
                      <DynamicAssetFormItem
                        key={`${mDataCol.fieldName}-dynamic-asset-form-item`}
                        form={form}
                        rules={rules}
                        externalFormStates={externalFormStates}
                        itemConfig={mDataCol}
                      />
                    </Col>
                  );
                })}
              </Row>
            ))}
          </Card>
        ))}

        <Row justify="end">
          <Col>
            {/* When different assets other than the vehicle type are integrated, the text on the button will be made dynamic. */}
            <Popconfirm title={t('assetManagement:CREATE_CAR_POPCONFIRM')} onConfirm={form.submit}>
              <Button
                className={moduleClasses.buttonContainer}
                type="primary"
                htmlType="submit"
                loading={isAssetTypePending || isCreateAssetPending}
              >
                {t('assetManagement:CREATE_CAR')}
              </Button>
            </Popconfirm>
          </Col>
        </Row>
      </Space>
    </Form>
  );
};

export default AssetNewForm;
