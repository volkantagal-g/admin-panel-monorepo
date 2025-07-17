import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Col, Form, Input, Row } from 'antd';

import { getEmployeeDetailsSelector } from '../../../redux/selectors';

import { IEmployee } from '@app/pages/Employee/types';
import SelectCountry from '@app/pages/Employee/components/Select/Country';
import SelectCompany from '@app/pages/Employee/components/Select/Company';
import SelectBusinessUnit from '@app/pages/Employee/components/Select/BusinessUnit';
import SelectPositionLevel from '@app/pages/Employee/components/Select/PositionLevel';
import SelectDepartment from '@shared/containers/Select/Department';
import SelectEmployee from '@shared/containers/Select/Employee';

import useStyles from '../../styles';

export default function OrganizationInfoForm() {
  const { t } = useTranslation(['profile', 'employeePage']);
  const [form] = Form.useForm();
  const classes = useStyles();

  const [selectedDepartments, setSelectedDepartments] = (
    useState<{ department: IEmployee['department'], subDepartments: IEmployee['subDepartments'] } | undefined>()
  );

  const organizationInfoFormData = useSelector(getEmployeeDetailsSelector.getOrganizationInfoData);

  useEffect(() => {
    if (form && organizationInfoFormData) {
      form.setFieldsValue(organizationInfoFormData);
      setSelectedDepartments({
        department: organizationInfoFormData.department,
        subDepartments: organizationInfoFormData.subDepartments as IEmployee['subDepartments'],
      });
    }
  }, [form, organizationInfoFormData]);

  return (
    <Form
      form={form}
      layout="vertical"
      name="employeeDetailOrganizationInfoForm"
      id="employeeDetailOrganizationInfoForm"
      initialValues={organizationInfoFormData}
    >
      <Row gutter={[8, 8]}>
        <Col sm={12} xs={24}>
          <Form.Item name={['company']} label={t('employeePage:COMPANY')}>
            {/* @ts-ignore */}
            <SelectCompany
              labelInValue
              disabled
              className={classes.inputContainer}
            />
          </Form.Item>
        </Col>
        <Col sm={12} xs={24}>
          <Form.Item
            name={['businessUnit']}
            label={t('employeePage:BUSINESS_UNIT')}
          >
            {/* @ts-ignore */}
            <SelectBusinessUnit
              labelInValue
              disabled
              placeholder={t('employeePage:BUSINESS_UNIT')}
              className={classes.inputContainer}
            />
          </Form.Item>
        </Col>
        <Col sm={12} xs={24}>
          <Form.Item
            name={['department']}
            label={t('employeePage:DEPARTMENT')}
            getValueProps={() => selectedDepartments as any}
          >
            {/* @ts-ignore */}
            <SelectDepartment
              isReturnParsedValue
              isFetchOptionsOnLoad
              value={selectedDepartments}
              minSelectedLevel={2}
              allowClear={false}
              disabled
              placeholder={t('employeePage:DEPARTMENT')}
              className={classes.inputContainer}
            />
          </Form.Item>
        </Col>
        <Col sm={12} xs={24}>
          <Form.Item name={['jobTitle']} label={t('employeePage:POSITION')}>
            <Input
              disabled
              placeholder={t('employeePage:POSITION')}
              className={classes.inputContainer}
            />
          </Form.Item>
        </Col>
        <Col sm={12} xs={24}>
          <Form.Item
            name={['positionLevel']}
            label={t('employeePage:POSITION_LEVEL')}
          >
            {/* @ts-ignore */}
            <SelectPositionLevel disabled className={classes.inputContainer} />
          </Form.Item>
        </Col>
        <Col sm={12} xs={24}>
          <Form.Item
            name={['businessCountryCodes']}
            label={t('employeePage:BUSINESS_COUNTRY')}
          >
            {/* @ts-ignore */}
            <SelectCountry
              mode="multiple"
              showTurkeyFirst
              disabled
              className={classes.inputContainer}
            />
          </Form.Item>
        </Col>
        <Col sm={12} xs={24}>
          <Form.Item
            name={['lineManager']}
            label={t('employeePage:LINE_MANAGER')}
          >
            <SelectEmployee
              labelInValue
              isFetchOptionsOnLoad
              disabled
              allowClear={false}
              placeholder={t('employeePage:LINE_MANAGER')}
              className={classes.inputContainer}
              showDefaultOptions
            />
          </Form.Item>
        </Col>
        <Col sm={12} xs={24}>
          <Form.Item
            name={['secondManager', 'label']}
            label={t('employeePage:SECOND_MANAGER')}
          >
            <Input disabled className={classes.inputContainer} />
          </Form.Item>
        </Col>
        <Col sm={12} xs={24}>
          <Form.Item
            required={false}
            name={['matrixManager']}
            label={t('employeePage:MATRIX_MANAGER')}
          >
            <SelectEmployee
              allowClear
              labelInValue
              disabled
              placeholder={t('employeePage:MATRIX_MANAGER')}
              className={classes.inputContainer}
              showDefaultOptions
            />
          </Form.Item>
        </Col>
        <Col sm={12} xs={24}>
          <Form.Item
            required={false}
            name={['businessPartner']}
            label={t('employeePage:BUSINESS_PARTNER')}
          >
            <SelectEmployee
              allowClear
              labelInValue
              disabled
              placeholder={t('employeePage:BUSINESS_PARTNER')}
              className={classes.inputContainer}
              showDefaultOptions
            />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
}
