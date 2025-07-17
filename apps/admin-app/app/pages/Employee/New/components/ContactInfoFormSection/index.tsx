import { useState } from 'react';
import {
  Col,
  Form,
  Input,
  InputNumber,
  Row,
  Card,
  FormItemProps,
  FormInstance,
} from 'antd';
import { useTranslation } from 'react-i18next';

import SelectCountry from '@shared/containers/Select/Country';
import SelectCityOfCountry from '../../../components/Select/City';
import SelectCountryDialingCode from '../../../components/Select/CountryDialingCode';
import SelectEmergencyContactRelationship from '../../../components/Select/EmergencyContactRelationship';
import useStyles from '../../style';

const ContactInfoFormSection = ({
  rules,
  form,
}: { rules: FormItemProps['rules'], form: FormInstance }) => {
  const { t } = useTranslation(['employeePage']);
  const parentClasses = useStyles();
  // current antd version desn't support the useWatch
  const [selectedResidentialCountry, setSelectedResidentialCountry] = useState<MongoIDType | undefined>();
  const [selectedPersonalGSMDialCode, setSelectedPersonalGSMDialCode] = useState<string | undefined>();

  const handleResidentialCountryChange = (value: MongoIDType | undefined): void => {
    form.setFieldsValue({ residentialAddress: { country: value, city: undefined } });
    setSelectedResidentialCountry(value);
  };

  return (
    <Card
      bordered={false}
      title={t('employeePage:CONTACT_INFORMATION')}
    >
      <Row gutter={[16, 16]}>
        <Col sm={8} xs={24}>
          <Form.Item
            required
            hasFeedback
            label={t('employeePage:RESIDENTIAL_COUNTRY')}
            name={['residentialAddress', 'country']}
            rules={rules}
          >
            {/* the form item passes the onChange
                // @ts-ignore */}
            <SelectCountry
              showOldCountries
              isOldCountriesSelectable
              className={parentClasses.inputContainer}
              onChange={handleResidentialCountryChange}
            />
          </Form.Item>
        </Col>
        <Col sm={8} xs={24}>
          <Form.Item
            required
            hasFeedback
            name={['residentialAddress', 'city']}
            label={t('employeePage:RESIDENTIAL_CITY')}
            rules={rules}
            dependencies={['residentialAddress', 'country']}
          >
            {/* the form item passes the onChange
                // @ts-ignore */}
            <SelectCityOfCountry
              country={selectedResidentialCountry}
              disabled={!selectedResidentialCountry}
              placeholder={t('employeePage:RESIDENTIAL_CITY')}
              className={parentClasses.inputContainer}
            />
          </Form.Item>
        </Col>
        <Col sm={8} xs={24}>
          <Form.Item
            required
            hasFeedback
            name={['residentialAddress', 'district']}
            label={t('employeePage:RESIDENTIAL_DISTRICT')}
            rules={rules}
          >
            <Input placeholder={t('employeePage:RESIDENTIAL_DISTRICT')} className={parentClasses.inputContainer} />
          </Form.Item>
        </Col>
        <Col sm={24} xs={24}>
          <Form.Item
            required
            hasFeedback
            name={['residentialAddress', 'address']}
            label={t('employeePage:RESIDENTIAL_ADDRESS')}
            rules={rules}
          >
            <Input placeholder={t('employeePage:RESIDENTIAL_ADDRESS')} className={parentClasses.inputContainer} />
          </Form.Item>
        </Col>
        <Col sm={12} xs={24}>
          <Form.Item
            required
            hasFeedback
            name={['personalEmail']}
            label={t('employeePage:PERSONAL_EMAIL')}
            rules={rules}
          >
            <Input placeholder={t('employeePage:PERSONAL_EMAIL')} className={parentClasses.inputContainer} />
          </Form.Item>
        </Col>
        <Col sm={12} xs={24}>
          <Form.Item
            hasFeedback
            label={t('employeePage:PERSONAL_GSM')}
          >
            <Input.Group compact>
              <Form.Item
                noStyle
                name={['personalGSMDialCode']}
                dependencies={['personalGSMNumber']}
                rules={rules}
              >
                {/* the Form.Item passes the onChange
                    // @ts-ignore */}
                <SelectCountryDialingCode onChange={setSelectedPersonalGSMDialCode} allowClear className={parentClasses.dialingCodeSelect} />
              </Form.Item>
              <Form.Item
                noStyle
                name={['personalGSMNumber']}
                dependencies={['workGSMNumber', 'personalGSMDialCode']}
                normalize={(value: string) => value || ''}
                rules={rules}
              >
                <InputNumber
                  disabled={!selectedPersonalGSMDialCode}
                  placeholder={t('employeePage:PERSONAL_GSM')}
                  className={parentClasses.phoneNumberInput}
                />
              </Form.Item>
            </Input.Group>
          </Form.Item>
        </Col>
        <Col sm={8} xs={24}>
          <Form.Item
            required
            hasFeedback
            name={['emergencyContact', 'name']}
            label={t('employeePage:EMERGENCY_CONTACT.NAME_SURNAME')}
            rules={rules}
          >
            <Input placeholder={t('employeePage:EMERGENCY_CONTACT.NAME_SURNAME')} className={parentClasses.inputContainer} />
          </Form.Item>
        </Col>
        <Col sm={8} xs={24}>
          <Form.Item
            required
            hasFeedback
            name={['emergencyContact', 'relationsType']}
            label={t('employeePage:EMERGENCY_CONTACT.RELATION')}
            rules={rules}
          >
            {/* the Form.Item passes the onChange
                // @ts-ignore */}
            <SelectEmergencyContactRelationship className={parentClasses.inputContainer} />
          </Form.Item>
        </Col>
        <Col sm={8} xs={24}>
          <Form.Item
            required
            hasFeedback
            label={t('employeePage:EMERGENCY_CONTACT.PHONE')}
          >
            <Input.Group compact>
              <Form.Item
                noStyle
                name={['emergencyContact', 'dialCode']}
                rules={rules}
              >
                {/* the Form.Item passes the onChange
                    // @ts-ignore */}
                <SelectCountryDialingCode allowClear className={parentClasses.dialingCodeSelect} />
              </Form.Item>
              <Form.Item
                noStyle
                name={['emergencyContact', 'gsm']}
                initialValue=""
                normalize={(value: string) => value || ''}
                rules={rules}
              >
                <InputNumber placeholder={t('employeePage:EMERGENCY_CONTACT.PHONE')} className={parentClasses.phoneNumberInput} />
              </Form.Item>
            </Input.Group>
          </Form.Item>
        </Col>
      </Row>
    </Card>
  );
};

export default ContactInfoFormSection;
