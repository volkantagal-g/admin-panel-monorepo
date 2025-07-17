import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Col, Form, DatePicker, Row } from 'antd';

import { getEmployeeDetailsSelector } from '../../../redux/selectors';

import { COUNTRY_IDS } from '@shared/shared/constants';
import SelectCity from '@app/pages/Employee/components/Select/City';
import SelectLocation from '@app/pages/Employee/components/Select/Location';
import SelectEmploymentType from '@app/pages/Employee/components/Select/EmploymentType';
import SelectContractType from '@app/pages/Employee/components/Select/ContractType';

import useStyles from '../../styles';

export default function CompanyInfoForm() {
  const { t } = useTranslation(['profile', 'employeePage']);
  const [form] = Form.useForm();
  const classes = useStyles();

  const companyInfoFormData = useSelector(getEmployeeDetailsSelector.getCompanyInfoData);

  useEffect(() => {
    if (form && companyInfoFormData) {
      form.setFieldsValue(companyInfoFormData);
    }
  }, [form, companyInfoFormData]);

  return (
    <Form
      form={form}
      layout="vertical"
      name="employeeDetailCompanyInfoForm"
      id="employeeDetailCompanyInfoForm"
    >
      <Row gutter={[16, 16]}>
        <Col sm={8} xs={24}>
          <Form.Item
            name={['workStartDate']}
            label={t('employeePage:WORK_START_DATE')}
          >
            <DatePicker
              disabled
              placeholder={t('employeePage:WORK_START_DATE')}
              allowClear={false}
              className={`${classes.inputContainer} w-100`}
            />
          </Form.Item>
        </Col>
        <Col sm={8} xs={24}>
          <Form.Item
            required={false}
            name={['seniorityStartDate']}
            label={t('employeePage:SENIORITY_DATE')}
          >
            <DatePicker
              disabled
              placeholder={t('employeePage:SENIORITY_DATE')}
              className={`${classes.inputContainer} w-100`}
            />
          </Form.Item>
        </Col>
        <Col sm={8} xs={24}>
          <Form.Item
            required={false}
            name={['annualLeaveCalculationStartDate']}
            label={t('employeePage:LEAVE_ENTITLEMENT')}
          >
            <DatePicker
              disabled
              placeholder={t('employeePage:LEAVE_ENTITLEMENT')}
              className={`${classes.inputContainer} w-100`}
            />
          </Form.Item>
        </Col>
        <Col sm={12} xs={24}>
          <Form.Item
            name={['mainWorkLocation']}
            label={t('employeePage:WORKING_LOCATION')}
          >
            {/* @ts-ignore */}
            <SelectLocation
              labelInValue
              disabled
              placeholder={t('employeePage:WORKING_LOCATION')}
              className={classes.inputContainer}
            />
          </Form.Item>
        </Col>
        <Col sm={12} xs={24}>
          <Form.Item
            // {...formEditableProps}
            name={['employmentType']}
            label={t('employeePage:EMPLOYMENT_TYPE')}
          >
            {/* @ts-ignore */}
            <SelectEmploymentType
              disabled
              className={classes.inputContainer}
            />
          </Form.Item>
        </Col>
        <Col sm={12} xs={24}>
          <Form.Item
            name={['contractType']}
            label={t('employeePage:CONTRACT_TYPE')}
          >
            {/* @ts-ignore */}
            <SelectContractType
              disabled
              className={classes.inputContainer}
            />
          </Form.Item>
        </Col>
        <Col sm={12} xs={24}>
          <Form.Item
            name={['sgkCity']}
            label={t('employeePage:SGK_CITY')}
          >
            {/* @ts-ignore */}
            <SelectCity
              disabled
              className={classes.inputContainer}
              country={COUNTRY_IDS.TR}
            />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
}
