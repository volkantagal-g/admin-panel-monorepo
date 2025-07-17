import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Col, Form, Input, InputNumber, Row } from 'antd';

import { getEmployeeDetailsSelector } from '../../../redux/selectors';

import SelectCountryDialingCode from '@app/pages/Employee/components/Select/CountryDialingCode';
import SelectCountry from '@app/pages/Employee/components/Select/Country';
import SelectPayrollStatus from '@app/pages/Employee/components/Select/PayrollStatus';

import useStyles from '../../styles';

export default function EmployeeInfoForm() {
  const { t } = useTranslation(['profile', 'employeePage', 'global']);
  const [form] = Form.useForm();
  const classes = useStyles();

  const employeeInfoFormData = useSelector(getEmployeeDetailsSelector.getEmployeeInfoData);

  useEffect(() => {
    if (form && employeeInfoFormData) {
      form.setFieldsValue(employeeInfoFormData);
    }
  }, [form, employeeInfoFormData]);

  return (
    <Form
      form={form}
      layout="vertical"
      name="employeeDetailEmployeeInfoForm"
      id="employeeDetailEmployeeInfoForm"
      initialValues={employeeInfoFormData}
    >
      <Row gutter={[8, 8]}>
        <Col sm={12} xs={24}>
          <Form.Item
            name={['workEmail']}
            label={t('employeePage:WORK_EMAIL')}
          >
            <Input disabled placeholder={t('employeePage:WORK_EMAIL')} className={classes.inputContainer} />
          </Form.Item>
        </Col>
        <Col sm={12} xs={24}>
          <Form.Item required={false} label={t('employeePage:WORK_GSM')}>
            <Input.Group compact>
              <Form.Item noStyle name={['workGSMDialCode']}>
                {/* @ts-ignore */}
                <SelectCountryDialingCode
                  onChange={() => {}}
                  allowClear
                  disabled
                  className={classes.dialingCodeSelect}
                />
              </Form.Item>
              <Form.Item
                noStyle
                name={['workGSMNumber']}
                dependencies={['workGSMDialCode']}
                normalize={(value: string) => value || ''}
              >
                <InputNumber
                  disabled
                  placeholder={t('employeePage:WORK_GSM')}
                  className={classes.phoneNumberInput}
                />
              </Form.Item>
            </Input.Group>
          </Form.Item>
        </Col>
        <Col sm={12} xs={24}>
          <Form.Item
            name={['payrollCountryCode']}
            label={t('employeePage:PAYROLL_COUNTRY')}
          >
            {/* @ts-ignore */}
            <SelectCountry
              showTurkeyFirst
              disabled
              placeholder={t('employeePage:PAYROLL_COUNTRY')}
              className={classes.inputContainer}
            />
          </Form.Item>
        </Col>
        <Col sm={12} xs={24}>
          <Form.Item
            name={['officeAccessCardId']}
            label={t('employeePage:OFFICE_CARD_ID')}
            required={false}
          >
            <Input
              disabled
              placeholder={t('employeePage:OFFICE_CARD_ID')}
              className={classes.inputContainer}
            />
          </Form.Item>
        </Col>
        <Col sm={12} xs={24}>
          <Form.Item
            name={['payrollStatus']}
            label={t('employeePage:IN_GETIR_PAYROLL')}
          >
            <SelectPayrollStatus
              className={classes.inputContainer}
              disabled
            />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
}
