import {
  Col,
  Form,
  Row,
  Card,
  DatePicker,
  FormItemProps,
} from 'antd';
import { useTranslation } from 'react-i18next';

import { COUNTRY_IDS } from '@shared/shared/constants';
import SelectContractType from '../../../components/Select/ContractType';
import SelectEmploymentType from '../../../components/Select/EmploymentType';
import SelectLocation from '../../../components/Select/Location';
import SelectCity from '../../../components/Select/City';
import useStyles from '../../style';

const CompanyInfoFormSection = ({ rules }: { rules: FormItemProps['rules'] }) => {
  const { t } = useTranslation(['employeePage']);
  const parentClasses = useStyles();

  return (
    <Card
      bordered={false}
      title={t('employeePage:COMPANY_INFORMATION')}
    >
      <Row gutter={[16, 16]}>
        <Col sm={8} xs={24}>
          <Form.Item
            required
            hasFeedback
            name={['workStartDate']}
            label={t('employeePage:WORK_START_DATE')}
            rules={rules}
          >
            <DatePicker placeholder={t('employeePage:WORK_START_DATE')} allowClear={false} className={`${parentClasses.inputContainer} w-100`} />
          </Form.Item>
        </Col>
        <Col sm={8} xs={24}>
          <Form.Item
            name={['seniorityStartDate']}
            label={t('employeePage:SENIORITY_DATE')}
            rules={rules}
          >
            <DatePicker placeholder={t('employeePage:SENIORITY_DATE')} className={`${parentClasses.inputContainer} w-100`} />
          </Form.Item>
        </Col>
        <Col sm={8} xs={24}>
          <Form.Item
            name={['annualLeaveCalculationStartDate']}
            label={t('employeePage:LEAVE_ENTITLEMENT')}
            rules={rules}
          >
            <DatePicker
              placeholder={t('employeePage:LEAVE_ENTITLEMENT')}
              className={`${parentClasses.inputContainer} w-100`}
            />
          </Form.Item>
        </Col>
        <Col sm={12} xs={24}>
          <Form.Item
            required
            hasFeedback
            name={['mainWorkLocation']}
            label={t('employeePage:WORKING_LOCATION')}
            rules={rules}
          >
            {/* the form item passes the onChange
                // @ts-ignore */}
            <SelectLocation
              placeholder={t('employeePage:WORKING_LOCATION')}
              className={parentClasses.inputContainer}
            />
          </Form.Item>
        </Col>
        <Col sm={12} xs={24}>
          <Form.Item
            required
            hasFeedback
            name={['employmentType']}
            label={t('employeePage:EMPLOYMENT_TYPE')}
            rules={rules}
          >
            {/* onChange is passed to the SelectGender component by Form.Item
                @ts-ignore */}
            <SelectEmploymentType className={parentClasses.inputContainer} />
          </Form.Item>
        </Col>
        <Col sm={12} xs={24}>
          <Form.Item
            required
            hasFeedback
            name={['contractType']}
            label={t('employeePage:CONTRACT_TYPE')}
            rules={rules}
          >
            {/* the Form.Item passes the onChange
                // @ts-ignore */}
            <SelectContractType className={parentClasses.inputContainer} />
          </Form.Item>
        </Col>
        <Col sm={12} xs={24}>
          <Form.Item
            required
            hasFeedback
            name={['sgkCity']}
            label={t('employeePage:SGK_CITY')}
            rules={rules}
          >
            {/* the Form.Item passes the onChange
                // @ts-ignore */}
            <SelectCity
              country={COUNTRY_IDS.TR}
              className={parentClasses.inputContainer}
            />
          </Form.Item>
        </Col>
      </Row>
    </Card>
  );
};

export default CompanyInfoFormSection;
