import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Col,
  Form,
  Input,
  Row,
  Card,
  Skeleton,
  Popover,
  FormItemProps,
  FormInstance,
} from 'antd';
import moment from 'moment';
import { InfoCircleOutlined } from '@ant-design/icons';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import { isEmpty as _isEmpty, isEqual as _isEqual, pull as _pull } from 'lodash';

import permKey from '@shared/shared/permKey.json';
import { EMPLOYEE_BUSINESS_COUNTRY_OPTIONS } from '@app/pages/Employee/constants';
import { usePermission } from '@shared/hooks';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { employeeSelector, mainSelector, updateOrganizationInfoSelector } from '../../redux/selectors';
import SelectDepartment from '@shared/containers/Select/Department';
import SelectCountryCode from '@app/pages/Employee/components/Select/Country';
import SelectEmployee from '@shared/containers/Select/Employee';
import { getChangedFields, getFormattedOrganizationInfoRequestParams } from '../../utils';
import SelectBusinessUnit from '../../../components/Select/BusinessUnit';
import SelectPositionLevel from '../../../components/Select/PositionLevel';
import SelectBusinessPartners from '../../../components/Select/BusinessPartners';
import SelectCompany from '../../../components/Select/Company';
import EffectiveDateModal from '../EffectiveDateModal';
import { IEmployee } from '../../../types';
import useStyles from '../../styles';
import { validationSchema } from './validationSchema';
import ActionButtons from '../ActionButtons';
import { Creators } from '../../redux/actions';

const OrganizationInfoFormSection = () => {
  const { t } = useTranslation(['employeePage']);
  const classes = useStyles();
  const dispatch = useDispatch();
  const { Can, canAccess } = usePermission();
  const [form] = Form.useForm();
  const [isFormEditable, setIsFormEditable] = useState<boolean>(false);
  const [isSaveDisabled, setIsSaveDisabled] = useState<boolean>(true);
  const [isEffectiveDateModalVisible, setIsEffectiveDateModalVisible] = useState<boolean>(false);
  const [changedFields, setChangedFields] = useState<string[]>([]);
  const isEmployeeDataPending = useSelector(employeeSelector.getIsPending);
  const isPending = useSelector(updateOrganizationInfoSelector.getIsPending);
  const isFirstLoadDone = useSelector(mainSelector.getIsFirstLoadDone);
  const organizationInfoFormData = useSelector(employeeSelector.getOrganizationInfoFormData);
  const changeLogData: { [key: string]: any } = useSelector(employeeSelector.getLatestOrganizationalInfoChangeLogs);

  const hasEditAccess = canAccess(permKey.PAGE_EMPLOYEE_DETAIL_COMPONENT_EDIT_EMPLOYEE);
  const [selectedDepartments, setSelectedDepartments] = (
    useState<{ department: IEmployee['department'], subDepartments: IEmployee['subDepartments'] } | undefined>()
  );

  useEffect(() => {
    if (organizationInfoFormData && !_isEmpty(organizationInfoFormData)) {
      form.setFieldsValue(organizationInfoFormData);
      setSelectedDepartments({
        department: organizationInfoFormData.department,
        subDepartments: organizationInfoFormData.subDepartments as IEmployee['subDepartments'],
      });
      setIsFormEditable(false);
      setIsSaveDisabled(true);
    }
  }, [form, organizationInfoFormData]);

  const yupValidator = (schema: Yup.ObjectSchema, getFieldsValue: FormInstance['getFieldsValue']) => ({
    async validator({ field }: { field: string }) {
      return schema.validateSyncAt(field, getFieldsValue());
    },
  });

  const yupSchemaObj = validationSchema(t);
  // eslint-disable-next-line no-underscore-dangle
  const _rule = yupValidator(yupSchemaObj, form.getFieldsValue) as unknown;
  const rules = [_rule] as FormItemProps['rules'];

  const handleSubmit = (formValues: any, effectiveDateInformation: any): void => {
    const finalValues = formValues || form.getFieldsValue();
    dispatch(Creators.updateOrganizationInfoRequest({
      effectiveDateInformation,
      values: { ...finalValues, ...selectedDepartments },
      onSuccess: () => {
        setIsFormEditable(false);
      },
    }));
  };

  const handleEditClick = () => {
    setIsFormEditable(true);
    form.validateFields();
  };
  const handleCancelClick = () => {
    setIsFormEditable(false);
    setIsSaveDisabled(true);
    form.resetFields();
    setSelectedDepartments({
      department: organizationInfoFormData.department,
      subDepartments: organizationInfoFormData.subDepartments as IEmployee['subDepartments'],
    });
  };
  const handleSaveClick = () => {
    let hasError = false;
    const fieldErrors = form.getFieldsError();
    fieldErrors.forEach(fieldError => {
      if (fieldError.errors.length > 0) {
        hasError = true;
      }
    });
    const diffs = getChangedFields(
      organizationInfoFormData,
      { ...form.getFieldsValue(), ...selectedDepartments },
      { formatterFunc: getFormattedOrganizationInfoRequestParams },
    );
    if (diffs.includes('department') && diffs.includes('subDepartments')) {
      _pull(diffs, 'subDepartments');
    }
    if (hasError) {
      return;
    }

    if (diffs.length === 0) {
      dispatch(ToastCreators.error({
        message: t('employeePage:ORGANIZATION_INFO_SAVE_WITHOUT_CHANGE_ERROR'),
        toastOptions: { autoClose: 5_000 },
      }));
      return;
    }
    if (diffs.length === 1 && diffs[0] === 'businessCountryCodes') {
      form.submit();
      return;
    }
    if (diffs.includes('businessCountryCodes')) {
      _pull(diffs, 'businessCountryCodes');
    }

    setChangedFields(diffs);
    setIsEffectiveDateModalVisible(true);
  };

  const handleValuesChange = (_:any, formValues: any) => {
    const formattedFormValues = {
      company: formValues.company?.value,
      businessUnit: formValues.businessUnit?.value,
      lineManager: formValues.lineManager?.value,
      department: formValues.department?.department || formValues.department,
      subDepartment: formValues?.department?.subDepartments?.firstLevelSub,
      matrixManager: formValues.matrixManager?.value,
      position: formValues.positionLevel,
      jobTitle: formValues.jobTitle,
      businessCountryCodes: JSON.stringify(formValues.businessCountryCodes),
      businessPartner: formValues.businessPartner?.value,
    };

    const formattedOrganizationInfoFormData = {
      company: organizationInfoFormData.company?.value,
      businessUnit: organizationInfoFormData.businessUnit?.value,
      lineManager: organizationInfoFormData.lineManager?.value,
      department: organizationInfoFormData.department,
      subDepartment: formattedFormValues.subDepartment ? organizationInfoFormData.subDepartments?.firstLevelSub : undefined,
      matrixManager: organizationInfoFormData.matrixManager?.value,
      position: organizationInfoFormData.positionLevel,
      jobTitle: organizationInfoFormData.jobTitle,
      businessCountryCodes: JSON.stringify(organizationInfoFormData.businessCountryCodes),
      businessPartner: organizationInfoFormData.businessPartner?.value,
    };

    const hasFormValuesChanged = !_isEqual(formattedFormValues, formattedOrganizationInfoFormData);
    setIsSaveDisabled(!hasFormValuesChanged);
  };

  const formEditableProps = isFormEditable ?
    {
      hasFeedback: true,
      required: true,
      rules,
    } :
    { validateStatus: undefined, disabled: true };

  if (!isFirstLoadDone && isEmployeeDataPending) {
    return (
      <Skeleton
        paragraph={{ rows: 5 }}
        active
        loading
      />
    );
  }

  const getFormLabel = ({ field, transKey }: { field: string, transKey: string }) => {
    // @ts-ignore
    if (changeLogData[field] && field === 'department') {
      return (
        <Popover content={(
          <>
            <p>{t('employeePage:EFFECTIVE_DATE')} ({t('employeePage:DEPARTMENT')}): {moment(changeLogData.department.effectiveDate).format('YYYY-MM-DD')}</p>
            {
              changeLogData['subDepartments.firstLevelSub'] && (
                <p>
                  {t('employeePage:EFFECTIVE_DATE')}&nbsp;
                  ({t('employeePage:SUB_DEPARTMENT')}):&nbsp;
                  {moment(changeLogData['subDepartments.firstLevelSub'].effectiveDate).format('YYYY-MM-DD')}
                </p>
              )
            }
          </>
        )}
        >
          {t(transKey)}&nbsp;&nbsp;<InfoCircleOutlined />
        </Popover>
      );
    }

    if (changeLogData[field]) {
      return (
        <Popover content={(
          <>
            <p>{t('employeePage:EFFECTIVE_DATE')}: {moment(changeLogData[field].effectiveDate).format('YYYY-MM-DD')}</p>
            {
              changeLogData[field].reason && (
                <p>{t('global:REASON')}: {t(`EMPLOYEE_CHANGE_LOG_REASONS.${changeLogData[field].reason}`)}</p>
              )
            }
          </>
        )}
        >
          {t(transKey)}&nbsp;&nbsp;<InfoCircleOutlined />
        </Popover>
      );
    }

    return t(`${transKey}`);
  };

  return (
    <>
      <Form
        form={form}
        name="employeeDetailOrganizationInfoForm"
        id="employeeDetailOrganizationInfoForm"
        layout="vertical"
        initialValues={organizationInfoFormData}
        // @ts-ignore
        onFinish={handleSubmit}
        onValuesChange={handleValuesChange}
      >
        <Card
          bordered
          className={classes.cardContainer}
          title={t('employeePage:ORGANIZATION_INFORMATION')}
          actions={hasEditAccess ? [
            <ActionButtons
              isFormEditable={isFormEditable}
              isPending={isPending}
              onEdit={handleEditClick}
              onCancel={handleCancelClick}
              onSave={handleSaveClick}
              isSaveDisabled={isSaveDisabled}
            />,
          ] : undefined}
        >
          <Row gutter={[16, 16]}>
            <Col sm={12} xs={24}>
              <Form.Item
                {...formEditableProps}
                name={['company']}
                label={getFormLabel({ field: 'company', transKey: 'employeePage:COMPANY' })}
              >
                {/* the Form.Item passes the onChange
                // @ts-ignore */}
                <SelectCompany
                  labelInValue
                  disabled={!isFormEditable}
                  className={classes.inputContainer}
                />
              </Form.Item>
            </Col>
            <Col sm={12} xs={24}>
              <Form.Item
                {...formEditableProps}
                name={['businessUnit']}
                label={getFormLabel({ field: 'businessUnit', transKey: 'employeePage:BUSINESS_UNIT' })}
              >
                {/* the Form.Item passes the onChange
                // @ts-ignore */}
                <SelectBusinessUnit
                  labelInValue
                  disabled={!isFormEditable}
                  placeholder={t('employeePage:BUSINESS_UNIT')}
                  className={classes.inputContainer}
                />
              </Form.Item>
            </Col>
            <Col sm={12} xs={24}>
              <Form.Item
                {...formEditableProps}
                name={['department']}
                label={getFormLabel({ field: 'department', transKey: 'employeePage:DEPARTMENT' })}
                getValueProps={() => selectedDepartments as any}
              >
                <SelectDepartment
                  isReturnParsedValue
                  isFetchOptionsOnLoad
                  value={selectedDepartments}
                  minSelectedLevel={2}
                  allowClear={false}
                  disabled={!isFormEditable}
                  onChange={(parsedDepartment: any) => {
                    setSelectedDepartments(parsedDepartment);
                    form.setFieldsValue({
                      department: parsedDepartment?.department,
                      subDepartments: parsedDepartment.subDepartments,
                    });
                  }}
                  placeholder={t('employeePage:DEPARTMENT')}
                  className={classes.inputContainer}
                />
              </Form.Item>
            </Col>
            <Col sm={12} xs={24}>
              <Form.Item
                {...formEditableProps}
                name={['jobTitle']}
                label={getFormLabel({ field: 'jobTitle', transKey: 'employeePage:POSITION' })}
              >
                <Input disabled={!isFormEditable} placeholder={t('employeePage:POSITION')} className={classes.inputContainer} />
              </Form.Item>
            </Col>
            <Col sm={12} xs={24}>
              <Form.Item
                {...formEditableProps}
                name={['positionLevel']}
                label={getFormLabel({ field: 'positionLevel', transKey: 'employeePage:POSITION_LEVEL' })}
              >
                {/* the Form.Item passes the onChange
                // @ts-ignore */}
                <SelectPositionLevel disabled={!isFormEditable} className={classes.inputContainer} />
              </Form.Item>
            </Col>
            <Col sm={12} xs={24}>
              <Form.Item
                {...formEditableProps}
                name={['businessCountryCodes']}
                label={t('employeePage:BUSINESS_COUNTRY')}
              >
                {/* the Form.Item passes the onChange
                // @ts-ignore */}
                <SelectCountryCode
                  mode="multiple"
                  showTurkeyFirst
                  countries={EMPLOYEE_BUSINESS_COUNTRY_OPTIONS}
                  disabled={!isFormEditable}
                  className={classes.inputContainer}
                />
              </Form.Item>
            </Col>
            <Col sm={12} xs={24}>
              <Form.Item
                {...formEditableProps}
                name={['lineManager']}
                label={getFormLabel({ field: 'lineManager', transKey: 'employeePage:LINE_MANAGER' })}
              >
                <SelectEmployee
                  labelInValue
                  isFetchOptionsOnLoad
                  disabled={!isFormEditable}
                  allowClear={false}
                  placeholder={t('employeePage:LINE_MANAGER')}
                  className={classes.inputContainer}
                  showDefaultOptions
                />
              </Form.Item>
            </Col>
            {
              !isFormEditable && !isPending && !isEmployeeDataPending && (
                <Col sm={12} xs={24}>
                  <Form.Item
                    {...formEditableProps}
                    name={['secondManager', 'label']}
                    label={t('employeePage:SECOND_MANAGER')}
                  >
                    <Input disabled className={classes.inputContainer} />
                  </Form.Item>
                </Col>
              )
            }
            <Col sm={12} xs={24}>
              <Form.Item
                {...formEditableProps}
                required={false}
                name={['matrixManager']}
                label={getFormLabel({ field: 'matrixManager', transKey: 'employeePage:MATRIX_MANAGER' })}
              >
                <SelectEmployee
                  allowClear
                  labelInValue
                  disabled={!isFormEditable}
                  placeholder={t('employeePage:MATRIX_MANAGER')}
                  className={classes.inputContainer}
                  showDefaultOptions
                />
              </Form.Item>
            </Col>
            <Can permKey={permKey.PAGE_EMPLOYEE_DETAIL_COMPONENT_BP_EDIT}>
              <Col sm={12} xs={24}>
                <Form.Item
                  {...formEditableProps}
                  name={['businessPartner']}
                  required={false}
                  label={getFormLabel({
                    field: 'businessPartner',
                    transKey: 'employeePage:BUSINESS_PARTNER',
                  })}
                >
                  <SelectBusinessPartners
                    allowClear
                    labelInValue
                    disabled={!isFormEditable}
                    placeholder={t('employeePage:BUSINESS_PARTNER')}
                    // showDefaultOptions
                    className={classes.inputContainer}
                  />
                </Form.Item>
              </Col>
            </Can>
          </Row>
        </Card>
      </Form>
      <EffectiveDateModal
        destroyOnClose
        isVisible={isEffectiveDateModalVisible}
        changedFields={changedFields}
        onSave={changeInfo => {
          setIsEffectiveDateModalVisible(false);
          handleSubmit(null, changeInfo);
        }}
        onCancel={() => {
          setIsEffectiveDateModalVisible(false);
          handleCancelClick();
        }}
      />
    </>
  );
};

export default OrganizationInfoFormSection;
