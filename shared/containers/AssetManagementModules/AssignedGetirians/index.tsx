import {
  Space,
  Card,
  Form,
  Col,
  Row,
  Input,
  Divider,
  Typography,
  DatePicker,
  FormInstance,
  FormItemProps,
} from 'antd';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';

import Spinner from '@shared/components/Spinner';
import { getLangKey } from '@shared/i18n';
import { REDUX_KEY } from '@shared/shared/constants';
import { useInjectReducer } from '@shared/utils/injectReducer';
import { useInjectSaga } from '@shared/utils/injectSaga';
import { useInitAndDestroyPage, usePermission } from '@shared/hooks';
import useCommonStyles from '../styles';
import { Creators } from './redux/actions';
import reducer from './redux/reducer';
import saga from './redux/saga';
import { assigneesSelector, updateAssetHistorySelector } from './redux/selectors';
import { validationSchema } from './validationSchema';
import permKey from '@shared/shared/permKey.json';
import SelectAssignmentPeriodType from '@app/pages/Employee/AssetManagement/components/Select/AssignmentPeriodType';
import { ASSIGNMENT_PERIOD_TYPES } from '@app/pages/Employee/AssetManagement/constants';
import ActionButtons from '@app/pages/Employee/AssetManagement/components/ActionButtons';

const reduxKey = REDUX_KEY.ASSET_MANAGEMENT_MODULES.ASSIGNED_GETIRIANS;

const AssignedGetiriansModule = ({
  asset,
  shouldShowAssignmentPeriodType = false,
  shouldShowTimePickerForAssignmentStartDate = false,
}: {
  asset: MongoIDType,
  shouldShowAssignmentPeriodType: boolean,
  shouldShowTimePickerForAssignmentStartDate: boolean,
}) => {
  const commonClasses = useCommonStyles();
  const { t } = useTranslation(['assetManagement', 'employeePage']);
  const langKey = getLangKey();
  const dispatch = useDispatch();
  const { canAccess } = usePermission();

  useInjectReducer({ key: reduxKey, reducer });
  useInjectSaga({ key: reduxKey, saga });
  useInitAndDestroyPage({ dispatch, Creators });

  const assignees = useSelector(assigneesSelector.getData);
  const isAssigneesPending = useSelector(assigneesSelector.getIsPending);
  const isUpdateHistoryPending = useSelector(updateAssetHistorySelector.getIsPending);
  const hasEditAccess = canAccess(permKey.PAGE_ASSET_MANAGEMENT_DETAIL_COMPONENT_ASSIGN_ASSET);
  const [isFormEditable, setIsFormEditable] = useState<boolean>(false);
  const [assignmentPeriodType, setAssignmentPeriodType] = useState<{ [key: string]: number }>();

  useEffect(() => {
    dispatch(Creators.getAssigneesRequest({ asset }));
  }, [asset, dispatch]);

  useEffect(() => {
    assignees?.forEach((assignee: any) => {
      setAssignmentPeriodType(prev => ({ ...prev, [assignee._id]: assignee.assignmentPeriodType }));
    });
  }, [assignees]);

  const [form] = Form.useForm();

  const handleEditClick = () => {
    form.validateFields();
    setIsFormEditable(true);
  };
  const handleCancelClick = () => {
    form.resetFields();
    setIsFormEditable(false);
    assignees?.forEach((assignee: any) => {
      setAssignmentPeriodType(prev => ({ ...prev, [assignee._id]: assignee.assignmentPeriodType }));
    });
  };

  const handleSubmit = async (assigneeId: string) => {
    try {
      await form.validateFields();

      dispatch(
        Creators.updateAssetHistoryRequest({
          assetId: asset,
          historyId: assigneeId,
          updateData: {
            assignmentPeriodType: assignmentPeriodType?.[assigneeId],
            estimatedReturnDate: form.getFieldValue('estimatedReturnDate'),
          },
          onSuccess: () => {
            setIsFormEditable(false);
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

  if (isAssigneesPending) {
    return (
      <Space className="w-100" direction="vertical">
        <Card
          bordered
          className={commonClasses.cardContainer}
          title={t('assetManagement:ASSIGNED_GETIRIANS_INFORMATION')}
        >
          <Spinner />
        </Card>
      </Space>
    );
  }
  if (!isAssigneesPending && (!assignees || assignees?.length === 0)) {
    return (
      <Space className="w-100" direction="vertical">
        <Card
          bordered
          title={false}
        >
          <Typography.Text>{t('assetManagement:ASSIGNED_GETIRIANS_MODULE_NOT_ASSIGNED_WARNING')}</Typography.Text>
        </Card>
      </Space>
    );
  }

  return (
    <Space className="w-100" direction="vertical">
      {
        assignees?.map((assignee: any) => (
          <div key={assignee._id}>
            <Form
              id={`assignedGetirians_${assignee._id}`}
              name={`assignedGetirians_${assignee._id}`}
              form={form}
              layout="vertical"
              initialValues={assignee}
            >
              <Card
                bordered
                className={commonClasses.cardContainer}
                title={t('assetManagement:ASSIGNED_GETIRIANS_INFORMATION')}
              >
                <Row gutter={[16, 16]}>
                  <Col sm={12} xs={24}>
                    <Form.Item
                      name={['employee', 'fullName']}
                      label={t('employeePage:GETIRIAN')}
                    >
                      <Input disabled className={commonClasses.inputContainer} />
                    </Form.Item>
                  </Col>
                  <Col sm={12} xs={24}>
                    <Form.Item
                      name={['employee', 'workEmail']}
                      label={t('employeePage:WORK_EMAIL')}
                    >
                      <Input disabled className={commonClasses.inputContainer} />
                    </Form.Item>
                  </Col>
                  <Col sm={12} xs={24}>
                    <Form.Item
                      name={['employee', 'department', 'name', langKey]}
                      label={t('employeePage:DEPARTMENT')}
                    >
                      <Input disabled className={commonClasses.inputContainer} />
                    </Form.Item>
                  </Col>
                  <Col sm={12} xs={24}>
                    <Form.Item
                      name={['employee', 'positionLevel']}
                      label={t('employeePage:POSITION_LEVEL')}
                      getValueProps={(rawValue: string) => {
                        return rawValue ? { value: t(`employeePage:POSITION_LEVELS.${rawValue}`) } : undefined;
                      }}
                    >
                      <Input
                        disabled
                        className={commonClasses.inputContainer}
                      />
                    </Form.Item>
                  </Col>
                  <Col sm={12} xs={24}>
                    <Form.Item
                      name={['employee', 'personalGSMText']}
                      label={t('employeePage:PERSONAL_GSM')}
                    >
                      <Input disabled className={commonClasses.inputContainer} />
                    </Form.Item>
                  </Col>
                  <Col sm={12} xs={24}>
                    <Form.Item
                      name={['employee', 'residentialAddress', 'address']}
                      label={t('employeePage:ADDRESS')}
                    >
                      <Input disabled className={commonClasses.inputContainer} />
                    </Form.Item>
                  </Col>
                  <Col sm={12} xs={24}>
                    <Form.Item
                      name={['employee', 'uniqueIdentifier']}
                      label={t('employeePage:UNIQUE_IDENTIFIER')}
                    >
                      <Input disabled className={commonClasses.inputContainer} />
                    </Form.Item>
                  </Col>
                </Row>
                <br />
                <Typography.Title level={4} className={commonClasses.fwUnset}>{t('assetManagement:ASSIGN_DETAILS')}</Typography.Title>
                <Divider />
                <Row gutter={[16, 16]}>
                  <Col sm={12} xs={24}>
                    <Form.Item
                      name={['createdAt']}
                      label={t('assetManagement:ASSIGNMENT_DATE')}
                    >
                      <DatePicker
                        className={`${commonClasses.inputContainer} w-100`}
                        disabled
                      />
                    </Form.Item>
                  </Col>
                  <Col sm={12} xs={24}>
                    <Form.Item
                      name={['assignDate']}
                      label={t('assetManagement:ASSIGNMENT_START_DATE')}
                      rules={rules}
                    >
                      <DatePicker
                        showTime={shouldShowTimePickerForAssignmentStartDate}
                        format={shouldShowTimePickerForAssignmentStartDate ? 'YYYY-MM-DD HH:mm' : 'YYYY-MM-DD'}
                        minuteStep={15}
                        className={`${commonClasses.inputContainer} w-100`}
                        allowClear={false}
                        disabled
                      />
                    </Form.Item>
                  </Col>
                  {
                    shouldShowAssignmentPeriodType && (
                      <Col sm={12} xs={24}>
                        <Form.Item
                          name={['assignmentPeriodType']}
                          label={t('assetManagement:ASSIGNMENT_PERIOD_TYPE_TEXT')}
                          rules={rules}
                        >
                          <SelectAssignmentPeriodType
                            allowClear={false}
                            disabled={!isFormEditable}
                            placeholder={t('assetManagement:ASSIGNMENT_PERIOD_TYPE_TEXT')}
                            onChange={value => {
                              setAssignmentPeriodType(prev => ({
                                ...prev,
                                [assignee._id]: value,
                              }));
                            }}
                          />
                        </Form.Item>
                      </Col>
                    )
                  }
                  {
                    assignmentPeriodType?.[assignee._id] === ASSIGNMENT_PERIOD_TYPES.DEFINITE_TERM && (
                      <Col sm={12} xs={24}>
                        <Form.Item
                          name={['estimatedReturnDate']}
                          label={t('assetManagement:ASSIGNMENT_END_DATE')}
                          rules={rules}
                        >
                          <DatePicker
                            showTime={shouldShowTimePickerForAssignmentStartDate}
                            format={shouldShowTimePickerForAssignmentStartDate ? 'YYYY-MM-DD HH:mm' : 'YYYY-MM-DD'}
                            minuteStep={15}
                            className={`${commonClasses.inputContainer} w-100`}
                            placeholder={t('assetManagement:ASSIGNMENT_START_DATE')}
                            disabled={!isFormEditable}
                            allowClear={false}
                          />
                        </Form.Item>
                      </Col>
                    )
                  }
                  <Col sm={12} xs={24}>
                    <Form.Item
                      name={['assignNote']}
                      label={t('assetManagement:ASSIGN_NOTE')}
                    >
                      <Input disabled className={commonClasses.inputContainer} />
                    </Form.Item>
                  </Col>
                </Row>
                &nbsp;
                { hasEditAccess && (
                  <ActionButtons
                    isFormEditable={isFormEditable}
                    isPending={isAssigneesPending || isUpdateHistoryPending}
                    isEditButtonDisabled={!shouldShowAssignmentPeriodType}
                    onEdit={handleEditClick}
                    onCancel={handleCancelClick}
                    onSave={() => handleSubmit(assignee._id)}
                    editBtnText={t('global:EDIT')}
                  />
                )}
              </Card>
            </Form>
          </div>
        ))
      }
    </Space>
  );
};

export default AssignedGetiriansModule;
