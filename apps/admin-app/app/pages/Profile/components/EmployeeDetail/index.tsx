import { useTranslation } from 'react-i18next';
import { Tabs } from 'antd';

import SectionTitle from '../SectionTitle';
import PersonalInfoForm from '../Forms/PersonalInfoForm';
import EmployeeInfoForm from '../Forms/EmployeeInfoForm';
import OrganizationInfoForm from '../Forms/OrganizationInfoForm';
import CompanyInfoForm from '../Forms/CompanyInfoForm';
import ContactInfoForm from '../Forms/ContactInfoForm';
import EducationInfoForm from '../Forms/EducationInfoForm';

import useStyles from '../styles';

export default function EmployeeDetail() {
  const { t } = useTranslation(['profile', 'employeePage']);
  const classes = useStyles();

  return (
    <div className={classes.tabContainer}>
      <Tabs defaultActiveKey="1" type="card">
        {/* Personal Info */}
        <Tabs.TabPane tab={t('employeePage:PERSONAL_INFORMATION')} key="1">
          <PersonalInfoForm />
        </Tabs.TabPane>
        {/* Contact Info */}
        <Tabs.TabPane tab={t('employeePage:CONTACT_INFORMATION')} key="2">
          <ContactInfoForm />
        </Tabs.TabPane>
        {/* Employee Info */}
        <Tabs.TabPane tab={t('employeePage:EMPLOYEE_INFORMATION')} key="3">
          <EmployeeInfoForm />
        </Tabs.TabPane>
        {/* Organization Info */}
        <Tabs.TabPane tab={t('employeePage:ORGANIZATION_INFORMATION')} key="4">
          <OrganizationInfoForm />
        </Tabs.TabPane>
        {/* Company Info */}
        <Tabs.TabPane tab={t('employeePage:COMPANY_INFORMATION')} key="5">
          <CompanyInfoForm />
        </Tabs.TabPane>
        {/* Education Info */}
        <Tabs.TabPane tab={t('employeePage:EDUCATIONAL_INFORMATION')} key="6">
          <EducationInfoForm />
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
}
