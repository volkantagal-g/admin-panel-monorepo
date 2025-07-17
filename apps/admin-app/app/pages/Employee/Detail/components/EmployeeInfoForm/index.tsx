import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  Col,
  InputNumber,
  Form,
  Input,
  Row,
  Card,
  Skeleton,
  FormItemProps,
  FormInstance,
} from 'antd';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import { isEmpty as _isEmpty, isEqual as _isEqual } from 'lodash';

import { usePermission } from '@shared/hooks';
import permKey from '@shared/shared/permKey.json';
import { employeeSelector, mainSelector, updateEmployeeInfoSelector } from '../../redux/selectors';
import { EMPLOYEE_PAYROLL_COUNTRY_OPTIONS, PAYROLL_STATUSES } from '@app/pages/Employee/constants';
import useDebouncedCallback from '@shared/hooks/useDebouncedCallback';
import { DEFAULT_DEBOUNCE_MS } from '@shared/shared/constants';
import { isValidEmail } from '@shared/utils/validation';
import SelectCountryDialingCode from '../../../components/Select/CountryDialingCode';
import SelectCountryCode from '../../../components/Select/Country';
import SelectPayrollStatus from '../../../components/Select/PayrollStatus';
import useStyles from '../../styles';
import { validationSchema } from './validationSchema';
import ActionButtons from '../ActionButtons';
import { Creators } from '../../redux/actions';

const PersonalInfoFormSection = () => {
  const { t } = useTranslation(['employeePage']);
  const classes = useStyles();
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const { id: employeeId } = useParams();
  const { canAccess } = usePermission();
  const [isFormEditable, setIsFormEditable] = useState<boolean>(false);
  const [isSaveDisabled, setIsSaveDisabled] = useState<boolean>(true);
  const [isBEValidationPending, setIsBEValidationPending] = useState<boolean>(false);
  const [selectedWorkGSMDialCode, setSelectedWorkGSMDialCode] = useState<string | undefined>(undefined);
  const isEmployeeDataPending = useSelector(employeeSelector.getIsPending);
  const isPending = useSelector(updateEmployeeInfoSelector.getIsPending);
  const isFirstLoadDone = useSelector(mainSelector.getIsFirstLoadDone);
  const employeeInfoFormData = useSelector(employeeSelector.getEmployeeInfoFormData);
  const contactInfoFormData = useSelector(employeeSelector.getContactInfoFormData);
  const hasEditAccess = canAccess(permKey.PAGE_EMPLOYEE_DETAIL_COMPONENT_EDIT_EMPLOYEE);

  useEffect(() => {
    if (employeeInfoFormData && !_isEmpty(employeeInfoFormData)) {
      form.setFieldsValue(employeeInfoFormData);
      setSelectedWorkGSMDialCode(employeeInfoFormData.workGSMDialCode);
      setIsFormEditable(false);
      setIsSaveDisabled(true);
    }
  }, [form, employeeInfoFormData]);

  const workEmailIsUSedBeforeCheck = useCallback(({
    email,
    onSuccess,
    onError,
  }) => {
    setIsBEValidationPending(true);
    dispatch(Creators.checkEmailUsedStatusRequest({
      email,
      onSuccess,
      onError,
    }));
  }, [dispatch]);

  const { debouncedCallback: debouncedWorkEmailIsUSedBeforeCheck }: {
    debouncedCallback: (args: {
      email: string,
      onSuccess: (isUsed: boolean, opts: { employeeId: MongoIDType }) => void,
      onError: (error: Error) => void,
    }) => void;
  } = useDebouncedCallback({
    callback: workEmailIsUSedBeforeCheck,
    delay: DEFAULT_DEBOUNCE_MS,
  });

  const yupValidator = (schema: Yup.ObjectSchema, getFieldsValue: FormInstance['getFieldsValue']) => ({
    async validator({ field }: { field: string }) {
      return schema.validateSyncAt(field, getFieldsValue());
    },
  });

  const yupSchemaObj = validationSchema(t, { isWorkGSMRequired: !contactInfoFormData.personalGSMNumber || _isEmpty(contactInfoFormData.personalGSMNumber) });
  // eslint-disable-next-line no-underscore-dangle
  const _rule = yupValidator(yupSchemaObj, form.getFieldsValue) as unknown;
  const rules = [_rule] as FormItemProps['rules'];

  const workEmailUsedBeforeValidation = {
    async validator() {
      try {
        return new Promise((resolve, reject) => {
          const workEmail = form.getFieldValue('workEmail');
          if (!workEmail || !isValidEmail(workEmail) || (workEmail === employeeInfoFormData?.workEmail)) {
            resolve('');
          }
          else {
            debouncedWorkEmailIsUSedBeforeCheck({
              email: workEmail,
              onSuccess: (isUsed: boolean, opts: { employeeId: MongoIDType }) => {
                setIsBEValidationPending(false);
                if (isUsed && opts.employeeId !== employeeId) {
                  return reject(new Error(t('employeePage:ERROR.EMAIL_USED_BEFORE')));
                }
                return resolve('resolve');
              },
              onError: (error: Error) => {
                setIsBEValidationPending(false);
                return reject(new Error(error?.message));
              },
            });
          }
        });
      }
      catch (error: Error | any) {
        return Promise.reject(new Error(error?.message));
      }
    },
  };

  const handleSubmit = (formValues: any): void => {
    dispatch(Creators.updateEmployeeInfoRequest({
      values: formValues,
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
      form.submit();
    }
  };
  const handleValuesChange = (_: any, formValues: any) => {
    const formattedValues = { ...formValues };
    const hasFormValuesChanged = !_isEqual(formattedValues, employeeInfoFormData);
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

  return (
    <Form
      form={form}
      name="employeeDetailEmployeeInfoForm"
      id="employeeDetailEmployeeInfoForm"
      layout="vertical"
      initialValues={employeeInfoFormData}
      onFinish={handleSubmit}
      onValuesChange={handleValuesChange}
    >
      <Card
        bordered
        className={classes.cardContainer}
        title={t('employeePage:EMPLOYEE_INFORMATION')}
        actions={hasEditAccess ? [
          <ActionButtons
            isFormEditable={isFormEditable}
            isPending={isPending || isBEValidationPending}
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
              name={['workEmail']}
              label={t('employeePage:WORK_EMAIL')}
              rules={[
                // @ts-ignore
                ...(rules && rules),
                workEmailUsedBeforeValidation,
              ]}
            >
              <Input disabled={!isFormEditable} placeholder={t('employeePage:WORK_EMAIL')} className={classes.inputContainer} />
            </Form.Item>
          </Col>
          <Col sm={12} xs={24}>
            <Form.Item
              {...formEditableProps}
              required={false}
              label={t('employeePage:WORK_GSM')}
            >
              <Input.Group compact>
                <Form.Item
                  noStyle
                  name={['workGSMDialCode']}
                  rules={rules}
                >
                  {/* the Form.Item passes the onChange
                    // @ts-ignore */}
                  <SelectCountryDialingCode onChange={setSelectedWorkGSMDialCode} allowClear disabled={!isFormEditable} className={classes.dialingCodeSelect} />
                </Form.Item>
                <Form.Item
                  noStyle
                  name={['workGSMNumber']}
                  dependencies={['workGSMDialCode']}
                  normalize={(value: number) => value?.toString() || ''}
                  rules={rules}
                >
                  <InputNumber
                    disabled={!isFormEditable || !selectedWorkGSMDialCode}
                    placeholder={t('employeePage:WORK_GSM')}
                    className={classes.phoneNumberInput}
                  />
                </Form.Item>
              </Input.Group>
            </Form.Item>
          </Col>
          <Col sm={12} xs={24}>
            <Form.Item
              {...formEditableProps}
              name={['payrollCountryCode']}
              label={t('employeePage:PAYROLL_COUNTRY')}
            >
              {/* @ts-ignore */}
              <SelectCountryCode
                showTurkeyFirst
                countries={EMPLOYEE_PAYROLL_COUNTRY_OPTIONS}
                disabled={!isFormEditable}
                placeholder={t('PAYROLL_COUNTRY')}
                className={classes.inputContainer}
              />
            </Form.Item>
          </Col>
          <Col sm={12} xs={24}>
            <Form.Item
              {...formEditableProps}
              name={['officeAccessCardId']}
              label={t('employeePage:OFFICE_CARD_ID')}
              required={false}
              normalize={(value: string) => value?.toString() || ''}
            >
              <Input disabled={!isFormEditable} placeholder={t('employeePage:OFFICE_CARD_ID')} className={classes.inputContainer} />
            </Form.Item>
          </Col>
          <Col sm={12} xs={24}>
            <Form.Item
              {...formEditableProps}
              name={['payrollStatus']}
              label={t('employeePage:IN_GETIR_PAYROLL')}
            >
              <SelectPayrollStatus
                disabled={!isFormEditable}
                className={classes.inputContainer}
              />
            </Form.Item>
          </Col>
        </Row>
      </Card>
    </Form>
  );
};

export default PersonalInfoFormSection;
