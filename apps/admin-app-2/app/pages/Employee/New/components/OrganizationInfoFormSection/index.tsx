import {
  Col,
  Form,
  Input,
  Row,
  Card,
  FormItemProps,
  FormInstance,
} from 'antd';
import { useTranslation } from 'react-i18next';

import { usePermission } from '@shared/hooks';
import permKey from '@shared/shared/permKey.json';
import { EMPLOYEE_BUSINESS_COUNTRY_OPTIONS } from '@app/pages/Employee/constants';
import { IEmployee } from '../../../types';
import SelectCountryCode from '@app/pages/Employee/components/Select/Country';
import SelectDepartment from '@shared/containers/Select/Department';
import SelectEmployee from '@shared/containers/Select/Employee';
import SelectBusinessUnit from '../../../components/Select/BusinessUnit';
import SelectPositionLevel from '../../../components/Select/PositionLevel';
import SelectBusinessPartners from '../../../components/Select/BusinessPartners';
import SelectCompany from '../../../components/Select/Company';
import useStyles from '../../style';

const OrganizationInfoFormSection = ({
  rules,
  form,
  selectedDepartments,
  onDepartmentsChange,
}: {
  rules: FormItemProps['rules'],
  form: FormInstance,
  onDepartmentsChange: Function,
  selectedDepartments: { department: IEmployee['department'], subDepartments: IEmployee['subDepartments'] } | undefined,
}) => {
  const { t } = useTranslation(['employeePage']);
  const parentClasses = useStyles();

  const { Can } = usePermission();

  return (
    <Card bordered={false} title={t('employeePage:ORGANIZATION_INFORMATION')}>
      <Row gutter={[16, 16]}>
        <Col sm={12} xs={24}>
          <Form.Item
            required
            hasFeedback
            name={['company']}
            label={t('employeePage:COMPANY')}
            rules={rules}
          >
            {/* the Form.Item passes the onChange
                // @ts-ignore */}
            <SelectCompany className={parentClasses.inputContainer} />
          </Form.Item>
        </Col>
        <Col sm={12} xs={24}>
          <Form.Item
            required
            hasFeedback
            name={['businessUnit']}
            label={t('employeePage:BUSINESS_UNIT')}
            rules={rules}
          >
            {/* the Form.Item passes the onChange
                // @ts-ignore */}
            <SelectBusinessUnit
              placeholder={t('employeePage:BUSINESS_UNIT')}
              className={parentClasses.inputContainer}
            />
          </Form.Item>
        </Col>
        <Col sm={12} xs={24}>
          <Form.Item
            required
            hasFeedback
            name={['department']}
            label={t('employeePage:DEPARTMENT')}
            rules={rules}
            getValueProps={() => selectedDepartments as any}
          >
            <SelectDepartment
              isReturnParsedValue
              minSelectedLevel={2}
              allowClear={false}
              onChange={(parsedDepartment: any) => {
                onDepartmentsChange(parsedDepartment);
                form.setFieldsValue({
                  department: parsedDepartment?.department,
                  subDepartments: parsedDepartment?.subDepartments,
                });
              }}
              placeholder={t('employeePage:DEPARTMENT')}
              className={parentClasses.inputContainer}
            />
          </Form.Item>
        </Col>
        <Col sm={12} xs={24}>
          <Form.Item
            required
            hasFeedback
            name={['jobTitle']}
            label={t('employeePage:POSITION')}
            rules={rules}
          >
            <Input
              placeholder={t('employeePage:POSITION')}
              className={parentClasses.inputContainer}
            />
          </Form.Item>
        </Col>
        <Col sm={12} xs={24}>
          <Form.Item
            required
            hasFeedback
            name={['positionLevel']}
            label={t('employeePage:POSITION_LEVEL')}
            rules={rules}
          >
            {/* the Form.Item passes the onChange
                // @ts-ignore */}
            <SelectPositionLevel className={parentClasses.inputContainer} />
          </Form.Item>
        </Col>
        <Col sm={12} xs={24}>
          <Form.Item
            required
            hasFeedback
            name={['businessCountryCodes']}
            label={t('employeePage:BUSINESS_COUNTRY')}
            rules={rules}
          >
            {/* the Form.Item passes the onChange
                // @ts-ignore */}
            <SelectCountryCode
              mode="multiple"
              showTurkeyFirst
              countries={EMPLOYEE_BUSINESS_COUNTRY_OPTIONS}
              className={parentClasses.inputContainer}
            />
          </Form.Item>
        </Col>
        <Col sm={12} xs={24}>
          <Form.Item
            required
            hasFeedback
            name={['lineManager']}
            label={t('employeePage:LINE_MANAGER')}
            rules={rules}
          >
            <SelectEmployee
              allowClear={false}
              placeholder={t('employeePage:LINE_MANAGER')}
              className={parentClasses.inputContainer}
              showDefaultOptions
            />
          </Form.Item>
        </Col>
        <Col sm={12} xs={24}>
          <Form.Item
            name={['matrixManager']}
            label={t('employeePage:MATRIX_MANAGER')}
            rules={rules}
          >
            <SelectEmployee
              placeholder={t('employeePage:MATRIX_MANAGER')}
              showDefaultOptions
              className={parentClasses.inputContainer}
            />
          </Form.Item>
        </Col>
        <Can permKey={permKey.PAGE_EMPLOYEE_NEW_COMPONENT_BP_ADD}>
          <Col sm={12} xs={24}>
            <Form.Item
              name={['businessPartner']}
              label={t('employeePage:BUSINESS_PARTNER')}
              rules={rules}
            >
              <SelectBusinessPartners
                placeholder={t('employeePage:BUSINESS_PARTNER')}
                className={parentClasses.inputContainer}
              />
            </Form.Item>
          </Col>
        </Can>
      </Row>
    </Card>
  );
};

export default OrganizationInfoFormSection;
