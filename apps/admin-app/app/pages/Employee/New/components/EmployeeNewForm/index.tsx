import { useState } from 'react';
import {
  Col,
  Form,
  Row,
  Button,
  Card,
  FormInstance,
  FormItemProps,
  Alert,
} from 'antd';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { IEmployee } from '@app/pages/Employee/types';
import { ROUTE } from '@app/routes';
import { isEligibleForEmployment } from '@app/pages/Employee/utils';
import { DEFAULT_DATE_FORMAT } from '@shared/shared/constants';

import PersonalInfoFormSectionComponent from '../PersonalInfoFormSection';
import ContactInfoFormSectionComponent from '../ContactInfoFormSection';
import EmployeeInfoFormSectionComponent from '../EmployeeInfoFormSection';
import OrganizationInfoFormSectionComponent from '../OrganizationInfoFormSection';
import CompanyInfoFormSectionComponent from '../CompanyInfoFormSection';
import { validationSchema } from './validationSchema';
import { createEmployeeSelector } from '../../redux/selectors';
import {
  EmployeeCreateFormProps,
  FormValues,
} from '../../types';
import useStyles from '../../style';
import { Creators } from '../../redux/actions';

const EmployeeCreateForm = ({ onSubmit }: EmployeeCreateFormProps) => {
  const { t } = useTranslation(['employeePage', 'error', 'global']);
  const classes = useStyles();
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showWarning, setShowWarning] = useState(false);

  const isEmployeeCreateRequestPending = useSelector(createEmployeeSelector.getIsPending);
  // current antd version doesn't support the useWatch hook
  const [selectedDepartments, setSelectedDepartments] = (
    useState<{ department: IEmployee['department'], subDepartments: IEmployee['subDepartments'] } | undefined>()
  );

  const handleSubmit = (formValues: FormValues): void => {
    dispatch(Creators.createEmployeeRequest({
      employee: {
        ...formValues,
        department: selectedDepartments?.department,
        subDepartments: selectedDepartments?.subDepartments,
      },
      onSuccess: (employeeId: string) => {
        navigate(ROUTE.EMPLOYEE_DETAIL.path.replace(':id', employeeId));
      },
    }));
  };

  const yupValidator = (schema: Yup.ObjectSchema, getFieldsValue: FormInstance['getFieldsValue']) => ({
    async validator({ field }: { field: string }) {
      return schema.validateSyncAt(field, getFieldsValue());
    },
  });

  const handleFieldsChange = () => {
    const birthdate = form.getFieldsValue()?.birthdate?.format(DEFAULT_DATE_FORMAT);
    const workStartDate = form.getFieldsValue()?.workStartDate?.format(DEFAULT_DATE_FORMAT);

    if (birthdate && workStartDate) {
      return isEligibleForEmployment({ birthdate, workStartDate, setShowWarning });
    }
    return null;
  };

  const yupSchemaObj = validationSchema(t);
  // eslint-disable-next-line no-underscore-dangle
  const _rule = yupValidator(yupSchemaObj, form.getFieldsValue) as unknown;
  const rules = [_rule] as FormItemProps['rules'];

  return (
    <Form
      form={form}
      name="employeeCreateForm"
      id="employeeCreateForm"
      onFinish={handleSubmit}
      layout="vertical"
      scrollToFirstError
      onFieldsChange={handleFieldsChange}
    >
      {
        showWarning && (
        <Alert
          message={t('employeePage:EMPLOYEE_SHOULD_BE_GREATER_THAN_16')}
          type="warning"
          showIcon
          className={classes.warningContainer}
        />
        )
      }
      <Card
        className={classes.cardContainer}
        bordered
      >
        <PersonalInfoFormSectionComponent form={form} rules={rules} />
        <ContactInfoFormSectionComponent form={form} rules={rules} />
        <EmployeeInfoFormSectionComponent form={form} rules={rules} />
        <OrganizationInfoFormSectionComponent
          form={form}
          rules={rules}
          onDepartmentsChange={setSelectedDepartments}
          selectedDepartments={selectedDepartments}
        />
        <CompanyInfoFormSectionComponent rules={rules} />
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Form.Item style={{ textAlign: 'right' }}>
              <Button
                type="primary"
                htmlType="submit"
                loading={isEmployeeCreateRequestPending}
                disabled={isEmployeeCreateRequestPending}
              >
                {t('BUTTON_CREATE_EMPLOYEE')}
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Card>
    </Form>
  );
};

export default EmployeeCreateForm;
